package com.evolve.backend.services;

import com.evolve.backend.models.Workout;
import com.evolve.backend.models.WorkoutLog;
import com.evolve.backend.repositories.WorkoutLogRepository;
import com.evolve.backend.responses.ExerciseResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.stereotype.Service;

@Service
public class WorkoutLogService {

    private final WorkoutLogRepository workoutLogRepository;

    public WorkoutLogService(WorkoutLogRepository workoutLogRepository) {
        this.workoutLogRepository = workoutLogRepository;
    }

    public WorkoutLog createWorkoutLog(Workout workout, ExerciseResponse res) throws JsonProcessingException {
        WorkoutLog workoutLog = new WorkoutLog(workout, res.exerciseName, res.muscleGroup, res.sets, res.reps, res.restTime);
        return workoutLogRepository.save(workoutLog);
    }
}
