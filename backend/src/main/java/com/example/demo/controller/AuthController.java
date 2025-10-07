package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> loginData) {
        System.out.println("Received login data: " + loginData);
        User user = authService.login(loginData);

        if (user == null) {
            // Login failed
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", "Invalid email or password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }

        // Login successful
        Map<String, Object> response = new HashMap<>();
        response.put("user", user);
        response.put("token", "6257e822b23bcfab2442e63a3f7a722f681f6b27ca8fbbf4e5724ef039866b5"); // replace with JWT later

        return ResponseEntity.ok(response);
    }
}
