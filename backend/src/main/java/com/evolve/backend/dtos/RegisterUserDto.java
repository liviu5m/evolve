package com.evolve.backend.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterUserDto {
    @NotBlank(message = "Full name is required")
    private String fullName;
    @Email(message = "Please provide a valid email")
    @NotBlank(message = "Email is required")
    private String email;
    @Size(min=8, message = "Password must be at least 8 characters")
    @NotBlank(message = "Password is required")
    @Pattern(
            regexp = "^(?=.*[a-zA-Z]).*$",
            message = "Password must contain at least one letter"
    )
    private String password;
    private String passwordConfirmation;
}