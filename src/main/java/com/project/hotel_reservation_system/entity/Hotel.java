package com.project.hotel_reservation_system.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.sql.Time;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "hotels")
@Data  // Generates getters, setters, toString, equals, hashCode
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Hotel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(mappedBy = "hotel", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private HotelAmenities amenities;

    @OneToMany(mappedBy = "hotel", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Room> rooms;

    private String name;
    private String description;

    // Location fields
    private String street;
    private String city;
    private String state;
    private String country;
    private String zipCode;

    // Contact fields
    private String phone;
    private String email;

    // Operations
    private Time checkInTime;
    private Time checkOutTime;

    // Rating
    private Integer starRating;

    // Your getters, setters, and constructors here...
}