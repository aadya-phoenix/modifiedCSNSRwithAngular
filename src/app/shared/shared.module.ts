import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [

  ],
  exports:[
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxTrimDirectiveModule
  ]
})
export class SharedModule { }
