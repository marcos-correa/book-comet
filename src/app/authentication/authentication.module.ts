import { LoginFormComponent } from './../shared/components/login-form/login-form.component';
import { PasswordModule } from 'primeng/password';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {ButtonModule} from 'primeng/button';

import { SharedModule } from './../shared/shared.module';
import { AuthenticationRoutingModule } from './authentication-routing.module';



@NgModule({
  declarations: [
    // LoginComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
  ]
})
export class AuthenticationModule { }
