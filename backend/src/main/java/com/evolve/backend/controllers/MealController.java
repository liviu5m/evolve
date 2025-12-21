package com.evolve.backend.controllers;

import com.evolve.backend.dtos.RegenerateMealDto;
import com.evolve.backend.models.Meal;
import com.evolve.backend.models.User;
import com.evolve.backend.services.MealService;
import com.evolve.backend.services.UserService;
import com.evolve.backend.services.WorkoutService;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/meal")
public class MealController {

    private final MealService mealService;

    public MealController(MealService mealService) {
        this.mealService = mealService;
    }

    @GetMapping("/user")
    public ResponseEntity<?> getMealById(@RequestParam Long userId) {
        return ResponseEntity.ok(mealService.getMealsByUserId(userId));
    }

    @PutMapping("/regenerate")
    public ResponseEntity<?> regenerateMeal(@RequestBody RegenerateMealDto regenerateMealDto) throws JsonProcessingException {
        Meal meal = mealService.regenerateMealPlan(regenerateMealDto);
        return ResponseEntity.ok("Success");
    }


}