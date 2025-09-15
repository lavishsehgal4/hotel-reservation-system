package com.project.hotel_reservation_system.repository;

import com.project.hotel_reservation_system.entity.HotelAmenities;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HotelAmenitiesRepository extends JpaRepository<HotelAmenities,Long> {
}
