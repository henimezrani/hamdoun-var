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
  isPromotion:boolean=false
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
     // this.update(this.products[i].prod_id,this.products[i].catId,this.products[i])
    }
    this.commandService.updateCommand(this.command.id,this.command);
    
  }
  cancelCommand()
  {

  }


  async selectProduct(recordID,cat) {


    let x = await this.firestore.collection("product", ref => ref.where('id', '==', recordID).limit(1)).snapshotChanges()
      .pipe(flatMap(prod => prod))

    // subscribe to changes
    x.subscribe((doc: any) => {
      this.prod = doc.payload.doc.data();
      this.prodRef = doc.payload.doc.ref;

    })
  }

  

  async getProductStock(record)
  {
    //.prod_id
    /*await this.firestore.collection(cat, ref => ref.where('id', '==', recordID).limit(1)).snapshotChanges()
      .pipe(flatMap(prod => prod)).subscribe((doc:any)=>{
        this.prod = doc.payload.doc.data();
        this.prodRef = doc.payload.doc.ref;
        this.prod.qteStock = this.prod.qteStock - record.prod_qte;
        this.prodRef.update(this.prod);
      })*/
  }
  async update(recordID,cat,record)
  {
    await this.firestore.collection(cat, ref => ref.where('id', '==', recordID).limit(1)).snapshotChanges()
      .pipe(flatMap(prod => prod)).subscribe((doc:any)=>{
        this.prod = doc.payload.doc.data();
        this.prodRef = doc.payload.doc.ref;
        this.prod.qteStock = this.prod.qteStock - record.prod_qte;
        this.prodRef.update(this.prod);
      })
    
  }
  addProd()
  {
    
  }
}
