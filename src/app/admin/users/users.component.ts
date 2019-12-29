import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

declare interface TableData {
  headerRow: string[];
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public tableData1: TableData;
  
  users:any;
  user:any=null;
  isUser:boolean=false;
constructor(private userService:UsersService) { }

ngOnInit() {
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
  
}



}
