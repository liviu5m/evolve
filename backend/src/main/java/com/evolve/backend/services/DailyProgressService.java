package com.evolve.backend.services;

import com.evolve.backend.dtos.ProgressDto;
import com.evolve.backend.models.DailyProgress;
import com.evolve.backend.models.User;
import com.evolve.backend.repositories.DailyProgressRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PutMapping;

import java.time.LocalDate;
import java.util.List;

@Service
public class DailyProgressService {

    private final DailyProgressRepository dailyProgressRepository;
    private final UserService userService;

    public DailyProgressService(DailyProgressRepository dailyProgressRepository, UserService userService) {
        this.dailyProgressRepository = dailyProgressRepository;
        this.userService = userService;
    }

    public DailyProgress updateDailyProgress(ProgressDto progressDto) {
        User user = userService.findUserById(progressDto.getUserId());
        DailyProgress dailyProgress = dailyProgressRepository.findByUserIdAndDate(progressDto.getUserId(), progressDto.getDate()).orElse(null);
        if(dailyProgress == null) {
            dailyProgress = new DailyProgress();
            dailyProgress.setUser(user);
            dailyProgress.setDate(progressDto.getDate());
        }
        if(progressDto.getWorkout() != null) dailyProgress.setWorkout(progressDto.getWorkout());
        if(progressDto.getBreakfast() != null) dailyProgress.setBreakfast(progressDto.getBreakfast());
        if(progressDto.getLunch() != null) dailyProgress.setLunch(progressDto.getLunch());
        if(progressDto.getDinner() != null) dailyProgress.setDinner(progressDto.getDinner());
        if(progressDto.getSnack() != null) dailyProgress.setSnack(progressDto.getSnack());
        if(progressDto.getWeight() != null) dailyProgress.setWeight(progressDto.getWeight());

        dailyProgressRepository.save(dailyProgress);
        return dailyProgress;
    }

    public DailyProgress getDailyProgress(Long userId, LocalDate date) {
        DailyProgress dailyProgress = dailyProgressRepository.findByUserIdAndDate(userId, date).orElse(null);
        return dailyProgress;
    }

    public int getWorkoutsDone(Long userId) {
        int workoutsDone = dailyProgressRepository.getWorkoutsDoneByUserId(userId);
        return workoutsDone;
    }

    public int getStreakProgress(Long userId) {
        LocalDate yesterday = LocalDate.now().minusDays(2);
        List<DailyProgress> history = dailyProgressRepository.findByUserIdAndDateBeforeOrderByDateDesc(userId, LocalDate.now());

        int streak = 0;
        LocalDate expectedDate = yesterday;

        for (DailyProgress dp : history) {
            if (dp.getDate().equals(expectedDate)) {
                if (dp.getWorkout() && dp.getBreakfast() && dp.getLunch() &&
                        dp.getDinner() && dp.getSnack()) {
                    streak++;
                    expectedDate = expectedDate.minusDays(1);
                } else {
                    break;
                }
            } else if (dp.getDate().isBefore(expectedDate)) {
                break;
            }
        }
        System.out.println(streak);
        return streak;
    }
}
