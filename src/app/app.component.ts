import { BrowserModule } from '@angular/platform-browser';
import { Component} from '@angular/core';
import {Http, Response, HttpModule} from "@angular/http";
import { FormsModule } from '@angular/forms';
import {Observable} from "rxjs/Rx";
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http/src/response';


interface LoginService{
  message : string
}

interface CashDispenseService{
  cashDenomination  : string;
  numberOfCashDenomination : string;
}

type ListOfChashDenominations = Array<CashDispenseService> ;

interface ChashDenominationsResponse 
{
  cashBreakdown : ListOfChashDenominations;
  status : string;
  message : string;
  amountDue : number;

}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(private http: HttpClient) {}

  title = 'app';
  loginMessage : string;
  responseMessage : string;
  responses : ListOfChashDenominations;
  showDenominations : boolean = false;
  amountDue : number;

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    logiSuccessful : new FormControl(false)
  });

  cashDispenseform = new FormGroup({
    amountDue: new FormControl('', Validators.required),
    randNote: new FormControl('', Validators.required),
    breadownReceived: new FormControl(false)
  });

  authenticate(){
    this.loginMessage = null;    
    let params = new HttpParams();
    params = params.append('username', this.loginForm.get('username').value);
    params = params.append('password', this.loginForm.get('password').value);
    this.http.get<LoginService>("http://localhost:8089/cash/dispense/authenticate?", {params: params}).subscribe(
      
    data => {
      this.loginMessage = data.message;
        if(this.loginMessage == "YOU HAVE LOGGED ON SUCCESSFULLY") {
          this.loginForm.get('logiSuccessful').setValue(true);
          document.getElementById("loginForm").style.display = "none";
          document.getElementById("dispenseForm").style.display = "block";

        } else {
          this.loginForm.get('logiSuccessful').setValue(false);
        }
      },
      (err : HttpErrorResponse) =>{
        if(err.error instanceof Error){
          this.loginMessage = 'UNABLE TO PROCESS LOGIN REQUEST';
        }else{
          this.loginMessage = 'UNABLE TO CONNECT TO SERVER';
        }
    }

  )
  }

  dispenseCash(){

    let params = new HttpParams();
    params = params.append('amountDue', this.cashDispenseform.get('amountDue').value);
    params = params.append('randNote', this.cashDispenseform.get('randNote').value);

      this.http.get<ChashDenominationsResponse>("http://localhost:8089/cash/dispense/calculate?", {params: params})
      .subscribe(
          data => {
            if(data.status != null){
              this.responseMessage =  data.message;
            } else{
              document.getElementById("dispenseForm").style.display = "none";
              this.amountDue = data.amountDue; 
              this.responses = data.cashBreakdown;
              this.showDenominations = true;
            }
         },
         (err : HttpErrorResponse) =>{
          if(err.error instanceof Error){
            console.log('UNABLE TO PROCESS CashDispense REQUEST');
          }else{
            console.log('UNABLE TO CONNECT TO SERVER');
          }
      }
       )

  }

  clear(){
    this.cashDispenseform.reset();
    document.getElementById("dispenseForm").style.display = "block";
    this.showDenominations = false;
  }

  }




