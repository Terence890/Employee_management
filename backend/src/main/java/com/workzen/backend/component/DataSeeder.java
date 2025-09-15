package com.workzen.backend.component;

import com.workzen.backend.entity.Attendance;
import com.workzen.backend.repository.AttendanceRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;

@Component
@AllArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final AttendanceRepository attendanceRepository;

    @Override
    public void run(String... args) throws Exception {
        Attendance attendance = new Attendance();
        attendance.setEmployeeId(1L);
        attendance.setDate(LocalDate.now());
        attendance.setTimeIn(LocalTime.of(9, 0));
        attendance.setTimeOut(LocalTime.of(17, 0));
        attendance.setPresent(true);
        attendanceRepository.save(attendance);
    }
}
