import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { HttpClientModule} from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [],
  imports: [

  ],
  exports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxTrimDirectiveModule
  ]
})
export class SharedModule { }
