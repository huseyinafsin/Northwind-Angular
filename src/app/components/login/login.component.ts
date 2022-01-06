import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validator, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from 'src/app/models/loginModel';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  constructor(private formBuilder:FormBuilder,
              private authService:AuthService,
              private toasterService:ToastrService) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required],
    })
  }
  login(){
    if (this.loginForm.valid) {
      let loginModel = Object.assign({},this.loginForm.value);

      this.authService.login(loginModel).subscribe(response=>{
        this.toasterService.info(response.message,"Mesaj");
        localStorage.setItem("token",response.data.token);
      },responseError=>{
        console.log(responseError)
        this.toasterService.error(responseError.error,"Mesaj");
      })
    }
  }
}
