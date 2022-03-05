import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.less']
})
export class LoginFormComponent implements OnInit {

  @Output() valid: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  login = {
    email: "",
    password:""
  }

  value1:any;
  value2:any;
  value3:any;
  value4:any;
  value5:any;

  ngOnInit(): void {
  }
  
  changedAny(){
    if(this.login.email && this.login.password){
      this.valid.emit(true)
    }else{
      this.valid.emit(false)
    }
  }
}
