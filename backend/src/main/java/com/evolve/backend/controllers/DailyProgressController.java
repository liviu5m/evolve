package com.evolve.backend.controllers;

import com.evolve.backend.dtos.ProgressDto;
import com.evolve.backend.models.DailyProgress;
import com.evolve.backend.services.DailyProgressService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/progress")
public class DailyProgressController {

    private final DailyProgressService dailyProgressService;

    public DailyProgressController(DailyProgressService dailyProgressService) {
        this.dailyProgressService = dailyProgressService;
    }

    @PutMapping
    public ResponseEntity<?> updateProgress(@RequestBody ProgressDto progressDto) {
        DailyProgress dailyProgress = dailyProgressService.updateDailyProgress(progressDto);
        return ResponseEntity.ok(dailyProgress);
    }

    @GetMapping
    public ResponseEntity<?> getDailyProgress(@RequestParam Long userId, @RequestParam LocalDate date) {
        DailyProgress dailyProgress = dailyProgressService.getDailyProgress(userId, date);
        return ResponseEntity.ok(dailyProgress);
    }
}
