import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { Http, Response, HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

  @NgModule({
    declarations: [
      AppComponent
    ],
    imports: [
      BrowserModule,
      ReactiveFormsModule,
      HttpClientModule,
      FormsModule,
      HttpModule
    ],
    providers: [],
    bootstrap: [AppComponent]
  })

export class AppModule { 
}