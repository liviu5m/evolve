package com.evolve.backend.services;

import com.evolve.backend.models.User;
import com.evolve.backend.repositories.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findByEmail(String username) {
        return userRepository.findByEmail(username).orElseThrow(() -> new RuntimeException("User not found"));
    }
}
