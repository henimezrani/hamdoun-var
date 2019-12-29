import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/services/auth.service';

declare interface TableData {
  headerRow: string[];
}
interface User {
  email?: string;
  password?: string;
  admin?: boolean;
}
@Component({
  selector: 'app-back-users',
  templateUrl: './back-users.component.html',
  styleUrls: ['./back-users.component.css']
})
export class BackUsersComponent implements OnInit {

  public tableData1: TableData;

  users: any;
  user: User = { email: "", password: "", admin: false };
  isUpdate: boolean = false;
  isAdmin: boolean = false;
  email: string;
  password: string;
  admin: boolean = false;
  item: any;
  constructor(private userService: UsersService, private authService: AuthService) { }

  ngOnInit() {
    this.userService.getAdmin().subscribe(data => {
      let i = 0;
      this.users = data.map(e => {
        i++;
        //e.payload.doc.data()['roles'].admin ? "Admin":"Delivery"
        console.log(e.payload.doc.data())
        if (e.payload.doc.data()['roles']) {
          if (e.payload.doc.data()['roles'].admin) {
            return {
              row_id: i,
              isEdit: false,
              uid: e.payload.doc.data()['uid'],
              email: e.payload.doc.data()['email'],
              type: "Admin",
            }
          } else {
            return {
              row_id: i,
              isEdit: false,
              uid: e.payload.doc.data()['uid'],
              email: e.payload.doc.data()['email'],
              type: "Delivery",
            }
          }
        }else{
          return{
            row_id: i,
            isEdit:false,
            email:e.payload.doc.data()['email'],
            type:"Normal"
          }
        }

      })

    });
    this.tableData1 = {
      headerRow: ['ID', 'Email', 'Roles']
    };
  }

  addUser() {
    this.user.email = this.email;
    this.user.password = this.password;
    this.user.admin = this.admin;
    if (this.user) {
      if (this.user.admin) {
        if (!this.user.email || !this.user.password) {
        } else {
          this.authService.SignUpAdmin(this.user.email, this.user.password);
        }
      } else {
        if (!this.user.email || !this.user.password) {
        } else {
          this.authService.SignUpDelivery(this.user.email, this.user.password);
        }
      }
    } else {
      console.log("user null")
    }
  }
  updateUser() {

  }

  setUser() {
    this.isUpdate = true;
    this.email = this.item.email;
    if (this.item.type === "Admin") {
      this.admin = true;
    } else if (this.item.type === "Delivery") {
      this.admin = false;
    } else {
      this.item = null;
      this.isUpdate = false;
    }

  }

}
