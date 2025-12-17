package com.evolve.backend.services;

import com.evolve.backend.models.Workout;
import com.evolve.backend.repositories.WorkoutRepository;
import org.springframework.stereotype.Service;

@Service
public class WorkoutService {

    private final WorkoutRepository workoutRepository;

    public WorkoutService(WorkoutRepository workoutRepository) {
        this.workoutRepository = workoutRepository;
    }

    public Workout getWorkoutByUserId(Long userId) {
        Workout workout = workoutRepository.findByUserId(userId).orElse(null);
        return workout;
    }
}
