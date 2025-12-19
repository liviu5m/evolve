package com.evolve.backend.controllers;

import com.evolve.backend.services.MealService;
import com.evolve.backend.services.WorkoutService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/meal")
public class MealController {

    public final MealService mealService;

    public MealController(MealService mealService) {
        this.mealService = mealService;
    }

    @GetMapping("/user")
    public ResponseEntity<?> getMealById(@RequestParam Long userId) {
        return ResponseEntity.ok(mealService.getMealsByUserId(userId));
    }


}