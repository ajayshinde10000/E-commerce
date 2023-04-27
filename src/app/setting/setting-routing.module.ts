import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company/company.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  { path:'company', component:CompanyComponent},
  { path:'users', component:UserListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
