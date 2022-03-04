import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router){}
  /**
   * @method canActivate
   * @param  {ActivatedRouteSnapshot} route
   * @param  {RouterStateSnapshot} state
   * @returns boolean
   * @description 
   * 
   * Return true or false to exists object, faking a token validation.
   * 
   * That is used with Router configs to block acces for the Admin panel,
   * 
   * If the actual Session hasn't the token, all routes with canActivate pipe automaticaly redirects to Login Component
   * 
   */
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
    const token = window.localStorage.getItem('book_comet_token');
    if(!token) this.router.navigate(['login'])
    return (!!token)
  }
  
}
