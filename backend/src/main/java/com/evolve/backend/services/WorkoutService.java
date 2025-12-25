package com.evolve.backend.services;

import com.evolve.backend.models.User;
import com.evolve.backend.models.Workout;
import com.evolve.backend.models.WorkoutLog;
import com.evolve.backend.repositories.WorkoutRepository;
import com.evolve.backend.responses.ExerciseResponse;
import com.evolve.backend.responses.WorkoutJsonResponse;
import com.evolve.backend.responses.WorkoutResponse;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkoutService {

    private final WorkoutRepository workoutRepository;
    private final WorkoutLogService workoutLogService;

    public WorkoutService(WorkoutRepository workoutRepository, WorkoutLogService workoutLogService) {
        this.workoutRepository = workoutRepository;
        this.workoutLogService = workoutLogService;
    }

    @Cacheable(value = "workouts", key = "#userId.toString()")
    public List<Workout> getWorkoutByUserId(Long userId) {
        List<Workout> workouts = workoutRepository.findAllByUserIdWithLogs(userId);
        return workouts;
    }

    public void generateWorkoutPlan(User user, String response) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        WorkoutJsonResponse workouts = objectMapper.readValue(response, WorkoutJsonResponse.class);
        for(WorkoutResponse res :  workouts.weekPlan) {
            Workout workout = new Workout(user, res.sessionLabel, res.totalTime, res.day);
            workoutRepository.save(workout);
            for(ExerciseResponse exerciseResponse : res.exercises) workoutLogService.createWorkoutLog(workout, exerciseResponse);

        }
    }

    @Transactional
    public void deleteWorkoutByUserId(Long userId) {
        workoutRepository.deleteByUserId(userId);
    }
}
