import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators} from '@angular/forms';
import { Login } from './models/login.model';
import { SetPassword } from '../models/setPassword.model';
import { UserDetails } from './models/userDetails.model';
import { GeoFence } from './models/geoFence.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CryptService } from '../essentials/crypt.service';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import * as $ from 'jquery';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','./loginStyle.component.css']
})
export class LoginComponent implements OnInit {
    
    loginForm!: FormGroup;
    forgotPasswordForm!:FormGroup;
    setNewPasswordForm!:FormGroup;
    userData!: UserDetails;
    Login:boolean =true;
    Forgot:boolean = false;
    FirstLogin:boolean = false;

  constructor(
    private formBuilder:FormBuilder,
    private cryptService:CryptService,
    private authService:AuthService,
    private router:Router,
  ) { }

  ngOnInit(): void {
   /*  $(function () {
      function toggleClass() {
        $("#helpdesk").toggleClass("main");
      }
      $("#help-btn").on("click",toggleClass);
   }); */
    this.initializeForm();
   }

  login():any{
 sessionStorage.setItem("app", "");
   
   if( !this.loginForm.controls.username.value){
      Swal.fire('Error', 'UserName can not empty', 'error');
      return false;
      }

    if (!this.loginForm.controls.password.value) {
      Swal.fire('Error', 'Password can not empty', 'error');
    return false;
      } 

      console.log("username is",this.loginForm.controls.username.value);
     console.log("password is",this.loginForm.controls.password.value);
     console.log(this.loginForm.value);

     const login = this.loginForm.value as Login;
  
     login.password = this.cryptService.hash(login.password);
     
     console.log("username is",login.username);
     console.log("password is",login.password);

     let obs:Observable<any>=this.authService.authincateLogin(login);
       obs.subscribe((data):any=>{
       console.log("Customer Login Data...",data);
       this.userData= data;
       if (data != null && data.ErrorMessage == null){
         if (!data.IsGeoFencing) {
          sessionStorage.setItem("app",JSON.stringify(data));
          const session = sessionStorage.getItem("app");
          console.log("session..",session);

          if (data.IsFirstLogin == true){
            this.FirstLogin = true;
            this.Login = false;
            this.Forgot = false;
           }
         else{
            if (this.userData.RoleName != 'TabletLogIn') {
            this.router.navigateByUrl('/index/dashboard');
                  }
             else {
               window.location.href = './partial/CustomerFeedbackTB.html';
              } 
            }  
          }
          else{
            this.precedeGeofencing();
          }
        }
        
      
      else
                 {
                  Swal.fire(data.ErrorMessage);
                 }
          },error=>{
              console.log("loginError",error);
            });
    }
    
    toggleDiv(obj:string){
  
      if(obj=='forgot')
      {
          this.Login = false;
          this.Forgot = true;
          this.FirstLogin = false;
      }         
      else
      {
        this.Login = true;
        this.Forgot = false;
        this.FirstLogin = false;
      }
    }

    forgotPassword():any{
      if( !this.forgotPasswordForm.controls.username.value){
        Swal.fire('Error', 'UserName can not empty', 'error');
        return false;
      }
      const username = this.forgotPasswordForm.controls.username.value ;
      this.authService.fortgotPassword(username).subscribe(
        success=>{
          console.log(success)
          Swal.fire(success);
          },error=>{
            console.log("forgot password error",error);
          });
        }
    
        setNewPassword():any{
          /* const setPassword = this.setNewPasswordForm.value as SetPassword; */
          let currentPassword = this.setNewPasswordForm.controls.currentPassword.value;
          let newPassword = this.setNewPasswordForm.controls.newPassword.value;
          if (currentPassword == null || currentPassword == '') {
              Swal.fire('error', 'Please enter current password', 'error');
              return false;
      
          }
          if (newPassword == null || newPassword == '') {
            Swal.fire('error', 'Please enter new password', 'error');
              return false;
      
          }
          if (currentPassword == newPassword)
          {
            Swal.fire('error', 'Current & new Password cannot be same', 'error');
              return false;
          }
          const userJson = sessionStorage.getItem("app");
          const userdetails = JSON.parse("userJson");
          console.log("userDetails is..",userdetails);
          var CurrPassword = CryptoJS.SHA1(currentPassword).toString();
          var NewPassword = CryptoJS.SHA1(newPassword).toString();
      
          const setPasswordObj:SetPassword = {
            UserId: userdetails.User_Id,
            CurrentPassword: CurrPassword,
            NewPassword: NewPassword,
          };
      
          this.authService.saveForm(setPasswordObj).subscribe(success=>{
            console.log(success);
            Swal.fire('Success'+ success + 'success');
                  }, error=> {
                  console.log(error);
          });
        }
    precedeGeofencing(){
      if (navigator.geolocation) {
        console.log("geolocation");
         }
       var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
               };
       navigator.geolocation.getCurrentPosition( (position)=> {
       console.log(position);
       const geoFenceObj:GeoFence={
        lat : position.coords.latitude,
        lan : position.coords.longitude,
        username : this.loginForm.controls.username.value,
        password : this.cryptService.hash(this.loginForm.controls.password.value)
       } 
  
       let obs:Observable<any> = this.authService.authenticateLoginWithCoordinates(geoFenceObj);
     
    obs.subscribe(
      (data):any=>{
        console.log(data);
        if (data != null && data.ErrorMessage == null){
  
          sessionStorage.setItem("app", JSON.stringify(data));
  
          if (data.IsFirstLogin == true) {
              this.FirstLogin = true;
              
              this.Login = false;
              this.Forgot = false;
        }
        else {
          if (this.userData.RoleName != 'TabletLogIn') {
                 window.location.href = './index.html';
             }
             else {
                 window.location.href = './partial/CustomerFeedbackTB.html';
             } 
       }
        }
        else {
  
        //  this.ShowGeoFencingScreen = false;
          this.Login = true;
          this.Forgot = false;
          this.FirstLogin = false;
  
          geoFenceObj.username = '';
          geoFenceObj.password = '';
  
          Swal.fire(data.ErrorMessage);
         }
      }, error=>{
        console.log(error);
      });
    },(error)=> {
      console.log(error);
      Swal.fire('Warning', "Please enable your location", 'warning');
  }, options);
    }

    
  private initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.forgotPasswordForm = this.formBuilder.group({
      username:['',Validators.required]
    });
    this.setNewPasswordForm = this.formBuilder.group({
      currentPassword:['',Validators.required],
      newPassword:['', Validators.required]
    });
  }

}
