package com.evolve.backend.services;


import com.evolve.backend.dtos.UserDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class GrokService {

    private static final Logger logger = LoggerFactory.getLogger(GrokService.class);
    private final RestClient restClient;
    private final String groqApiUrl = "https://api.groq.com/openai/v1/chat/completions";

    @Value("${groq.api.key}")
    private String apiKey;

    public GrokService(RestClient restClient) {
        this.restClient = restClient;
    }

    public String generateWorkoutUserPlan(UserDto userDto) {
        String equipmentAccess = String.format("Gym Access: %b, Calisthenics Equipment: %b",
                userDto.getGym(), userDto.getCalisthenics());

        String prompt = String.format(
                "Act as a professional fitness coach. Generate a full 7-day weekly workout schedule (Monday to Sunday) in JSON format. " +
                        "(Generate so the workout vary from 1-2 hours and between 6-8 exercices per day)\n" +
                        "User Profile: Goal: %s, Activity Level: %s, Restrictions: %s, Equipment: %s.\n\n" + // Added Equipment
                        "Instructions:\n" +
                        "1. Tailor exercises based on equipment: If Gym is true, include machines/barbells. If Calisthenics is true, include bodyweight/bar movements.\n" +
                        "2. For each day of the week, provide a sessionLabel (e.g., 'Monday: Chest & Triceps' or 'Tuesday: Rest Day').\n" +
                        "3. If it is a Rest Day, leave the exercises array empty.\n" +
                        "4. Do NOT include 'weight' in the exercises.\n" +
                        "5. Return ONLY valid JSON.\n\n" +
                        "JSON Structure:\n" +
                        "{\n" +
                        "  \"weekPlan\": [\n" +
                        "    {\n" +
                        "      \"day\": \"Monday\",\n" +
                        "      \"sessionLabel\": \"Upper Body Strength\",\n" +
                        "      \"totalTime\": 60,\n" +
                        "      \"exercises\": [\n" +
                        "        { \"exerciseName\": \"Pushups\", \"muscleGroup\": \"Chest\", \"sets\": \"3\", \"reps\": \"15\", \"restTime\": \"60s\" }\n" +
                        "      ]\n" +
                        "    },\n" +
                        "    { \"day\": \"Tuesday\", \"sessionLabel\": \"Rest Day\", \"totalTime\": 0, \"exercises\": [] }\n" +
                        "  ]\n" +
                        "}",
                userDto.getGoal(),
                userDto.getActivityLevel(),
                userDto.getDailyRestrictions(),
                equipmentAccess
        );

        return getGrokResponse(prompt);
    }
    public String generateMealUserPlan(UserDto userDto) {
        String dietaryInfo = String.format("Dietary Goal: %s, Activity Level: %s, Restrictions: %s",
                userDto.getGoal(), userDto.getActivityLevel(), userDto.getDailyRestrictions());

        String prompt = String.format(
                "Act as a professional nutritionist. Generate a full 7-day weekly meal plan (Monday to Sunday) in JSON format.\n" +
                        "User Profile: %s.\n\n" +
                        "Instructions:\n" +
                        "1. Provide exactly 4 meals per day: Breakfast, Lunch, Dinner, and a Snack.\n" +
                        "2. For each meal, include: name, calories, protein, carbs, fats, and mealType.\n" +
                        "3. 'mealType' must be exactly one of: BREAKFAST, LUNCH, DINNER, SNACK.\n" +
                        "4. 'mealTime' MUST be a string in 24-hour format 'HH:mm' (e.g., '08:30', '13:00'). Do not include seconds.\n" +
                        "5. Nutritional values should be numbers (Double).\n" +
                        "6. Return ONLY valid JSON without markdown formatting.\n\n" +
                        "JSON Structure:\n" +
                        "{\n" +
                        "  \"weekMealPlan\": [\n" +
                        "    {\n" +
                        "      \"day\": \"Monday\",\n" +
                        "      \"meals\": [\n" +
                        "        {\n" +
                        "          \"name\": \"Example Meal\",\n" +
                        "          \"mealTime\": \"08:30\",\n" +
                        "          \"calories\": 350.0,\n" +
                        "          \"protein\": 15.0,\n" +
                        "          \"carbs\": 50.0,\n" +
                        "          \"fats\": 8.0,\n" +
                        "          \"mealType\": \"BREAKFAST\"\n" +
                        "        }\n" +
                        "      ]\n" +
                        "    }\n" +
                        "  ]\n" +
                        "}",
                dietaryInfo
        );

        return getGrokResponse(prompt);
    }

    private String getGrokResponse(String prompt) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + apiKey);
            headers.set("Content-Type", "application/json");

            Map<String, Object> requestBody = Map.of(
                    "model", "llama-3.1-8b-instant",
                    "messages", new Object[] { Map.of("role", "user", "content", prompt) }
            );

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

            Map response = restClient.post()
                    .uri("/chat/completions")
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                    .body(requestBody)
                    .retrieve()
                    .onStatus(status -> status.is4xxClientError() || status.is5xxServerError(),
                            (request, response2) -> {
                                throw new HttpClientErrorException(response2.getStatusCode());
                            })
                    .toEntity(Map.class)
                    .getBody();
            if (response == null) {
                logger.error("Received null response from Grok API");
                return "Error: Null response from API";
            }

            logger.debug("API response: {}", response);

            Object choices = response.get("choices");
            if (choices instanceof java.util.List && !((java.util.List<?>) choices).isEmpty()) {
                Object choice = ((java.util.List<?>) choices).get(0);
                if (choice instanceof Map) {
                    Object message = ((Map<?, ?>) choice).get("message");
                    if (message instanceof Map) {
                        Object content = ((Map<?, ?>) message).get("content");
                        if (content instanceof String) {
                            String res = (String) content;

                            int start = res.indexOf('{');
                            int end = res.lastIndexOf('}');

                            if (start >= 0 && end >= 0 && end > start) {
                                return res.substring(start, end + 1);
                            }
                            return res;
                        } else {
                            logger.error("Content field is missing or not a string: {}", message);
                            return "Error: Invalid content format in API response";
                        }
                    } else {
                        logger.error("Message field is missing or not a map: {}", choice);
                        return "Error: Invalid message format in API response";
                    }
                } else {
                    logger.error("Choice field is missing or not a map: {}", choices);
                    return "Error: Invalid choice format in API response";
                }
            } else {
                logger.error("Choices field is missing or empty in response: {}", response);
                return "Error: No choices in API response";
            }
        } catch (HttpClientErrorException e) {
            logger.error("HTTP error from Grok API: {} - {}", e.getStatusCode(), e.getResponseBodyAsString());
            return "Error: HTTP " + e.getStatusCode() + " - " + e.getResponseBodyAsString();
        } catch (Exception e) {
            logger.error("Unexpected error while calling Grok API", e);
            return "Error: " + e.getMessage();
        }
    }


}