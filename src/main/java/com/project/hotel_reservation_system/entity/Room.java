package com.project.hotel_reservation_system.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Entity
@Table(name = "rooms")
@Data  // Generates getters, setters, toString, equals, hashCode
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hotel_id")
    private Hotel hotel;

    // Room type/category
    private String roomType; // Normal, Suite, Honeymoon, Deluxe, Presidential, Family

    // Inventory
    private Integer totalRooms;
    private Integer availableRooms;

    // Pricing & Capacity
    private BigDecimal pricePerNight;
    private Integer maxCapacity;

    // Additional info
    private String description;
    private String size; // like "35 sqm"

    // Your getters, setters, and constructors here...
}