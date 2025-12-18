package com.evolve.backend.dtos;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class UserDto {
    private String fullName;
    private LocalDate birthDate;
    private String goal;
    private Double height;
    private Double weight;
    private String activityLevel;
    private String dailyRestrictions;
    private Boolean gym;
    private Boolean calisthenics;
}
