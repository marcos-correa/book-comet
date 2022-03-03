import { MENUS } from 'src/app/core/mocks/menu';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';


import { AccountService } from './../../../core/services/account.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {
  
  menuItems: MenuItem[];
  isLogged:any = false;

  constructor(
    private accountService:AccountService,
    private messageService:MessageService,
    private router:Router

  ) { 
    let adminItem = {label: 'Admin panel', icon: 'pi pi-fw pi-cog', "routerLink":['/admin'], command: () =>{
      if(this.isLogged){
        this.router.navigate(['/admin'])
      }else{ 
        this.messageService.add({severity:'warning', summary: 'Login needed', detail: `You must be logged in to access Admin panel`});
      }
    }, }
    this.menuItems = MENUS;
    this.menuItems[1] = adminItem
  }


  ngOnInit(): void {
    this.hasLogged();
  }
  hasLogged(){
    this.accountService.hasLogged().then(res=> {
      if(!res){
        this.isLogged = false
      }else{
        this.isLogged = true
      }
    })
  }
  logout(){
    this.accountService.logout().then(res=>{
      if(!res) {
        this.hasLogged();
        this.router.navigate([''])
      }else{
        alert('ok')
      }
    })
  }

  login(){
    this.router.navigate(['login'])
  }
}
