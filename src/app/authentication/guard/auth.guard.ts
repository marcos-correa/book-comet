import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router){}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
    const token = window.localStorage.getItem('book_comet_token');
    if(!token) this.router.navigate(['login'])
    return (!!token)
  }
  
}
