package com.evolve.backend.controllers;
import com.evolve.backend.dtos.LoginUserDto;
import com.evolve.backend.dtos.RegisterUserDto;
import com.evolve.backend.dtos.ResendDto;
import com.evolve.backend.dtos.VerifyDto;
import com.evolve.backend.models.User;
import com.evolve.backend.services.AuthenticationService;
import com.evolve.backend.services.EmailService;
import com.evolve.backend.services.JwtService;
import com.evolve.backend.services.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RequestMapping("/auth")
@RestController
public class AuthenticationController {
    private final JwtService jwtService;
    private final AuthenticationService authenticationService;
    private final UserService userService;
    private final EmailService emailService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService, UserService userService, EmailService emailService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
        this.userService = userService;
        this.emailService = emailService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterUserDto registerUserDto) {
        User registeredUser = authenticationService.signup(registerUserDto);
        emailService.sendVerificationEmailTemplate(registeredUser);
        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@RequestBody LoginUserDto loginUserDto, HttpServletResponse response) {
        User authenticatedUser = authenticationService.authenticate(loginUserDto);
        String jwtToken = jwtService.generateToken(authenticatedUser);

        ResponseCookie jwtCookie = ResponseCookie.from("jwt", jwtToken)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge((int) (jwtService.getExpirationTime() / 1000))
                .sameSite("Lax")
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, jwtCookie.toString());

        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("message", "Authenticated successfully");
        responseBody.put("username", authenticatedUser.getUsername());
        responseBody.put("email", authenticatedUser.getEmail());

        return ResponseEntity.ok().body(responseBody);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        Cookie jwtCookie = new Cookie("jwt", "");
        jwtCookie.setHttpOnly(true);
        jwtCookie.setSecure(true);
        jwtCookie.setPath("/");
        jwtCookie.setMaxAge(0);

        response.addCookie(jwtCookie);

        return ResponseEntity.ok("Log out");
    }

    @GetMapping("/jwt")
    public ResponseEntity<?> verifyAuth(@CookieValue(value = "jwt", required = false) String token) {
        System.out.println(token);
        if (token != null && jwtService.isTokenValid(token)) {
            String username = jwtService.extractUsername(token);
            User user = userService.findByEmail(username);
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.ok("Something went wrong.");
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyAuth(@RequestBody VerifyDto verifyDto) {
        return ResponseEntity.ok(authenticationService.verifyUser(verifyDto));
    }

    @PostMapping("/resend")
    public ResponseEntity<?> resendVerificationCode(@RequestBody ResendDto resendDto) {
        return ResponseEntity.ok(authenticationService.resendVerificationCode(resendDto.getUserId()));
    }
}
