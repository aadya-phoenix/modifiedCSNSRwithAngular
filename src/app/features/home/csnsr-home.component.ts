import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConstantsService } from 'src/app/constants/constants.service';
import { LogObj } from 'src/app/models/logObj.model';
import { UserInfor } from 'src/app/models/userInfor.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-csnsr-home',
  templateUrl: './csnsr-home.component.html',
  styleUrls: ['./csnsr-home.component.css']
})
export class CsnsrHomeComponent implements OnInit {

  session:UserInfor = this.constantService.takeSession();
  Role = this.session.RoleName;
  DealerName:string="";
  Username:string="";

  CRE:any;
  activeCRE:any;
  obj!:LogObj;

  constructor(
    private constantService: ConstantsService,
    private auth :AuthService,
    private router:Router
    ) { }

  ngOnInit(): void {
    if (this.Role == 'Distributor'){
      this.DealerName = 'Suzuki ' + this.session.CountryName;
     }
    else {
      this.DealerName = this.session.DealerName + '(' + this.session.OutletName + ')';
      }
   
    this.Username = this.session.UserName;
  }

  CRElogout(){
    this.CRE = this.activeCRE;
    if (this.CRE != null) {
        this.obj= {
           ActiveCRE_Id: this.CRE,
           ActivationSource: 'Web'
       };
    this.auth.CRELogOut(this.obj).subscribe(data=>{
        this.activeCRE = null;
    },err=>{
      console.log(err);
    });
   }
  }
  signout(){
    this.CRElogout();
    this.auth.logOut(this.session).subscribe(data=>{
      sessionStorage.setItem("app", JSON.stringify(data));
      this.session = {} as UserInfor;
      this.router.navigateByUrl('./login');  
    },err=>{
      console.log(err);
    });
  }

}
