import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor() { }

  login(account:any){
    return new Promise(resolve=>{
      window.localStorage.setItem('book_comet_token','token')
      resolve(true)
    })
  }

  logout(){
    return new Promise(resolve=>{
      window.localStorage.removeItem('book_comet_token');
      resolve(false)
    })
  }

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

  createAccount(account:any){
    return new Promise(resolve=>{
      resolve(true)
    })
  }
}
