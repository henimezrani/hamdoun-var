import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { CommandsComponent } from './commands/commands.component';
import { CommandDetailComponent } from './commands/command-detail/command-detail.component';
import { UsersComponent } from './users/users.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { DashComponent } from './dash/dash.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { InvoiceComponent } from './commands/invoice/invoice.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import {
  MatTableModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatCheckboxModule,
  MatRadioModule,
  MatRippleModule,
  MatTooltipModule,
  MatSelectModule,
  MatSnackBarModule
} from '@angular/material';
import { AllProductsComponent } from './products/all-products/all-products.component';
import { NotificationsComponent } from '../notifications/notifications.component';
import { BackUsersComponent } from './back-users/back-users.component';
@NgModule({
  declarations: [AdminComponent, CommandsComponent, CommandDetailComponent, UsersComponent, ProductsComponent, ProductDetailComponent, DashComponent, UserDetailComponent, SidebarComponent, NavbarComponent, FooterComponent, InvoiceComponent, AllProductsComponent, NotificationsComponent, BackUsersComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatRippleModule,
    MatTooltipModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  entryComponents: [
    ProductDetailComponent
  ],
})
export class AdminModule { }
