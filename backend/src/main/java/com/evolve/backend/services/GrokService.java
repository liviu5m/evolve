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
        String prompt = String.format(
                "Act as a professional fitness coach. Generate a full 7-day weekly workout schedule (Monday to Sunday) in JSON format.\n" +
                        "User Profile: Goal: %s, Activity Level: %s, Restrictions: %s.\n\n" +
                        "Instructions:\n" +
                        "1. For each day of the week, provide a sessionLabel (e.g., 'Monday: Chest & Triceps' or 'Tuesday: Rest Day').\n" +
                        "2. If it is a Rest Day, leave the exercises array empty.\n" +
                        "3. Do NOT include 'weight' in the exercises.\n" +
                        "4. Return ONLY valid JSON.\n\n" +
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
                userDto.getGoal(), userDto.getActivityLevel(), userDto.getDailyRestrictions()
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
            System.out.println(response);
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