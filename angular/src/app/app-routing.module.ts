import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { EmployeeComponent } from './employee/employee.component';
import { listenerCount } from 'process';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {path:'header',component:HeaderComponent},
  {path:'',component:HomeComponent},
  {path:'employee',component:EmployeeComponent},
  {path:'list',component:ListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
