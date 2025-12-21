package com.evolve.backend.repositories;

import com.evolve.backend.models.Meal;
import com.evolve.backend.models.Workout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MealRepository extends JpaRepository<Meal, Long> {

    @Query("SELECT DISTINCT m FROM Meal m LEFT JOIN FETCH m.meals WHERE m.user.id = :userId ORDER BY m.createdAt ASC")
    List<Meal> findByUserAndDayWithLogs(@Param("userId") Long userId);

    @Query("SELECT m FROM Meal m LEFT JOIN FETCH m.meals WHERE m.id = :id ORDER BY m.createdAt ASC")
    Optional<Meal> findByIdWithLogs(@Param("id") Long id);

    void deleteByUserId(Long userId);
}