package com.project.hotel_reservation_system.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateHotelRequest {
    private Long id;
    private boolean roomType;
    // Inventory
    private boolean totalRooms;
    private boolean availableRooms;

    // Pricing & Capacity
    private boolean pricePerNight;
    private boolean maxCapacity;

    // Additional info
    private boolean description;
    private boolean size; // like "35 sqm"


}
