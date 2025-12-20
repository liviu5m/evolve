package com.evolve.backend.services;

import com.evolve.backend.dtos.ProgressDto;
import com.evolve.backend.models.DailyProgress;
import com.evolve.backend.models.User;
import com.evolve.backend.repositories.DailyProgressRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PutMapping;

import java.time.LocalDate;

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
            dailyProgress = new DailyProgress(user, progressDto.getDate(), progressDto.getWorkout(), progressDto.getBreakfast(), progressDto.getLunch(), progressDto.getDinner(), progressDto.getSnack(), progressDto.getWeight());
        }else {
            if(progressDto.getWorkout() != null) dailyProgress.setWorkout(progressDto.getWorkout());
            if(progressDto.getBreakfast() != null) dailyProgress.setBreakfast(progressDto.getBreakfast());
            if(progressDto.getLunch() != null) dailyProgress.setLunch(progressDto.getLunch());
            if(progressDto.getDinner() != null) dailyProgress.setDinner(progressDto.getDinner());
            if(progressDto.getSnack() != null) dailyProgress.setSnack(progressDto.getSnack());
            if(progressDto.getWeight() != null) dailyProgress.setWeight(progressDto.getWeight());
        }
        dailyProgressRepository.save(dailyProgress);
        return dailyProgress;
    }

    public DailyProgress getDailyProgress(Long userId, LocalDate date) {
        DailyProgress dailyProgress = dailyProgressRepository.findByUserIdAndDate(userId, date).orElse(null);
        return dailyProgress;
    }
}
