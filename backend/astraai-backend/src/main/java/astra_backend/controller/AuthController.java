package astra_backend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import astra_backend.model.User;
import astra_backend.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final AuthService authService;

    public AuthController(
            AuthService authService
    ) {
        this.authService =
                authService;
    }

    // =====================================================
    // REGISTER
    // =====================================================

    @PostMapping("/register")
    public Map<String, Object> register(
            @RequestBody AuthRequest request
    ) {

        User user =
                authService.register(
                        request.getUsername(),
                        request.getDisplayName(),
                        request.getPassword()
                );

        Map<String, Object> response =
                new HashMap<>();

        response.put(
                "message",
                "Registration successful."
        );

        response.put(
                "id",
                user.getId()
        );

        response.put(
                "username",
                user.getUsername()
        );

        response.put(
                "displayName",
                user.getDisplayName()
        );

        return response;
    }

    // =====================================================
    // LOGIN
    // =====================================================

    @PostMapping("/login")
    public Map<String, Object> login(
            @RequestBody AuthRequest request
    ) {

        User user =
                authService.login(
                        request.getUsername(),
                        request.getPassword()
                );

        Map<String, Object> response =
                new HashMap<>();

        response.put(
                "message",
                "Login successful."
        );

        response.put(
                "id",
                user.getId()
        );

        response.put(
                "username",
                user.getUsername()
        );

        response.put(
                "displayName",
                user.getDisplayName()
        );

        return response;
    }

    // =====================================================
    // AUTH REQUEST
    // =====================================================

    public static class AuthRequest {

        private String username;

        private String displayName;

        private String password;

        public AuthRequest() {
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(
                String username
        ) {
            this.username =
                    username;
        }

        public String getDisplayName() {
            return displayName;
        }

        public void setDisplayName(
                String displayName
        ) {
            this.displayName =
                    displayName;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(
                String password
        ) {
            this.password =
                    password;
        }
    }
}