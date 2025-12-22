package com.evolve.backend.responses;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WeightResponse {
    private Double weight;
    private String day;

    public WeightResponse(Double weight, String day) {
        this.weight = weight;
        this.day = day;
    }

    public WeightResponse() {
    }
}
