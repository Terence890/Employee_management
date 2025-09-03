package com.workzen.backend.component;

import com.workzen.backend.entity.Department;
import com.workzen.backend.entity.Employee;
import com.workzen.backend.entity.User;
import com.workzen.backend.repository.DepartmentRepository;
import com.workzen.backend.repository.EmployeeRepository;
import com.workzen.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        seedUsers();
        seedDepartments();
        seedEmployees();
    }

    private void seedUsers() {
        if (userRepository.count() == 0) {
            User user1 = new User();
            user1.setName("John Doe");
            user1.setEmail("john.doe@example.com");
            user1.setPassword(passwordEncoder.encode("password123"));
            userRepository.save(user1);

            User user2 = new User();
            user2.setName("Jane Smith");
            user2.setEmail("jane.smith@example.com");
            user2.setPassword(passwordEncoder.encode("password456"));
            userRepository.save(user2);
        }
    }

    private void seedDepartments() {
        if (departmentRepository.count() == 0) {
            Department dept1 = new Department();
            dept1.setName("Human Resources");
            dept1.setHead("John Doe");
            dept1.setDescription("Handles all employee-related matters.");
            dept1.setMemberCount(5);
            departmentRepository.save(dept1);

            Department dept2 = new Department();
            dept2.setName("Engineering");
            dept2.setHead("Jane Smith");
            dept2.setDescription("Responsible for all software development.");
            dept2.setMemberCount(10);
            departmentRepository.save(dept2);
        }
    }

    private void seedEmployees() {
        if (employeeRepository.count() == 0) {
            Employee emp1 = new Employee();
            emp1.setName("Alice Johnson");
            emp1.setEmail("alice.j@example.com");
            emp1.setDepartment("Human Resources");
            emp1.setPosition("HR Manager");
            emp1.setSalary(75000.00);
            employeeRepository.save(emp1);

            Employee emp2 = new Employee();
            emp2.setName("Bob Williams");
            emp2.setEmail("bob.w@example.com");
            emp2.setDepartment("Engineering");
            emp2.setPosition("Software Engineer");
            emp2.setSalary(90000.00);
            employeeRepository.save(emp2);
        }
    }
}
