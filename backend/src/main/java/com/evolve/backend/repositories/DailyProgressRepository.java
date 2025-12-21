package com.evolve.backend.repositories;

import com.evolve.backend.models.DailyProgress;
import com.evolve.backend.models.Meal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface DailyProgressRepository extends JpaRepository<DailyProgress, Long> {
    Optional<DailyProgress> findByUserIdAndDate(Long userId, LocalDate date);
    @Query("SELECT COUNT(dp) FROM DailyProgress dp WHERE dp.user.id = :userId AND dp.workout = true")
    int getWorkoutsDoneByUserId(@Param("userId") Long userId);
    List<DailyProgress> findByUserIdAndDateBeforeOrderByDateDesc(Long userId, LocalDate date);
}
