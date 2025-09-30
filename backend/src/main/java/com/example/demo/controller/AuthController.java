package com.example.demo.controller;

import com.example.demo.dto.*;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    // ✅ Inject PasswordEncoder instead of BCryptPasswordEncoder
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        // Trim email and password to avoid extra spaces
        String email = request.getEmail().trim();
        String rawPassword = request.getPassword().trim();

        // Find user by email
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(
                        org.springframework.http.HttpStatus.UNAUTHORIZED, "Invalid email or password"));

        // Check password using PasswordEncoder
        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            throw new ResponseStatusException(
                    org.springframework.http.HttpStatus.UNAUTHORIZED, "Invalid email or password");
        }

        // Generate JWT token
        String token = JwtUtil.generateToken(user.getEmail());

        // Create User DTO
        UserDto userDto = new UserDto(user.getId(), user.getEmail());

        // Return response
        return ResponseEntity.ok(new LoginResponse(token, userDto));
    }
}
