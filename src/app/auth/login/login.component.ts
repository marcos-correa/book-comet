import { Router } from '@angular/router';
import { AccountService } from './../../core/services/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  login = {
    email: "",
    password:""
  }

  validForm:boolean = false;

  constructor(
    private accountService:AccountService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }
  onSubmit(){
    try {
      const result = this.accountService.login(this.login);
      console.log(`login succeeded: ${result}`);
      this.router.navigate(['']);
    } catch (error) {
      console.error(error);
    }
  }
  showValid(value:any){
    this.validForm = value 
  }
}
