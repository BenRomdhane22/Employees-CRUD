package com.crudemployee.crud1.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.crudemployee.crud1.dao.EmployeeRepository;
import com.crudemployee.crud1.entities.Employee;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public Employee saveEmployee(Employee employee){
        return this.employeeRepository.save(employee);
    }
    
    public List<Employee> getAllEmployes(){
        return this.employeeRepository.findAll();
    }

    public Optional<Employee> getEmployee(Long id){
        return this.employeeRepository.findById(id);
    }

    public void deleteEmployee(Long id){
        this.employeeRepository.deleteById(id);
    }

    public Employee updateEmployee(Employee employee){
        return this.employeeRepository.save(employee);
    }
}