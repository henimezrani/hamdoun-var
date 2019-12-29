import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { flatMap } from 'rxjs/operators';
import {map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private firestore: AngularFirestore ) { }
  addUser(record) {
    return this.firestore.collection('users').add(record);
  }
 
  getUsers() {
    //return this.firestore.collection('users').snapshotChanges();
    return this.firestore.collection('users', ref=> ref.orderBy('created_at')).snapshotChanges();
  }
  getAdmin()
  {
    return this.firestore.collection('users').snapshotChanges();
  }
 
  getUsersNumber()
  {
    return this.firestore.collection('users').snapshotChanges().pipe(map(u=>{
      return u.length;
    }));
  }
  
  updateProduct(recordID,record){
    this.firestore.doc('users/' + recordID).update(record);
  }
 
  deleteUser(record_id) {
    this.firestore.doc('users/' + record_id).delete();
  }

  getUserById(recordID)
  {
    return this.firestore.doc('users/'+recordID).get();
  }

  async getUserByUID(uid)
  {
    return this.firestore.collection("users", ref => ref.where('uid', '==', uid).limit(1)).snapshotChanges()
    .pipe(flatMap(prod => prod))
  }
}
