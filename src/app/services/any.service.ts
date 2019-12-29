import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnyService {

  constructor(private firestore: AngularFirestore,private storage: AngularFireStorage ) { }
 
  updateHamdouns(record){
    this.firestore.doc('hamdouns/data').update(record);
  }
 
  getHamdoun()
  {
    return this.firestore.doc('hamdouns/data').snapshotChanges();
  }

  getPub(){
    return this.firestore.doc('pub/pub').snapshotChanges();
  }
  updatePub(pub)
  {
    this.firestore.doc('pub/pub').update(pub);
  }
  
}
