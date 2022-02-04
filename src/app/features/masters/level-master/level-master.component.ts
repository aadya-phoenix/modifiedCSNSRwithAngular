import { Component, OnInit } from '@angular/core';
import { ConstantsService } from 'src/app/constants/constants.service';
import { CommonApiService } from '../services/common-api.service';
import { Level } from '../../../models/level.model';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-level-master',
  templateUrl: './level-master.component.html',
  styleUrls: ['./level-master.component.css']
})
export class LevelMasterComponent implements OnInit {

  showSearchGrid: boolean = true;
  showForm: boolean = false;
  showEditForm: boolean = false;

  Employee:any;
  myObj: any[] = [];
  searchText: string = '';
  session: any = this.constant.takeSession();
  leveldata!: Level;
  reqCountryId :any;


  constructor(
    private commonApi: CommonApiService,
    private constant: ConstantsService,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.showSearchGrid = true;
    this.showForm = false;
    this.showEditForm = false;
    this.getFormDetails();

   this.reqCountryId  = this.route.snapshot.paramMap.get('id');
 

    this.leveldata = {
      Country_Id: 0,
      Level_Id: 0,
      LevelName: '',
      Sequence: '',
      IsActive: true,
      CreationDate: undefined,
      CreatedBy: this.session.User_Id,
      ModifiedBy: undefined,
      ModifiedDate: undefined
    };
  }

  getFormDetails() {
    this.commonApi.getLevel(this.reqCountryId).subscribe((data: any) => {
      this.myObj = data;
    }, error => {
      console.log(error);
    });
  }

  addLevel() {
    this.showSearchGrid = false;
    this.showForm = true;
    this.showEditForm = false;
    this.leveldata = {
      Country_Id: 0,
      Level_Id: 0,
      LevelName: '',
      Sequence: '',
      IsActive: false
    };
  }

  editTransaction(level: any) {
    this.showSearchGrid = false;
    this.showForm = false;
    this.showEditForm = true;
    this.leveldata.Country_Id = level.Country_Id;
    this.leveldata.LevelName = level.LevelName;
    this.leveldata.Sequence = level.Sequence;
    this.leveldata.Level_Id = level.Level_Id;
    this.leveldata.IsActive = true,
    this.leveldata.CreatedBy = this.session.User_Id;
    this.leveldata.ModifiedBy = this.session.User_Id;
  }

  deleteTransaction(level: any) {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to contune this process?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Continue",
      allowOutsideClick:false
    }).then((result) => {
      if(result.isConfirmed){
      this.leveldata.IsActive = false;
      this.leveldata.Level_Id = level.Level_Id;
      this.leveldata.ModifiedBy = this.session.User_Id;
      this.commonApi.deleteLevel(this.leveldata).subscribe((data: any) => {
        if (data == 'Success') {
          Swal.fire("success", 'Level deleted successfully', "success");
          //$scope.init();
        }
        else {
          Swal.fire("success", data, "success");
        }
      }, err => {
        console.log(err);
      });
    }
    });
  }

  editSaveTransaction(): any {
    if (this.leveldata.LevelName == null || this.leveldata.LevelName == '') {
      Swal.fire('error', 'Please enter level name', 'error');
      return false;
    }
    if (this.leveldata.Sequence == null || this.leveldata.Sequence == '') {
      Swal.fire('error', 'Please enter sequence', 'error');
      return false;
    }
    Swal.fire({
      title: "Are you sure?", text: "Are you sure you want to continue this process?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Continue",
      allowOutsideClick:false
    }).then((result) => {
      if(result.isConfirmed){
      this.commonApi.editLevel(this.leveldata).subscribe((data: any) => {
        if (data == 'Success') {
          Swal.fire('Success', 'Level updated successfully', 'success');
          this.init();
        }
        else {
          Swal.fire('Error', data, 'error');
        }
      }, err => {
        console.log(err);
      });
    }
    });
  }

  init() {
    this.showSearchGrid = false;
    this.showForm = true;
    this.showEditForm = false;
    this.getFormDetails();
  }

  saveForm(): any {
    if (this.leveldata.LevelName == null || this.leveldata.LevelName == '') {
      Swal.fire('error', 'Please enter level name', 'error');
      return false;
    }

    if (this.leveldata.Sequence == null || this.leveldata.Sequence == '') {
      Swal.fire('error', 'Please enter sequence', 'error');
      return false;
    }
    this.leveldata.Country_Id = this.reqCountryId;

    Swal.fire({
      title: "Are you sure?", text: "Are you sure you want to continue this process?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Continue",

    }).then(() => {
      this.commonApi.addLevel(this.leveldata).subscribe((data: any) => {
        if (data == 'Success') {
          Swal.fire('Success', 'Level Added Successdully', 'success');
          this.init();
        }
        else {
          Swal.fire('Error', data, 'error');
        }
      }, err => {
        console.log(err);
      });
    });
  }
}