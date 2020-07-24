import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FalconeRoutingModule } from './falcone-routing.module';
import { FindComponent } from './find/find.component';
import { UtilsModule } from '../utils/utils.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FoundComponent } from './found/found.component';


@NgModule({
  declarations: [FindComponent, FoundComponent],
  imports: [
    CommonModule,
    FalconeRoutingModule,
    UtilsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FalconeModule { }
