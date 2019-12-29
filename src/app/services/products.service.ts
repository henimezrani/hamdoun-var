import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { flatMap, switchMap, map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  prod: any;
  prodRef: any;
  cats:any;
  allProducts:any=[];
  constructor(private firestore: AngularFirestore) { }


  getProducts(cat) {
    return this.firestore.collection(cat).snapshotChanges();
  }
  getProductById(recordID, cat) {
    return this.firestore.doc(cat + "/" + recordID).get();
  }
  async getAllProducts() {
    let products: any = {};
    let allProducts: any[] = new Array();
    const catscollection = this.firestore.collection("cats").snapshotChanges();
    products = await catscollection.subscribe(async cat => {
      cat.map(e => {
        console.log(e.payload.doc.data());
        return e.payload.doc.data()['subcats'];
      })
      console.log(products);
    })

    return allProducts;
  }
  async getProductsNumber()
  {
    await this.getCats().subscribe(async res => {
      this.cats = res.map(e => {
        return e.payload.doc.data();
      })
      await this.pushToArray(this.cats).then((res1)=>{
        console.log(res1)
        console.log(this.allProducts);
      })
     
      return this.allProducts;
    })
    
  } 

  async pushToArray(cats)
  {
    for(let i=0;i<cats.length;i++)
    {
      for(let j=0;j<cats[i].subcats.length;j++)
      {
        await this.getProductsss(cats[i].cat_name, cats[i].subcats[j]).subscribe(res => {
            let prods=res.map(e => {
              return {data:e.payload.doc.data(),ref:e.payload.doc.ref.id};
            });
            this.allProducts=this.allProducts.concat(prods);
            console.log(this.allProducts);
        })
      }
    }
  }

  async getProd(cat, subcat) {
    let prods;
    await this.getProductsss(cat, subcat).subscribe(res => {
      prods= res.map(e => {
        return {data:e.payload.doc.data(),ref:e.payload.doc.ref.id};
      })
      //console.log(prods);
      return prods;
    })
  }
  getCats() {
    return this.firestore.collection("cats").snapshotChanges();
  }
  getProductsss(cat, subcat) {
    return this.firestore.collection("product").doc(cat).collection(subcat).snapshotChanges();
  }
  async getSubcats(subcats, cat_name) {
    let products: any = {};
    products.subcat = [];
    for (let i = 0; i < subcats.length; i++) {
      let sub_cat: any = {};
      sub_cat.sub_name = subcats[i];
      await this.getProductBySub(cat_name, subcats[i]).then(data => {
        sub_cat.products = data;
      });
      products.subcat.push(sub_cat);
    }
    return products;
  }
  async getProductBySub(cat, subcat) {
    const productCollection = this.firestore.collection("product").doc(cat).collection(subcat);
    let prod: any[] = [];
    await productCollection.snapshotChanges().subscribe(res => {
      prod = res.map(e => {
        return {
          x: e.payload.doc.data()
        }
      })
    })
    return prod;
  }

  addProduct(cat, subcat, prod) {
    return this.firestore.collection("product").doc(cat).collection(subcat).add(prod);
  }

  updateProduct(cat, subcat, prod, ref) {
    return this.firestore.collection("product").doc(cat).collection(subcat).doc(ref).update(prod);
  }
  deleteProduct(cat, subcat,ref) {
    return this.firestore.collection("product").doc(cat).collection(subcat).doc(ref).delete();
  }

  /*  getSubCats(id,name) {
      var docRef = this.firestore.collection("cats").doc(id);
  
      docRef.ref.get().then(function (doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          doc.data()['subcats']
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });
    }*/
}



