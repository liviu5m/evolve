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

    @Override
    public String toString() {
        return "UserDto{" +
                "fullName='" + fullName + '\'' +
                ", birthDate=" + birthDate +
                ", goal='" + goal + '\'' +
                ", height=" + height +
                ", weight=" + weight +
                ", activityLevel='" + activityLevel + '\'' +
                ", dailyRestrictions='" + dailyRestrictions + '\'' +
                ", gym=" + gym +
                ", calisthenics=" + calisthenics +
                '}';
    }
}
