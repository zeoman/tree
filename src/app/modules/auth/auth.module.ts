import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {AuthRoutingModule} from "./auth-routing.module";
import {MaterialModule} from "../../material/material.module";
import {DirectiveModule} from "../../core/directives/directive.module";



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        MaterialModule,
        DirectiveModule
    ]
})
export class AuthModule { }
