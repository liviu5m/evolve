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
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalTime;

@Service
public class MealLogService {

    private final MealLogRepository mealLogRepository;
    private final RestTemplate restTemplate;
    private final GrokService grokService;

    public MealLogService(MealLogRepository mealLogRepository, RestTemplate restTemplate, GrokService grokService) {
        this.mealLogRepository = mealLogRepository;
        this.restTemplate = restTemplate;
        this.grokService = grokService;
    }

    public MealLog createMealLog(Meal meal, MealLogResponse res) {
        String imageUrl = null;
        for(String a: res.name.split(" ")) {
            imageUrl = getImageUrlFromName(a);
            if(imageUrl != null) break;
        }
        MealLog mealLog = new MealLog(meal, LocalTime.parse(res.mealTime), res.name, res.calories, res.protein, res.carbs, res.fats, res.mealType);
        mealLog.setImageUrl(imageUrl);
        return mealLogRepository.save(mealLog);
    }

    public String getImageUrlFromName(String name) {
        try {
            String url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + name;

            String response = restTemplate.getForObject(url, String.class);

            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response);
            JsonNode meals = root.path("meals");

            if (meals.isArray() && !meals.isEmpty()) {
                return meals.get(0).path("strMealThumb").asText();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
