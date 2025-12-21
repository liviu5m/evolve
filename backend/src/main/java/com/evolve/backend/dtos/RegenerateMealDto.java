package com.evolve.backend.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegenerateMealDto {

    private String mealKey;
    private Long mealId;
    private Long userId;
}
