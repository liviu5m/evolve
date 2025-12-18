package com.evolve.backend.responses;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.stereotype.Component;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@Component
public class WorkoutJsonResponse {
    public List<WorkoutResponse> weekPlan;
}