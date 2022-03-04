import { Component, OnInit } from '@angular/core';
import { ConstantsService } from 'src/app/constants/constants.service';
import { Label } from 'src/app/models/label.model';
import { ApiService } from 'src/app/services/api.service';
import { DealerEmployee } from '../../../models/dealerEmployee.model';
import { DealerEmployeeService } from './dealer-employee.service';

import { CommonApiService } from '../services/common-api.service';
import { Outlet } from '../../../models/oultet.model';
import { DesignationInfo } from '../models/designationInfo.model';
import * as _ from 'lodash';
import Swal from 'sweetalert2';
import { DealerEmployeeUploadComponent } from './dealer-employee-upload/dealer-employee-upload.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dealer-employee',
  templateUrl: './dealer-employee.component.html',
  styleUrls: ['./dealer-employee.component.css']
})
export class DealerEmployeeComponent implements OnInit {

  showSearchGrid :boolean = true;
  showForm :boolean = false;
  showEditForm :boolean = false;
  searchText:string='';

  DefaultLanguage:boolean=true;
  selectedLang:number =this.constant.selectedLanguage;
  session = this.constant.takeSession();
  Role = this.session.RoleName;

  labelObj:Label[]=[];
  employeeObj:DealerEmployee[]=[];
  RPObj:DealerEmployee[]=[];
  outletObj:Outlet[]=[];
  designationObj:DesignationInfo[]=[];
  employee!:DealerEmployee;

  EmployeeCodeLabel:string='';
  FirstNameLabel:string='';
  LastNameLabel:string='';
  DesignationLabel:string='';
  EmailLabel:string='';
  OutletLabel:string='';
  AddedOnLabel:string='';
  ActionsLabel:string='';
  EditLabel:string='';
  DeleteLabel:string='';
  AddEmployeeLabel:string='';
  BulkUploadLabel:string='';
  DealerEmployeeLabel:string='';
  SearchLabel:string='';
  ReportingPersonLabel:string='';
  MobileLabel:string='';
  UploadLabel:string='';
  SubmitLabel:string='';
  BackLabel:string='';
  DownloadTemplateLabel:string='';
  UpdateLabel:string='';

  constructor(
    private apiService:ApiService,
    private dealerEmployeeService:DealerEmployeeService,
    private constant:ConstantsService,
    private commonApiService:CommonApiService,
    public dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.showSearchGrid = true;
    this.showForm = false;
    this.showEditForm = false;
    this.getFormDetails();
  }

  getFormDetails(){
    this.apiService.getLabel().subscribe((data:any)=>{
      this.labelObj = data;
      this.selectLanguage(this.selectedLang);
    },error=>{
      console.log(error);
   });

    this.dealerEmployeeService.getEmployeeBasedOnDealer(this.session.User_Id).subscribe((data:any)=>{
    this.employeeObj = data;
    this.RPObj = _.cloneDeep(data);
    },error=>{
     console.log(error);
  });

    this.dealerEmployeeService.getDealerOutletList().subscribe((data:any)=>{
    this.outletObj = data;
    if (this.session.RoleName != 'HOAdmin') {
        this.employee.DealerOutlet_Id = this.session.AccountId;
       }
      },error=>{
        console.log(error);
     });

     this.commonApiService.getDesignationList().subscribe((data:any)=>{
        this.designationObj = data;
       },error=>{
        console.log(error);
     });
  }

  selectLanguage(id:number){
    if (id == 2) {
      this.DefaultLanguage = true;
      for (let label of this.labelObj) {
          if (label.DefaultLanguage == 'Employee Code') {
              this.EmployeeCodeLabel = label.DefaultLanguage;
          } if (label.DefaultLanguage == 'First Name') {
              this.FirstNameLabel = label.DefaultLanguage;
          } if (label.DefaultLanguage == 'Last Name') {
              this.LastNameLabel = label.DefaultLanguage;
          } if (label.DefaultLanguage == 'Designation') {
              this.DesignationLabel = label.DefaultLanguage;
          } if (label.DefaultLanguage == 'Email') {
              this.EmailLabel = label.DefaultLanguage;
          } if (label.DefaultLanguage == 'Outlet') {
              this.OutletLabel = label.DefaultLanguage;
          } if (label.DefaultLanguage == 'Added On') {
              this.AddedOnLabel = label.DefaultLanguage;
          } if (label.DefaultLanguage == 'Actions') {
              this.ActionsLabel = label.DefaultLanguage;
          } if (label.DefaultLanguage == 'Edit') {
              this.EditLabel = label.DefaultLanguage;
          } if (label.DefaultLanguage == 'Delete') {
              this.DeleteLabel = label.DefaultLanguage;
          } if (label.DefaultLanguage == 'Add Employee') {
              this.AddEmployeeLabel = label.DefaultLanguage;
          } if (label.DefaultLanguage == 'Bulk Upload') {
              this.BulkUploadLabel = label.DefaultLanguage;
          } if (label.DefaultLanguage == 'Dealer Employee') {
              this.DealerEmployeeLabel = label.DefaultLanguage;
          } if (label.DefaultLanguage == 'Search') {
              this.SearchLabel = label.DefaultLanguage;
          } if (label.DefaultLanguage == 'Reporting Person') {
              this.ReportingPersonLabel = label.DefaultLanguage;
          } if (label.DefaultLanguage == 'Mobile') {
              this.MobileLabel = label.DefaultLanguage;
          } if (label.DefaultLanguage == 'Upload') {
              this.UploadLabel = label.DefaultLanguage;
          } if (label.DefaultLanguage == 'Submit') {
              this.SubmitLabel = label.DefaultLanguage;
          } if (label.DefaultLanguage == 'Back') {
              this.BackLabel = label.DefaultLanguage;
          } if (label.DefaultLanguage == 'Download Template') {
              this.DownloadTemplateLabel = label.DefaultLanguage;
          } if (label.DefaultLanguage == 'Update') {
              this.UpdateLabel = label.DefaultLanguage;
          }
       }
     }
  if (id > 2) {
      this.DefaultLanguage = false;
      for (let label of this.labelObj) {
          if (label.Language_Id == id) {
              if (label.DefaultLanguage == 'Employee Code') {
                  this.EmployeeCodeLabel = label.ConvertedLanguage;
              } if (label.DefaultLanguage == 'First Name') {
                  this.FirstNameLabel = label.ConvertedLanguage;
              } if (label.DefaultLanguage == 'Last Name') {
                  this.LastNameLabel = label.ConvertedLanguage;
              } if (label.DefaultLanguage == 'Designation') {
                  this.DesignationLabel = label.ConvertedLanguage;
              } if (label.DefaultLanguage == 'Email') {
                  this.EmailLabel = label.ConvertedLanguage;
              } if (label.DefaultLanguage == 'Outlet') {
                  this.OutletLabel = label.ConvertedLanguage;
              } if (label.DefaultLanguage == 'Added On') {
                  this.AddedOnLabel = label.ConvertedLanguage;
              } if (label.DefaultLanguage == 'Actions') {
                  this.ActionsLabel = label.ConvertedLanguage;
              } if (label.DefaultLanguage == 'Edit') {
                  this.EditLabel = label.ConvertedLanguage;
              } if (label.DefaultLanguage == 'Delete') {
                  this.DeleteLabel = label.ConvertedLanguage;
              } if (label.DefaultLanguage == 'Add Employee') {
                  this.AddEmployeeLabel = label.ConvertedLanguage;
              } if (label.DefaultLanguage == 'Bulk Upload') {
                  this.BulkUploadLabel = label.ConvertedLanguage;
              } if (label.DefaultLanguage == 'Dealer Employee') {
                  this.DealerEmployeeLabel = label.ConvertedLanguage;
              } if (label.DefaultLanguage == 'Search') {
                  this.SearchLabel = label.ConvertedLanguage;
              } if (label.DefaultLanguage == 'Reporting Person') {
                  this.ReportingPersonLabel = label.ConvertedLanguage;
              } if (label.DefaultLanguage == 'Mobile') {
                  this.MobileLabel = label.ConvertedLanguage;
              } if (label.DefaultLanguage == 'Upload') {
                  this.UploadLabel = label.ConvertedLanguage;
              } if (label.DefaultLanguage == 'Submit') {
                  this.SubmitLabel = label.ConvertedLanguage;
              } if (label.DefaultLanguage == 'Back') {
                  this.BackLabel = label.ConvertedLanguage;
              } if (label.DefaultLanguage == 'Download Template') {
                  this.DownloadTemplateLabel = label.ConvertedLanguage;
              } if (label.DefaultLanguage == 'Update') {
                  this.UpdateLabel = label.ConvertedLanguage;
              }
          }
      }
    }
  }

  addEmployee(){
    this.employee = {
      Employee_Id: 0,
      ActivationSource :'',
      Country_id : 0,
      Country : '',
      DealerOutlet_Id: 0,
      OutletName :'',
      FirstName: '',
      LastName: '',
      EmpCode: '',
      Email: '',
      MobileNumber:'',
      Designation_Id: 0,
      Designation :'',
      ReportingPerson :'',
      ReportingPerson_Id: 0,        
      IsActive: true,
      CreatedBy: this.session.User_Id,
   };
   if (this.session.RoleName != 'HOAdmin') {
    this.employee.DealerOutlet_Id = this.session.AccountId;
    }
    
  this.showSearchGrid = false;
  this.showForm = true;
  this.showEditForm = false;
  }

  addUpload(){
    this.dialog.open(DealerEmployeeUploadComponent,{
        disableClose: true,
        panelClass: 'custom-dialog-container',
        width:'550px',
        height:'265px'   
      })
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
        if (this.employee.EmpCode == null || this.employee.EmpCode == '') {
            Swal.fire('error', 'Please Enter Employee Code ', 'error');
            return false;
        }
        if (this.employee.FirstName == null || this.employee.FirstName == '') {
            Swal.fire('error', 'Please enter Employee first name', 'error');
            return false;
        }
        if (this.employee.LastName == null || this.employee.LastName == '') {
            Swal.fire('error', 'Please enter Employee last name', 'error');
            return false;
        }
        if (this.employee.Email == null || this.employee.Email == '') {
            Swal.fire('error', 'Please enter Employee email', 'error');
            return false;
        }
        if (this.employee.MobileNumber == null || this.employee.MobileNumber == '') {
            Swal.fire('error', 'Please enter Employee mobile number', 'error');
            return false;
        }
        if (this.employee.DealerOutlet_Id == null || this.employee.DealerOutlet_Id == 0) {
            Swal.fire('error', 'Please enter Employee dealer outlet', 'error');
            return false;
        }
        if (this.employee.Designation_Id == null || this.employee.Designation_Id == 0) {
            Swal.fire('error', 'Please enter Employee designation', 'error');
            return false;
        }
        this.dealerEmployeeService.addEmployee(this.employee).subscribe((data:any)=>{
        Swal.fire('Success', data, 'success');
            this.init();
        },error=>{
            console.log(error);
         });
      }});
  }

  init(){
    this.showSearchGrid = true;
    this.showForm = false;
    this.showEditForm = false;
    this.getFormDetails();
  }

  editTransaction(pt:DealerEmployee){
    this.showSearchGrid = false;
    this.showForm = false;
    this.showEditForm = true;

    this.employee = pt;
  }

  editSaveTransaction(){
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
        if (this.employee.EmpCode == null || this.employee.EmpCode == '') {
            Swal.fire('error', 'Please Enter Employee Code ', 'error');
            return false;
        }
        if (this.employee.FirstName == null || this.employee.FirstName == '') {
            Swal.fire('error', 'Please enter Employee first name', 'error');
            return false;
        }
        if (this.employee.LastName == null || this.employee.LastName == '') {
            Swal.fire('error', 'Please enter Employee last name', 'error');
            return false;
        }
        if (this.employee.Email == null || this.employee.Email == '') {
            Swal.fire('error', 'Please enter Employee email', 'error');
            return false;
        }
        if (this.employee.MobileNumber == null || this.employee.MobileNumber == '') {
            Swal.fire('error', 'Please enter Employee mobile number', 'error');
            return false;
        }
        if (this.employee.DealerOutlet_Id == null || this.employee.DealerOutlet_Id == 0) {
            Swal.fire('error', 'Please enter Employee dealer outlet', 'error');
            return false;
        }
        if (this.employee.Designation_Id == null || this.employee.Designation_Id == 0) {
            Swal.fire('error', 'Please enter Employee designation', 'error');
            return false;
        }
        this.employee.ModifiedBy = this.session.User_Id;
        
        this.dealerEmployeeService.editEmployee(this.employee).subscribe((data:any)=>{
            Swal.fire('Success', data, 'success');
                this.init();
            },error=>{
                console.log(error);
             });
     }});
  }

}
