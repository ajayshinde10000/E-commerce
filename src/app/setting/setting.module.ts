import { NgModule, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { CompanyComponent } from './company/company.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserService } from '../Services/user.service';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CompanyComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    FormsModule,
  ]
})
export class SettingModule implements OnDestroy{ 
  constructor(private ser:UserService){
      ser.companyHeaderShow.next(true);
  }
  ngOnDestroy(): void {
    this.ser.companyHeaderShow.next(false);
  }
}
