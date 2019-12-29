import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CommandsComponent } from './commands/commands.component';
import { CommandDetailComponent } from './commands/command-detail/command-detail.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { DashComponent } from './dash/dash.component';
import { AllProductsComponent } from './products/all-products/all-products.component';
import { NotificationsComponent } from '../notifications/notifications.component';
import { AuthGuard } from '../services/guards/auth.guard';
import { BackUsersComponent } from './back-users/back-users.component';

const routes: Routes = [
  {path: '', component: AdminComponent, 
  children: [
      {path:'dash',component:DashComponent},
      {path: 'commands',component: CommandsComponent},
      {path:'command',component:CommandDetailComponent},
      {path:'products',component: AllProductsComponent},
      {path:'users',component:UsersComponent},
      {path:'user',component:UserDetailComponent},
      {path: 'notifications',component: NotificationsComponent},
      {path:'ausers',component:BackUsersComponent}
  ],canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
