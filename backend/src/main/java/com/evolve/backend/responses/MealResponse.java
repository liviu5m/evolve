package com.evolve.backend.responses;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class MealResponse {
    public String day;
    public List<MealLogResponse> meals;
}

