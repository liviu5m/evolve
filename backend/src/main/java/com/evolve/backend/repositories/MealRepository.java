package com.evolve.backend.repositories;

import com.evolve.backend.models.Meal;
import com.evolve.backend.models.Workout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MealRepository extends JpaRepository<Meal,Long> {
    @Query("SELECT m FROM Meal m LEFT JOIN FETCH m.meals WHERE m.user.id = :userId")
    List<Meal> findByUserAndDayWithLogs(@Param("userId") Long userId);
    List<Meal> findAllByUserId(Long userId);
    void deleteByUserId(Long userId);
}
