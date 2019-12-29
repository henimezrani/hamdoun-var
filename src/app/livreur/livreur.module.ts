import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LivreurRoutingModule } from './livreur-routing.module';
import { LivreurComponent } from './livreur.component';
import { DashComponent } from './dash/dash.component';
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
import { CommandsComponent } from './commands/commands.component';
import { InvoiceComponent } from './commands/invoice/invoice.component';
import { CommandDetailComponent } from './commands/command-detail/command-detail.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FooterComponent } from './layout/footer/footer.component';
@NgModule({
  declarations: [LivreurComponent, DashComponent, CommandsComponent, InvoiceComponent, CommandDetailComponent, NavbarComponent, SidebarComponent, FooterComponent],
  imports: [
    CommonModule,
    LivreurRoutingModule,
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
  MatSnackBarModule,
  FormsModule,
  ReactiveFormsModule
  ]
})
export class LivreurModule { }
