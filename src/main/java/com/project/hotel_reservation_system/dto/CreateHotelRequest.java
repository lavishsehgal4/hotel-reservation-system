package com.project.hotel_reservation_system.dto;

import com.project.hotel_reservation_system.entity.Hotel;
import com.project.hotel_reservation_system.entity.HotelAmenities;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateHotelRequest {
    private Hotel hotel;
    private HotelAmenities amenities;

}
