import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
export interface ProductData {
  id: string,
  prod_id: string,
  imageSrc: string,
  name: string,
  prix_u: Number,
  qteStock: Number,
  catId:string,
  created_at: Date,
  updated_at: Date  
}
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  action: string;
  local_data: any;
  
  constructor(private storage: AngularFireStorage,
    public dialogRef: MatDialogRef<ProductDetailComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: ProductData) {
    console.log(data);
    this.local_data = { ...data };
    this.action = this.local_data.action;
  }

  doAction(){
    this.dialogRef.close({event:this.action,data:this.local_data});
  }
 
  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

  uploadFile(event) {
    
    const file = event.target.files[0];
    const filePath = this.getFolderName(this.local_data.catId)+"/"+file.name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url=>{
            if(url)
            {
              this.local_data.imageSrc=url;
            }
          });
         } )
     )
    .subscribe()
  }
  getFolderName(cat)
  {
   switch(cat){
        case "1":
        return "boissons";
        break;
        case "2":
        return "breakfast";
        break;
        case "3":
        return "snacks";
        break;
        case "4":
        return "dejeuner";
        break;
        case "5":
        return "glace"
        break;
        case "6":
        return "snacks"
        break;
   }
  }

}
