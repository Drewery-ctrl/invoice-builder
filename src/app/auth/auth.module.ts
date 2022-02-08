import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthComponent} from './auth.component';
import {MaterialModule} from "../shared/material.module";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
   declarations: [
      AuthComponent
   ],
   imports: [
      CommonModule,
      MaterialModule,
      FormsModule,
      ReactiveFormsModule
   ]
})
export class AuthModule {
}
