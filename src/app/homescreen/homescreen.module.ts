import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomescreenRoutingModule } from './homescreen-routing.module';
import { HomescreenComponent } from './homescreen.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HomescreenComponent,
  ],
  imports: [
    CommonModule,
    HomescreenRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class HomescreenModule { }
