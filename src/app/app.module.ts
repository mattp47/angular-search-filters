import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { AppRoutes } from './app-routing.module';
import {APP_BASE_HREF} from '@angular/common';


@NgModule({
  imports:      [ BrowserModule, AppRoutes ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  providers: [{provide: APP_BASE_HREF, useValue : '/' }]
})
export class AppModule { }
