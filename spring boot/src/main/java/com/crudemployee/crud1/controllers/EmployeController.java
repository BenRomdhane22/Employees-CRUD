package com.crudemployee.crud1.controllers;

import java.util.List;
import java.util.Optional;

import org.hibernate.annotations.Cache;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.crudemployee.crud1.entities.Employee;
import com.crudemployee.crud1.services.EmployeeService;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@CrossOrigin("http://localhost:4200")
public class EmployeController {
    @Autowired
    private EmployeeService employeeService;

    @PostMapping("/saveEmployee")
    public Employee save(@RequestBody Employee employee ){
        return this.employeeService.saveEmployee(employee);
    }

    @GetMapping("/getEmployees")
    public List<Employee> getAll(){
        return this.employeeService.getAllEmployes();
    }

    @GetMapping("/getEmployee/{id}")
    public Optional<Employee> getAll(@PathVariable Long id){
        return this.employeeService.getEmployee(id);
    }

    @DeleteMapping("/deleteEmployee/{id}")
    public void delete(@PathVariable Long id){
        this.employeeService.deleteEmployee(id);
    }

    @PutMapping("updateEmployee/{id}")
    public Employee updateEmployee(@PathVariable Long id, @RequestBody Employee updatedEmployee) {
        Optional<Employee> optionalEmployee = employeeService.getEmployee(id);
            Employee employee = optionalEmployee.get();
            employee.setName(updatedEmployee.getName());
            employee.setNumber(updatedEmployee.getNumber());
            employee.setAdress(updatedEmployee.getAdress());
            employee.setGender(updatedEmployee.getGender());
            employee.setSkills(updatedEmployee.getSkills());
            employee.setDepartment(updatedEmployee.getDepartment());  
           return employeeService.updateEmployee(employee);

    }
    

    
    
    
}