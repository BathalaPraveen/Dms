package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import com.example.demo.dto.LoginResponse;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> loginData) {
        System.out.println("Received login data: " + loginData);

        LoginResponse loginResponse = authService.login(loginData);

        Map<String, Object> response = new HashMap<>();
        response.put("user", loginResponse.getUser());
        response.put("token", loginResponse.getToken());

        return ResponseEntity.ok(response);
    }
}