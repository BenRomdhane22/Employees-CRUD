import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model';
import { MatTableDataSource } from '@angular/material/table';
import { NgForm } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

declare var bootstrap: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
dep(d: string): boolean {
  return this.employee.department==d;
}
selectD(d: string):void {
this.employee.department=d;
console.log(d)
}

  displayedColumns: string[] = ['Name', 'Number', 'Adress', 'Department', 'Gender', 'Skills','delete'];
  dataSource = new MatTableDataSource<Employee>();

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
  ngOnInit(): void {
    this.getList();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getList(): void {
    this.service.getEmployees().subscribe({
      next: (res: Employee[]) => {
        this.dataSource.data = res; 
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des employés:', err);
      }
    });
  }

  delete(id:any):void{
    this.service.deleteEmploye(id).subscribe(
      {
        next:()=>this.getList()
      }
    );
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

    checkSkills(skill: string): boolean {
      return this.skills.includes(skill);
    }

    horizontalPosition: MatSnackBarHorizontalPosition = 'start';
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';
    openSnackBar2() {
      this._snackBar.open('Updated', 'close', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration:1500,
      });
    }

    msgError:any

    update(f:NgForm,id:any):void{
      const modal = document.getElementById('uModal')
      if(f.valid && this.skills.length!==0){
        this.service.updateEmployee(id,this.employee).subscribe(
            (res:Employee)=>{
              this.employee=res
              bootstrap.Modal.getInstance(modal).hide()
              this.getList();
            }
        )
        f.resetForm();
        this.openSnackBar2()
      }else{
        this.msgError="You must complete all iformations"
      }
    }


    openUpdateModal(id: any): void {
      const modal = new bootstrap.Modal(document.getElementById('uModal'));
      modal.show();
      this.service.getEmployeeId(id).subscribe((res: Employee) => {
        this.employee = res;
        this.skills = this.convertSkillsStringToArray(this.employee.skills);
        console.log(this.skills)
      });
    }
    
    convertSkillsStringToArray(skillsString: string): string[] {
      return skillsString ? skillsString.split(",").map(s => s.trim()).filter(s => s !== "") : [];
    }
  }

  
