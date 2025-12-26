package com.evolve.backend.controllers;

import com.evolve.backend.dtos.UncheckDto;
import com.evolve.backend.dtos.UserDto;
import com.evolve.backend.enums.ItemCategory;
import com.evolve.backend.models.ShoppingItem;
import com.evolve.backend.responses.ShoppingItemResponse;
import com.evolve.backend.services.ShoppingItemService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/shopping-item")
public class ShoppingItemController {

    private final ShoppingItemService shoppingItemService;

    public ShoppingItemController(ShoppingItemService shoppingItemService) {
        this.shoppingItemService = shoppingItemService;
    }

    @GetMapping
    public Map<ItemCategory, List<ShoppingItem>> findAllByUserId(@RequestParam Long userId) {
        return shoppingItemService.getShoppingItemsByUserId(userId);
    }

    @PutMapping("/{id}")
    public ShoppingItem purchaseItem(@PathVariable Long id) {
        return shoppingItemService.purchaseShoppingItem(id);
    }

    @PutMapping("/uncheck")
    public void uncheckShoppingItem(@RequestBody UncheckDto uncheckDto) {
        shoppingItemService.uncheckShoppingItemsByUserId(uncheckDto.getUserId());
    }
}
