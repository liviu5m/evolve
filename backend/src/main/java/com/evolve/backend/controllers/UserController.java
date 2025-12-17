package com.evolve.backend.controllers;

import com.evolve.backend.dtos.UserDto;
import com.evolve.backend.models.User;
import com.evolve.backend.services.GrokService;
import com.evolve.backend.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;
    private final GrokService grokService;

    public UserController(UserService userService, GrokService grokService) {
        this.userService = userService;
        this.grokService = grokService;
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody UserDto userDto) {
        return ResponseEntity.ok(userService.updateUser(id, userDto));
    }

    @PutMapping("/plan/{id}")
    public ResponseEntity<?> generateUserPlan(@PathVariable Long id, @RequestBody UserDto userDto) {
        return ResponseEntity.ok(grokService.generateWorkoutUserPlan(userDto));
    }
}
