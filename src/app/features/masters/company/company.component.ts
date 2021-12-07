import { Component, OnInit } from '@angular/core';
import { ConstantsService } from 'src/app/constants/constants.service';
import { MastersApiService } from 'src/app/services/masters-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

   session = this.constant.takeSession();
   Role = this.session.RoleName;
   showsearchgrid:boolean=true;
   showForm:boolean = true;
   showEditForm:boolean = false;
   saveSurveyButton  :boolean = false;
   updateSurveyButton:boolean = true;
  
  

  companyObj:any;
  company:any;

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
      CreationDate: null,
      CreatedBy: this.session.User_Id,
      ModifiedBy: null,
      ModifiedDate: null,
    };
    this.showsearchgrid = false;
    this.showForm = true;
    this.showEditForm = false;
  }

  editTransaction(id:number,cmpny:any){
    console.log('inside EditTransaction', id);
    this.showsearchgrid = false;
    this.showForm = false;
    this.showEditForm = true;
    this.saveSurveyButton = false;
    this.updateSurveyButton = true;
    this.company = cmpny;
  }

  deleteTransaction(id:number,cmpny:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "Are you sure you want to continue this process?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Continue',
      
    }).then(() => {
      cmpny.ModifiedBy = this.session.User_Id;
      this.masters.deleteCompany(cmpny).subscribe( (data:any) => {
         // $scope.init();
         Swal.fire("success", data, "success");
      }, err => {
          console.log(err);
      });
    }); 
  }

  getFormDetails(){
    this.masters.getCompanyList().subscribe(
      data=>{
       this.companyObj = data;
      },err=>{
        console.log(err);
      }
    )
  }

  editSaveTransaction(){
    Swal.fire({
      title: 'Are you sure?',
      text: "Are you sure you want to continue this process?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Continue",
  }).then(()=>{
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


            formData.append('file', this.CompanyLogo);
            formData.append('Company', JSON.stringify(this.company));

            this.masters.editCompany(fd).subscribe(data=> {

                console.log(data);
                Swal.fire('Success', data, 'success');
               // $scope.init();
            }, error=> {

                console.log(error);
            });
  });
}
}