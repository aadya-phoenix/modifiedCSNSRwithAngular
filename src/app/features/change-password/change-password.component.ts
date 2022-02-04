import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConstantsService } from 'src/app/constants/constants.service';
import { Label } from 'src/app/models/label.model';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { CryptService } from 'src/app/essentials/crypt.service';
import { AuthService } from 'src/app/services/auth.service';
import { SetPassword } from 'src/app/models/setPassword.model';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

   currentPassword : string = '';
   newPassword : string = '';

   labelObj:Label[] = [];
   data!:SetPassword;
   
   session= this.constant.takeSession();
   selectedLang:number = this.constant.selectedLanguage; 
   defaultLanguage:boolean = true; 

    ChangePasswordLabel: string = '';
    NewPasswordLabel: string = '';
    UpdatePasswordLabel: string = '';
    CurrentPasswordLabel: string = '';
    BackLabel: string = '';

  constructor(
    private constant:ConstantsService,
    private crypt:CryptService,
    private api:ApiService,
    private auth:AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {

    this.api.getLabel().subscribe((data)=>{
          this.labelObj = data;
          this.selectLanguage(this.selectedLang);
        },error=> {
            console.log(error);
        });
    }

    selectLanguage(id:number){
      if (id == 2) {
       this.defaultLanguage = true;
       for (const label of this.labelObj) {
           if (label.DefaultLanguage == 'Change Password') {
               this.ChangePasswordLabel = label.DefaultLanguage;
           } if (label.DefaultLanguage == 'New Password') {
               this.NewPasswordLabel = label.DefaultLanguage;
           } if (label.DefaultLanguage == 'Update Password') {
               this.UpdatePasswordLabel = label.DefaultLanguage;
           } if (label.DefaultLanguage == 'Current Password') {
               this.CurrentPasswordLabel = label.DefaultLanguage;
           } if (label.DefaultLanguage == 'Back') {
               this.BackLabel = label.DefaultLanguage;
           } 
        }
    }
    if (id > 2) {
        this.defaultLanguage = false;
        for (const label of this.labelObj) {
            if (label.Language_Id == id) {
              if (label.DefaultLanguage == 'Change Password') {
                  this.ChangePasswordLabel = label.ConvertedLanguage;
              } if (label.DefaultLanguage == 'New Password') {
                  this.NewPasswordLabel = label.ConvertedLanguage;
              } if (label.DefaultLanguage == 'Update Password') {
                  this.UpdatePasswordLabel = label.ConvertedLanguage;
              } if (label.DefaultLanguage == 'Current Password') {
                  this.CurrentPasswordLabel = label.ConvertedLanguage;
              } if (label.DefaultLanguage == 'Back') {
                  this.BackLabel = label.ConvertedLanguage;
              } 
             }
          }
        }
     }

     saveForm(){
      Swal.fire({
        title: "Are you sure?",
        text: "Are you sure you want update your password?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Continue",
        allowOutsideClick:false  
    }).then((result):any=>{
      if(result.isConfirmed){
        var fd = new FormData();
        if (this.currentPassword == null || this.currentPassword == '') {
            Swal.fire('error', 'Please enter current password', 'error');
            return false;

        }
        if (this.newPassword == null || this.newPassword == '') {
            Swal.fire('error', 'Please enter new password', 'error');
            return false;

        }
        if (this.currentPassword == this.newPassword) {
            Swal.fire('error', 'Current & new Password cannot be same', 'error');
            return false;
        }

      
        const CurrPassword = this.crypt.hash(this.currentPassword);
        const NewPassword =  this.crypt.hash(this.newPassword);

        this.data = {
            UserId: this.session.User_Id,
            CurrentPassword: CurrPassword,
            NewPassword: NewPassword,
        };

        this.auth.changePassword(this.data).subscribe((data:any)=>{
            Swal.fire('Success', data, 'success');
           // this.init();
       },error=>{
        console.log(error);
       });
       }
      });
     }

     back(){
      this.router.navigateByUrl('/index/dashboard');
     }
    }
    