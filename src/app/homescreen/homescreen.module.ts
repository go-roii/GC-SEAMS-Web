import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomescreenRoutingModule } from './homescreen-routing.module';
import { HomescreenComponent } from './homescreen.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DashboardModule} from "./dashboard/dashboard.module";



@NgModule({
  declarations: [
    HomescreenComponent,
  ],
  imports: [
    CommonModule,
    HomescreenRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DashboardModule,
  ],
})
export class HomescreenModule { }
