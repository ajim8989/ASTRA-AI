package astra_backend.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String displayName;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    // =====================================================
    // DEFAULT CONSTRUCTOR
    // =====================================================

    public User() {
    }

    // =====================================================
    // EXISTING CONSTRUCTOR
    // =====================================================

    public User(
            String username,
            String displayName
    ) {
        this.username = username;
        this.displayName = displayName;
        this.password = "";
        this.createdAt =
                LocalDateTime.now();
    }

    // =====================================================
    // REGISTER CONSTRUCTOR
    // =====================================================

    public User(
            String username,
            String displayName,
            String password
    ) {
        this.username = username;
        this.displayName = displayName;
        this.password = password;
        this.createdAt =
                LocalDateTime.now();
    }

    // =====================================================
    // GETTERS
    // =====================================================

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getDisplayName() {
        return displayName;
    }

    public String getPassword() {
        return password;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    // =====================================================
    // SETTERS
    // =====================================================

    public void setId(
            Long id
    ) {
        this.id = id;
    }

    public void setUsername(
            String username
    ) {
        this.username = username;
    }

    public void setDisplayName(
            String displayName
    ) {
        this.displayName =
                displayName;
    }

    public void setPassword(
            String password
    ) {
        this.password =
                password;
    }

    public void setCreatedAt(
            LocalDateTime createdAt
    ) {
        this.createdAt =
                createdAt;
    }
}