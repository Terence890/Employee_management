package com.workzen.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "departments")
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column
    private String head;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "member_count")
    private int memberCount;
}
