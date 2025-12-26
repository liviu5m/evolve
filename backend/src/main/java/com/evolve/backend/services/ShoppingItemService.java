package com.evolve.backend.services;

import com.evolve.backend.enums.ItemCategory;
import com.evolve.backend.models.ShoppingItem;
import com.evolve.backend.models.User;
import com.evolve.backend.models.Workout;
import com.evolve.backend.repositories.ShoppingItemRepository;
import com.evolve.backend.responses.ExerciseResponse;
import com.evolve.backend.responses.ShoppingItemResponse;
import com.evolve.backend.responses.WorkoutJsonResponse;
import com.evolve.backend.responses.WorkoutResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ShoppingItemService {

    private final ShoppingItemRepository shoppingItemRepository;

    public ShoppingItemService(ShoppingItemRepository shoppingItemRepository) {
        this.shoppingItemRepository = shoppingItemRepository;
    }

    public ShoppingItem createShoppingItem(ShoppingItemResponse res, User user) {
        ShoppingItem shoppingItem = new ShoppingItem(res.name, res.quantity, ItemCategory.valueOf(res.category.toUpperCase()), user);
        return shoppingItemRepository.save(shoppingItem);
    }

    public void generateTheWeeklyShoppingList(String response,User user) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        response = "[" + response + "]";
        List<ShoppingItemResponse> items = objectMapper.readValue(response, new TypeReference<List<ShoppingItemResponse>>() {});
        for(ShoppingItemResponse item : items) {
            createShoppingItem(item, user);
        }
    }

    public Map<ItemCategory, List<ShoppingItem>> getShoppingItemsByUserId(Long userId) {
        List<ShoppingItem> items = shoppingItemRepository.findByUserIdOrderByIdAsc(userId);
        return items.stream()
                .collect(Collectors.groupingBy(ShoppingItem::getCategory));
    }

    public ShoppingItem purchaseShoppingItem(Long id) {
        ShoppingItem shoppingItem = shoppingItemRepository.findById(id).orElseThrow(() -> new RuntimeException("Shopping Item Not Found"));
        shoppingItem.setPurchased(!shoppingItem.isPurchased());
        return shoppingItemRepository.save(shoppingItem);
    }

    public void deleteShoppingItemsByUserId(Long userId) {
        shoppingItemRepository.deleteByUserId(userId);
    }

    public void uncheckShoppingItemsByUserId(Long userId) {
        List<ShoppingItem> items = shoppingItemRepository.findByUserIdOrderByIdAsc(userId);
        for(ShoppingItem item : items) {
            item.setPurchased(false);
            shoppingItemRepository.save(item);
        }
    }
}
