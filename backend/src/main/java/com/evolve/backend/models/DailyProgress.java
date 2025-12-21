package com.evolve.backend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Getter
@Setter
public class DailyProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private LocalDate date;
    private Boolean workout = false;
    private Boolean breakfast = false;
    private Boolean dinner = false;
    private Boolean lunch = false;
    private Boolean snack = false;
    private Double weight;

    @CreationTimestamp
    @Column(updatable = false, name = "created_at")
    private Date createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Date updatedAt;

    public DailyProgress(User user, LocalDate date, Boolean workout, Boolean breakfast, Boolean lunch, Boolean dinner, Boolean snack, Double weight) {
        this.user = user;
        this.date = date;
        this.workout = workout;
        this.breakfast = breakfast;
        this.dinner = dinner;
        this.lunch = lunch;
        this.snack = snack;
        this.weight = weight;
    }

    public DailyProgress() {
    }

    @Override
    public String toString() {
        return "DailyProgress{" +
                "id=" + id +
                ", user=" + user +
                ", date=" + date +
                ", workout=" + workout +
                ", breakfast=" + breakfast +
                ", dinner=" + dinner +
                ", lunch=" + lunch +
                ", snack=" + snack +
                ", weight=" + weight +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}
