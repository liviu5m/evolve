package com.evolve.backend.services;


import com.evolve.backend.dtos.LoginUserDto;
import com.evolve.backend.dtos.RegisterUserDto;
import com.evolve.backend.dtos.ResendDto;
import com.evolve.backend.dtos.VerifyDto;
import com.evolve.backend.models.User;
import com.evolve.backend.repositories.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final Random random =  new Random();

    public AuthenticationService(
            UserRepository userRepository,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User signup(RegisterUserDto input) {
        if(!input.getPassword().equals(input.getPasswordConfirmation())) throw new RuntimeException("Passwords do not match");
        User user = new User();
        user.setEmail(input.getEmail());
        user.setFullName(input.getFullName());
        user.setPassword(passwordEncoder.encode(input.getPassword()));
        user.setEnabled(false);
        user.setVerificationCode(generateVerificationCode());
        user.setVerificationCodeExpiresAt(LocalDateTime.now().plusMinutes(5));
        return userRepository.save(user);
    }

    public User authenticate(LoginUserDto input) {
        User user = userRepository.findByEmail(input.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getEnabled() == null || !user.getEnabled()) {
            resendVerificationCode(user.getId());
            throw new RuntimeException("User is not verified. Check your email.");
        }

        if ("google".equals(user.getProvider())) {
            throw new RuntimeException("This account uses Google Login only.");
        }

        System.out.println("Login Attempt for: " + input.getEmail());
        System.out.println(input.getPassword());
        System.out.println("Password Match: " + passwordEncoder.matches(String.valueOf(input.getPassword()), user.getPassword()));

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getEmail(),
                        input.getPassword()
                )
        );

        return user;
    }

    public String verifyUser(VerifyDto verifyDto) {
        User user = userRepository.findById(verifyDto.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
        if(user.getVerificationCodeExpiresAt().isBefore(LocalDateTime.now())) throw new RuntimeException("Verification code has expired");
        if(!user.getVerificationCode().equals(verifyDto.getVerificationCode())) throw new RuntimeException("Verification code not match");
        user.setVerificationCode(null);
        user.setVerificationCodeExpiresAt(null);
        user.setEnabled(true);
        userRepository.save(user);
        return "Verification Completed";
    }

    public String resendVerificationCode(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        user.setVerificationCode(generateVerificationCode());
        user.setVerificationCodeExpiresAt(LocalDateTime.now().plusMinutes(5));
        userRepository.save(user);
        return "Resend Successfully";
    }

    public String generateVerificationCode() {
        String code = String.valueOf(random.nextInt(900000) + 100000);
        return code;
    }

}