import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

import { AngularFireStorage } from '@angular/fire/storage';
import { MatDialog, MatTable } from '@angular/material';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
declare interface TableData {
  headerRow: string[];
}
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'prix_u', 'qteStock', 'action'];

  @Input()
  catId: string;

  @ViewChild(MatTable,{static:false}) table: MatTable<true>;
  public tableData1: TableData;
  public tableData2: TableData;
  products: any;
  product: any = null;
  isProduct: boolean = false;
  allProducts: any[];
  newProduct: any = {};
  editProduct: any={data:{id:"",name:"",isActive:false,imageSrc:"",prix_u:0,qteStock:0},ref:""};
  delProduct:any={data:{id:"",name:"",isActive:false,imageSrc:"",prix_u:0,qteStock:0},ref:""};
  newCat: any;
  cats: any;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  cat: string;
  subcat: string;
  editCat:string;
  subEditCat:string;
  newCategorie:any={};
  newCaty:string;
  
  constructor(private productsService: ProductsService, public dialog: MatDialog, private storage: AngularFireStorage) { }

  ngOnInit() {
    this.getCats();

    this.tableData1 = {
      headerRow: ['Name', 'Prix u', 'Qte Stock', 'EDIT', 'DELETE']
    };
  }

  async getCats() {
    await this.productsService.getCats().subscribe(res => {
      this.cats = res.map(e => {
        return e.payload.doc.data();
      })
      this.getProducts(this.cats[0].cat_name, this.cats[0].subcats[0]);
      this.cat = this.cats[0].cat_name;
      this.subcat = this.cats[0].subcats[0];
      this.editCat = this.cats[0].cat_name;
      this.subEditCat = this.cats[0].subcats[0];
    })
  }

  sortArray(array) {
    return array.sort((n1, n2) => n1.data.id - n2.data.id);
  }
  onChange(ev) {

    const selectedIndex = ev.target.selectedIndex;
    const value = ev.target.value;
    const optGroupLabel = ev.target.options[selectedIndex].parentNode.getAttribute('label');
    this.getProducts(optGroupLabel, value);
    this.editCat=optGroupLabel;
    this.subEditCat=value;
  }
  onChangeAdd(ev) {
    const selectedIndex = ev.target.selectedIndex;
    const value = ev.target.value;
    const optGroupLabel = ev.target.options[selectedIndex].parentNode.getAttribute('label');
    this.newProduct.subcat = selectedIndex;
    this.cat = optGroupLabel;
    this.subcat = value;
  }
  async getProducts(cat, subcat) {
    await this.productsService.getProductsss(cat, subcat).subscribe(res => {
      this.allProducts = res.map(e => {
        return {data:e.payload.doc.data(),ref:e.payload.doc.ref.id};
      })
    })
  }

  uploadFile(event) {

    const file = event.target.files[0];
    const filePath = "products_images_folder" + "/" + file.name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
        this.downloadURL.subscribe(url => {
          if (url) {
            this.newProduct.imageSrc = url;
          }
        });
      })
    )
      .subscribe()
  }
  uploadFileEdit(event) {

    const file = event.target.files[0];
    const filePath = "products_images_folder" + "/" + file.name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
        this.downloadURL.subscribe(url => {
          if (url) {
            this.editProduct.data.imageSrc = url;
          }
        });
      })
    )
      .subscribe()
  }
  addNewProduct() {
    this.productsService.addProduct(this.cat, this.subcat, this.newProduct);
  }
  updateProduct()
  {
    this.productsService.updateProduct(this.editCat,this.subEditCat,this.editProduct.data,this.editProduct.ref);
  }

  deleteProduct()
  {
    this.productsService.deleteProduct(this.cat,this.subcat,this.delProduct.ref);
  }
  addSub()
  {
    if(this.newCategorie.subcats)
    {
      this.newCategorie.subcats.push(this.newCaty);
    }else{
      this.newCategorie.subcats=[];
      this.newCategorie.subcats.push(this.newCaty);
    }
    
  }

}
 /* openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(ProductDetailComponent, {
      width: '250px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Add') {
        this.addRowData(result.data);
      } else if (result.event == 'Update') {
        this.updateRowData(result.data);
      } else if (result.event == 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }
  addRowData(row_obj) {
    var d = new Date();
    let product = {
      prod_id: row_obj.prod_id,
      imageSrc: row_obj.imageSrc,
      name: row_obj.name,
      prix_u: row_obj.prix_u,
      qteStock: row_obj.qteStock,
      catId: this.catId,
      created_at: d,
      updated_at: d
    }
    let prodFire = {
      id: row_obj.prod_id,
      imageSrc: row_obj.imageSrc,
      name: row_obj.name,
      prix_u: row_obj.prix_u,
      qteStock: row_obj.qteStock,
      catId: this.catId,
      created_at: d,
      updated_at: d
    }
    this.products.push(product);
    this.table.renderRows();
    this.productsService.addProduct(this.catId, prodFire);

  }
  updateRowData(row_obj) {
    var d = new Date();
    let prod = {
      imageSrc: row_obj.imageSrc,
      name: row_obj.name,
      prix_u: row_obj.prix_u,
      qteStock: row_obj.qteStock,
      catId: this.catId,
      updated_at: d
    }
    let prodFire = {
      id: row_obj.prod_id,
      imageSrc: row_obj.imageSrc,
      name: row_obj.name,
      prix_u: row_obj.prix_u,
      qteStock: row_obj.qteStock,
      catId: this.catId,
      created_at: d,
      updated_at: d
    }
    this.products = this.products.filter((value, key) => {
      if (value.prod_id == row_obj.prod_id) {
        value.name = row_obj.name;
        value.imageSrc = row_obj.imageSrc,
          value.prix_u = row_obj.prix_u,
          value.qteStock = row_obj.qteStock,
          value.catId = this.catId,
          value.updated_at = d
      }
      return true;
    });
    this.productsService.updateProduct(row_obj.prod_id, this.catId);
    this.productsService.update(prodFire);
  }
  deleteRowData(row_obj) {
    this.products = this.products.filter((value, key) => {
      return value.prod_id != row_obj.prod_id;
    });
    this.productsService.deleteProduct(row_obj.id, this.catId);
  }*/
