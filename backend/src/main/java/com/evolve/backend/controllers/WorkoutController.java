package com.evolve.backend.controllers;

import com.evolve.backend.models.Workout;
import com.evolve.backend.services.WorkoutService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/workout")
public class WorkoutController {

    private final WorkoutService workoutService;

    public WorkoutController(WorkoutService workoutService) {
        this.workoutService = workoutService;
    }

    @GetMapping("/user")
    public ResponseEntity<?> getWorkoutByUserId(@RequestParam Long userId) {
        return ResponseEntity.ok(workoutService.getWorkoutByUserId(userId));
    }
}
