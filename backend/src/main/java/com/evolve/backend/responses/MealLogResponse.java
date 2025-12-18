package com.evolve.backend.responses;

import com.evolve.backend.enums.MealType;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.time.LocalTime;

@JsonIgnoreProperties(ignoreUnknown = true)
public class MealLogResponse {
    public Double calories;
    public Double carbs;
    public Double fats;
    public Double protein;
    public String mealTime;
    public String name;
    public MealType mealType;
}
