package com.workzen.backend.controller;

import com.workzen.backend.entity.Attendance;
import com.workzen.backend.repository.AttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @GetMapping
    public List<Attendance> getAllAttendance() {
        return attendanceRepository.findAll();
    }

    @PostMapping
    public Attendance addAttendance(@RequestBody Attendance attendance) {
        return attendanceRepository.save(attendance);
    }
}
