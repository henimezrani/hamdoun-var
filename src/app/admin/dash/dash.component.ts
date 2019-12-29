import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { CommandsService } from 'src/app/services/commands.service';
import { Observable } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { AnyService } from 'src/app/services/any.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

declare interface TableData {
  headerRow: string[];
}

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {

  commandsLength: Number;
  usersLength: Number;
  productsLength: Number;
  catsLength: Number;
  subCatsLength: Number = 0;
  cats: any;
  allProducts: any;
  hamdouns: any;
  users:any;
  loc: any;
  public tableData1: TableData;
  isUpdateOp:boolean=false;
  isUpdateCl:boolean=false;
  isUpdateLoc:boolean=false;
  updatedOpening:string;
  updatedClosing:string;
  updatedLocation:string;
  commands:any;
  isPromotion:boolean=false;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  pub:any;
  isUpdatePub:boolean=false;
  updatePubImage:boolean=false;
  constructor(private userService: UsersService, private commandsService: CommandsService,
    private productsService: ProductsService, private hamdounsService: AnyService, private storage: AngularFireStorage) { }

  ngOnInit() {
    this.commandsService.getCommandsNumber().subscribe(value => {
      this.commandsLength = value;
    });
    this.userService.getUsersNumber().subscribe(value => {
      this.usersLength = value;
    });
    this.hamdounsService.getHamdoun().subscribe(res => {
      this.hamdouns = res.payload.data();
    })
    this.hamdounsService.getPub().subscribe(pub=>{
      this.pub=pub.payload.data();
    })
    this.getProductsNumber();
    this.userService.getUsers().subscribe(data => {
      let i=0;
      this.users = data.map(e => {
        i++;
       
        return {
          //e.payload.doc.data()['Name'],
          row_id:i,
          isEdit: false,
          uid: e.payload.doc.data()['uid'],
          command_no: e.payload.doc.data()['command_no'],
          email: e.payload.doc.data()['email'],
          exact_location: e.payload.doc.data()['exact_location'],
          fname: e.payload.doc.data()['fname'],
          lname: e.payload.doc.data()['lname'],
          phone_number: e.payload.doc.data()['phone_number'],
          prefered_lng: e.payload.doc.data()['prefered_lng'],
          zone: e.payload.doc.data()['zone'],
          created_at: e.payload.doc.data()['created_at'],
          updated_at: e.payload.doc.data()['updated_at']
          
        };
        
      })

  
    });
      this.tableData1 = {
          headerRow: ['ID','Name', 'Zone', 'Phone Number']
      };
      this.commandsService.getCommands().subscribe(data => {
        let i=0;
        this.commands = data.map(e => {
          i++;
          if(e.payload.doc.data()['promotion_code']!="none")
          {
            this.isPromotion=true;
          }else{
            this.isPromotion=false;
          }
          return {
            //e.payload.doc.data()['Name'],
            row_id:i,
            id: e.payload.doc.id,
            isEdit: false,
            isPromotion:this.isPromotion,
            client_uid: e.payload.doc.data()['client_uid'],
            delievered: e.payload.doc.data()['delievered'],
            enCours: e.payload.doc.data()['enCours'],
            name: e.payload.doc.data()['name'],
            total: e.payload.doc.data()['total'],
            products: e.payload.doc.data()['products'],
            request: e.payload.doc.data()['request'],
            promotion_code: e.payload.doc.data()['promotion_code'],
            client_exact_adress: e.payload.doc.data()['client_exact_adress'],
            client_zone: e.payload.doc.data()['client_zone'],
            client_name: e.payload.doc.data()['client_name'],
            client_number: e.payload.doc.data()['client_number'],
            client_command_no: e.payload.doc.data()['client_command_no'],
            created_at: e.payload.doc.data()['created_at'].toDate(),
            updated_at: e.payload.doc.data()['updated_at'].toDate()
          };
          
        })
        console.log("aaa"+JSON.stringify(this.commands));
    
      });
  }
  addLocation() {
    this.isUpdateLoc=true;
    this.updatedLocation=this.loc+" has been added successfully"
    this.hamdouns.locations_list.push(this.loc);
  }
  updateHamdouns()
  {
    this.hamdounsService.updateHamdouns(this.hamdouns); 
  }


  async getProductsNumber() {
    this.allProducts = new Array();
    await this.productsService.getCats().subscribe(async res => {
      this.cats = res.map(e => {
        return e.payload.doc.data();
      })
      this.catsLength = this.cats.length;

      await this.pushToArray(this.cats).then((res1) => {
        console.log(res1)
        console.log(this.allProducts);
      })

      return this.allProducts;
    })

  }
  uploadFile(event) {

    
    const file = event.target.files[0];
    const filePath = "pub_images_folder" + "/" + file.name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
        this.downloadURL.subscribe(url => {
          if (url) {
            /**pub{imageSrc,bigTitle,underTitle,when} */
            this.pub.imageSrc = url;
            this.updatePub(this.pub);
          }
        });
      })
    )
      .subscribe()
  }
  updatePub(pub)
  {
    this.hamdounsService.updatePub(pub);
  }
  async pushToArray(cats) {
    for (let i = 0; i < cats.length; i++) {
      for (let j = 0; j < cats[i].subcats.length; j++) {
        await this.productsService.getProductsss(cats[i].cat_name, cats[i].subcats[j]).subscribe(res => {
          let prods = res.map(e => {
            return { data: e.payload.doc.data(), ref: e.payload.doc.ref.id };
          });
          this.allProducts = this.allProducts.concat(prods);
          this.productsLength = this.allProducts.length;
          this.subCatsLength = this.subCatsLength.valueOf() + 1;
        })
      }
    }
  }

}
