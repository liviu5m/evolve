package com.evolve.backend.repositories;

import com.evolve.backend.models.Workout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WorkoutRepository extends JpaRepository<Workout,Long> {
    Optional<Workout> findByUserId(Long userId);
    void deleteByUserId(Long userId);
}
