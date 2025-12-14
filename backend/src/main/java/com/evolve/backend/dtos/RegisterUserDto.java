package com.evolve.backend.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterUserDto {
//    @NotBlank(message = "Full name is required")
    private String fullName;
    @Email(message = "Please provide a valid email")
//    @NotBlank(message = "Email is required")
    private String email;
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;
    private String passwordConfirmation;
}