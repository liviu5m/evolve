package com.evolve.backend.services;

import com.evolve.backend.dtos.UserDto;
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

    public User updateUser(Long id, UserDto userDto) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        user.setFullName(userDto.getFullName());
        user.setGoal(userDto.getGoal());
        user.setBirthDate(userDto.getBirthDate());
        user.setHeight(userDto.getHeight());
        user.setWeight(userDto.getWeight());
        user.setActivityLevel(userDto.getActivityLevel());
        user.setDailyRestrictions(userDto.getDailyRestrictions());
        return userRepository.save(user);
    }
}
