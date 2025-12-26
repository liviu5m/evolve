package com.evolve.backend.controllers;

import com.evolve.backend.dtos.UserDto;
import com.evolve.backend.models.Meal;
import com.evolve.backend.models.User;
import com.evolve.backend.models.Workout;
import com.evolve.backend.services.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;
    private final GrokService grokService;
    private final WorkoutService workoutService;
    private final MealService mealService;
    private final ShoppingItemService shoppingItemService;

    public UserController(UserService userService, GrokService grokService, WorkoutService workoutService, MealService mealService, ShoppingItemService shoppingItemService) {
        this.userService = userService;
        this.grokService = grokService;
        this.workoutService = workoutService;
        this.mealService = mealService;
        this.shoppingItemService = shoppingItemService;
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody UserDto userDto) {
        return ResponseEntity.ok(userService.updateUser(id, userDto));
    }

    @PutMapping("/plan/{id}")
    public ResponseEntity<?> generateUserPlan(@PathVariable Long id, @RequestBody UserDto userDto) throws JsonProcessingException {
        User user = userService.findUserById(id);
        workoutService.deleteWorkoutByUserId(id);
        mealService.deleteWorkoutByUserId(id);
        shoppingItemService.deleteShoppingItemsByUserId(id);
        workoutService.generateWorkoutPlan(user, grokService.generateWorkoutUserPlan(userDto));
        mealService.generateMealPlan(user, grokService.generateMealUserPlan(userDto));
        List<Meal> meals = mealService.getMealsByUserId(user.getId());
        shoppingItemService.generateTheWeeklyShoppingList(grokService.generateWeeklyShoppingList(meals), user);
        return ResponseEntity.ok("Success");
    }
}