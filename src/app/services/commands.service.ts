import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class CommandsService {

  
  constructor(private firestore: AngularFirestore ) { }
  addCommand(record) {
    return this.firestore.collection('commands').add(record);
  }
 
  getCommands() {
    return this.firestore.collection('commands', ref => 
    ref.orderBy('created_at','desc')).snapshotChanges();
    
   // return this.firestore.collection('commands').snapshotChanges();
  }
  getCommandsNumber()
  {
    return this.firestore.collection('commands').snapshotChanges().pipe(map(c=>{
      return c.length;
    }));
  }
  cancelCommand(recordID,record)
  {
    console.log(record);
    if(record.request)
    {

    }else{
      record.request="";
    }
    let command={
      canceled: true,
client_command_no: record.client_command_no,
client_exact_adress: record.client_exact_adress,
client_name: record.client_name,
client_number: record.client_number,
client_uid: record.client_uid,
client_zone: record.client_zone,
created_at: record.created_at,
delievered: false,
enCours: false,
name: record.name,
products: record.products,
promotion_code: record.promotion_code,
request: record.request,
total: record.total,
updated_at: record.updated_at
    }
    this.firestore.doc('commands/' + recordID).update(command);
  }
  updateCommand(recordID,record){
    console.log(record);
    if(record.request)
    {

    }else{
      record.request="";
    }
    let command={
      canceled: false,
client_command_no: record.client_command_no,
client_exact_adress: record.client_exact_adress,
client_name: record.client_name,
client_number: record.client_number,
client_uid: record.client_uid,
client_zone: record.client_zone,
created_at: record.created_at,
delievered: record.delievered,
enCours: record.enCours,
name: record.name,
products: record.products,
promotion_code: record.promotion_code,
request: record.request,
total: record.total,
updated_at: record.updated_at
    }
    this.firestore.doc('commands/' + recordID).update(command);
  }
 
  deleteCommand(record_id) {
    this.firestore.doc('commands/' + record_id).delete();
  }

  getCommandById(recordID)
  {
    return this.firestore.doc('commands/'+recordID).get();
  }
}
