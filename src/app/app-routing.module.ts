import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { IsloggedGuard } from './services/guards/islogged.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  { path:'login', component: LoginComponent, canActivate:[IsloggedGuard]},
  { path: 'admin', loadChildren:'./admin/admin.module#AdminModule'},
  { path: 'livreur', loadChildren:'./livreur/livreur.module#LivreurModule'},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
