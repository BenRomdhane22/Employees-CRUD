import { Component } from '@angular/core';
import { Employee } from '../employee.model';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';


declare var bootstrap: any;
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {
  

  employee: Employee ={
    id:0,
    name:"",
    department:"",
    adress:"",
    number:"",
    gender:"",
    skills:""
  };
  constructor(private service:EmployeeService,private _snackBar: MatSnackBar){}
  selectGender(gender:any):void{
    this.employee.gender=gender;
  }
  
  skills :string[] =[]
  onSkillsChanges(event: any):void {
    console.log(this.skills.toString());
    if(event.checked){
      this.skills.push(event.source.value);
    }else{
      this.skills.forEach(
        (item,index)=>{
          if(item==event.source.value){
            this.skills.splice(index,1);
          }
        }
      )
    }
    this.employee.skills= this.skills.toString();
    }

    checkSkills(skill:string){
      return this.employee.skills!=null && this.employee.skills.includes(skill);
    }
    save(f:NgForm):void{
      if(f.valid && this.skills.length!==0){
        this.service.saveEmployee(this.employee).subscribe()
        f.resetForm();
        this.openSnackBar()
      }else{
        const modal = new bootstrap.Modal(document.getElementById('errorModal'));
        modal.show();
      }
    }
    horizontalPosition: MatSnackBarHorizontalPosition = 'start';
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';
    openSnackBar() {
      this._snackBar.open('Employee added!!', 'close', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration:1500,
      });

    }


}



