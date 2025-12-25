package com.evolve.backend.services;

import com.evolve.backend.dtos.RegenerateMealDto;
import com.evolve.backend.enums.MealType;
import com.evolve.backend.models.Meal;
import com.evolve.backend.models.MealLog;
import com.evolve.backend.models.User;
import com.evolve.backend.models.Workout;
import com.evolve.backend.repositories.MealRepository;
import com.evolve.backend.responses.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.w3c.dom.stylesheets.LinkStyle;

import java.time.LocalTime;
import java.util.List;

@Service
public class MealService {

    private final MealRepository mealRepository;
    private final MealLogService mealLogService;
    private final UserService userService;
    private final GrokService grokService;

    public MealService(MealRepository mealRepository, MealLogService mealLogService, UserService userService, GrokService grokService) {
        this.mealRepository = mealRepository;
        this.mealLogService = mealLogService;
        this.userService = userService;
        this.grokService = grokService;
    }

    public Meal getMealById(Long id) {
        Meal meal = mealRepository.findByIdWithLogs(id).orElseThrow(() -> new RuntimeException("Meal not found"));
        return meal;
    }

    @Cacheable(value = "meals", key = "#userId.toString()")
    public List<Meal> getMealsByUserId(Long userId) {
        List<Meal> meals = mealRepository.findByUserAndDayWithLogs(userId);
        return meals;
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

    @CacheEvict(value = "meals", key = "#userId.toString()")
    public Meal regenerateMealPlan(RegenerateMealDto regenerateMealDto) throws JsonProcessingException {
        User user = userService.findUserById(regenerateMealDto.getUserId());
        Meal meal = getMealById(regenerateMealDto.getMealId());
        String res = grokService.regenerateSingleMeal(regenerateMealDto.getMealKey(), meal.getMeals(),user);
        MealType targetType = MealType.valueOf(regenerateMealDto.getMealKey().toUpperCase());

        MealLog mealLog = meal.getMeals().stream()
                .filter(log -> log.getMealType() == targetType)
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Meal type not found in current plan"));

        ObjectMapper objectMapper = new ObjectMapper();
        MealLogResponse meals = objectMapper.readValue(res, MealLogResponse.class);
        mealLog.setName(meals.name);
        mealLog.setMealTime(LocalTime.parse(meals.mealTime));
        mealLog.setCalories(meals.calories);
        mealLog.setProtein(meals.protein);
        mealLog.setCarbs(meals.carbs);
        mealLog.setFats(meals.fats);
        mealLog.setMealType(meals.mealType);
        String imageUrl = null;
        for(String a: meals.name.split(" ")) {
            imageUrl = mealLogService.getImageUrlFromName(a);
            if(imageUrl != null) break;
        }
        mealLog.setImageUrl(imageUrl);
        mealRepository.save(meal);

        return meal;
    }

    @Transactional
    public void deleteWorkoutByUserId(Long userId) {
        mealRepository.deleteByUserId(userId);
    }
}
