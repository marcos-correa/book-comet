import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor() { }
  
  /**
   * @method login
   * @param  {any} account
   * @description
   * A method for logging in the user. It was only thought to save some data in localStorage
   */
  login(account:any){
    return new Promise(resolve=>{
      window.localStorage.setItem('book_comet_token','token')
      resolve(true)
    })
  }
  /**
   * @method logout
   * @description 
   * A method to log out the user. It just removes the object created on login from localStorage
   */
  logout(){
    return new Promise(resolve=>{
      window.localStorage.removeItem('book_comet_token');
      resolve(false)
    })
  }
  /**
   * @method hasLogged
   * @description
   * Returns if the user is logged in to the platform
   */
  hasLogged(){
    return new Promise(resolve=>{
      let logged = window.localStorage.getItem('book_comet_token')
      if(logged){
        resolve(true)
      }else{
        resolve(false)
      }
    })
  }
  /**
   * @method createAccount 
   * @param  {any} account
   * @description 
   * An example of what an account creation method using Promise would look like 
   */
  createAccount(account:any){
    return new Promise(resolve=>{
      resolve(true)
    })
  }
}
