package com.evolve.backend.repositories;

import com.evolve.backend.models.MealLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MealLogRepository extends JpaRepository<MealLog,Long> {
}
