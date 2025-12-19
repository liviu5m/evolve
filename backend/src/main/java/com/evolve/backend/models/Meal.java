package com.evolve.backend.models;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
public class Meal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String day;

    @CreationTimestamp
    @Column(updatable = false, name = "created_at")
    private Date createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Date updatedAt;

    @OneToMany(mappedBy = "meal", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<MealLog> meals = new ArrayList<>();

    public Meal(User user, String day) {
        this.user = user;
        this.day = day;
    }

    public Meal() {
    }

    @Override
    public String toString() {
        return "Meal{" +
                "id=" + id +
                ", user=" + user +
                ", day='" + day + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                ", meals=" + meals +
                '}';
    }
}
