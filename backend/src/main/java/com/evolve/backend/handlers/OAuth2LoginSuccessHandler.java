package com.evolve.backend.handlers;

import com.evolve.backend.models.User;
import com.evolve.backend.repositories.UserRepository;
import com.evolve.backend.services.JwtService;
import jakarta.servlet.http.Cookie;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final UserRepository userRepository;
    private final ObjectProvider<AuthenticationManager> authenticationManagerProvider;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();

        User user = findOrCreateUser(oauth2User);
//        if(user.getProvider().equals("credentials")) response.sendRedirect("http://localhost:5173/");
//        Authentication auth = authenticationManagerProvider.getObject()
//                .authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), "google"));

        String jwtToken = jwtService.generateToken(user);

        Cookie jwtCookie = createJwtCookie(jwtToken);
        response.addCookie(jwtCookie);
        System.out.println(jwtToken);
//        response.sendRedirect("http://localhost:5173/");
        response.sendRedirect("https://evolveapp.vercel.app/");
    }

    private User findOrCreateUser(OAuth2User oauth2User) {
        System.out.println(oauth2User);
        Optional<User> optionalUser = userRepository.findByEmail(oauth2User.getAttribute("email"));

        if (optionalUser.isPresent()) {
            return optionalUser.get();
        }

        User user = new User();
        user.setEmail(oauth2User.getAttribute("email"));
        user.setProvider("google");
        user.setPassword(passwordEncoder.encode("google"));
        user.setFullName(oauth2User.getAttribute("name"));
        user.setEnabled(true);
        return userRepository.save(user);
    }

    private Cookie createJwtCookie(String jwtToken) {
        Cookie jwtCookie = new Cookie("jwt", jwtToken);
        jwtCookie.setHttpOnly(true);
        jwtCookie.setSecure(true);
        jwtCookie.setPath("/");
        jwtCookie.setMaxAge((int) (jwtService.getExpirationTime() / 1000));
        return jwtCookie;
    }
}