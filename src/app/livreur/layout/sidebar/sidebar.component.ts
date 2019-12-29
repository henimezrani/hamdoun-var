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
    { path: '/livreur/dash', title: 'Dashboard',  icon: 'pe-7s-graph', class: '' },
    { path: '/livreur/commands', title: 'Commands',  icon:'pe-7s-news-paper', class: '' } 
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
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
