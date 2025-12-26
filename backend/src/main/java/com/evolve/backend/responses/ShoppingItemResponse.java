package com.evolve.backend.responses;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ShoppingItemResponse {
    public String name;
    public String category;
    public String quantity;
}
