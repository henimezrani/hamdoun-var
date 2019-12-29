import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LivreurComponent } from './livreur.component';
import { DashComponent } from './dash/dash.component';
import { CommandsComponent } from './commands/commands.component';
import { CommandDetailComponent } from './commands/command-detail/command-detail.component';

const routes: Routes = [
  {
    path: '', component: LivreurComponent,
    children: [
      { path: 'dash', component: DashComponent },
      { path: 'commands', component: CommandsComponent },
      { path: 'command', component: CommandDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LivreurRoutingModule { }
