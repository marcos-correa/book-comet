import { Router } from '@angular/router';
import { AccountService } from '../../core/services/account.service';
import { Component, OnInit } from '@angular/core';
import { AccountModel } from 'src/app/core/models/account.model';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  
  validForm:boolean = false;
  login:AccountModel = {
    password:'',
    username:''
  }


  constructor(
    private accountService:AccountService,
    private router:Router
  ) { }

  
  ngOnInit(): void {
  }

  onSubmit(){
    if(!this.validForm){
      return
    }
    try {
      const result = this.accountService.login(this.login);
      console.log(`login succeeded: ${result}`);
      this.router.navigate(['']);
    } catch (error) {
      console.error(error);
    }
  }
  
  showValid(value:boolean): void{
    this.validForm = value 
  }
}
