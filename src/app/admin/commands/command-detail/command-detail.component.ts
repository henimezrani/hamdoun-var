import { Component, OnInit, Input } from '@angular/core';
import { CommandsService } from 'src/app/services/commands.service';
import { DocumentReference, AngularFirestore } from '@angular/fire/firestore';
import { ProductsService } from 'src/app/services/products.service';
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-command-detail',
  templateUrl: './command-detail.component.html',
  styleUrls: ['./command-detail.component.css']
})
export class CommandDetailComponent implements OnInit {

  @Input()
  command: any

  @Input()
  user:any

  products:any;
  private commandRef: DocumentReference;
  prod: any;
  prodRef: any;
  isPromotion:boolean=false;
  cats:any;
  allProducts:any;
  productsLength:Number=0;
  catsLength:Number=0;
  constructor(private firestore: AngularFirestore,private commandService:CommandsService,private productService:ProductsService) { }

  ngOnInit() {
    console.log(this.command);
    if(this.command.promotion_code!="none")
    { 
      this.isPromotion=true;
    }
    this.products=this.command.products;
  }

  getProductTotal(price,qte)
  {
   return price*qte;
  }

  delieverCommand()
  {
    this.command.delievered=true;
    this.command.enCours=false;
    this.command.cancel=false;
    for(let i=0;i<this.products.length;i++)
    {
      this.selectProduct(this.products[i].prod_id,this.products[i].catId);
      this.update(this.products[i])
    }
    this.commandService.updateCommand(this.command.id,this.command);
    
  }
  cancelCommand()
  {

  }


  async selectProduct(recordID,cat) {


    let x = await this.firestore.collection(cat, ref => ref.where('id', '==', recordID).limit(1)).snapshotChanges()
      .pipe(flatMap(prod => prod))

    // subscribe to changes
    x.subscribe((doc: any) => {
      this.prod = doc.payload.doc.data();
      this.prodRef = doc.payload.doc.ref;

    })
  }

  update(record)
  {
    this.prod.qteStock = this.prod.qteStock - record.prod_qte;
    this.prodRef.update(this.prod);
  }
  addProd()
  {
    
  }

  async getProductsNumber() {
    this.allProducts = new Array();
    await this.productService.getCats().subscribe(async res => {
      this.cats = res.map(e => {
        return e.payload.doc.data();
      })
      this.catsLength = this.cats.length;

      await this.pushToArray(this.cats).then((res1) => {
        console.log(this.allProducts);
      })

      return this.allProducts;
    })

  }
  async pushToArray(cats) {
    for (let i = 0; i < cats.length; i++) {
      for (let j = 0; j < cats[i].subcats.length; j++) {
        await this.productService.getProductsss(cats[i].cat_name, cats[i].subcats[j]).subscribe(res => {
          let prods = res.map(e => {
            return { data: e.payload.doc.data(), ref: e.payload.doc.ref.id };
          });
          this.allProducts = this.allProducts.concat(prods);
        })
      }
    }
  }

  getStock(record)
  {
    let prod=this.allProducts.filter(item=> item.ref==record.prod_id);
    if((prod.qteStock-record.prod_qte)>=10)
    {
      return true;
    }else{
      return false;
    }
  }
}
