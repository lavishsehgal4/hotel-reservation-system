package com.project.hotel_reservation_system.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "hotel_amenities")
@Data// Generates getters, setters, toString, equals, hashCode
@NoArgsConstructor
@AllArgsConstructor
public class HotelAmenities {

    @Id
    private Long id;

    @OneToOne
    @JoinColumn(name = "hotel_id")
    @JsonIgnore
    @MapsId
    private Hotel hotel;

    // Amenity fields (boolean)
    private Boolean hasWifi;
    private Boolean hasParking;
    private Boolean hasPool;
    private Boolean hasGym;
    private Boolean hasSpa;
    private Boolean hasRestaurant;
    private Boolean hasRoomService;
    private Boolean hasBusinessCenter;
    private Boolean hasAirportShuttle;
    private Boolean isPetFriendly;
    private Boolean hasBreakfast;

    // Your getters, setters, and constructors here...
}
