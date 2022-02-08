import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MaterialModule} from "./shared/material.module";
import {AuthModule} from "./auth/auth.module";

@NgModule({
   declarations: [
      AppComponent,
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      MaterialModule,
      AppRoutingModule,
      AuthModule
   ],
   providers: [],
   bootstrap: [AppComponent]
})
export class AppModule {
}
