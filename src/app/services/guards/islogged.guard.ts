import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsloggedGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){

    /*return this.auth.user$.pipe(
      take(1),
      map(user => user && user.roles.admin ? true : false),
      tap(isAdmin => {
        if (!isAdmin) {
          console.error('Access denied - Admins only')
        }
      })
    );*/
    console.log("Is null"+this.auth.isLoggedIn);
    if(!this.auth.isLoggedIn)
    {
      return true
    }else{
      if(this.auth.getUserType())
      {
        this.router.navigate(['/admin/dash']);
      }else{
        this.router.navigate(['/livreur/dash']);
      }
      return false
        
    }
    

  }
  
}
