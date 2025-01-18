package com.crudemployee.crud1.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crudemployee.crud1.entities.Employee;

public interface EmployeeRepository extends JpaRepository<Employee,Long>{
    
}