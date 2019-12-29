import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CommandsService } from '../services/commands.service';
import { UsersService } from '../services/users.service';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  private itemsCollection: AngularFirestoreCollection<any>;
  items: Observable<any[]>;
  commands: any;
  notifications:any[]=[];
  constructor(private firestore: AngularFirestore, private commandService: CommandsService,private userService: UsersService) { }

  ngOnInit() {
    this.commandService.getCommands().subscribe(data => {
      let i=0;
      this.userService.getUsers().subscribe(user=>{
       user.map(e=>{
          this.notifications.push({  text:"New user has been added username:"+e.payload.doc.data()['fname']+" "+e.payload.doc.data()['lname']+" "+e.payload.doc.data()['created_at'].toDate(),
             date:e.payload.doc.data()['created_at']})          
        })
    
     data.map(e=>{
        this.notifications.push({
          text:"Command has been added by "+e.payload.doc.data()['client_name']+" "+e.payload.doc.data()['created_at'].toDate(),
          totel:e.payload.doc.data()['total'],
          date:e.payload.doc.data()['created_at']
        })
        }
     )
    })  
  
    });
  
    this.notifications=this.sortByStartDate(this.notifications);
  }


  private getTime(date?: Date) {
    return date != null ? new Date(date).getTime() : 0;
  }

  public sortByStartDate(array: any[]): any[] {
    return array.sort((a: any, b: any) => {
      return this.getTime(a.date) - this.getTime(b.date);
    });
  }
}
