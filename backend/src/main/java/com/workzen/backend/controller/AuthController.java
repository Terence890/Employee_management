package com.workzen.backend.controller;

import com.workzen.backend.dto.AuthRequest;
import com.workzen.backend.dto.AuthResponse;
import com.workzen.backend.dto.RegisterRequest;
import com.workzen.backend.entity.User;
import com.workzen.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email is already in use");
        }

        User user = new User();
        user.setName(registerRequest.getName());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));

        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully");
    }

   @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
        Optional<User> userOptional = userRepository.findByEmail(authRequest.getEmail());

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (passwordEncoder.matches(authRequest.getPassword(), user.getPassword())) {
                // Create a user object for the response (excluding password)
                User responseUser = new User();
                responseUser.setId(user.getId());
                responseUser.setName(user.getName());
                responseUser.setEmail(user.getEmail());
                // Don't include password in response
                
                AuthResponse response = new AuthResponse("dummy-jwt-token", responseUser);
                return ResponseEntity.ok(response);
            }
        }

        return ResponseEntity.status(401).body("Invalid credentials");
    }
}
