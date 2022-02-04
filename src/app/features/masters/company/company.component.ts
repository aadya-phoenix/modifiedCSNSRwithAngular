import { Component, OnInit } from '@angular/core';
import { ConstantsService } from 'src/app/constants/constants.service';
import { MastersApiService } from 'src/app/services/masters-api.service';
import { Company } from './company.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

   session = this.constant.takeSession();
   Role = this.session.RoleName;
   showSearchGrid:boolean=true;
   showForm:boolean = false;
   showEditForm:boolean = false;
  
   companyObj:Company[]=[];
   company!:Company;
   companyLogo:any;
  
   constructor(
     private masters:MastersApiService,
     private constant:ConstantsService
   ) { }

   ngOnInit(): void {
     this.getFormDetails(); 
   }

   addCompany(){
     this.company={
       Company_Id: 0,
       CompanyName: '',
       CompanyLogo: '',
       UrlPath:'',
       IsActive: true,
       CreatedBy: this.session.User_Id,
     };
     this.showSearchGrid = false;
     this.showForm = true;
     this.showEditForm = false;
   }

  saveForm(){
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to continue this process?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Continue",
      allowOutsideClick:false
   }).then((result):any=>{
     if(result.isConfirmed){
    const formData = new FormData();
    if (this.company.CompanyName == null || this.company.CompanyName=='')
    {
      Swal.fire('error', 'Please enter company name', 'error');
        return false;
    }
    if (this.company.CompanyLogo == null || this.company.CompanyLogo=='')
    {
      Swal.fire('error', 'Please select file for Logo', 'error');
        return false;
    }

    formData.append('file', this.companyLogo);
    formData.append('Company', JSON.stringify(this.company));        

    this.masters.addCompany(formData).subscribe( (data:any)=> {
        console.log(data);
        Swal.fire('Success', data, 'success');
        this.init();
     },(error)=>{
           console.log(error);
       });
      }
   });
  }
  
  editTransaction(cmpny:any){
    this.showSearchGrid = false;
    this.showForm = false;
    this.showEditForm = true; 
    this.company = cmpny;
  }

  onFileSelected(event:any){
     this.companyLogo = event.target.files[0];
  }

  deleteTransaction(cmpny:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "Are you sure you want to continue this process?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Continue',
      allowOutsideClick:false
    }).then((result) => {
      if(result.isConfirmed){
      cmpny.ModifiedBy = this.session.User_Id;
      this.masters.deleteCompany(cmpny).subscribe( (data:any) => {
         this.init();
         Swal.fire("success", data, "success");
      }, (err:any) => {
          console.log(err);
      });
     }
    }); 
  }

  getFormDetails(){
    this.masters.getCompanyList().subscribe(
      (data:any)=>{
       this.companyObj = data;
      },err=>{
        console.log(err);
      });
  }

  editSaveTransaction(){
    Swal.fire({
      title: 'Are you sure?',
      text: "Are you sure you want to continue this process?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Continue",
      allowOutsideClick:false
      
  }).then((result):any=>{
    if(result.isConfirmed){
    if (this.company.CompanyName == null || this.company.CompanyName=='')
            {
              Swal.fire('error', 'Please enter company name', 'error');
                return false;
            }
            if (this.company.CompanyLogo == null || this.company.CompanyLogo=='')
            {
              Swal.fire('error', 'Please select file for Logo', 'error');
                return false;
            }
            this.company.ModifiedBy = this.session.User_Id;
            var formData = new FormData();
            formData.append('file', this.companyLogo);
            formData.append('Company', JSON.stringify(this.company));

            this.masters.editCompany(formData).subscribe((data:any)=> {

                console.log(data);
                Swal.fire('Success', data, 'success');
               this.init();
            }, (error:any)=> {

                console.log(error);
            });
          }
    });
 }

   init(){
  this.showSearchGrid = true;
  this.showForm = false;
  this.showEditForm = false;
  this.getFormDetails();
  this.Role = this.session.RoleName;
  }
}