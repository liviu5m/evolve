package com.evolve.backend.responses;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class WorkoutResponse {
    public String day;
    public List<ExerciseResponse> exercises;
    public String sessionLabel;
    public Integer totalTime;
}

