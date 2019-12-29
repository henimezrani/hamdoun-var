import { Component, OnInit } from '@angular/core';
import { CommandsService } from 'src/app/services/commands.service';
import { UsersService } from 'src/app/services/users.service';

declare interface TableData {
  headerRow: string[];
}

@Component({
  selector: 'app-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.css']
})
export class CommandsComponent implements OnInit {

  public tableData1: TableData;
  public tableData2: TableData;
  commands:any;
  command:any=null;
  user:any=null;
  isCommand:boolean=false;
  isPromotion:boolean=false;
constructor(private commandService:CommandsService,private userService:UsersService) { }

ngOnInit() {
  this.commandService.getCommands().subscribe(data => {
    let i=0;
    this.commands = data.map(e => {
      i++;
      if(e.payload.doc.data()['promotion_code']!="none")
      {
        this.isPromotion=true;
      }else{
        this.isPromotion=false;
      }
      return {
        //e.payload.doc.data()['Name'],
        row_id:i,
        id: e.payload.doc.id,
        isEdit: false,
        isPromotion:this.isPromotion,
        client_uid: e.payload.doc.data()['client_uid'],
        delievered: e.payload.doc.data()['delievered'],
        enCours: e.payload.doc.data()['enCours'],
        name: e.payload.doc.data()['name'],
        total: e.payload.doc.data()['total'],
        products: e.payload.doc.data()['products'],
        request: e.payload.doc.data()['request'],
        promotion_code: e.payload.doc.data()['promotion_code'],
        client_exact_adress: e.payload.doc.data()['client_exact_adress'],
        client_zone: e.payload.doc.data()['client_zone'],
        client_name: e.payload.doc.data()['client_name'],
        client_number: e.payload.doc.data()['client_number'],
        client_command_no: e.payload.doc.data()['client_command_no'],
        created_at: e.payload.doc.data()['created_at'].toDate(),
        updated_at: e.payload.doc.data()['updated_at'].toDate()
      };
      
    })
    console.log("aaa"+JSON.stringify(this.commands));

  });
    this.tableData1 = {
        headerRow: ['ID','Name', 'Zone', 'Total', 'Delievered','Promotion']
    };
  
}

  async selectCommand()
{
 await this.userService.getUserByUID(this.command.client_uid).then(doc=>{
    doc.forEach(user=>{
      this.user=user.payload.doc.data();
  })

 })
}

}
