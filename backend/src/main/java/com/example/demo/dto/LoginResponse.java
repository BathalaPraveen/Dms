package com.example.demo.dto;

public class LoginResponse {
    private String token;
    private UserDto user;

    public LoginResponse(String token, UserDto user) {
        this.token = token;
        this.user = user;
    }

    // Getters
    public String getToken() {
        return token;
    }

    public UserDto getUser() {
        return user;
    }

    // Optionally setters if needed
    public void setToken(String token) {
        this.token = token;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }
}
