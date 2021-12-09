import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomescreenRoutingModule } from './homescreen-routing.module';
import { HomescreenComponent } from './homescreen.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';



@NgModule({
  declarations: [
    HomescreenComponent,
  ],
  imports: [
    CommonModule,
    HomescreenRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    LayoutModule
  ],
})
export class HomescreenModule { }
