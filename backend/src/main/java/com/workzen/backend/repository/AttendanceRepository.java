package com.workzen.backend.repository;

import com.workzen.backend.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    @Transactional
    void deleteByEmployeeId(Long employeeId);
}
