package astra_backend.service;

import org.springframework.stereotype.Service;

import astra_backend.model.User;
import astra_backend.repository.UserRepository;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(
            UserRepository userRepository
    ) {
        this.userRepository =
                userRepository;
    }

    // =====================================================
    // REGISTER
    // =====================================================

    public User register(
            String username,
            String displayName,
            String password
    ) {

        if (
                username == null ||
                username.trim().isEmpty()
        ) {
            throw new RuntimeException(
                    "Username cannot be empty."
            );
        }

        if (
                displayName == null ||
                displayName.trim().isEmpty()
        ) {
            throw new RuntimeException(
                    "Display name cannot be empty."
            );
        }

        if (
                password == null ||
                password.trim().isEmpty()
        ) {
            throw new RuntimeException(
                    "Password cannot be empty."
            );
        }

        String cleanUsername =
                username.trim();

        String cleanDisplayName =
                displayName.trim();

        if (
                userRepository
                        .findByUsername(
                                cleanUsername
                        )
                        .isPresent()
        ) {
            throw new RuntimeException(
                    "Username already exists."
            );
        }

        User user =
                new User(
                        cleanUsername,
                        cleanDisplayName,
                        password
                );

        return userRepository.save(
                user
        );
    }

    // =====================================================
    // LOGIN
    // =====================================================

    public User login(
            String username,
            String password
    ) {

        if (
                username == null ||
                username.trim().isEmpty()
        ) {
            throw new RuntimeException(
                    "Username cannot be empty."
            );
        }

        if (
                password == null ||
                password.trim().isEmpty()
        ) {
            throw new RuntimeException(
                    "Password cannot be empty."
            );
        }

        User user =
                userRepository
                        .findByUsername(
                                username.trim()
                        )
                        .orElseThrow(
                                () ->
                                        new RuntimeException(
                                                "Invalid username or password."
                                        )
                        );

        if (
                user.getPassword() == null ||
                !user.getPassword()
                        .equals(password)
        ) {
            throw new RuntimeException(
                    "Invalid username or password."
            );
        }

        return user;
    }
}