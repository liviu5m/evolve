package com.evolve.backend.repositories;

import com.evolve.backend.models.ShoppingItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShoppingItemRepository extends JpaRepository<ShoppingItem, Long> {
    List<ShoppingItem> findByUserIdOrderByIdAsc(Long userId);
    void deleteByUserId(Long userId);
}
