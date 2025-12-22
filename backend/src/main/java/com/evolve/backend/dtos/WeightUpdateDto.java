package com.evolve.backend.dtos;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class WeightUpdateDto {

    private Double weight;
    private Long userId;
    private LocalDate date;

}
