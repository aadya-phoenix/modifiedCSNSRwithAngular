import { Component, OnInit } from '@angular/core';
import { DealerEmployee } from '../models/dealerEmployee.model';
import { DesignationInfo } from '../models/designationInfo.model';
import { CommonApiService } from '../services/common-api.service';
import { ConstantsService } from 'src/app/constants/constants.service';
import { DealerEmployeeUploadComponent } from './dealer-employee-upload/dealer-employee-upload.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-employee-master',
  templateUrl: './employee-master.component.html',
  styleUrls: ['./employee-master.component.css']
})
export class EmployeeMasterComponent implements OnInit {

  showSearchGrid :boolean = true;
  showForm :boolean = false;
  showEditForm :boolean = false;

  reqCountryId:any;
  searchText:string='';
  session = this.constant.takeSession();
  Role = this.session.RoleName;
  employeeObj:DealerEmployee[]=[];
  designationObj:DesignationInfo[]=[];
  Employee!: DealerEmployee;

  constructor(
    private constant:ConstantsService,
    private commonApi:CommonApiService,
    public dialog:MatDialog,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.reqCountryId  = this.route.snapshot.paramMap.get('id');

  if (this.session.RoleName === 'Distributor' || this.session.RoleName === 'HOAdmin'   ) {
    this.reqCountryId = this.session.Country_Id;
  }

    this.showSearchGrid = true;
    this.showForm = false;
    this.showEditForm = false;
    this.getFormDetails();
    this.Role = this.session.RoleName;
  }

  getFormDetails(){
    this.commonApi.getEmployeeBasedOnCountry(this.reqCountryId).subscribe((data:any)=>{
      this.employeeObj = data;
     // this.RPObj = angular.copy(success.data);
  },(error)=>{
      console.log(error);
  });

  this.commonApi.getDesignationList().subscribe((data:any)=> {
    this.designationObj = data;
}, (error)=>{
    console.log(error);
});
  }

  addUpload(){
   this.dialog.open(DealerEmployeeUploadComponent,{
      data:{countryId:this.reqCountryId, session:this.session},
      disableClose: true,
      panelClass: 'custom-dialog-container',
      width:'550px',
      height:'265px'
    });
  }

  editTransaction(employee:DealerEmployee){
    this.showSearchGrid = false;
    this.showForm = false;
    this.showEditForm = true;
    this.Employee = employee;
  }

  empInit(){
    this.showSearchGrid = true;
    this.showForm = false;
    this.showEditForm = false;
    this.getFormDetails();
    this.Role = this.session.RoleName;
  }

  editSaveTransaction(){
    Swal.fire({
      title: "Are you sure?", text: "Are you sure you want to continue this process?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Continue",
      allowOutsideClick:false
    }).then((result):any=>{
      if(result.isConfirmed){
    if (this.Employee.EmpCode == null || this.Employee.EmpCode == '') {
      Swal.fire('error', 'Please Enter Employee Code ', 'error');
      return false;

  }
  if (this.Employee.FirstName == null || this.Employee.FirstName == '') {
      Swal.fire('error', 'Please enter Employee first name', 'error');
      return false;

  }
  if (this.Employee.LastName == null || this.Employee.LastName == '') {
      Swal.fire('error', 'Please enter Employee last name', 'error');
      return false;

  }
  if (this.Employee.Email == null || this.Employee.Email == '') {
      Swal.fire('error', 'Please enter Employee email', 'error');
      return false;

  }
  if (this.Employee.MobileNumber == null || this.Employee.MobileNumber == '') {
      Swal.fire('error', 'Please enter Employee mobile number', 'error');
      return false;

  }
 
  if (this.Employee.Designation_Id == null || this.Employee.Designation_Id == 0) {
      Swal.fire('error', 'Please enter Employee designation', 'error');
      return false;

  }

  this.Employee.ModifiedBy = this.session.User_Id;

  this.commonApi.editEmployee(this.Employee).subscribe((data:any)=>{
    Swal.fire('Success', data, 'success');
    this.empInit();
  },err=>{
    console.log(err);
  });
 }
  });
  }
}
