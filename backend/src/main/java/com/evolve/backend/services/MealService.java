package com.evolve.backend.services;

import com.evolve.backend.models.Meal;
import com.evolve.backend.models.User;
import com.evolve.backend.models.Workout;
import com.evolve.backend.repositories.MealRepository;
import com.evolve.backend.responses.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class MealService {

    private final MealRepository mealRepository;
    private final MealLogService mealLogService;

    public MealService(MealRepository mealRepository, MealLogService mealLogService) {
        this.mealRepository = mealRepository;
        this.mealLogService = mealLogService;
    }

    public void generateMealPlan(User user, String response) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        MealJsonResponse meals = objectMapper.readValue(response, MealJsonResponse.class);
        for(MealResponse res :  meals.weekMealPlan) {
            Meal meal = new Meal(user, res.day);
            mealRepository.save(meal);
            for(MealLogResponse mealLogResponse : res.meals) mealLogService.createMealLog(meal, mealLogResponse);
        }
    }

    @Transactional
    public void deleteWorkoutByUserId(Long userId) {
        mealRepository.deleteByUserId(userId);
    }
}
