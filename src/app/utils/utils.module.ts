import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { HttpServiceService } from './http/http-service.service';
import { CommonServiceService } from './common/common-service.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpModule
  ],
  providers: [HttpServiceService, CommonServiceService]
})
export class UtilsModule { }
