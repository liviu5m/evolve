package com.evolve.backend.responses;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ExerciseResponse {
    public String exerciseName;
    public String muscleGroup;
    public String reps;
    public String restTime;
    public String sets;
}
