package com.evolve.backend.repositories;

import com.evolve.backend.models.Workout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WorkoutRepository extends JpaRepository<Workout,Long> {
    @Query("SELECT w FROM Workout w LEFT JOIN FETCH w.logs WHERE w.user.id = :userId")
    List<Workout> findAllByUserIdWithLogs(@Param("userId") Long userId);
    List<Workout> findAllByUserId(Long userId);
    void deleteByUserId(Long userId);
}
