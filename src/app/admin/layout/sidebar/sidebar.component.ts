import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/admin/dash', title: 'Dashboard',  icon: 'pe-7s-graph', class: '' },
    {path:'/admin/ausers',title:'Back Users', icon:'pe-7s-user',class:''},
    { path: '/admin/users', title: 'Users List',  icon:'pe-7s-user', class: '' },
    { path: '/admin/products', title: 'Products',  icon:'pe-7s-note2', class: '' },
    { path: '/admin/commands', title: 'Commands',  icon:'pe-7s-news-paper', class: '' },
    { path: '/admin/notifications', title: 'Notifications',  icon:'pe-7s-bell', class: '' },
    
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']

})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
  logout()
  {
    this.authService.SignOut();
  }
}
