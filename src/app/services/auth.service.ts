import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { LoginModel } from '../models/loginModel';
import { TokenModel } from '../models/tokenModel';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { Token } from '@angular/compiler/src/ml_parser/tokens';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl:string= "https://localhost:44311/api/auth/";

  constructor(private httpClient:HttpClient) { }

  login(loginModel:LoginModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"login", loginModel);
  }
  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }
    else{
      return false;
    }
  }
}
