package com.evolve.backend.services;

import com.evolve.backend.models.Meal;
import com.evolve.backend.models.MealLog;
import com.evolve.backend.models.Workout;
import com.evolve.backend.models.WorkoutLog;
import com.evolve.backend.repositories.MealLogRepository;
import com.evolve.backend.repositories.WorkoutLogRepository;
import com.evolve.backend.responses.ExerciseResponse;
import com.evolve.backend.responses.MealLogResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.stereotype.Service;

import java.time.LocalTime;

@Service
public class MealLogService {

    private final MealLogRepository mealLogRepository;

    public MealLogService(MealLogRepository mealLogRepository) {
        this.mealLogRepository = mealLogRepository;
    }

    public MealLog createMealLog(Meal meal, MealLogResponse res) {
        MealLog mealLog = new MealLog(meal, LocalTime.parse(res.mealTime), res.name, res.calories, res.protein, res.carbs, res.fats, res.mealType);
        return mealLogRepository.save(mealLog);
    }
}
