package com.evolve.backend.models;

import com.evolve.backend.enums.ItemCategory;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;

@Entity
@Getter
@Setter
public class ShoppingItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String quantity;

    @Enumerated(EnumType.STRING)
    private ItemCategory category;

    private boolean purchased = false;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @CreationTimestamp
    @Column(updatable = false, name = "created_at")
    private Date createdAt;

    public ShoppingItem(String name, String quantity, ItemCategory category, User user) {
        this.name = name;
        this.quantity = quantity;
        this.category = category;
        this.user = user;
    }

    public ShoppingItem() {
    }
}
