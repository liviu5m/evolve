package com.evolve.backend.dtos;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
public class ProgressDto {

    private Long userId;
    private LocalDate date;
    private Boolean workout;
    private Boolean breakfast;
    private Boolean lunch;
    private Boolean dinner;
    private Boolean snack;
    private Double weight;

    @Override
    public String toString() {
        return "ProgressDto{" +
                "userId=" + userId +
                ", date=" + date +
                ", workout=" + workout +
                ", breakfast=" + breakfast +
                ", lunch=" + lunch +
                ", dinner=" + dinner +
                ", snack=" + snack +
                ", weight=" + weight +
                '}';
    }
}
