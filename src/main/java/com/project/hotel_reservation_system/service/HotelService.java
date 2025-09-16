package com.project.hotel_reservation_system.service;

import com.project.hotel_reservation_system.entity.Hotel;
import com.project.hotel_reservation_system.entity.HotelAmenities;
import com.project.hotel_reservation_system.repository.HotelAmenitiesRepository;
import com.project.hotel_reservation_system.repository.HotelRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class HotelService {
    @Autowired
    HotelRepository hotelRepository;

    @Autowired
    HotelAmenitiesRepository hotelAmenitiesRepository;

    public Hotel createHotel(Hotel hotel, HotelAmenities amenities){

        Hotel savedHotel = hotelRepository.save(hotel);
        amenities.setHotel(savedHotel);
        hotelAmenitiesRepository.save(amenities);
        savedHotel.setAmenities(amenities);
        return savedHotel;
    }

    public Hotel getHotelById(Long id){
        return hotelRepository.findById(id).orElseThrow(() -> new RuntimeException("Hotel not found with id: " + id));
    }

    public List<Hotel> getAllHotels() {
        return hotelRepository.findAll();
    }

    public Hotel updateHotel(Long id, Hotel updatedHotel) {
        // Check if hotel exists
        Hotel existingHotel = getHotelById(id);
        System.out.println("enter update service");
        // Update fields
        existingHotel.setName(updatedHotel.getName());
        existingHotel.setDescription(updatedHotel.getDescription());
        existingHotel.setStreet(updatedHotel.getStreet());
        existingHotel.setCity(updatedHotel.getCity());
        existingHotel.setState(updatedHotel.getState());
        existingHotel.setCountry(updatedHotel.getCountry());
        existingHotel.setZipCode(updatedHotel.getZipCode());
        existingHotel.setPhone(updatedHotel.getPhone());
        existingHotel.setEmail(updatedHotel.getEmail());
        existingHotel.setCheckInTime(updatedHotel.getCheckInTime());
        existingHotel.setCheckOutTime(updatedHotel.getCheckOutTime());
        existingHotel.setStarRating(updatedHotel.getStarRating());

        // Save and return
        return hotelRepository.save(existingHotel);
    }

    public HotelAmenities updateHotelAmenities(Long hotelId, HotelAmenities updatedAmenities) {
        // Check if hotel exists
        getHotelById(hotelId);

        // Find existing amenities
        HotelAmenities existingAmenities = hotelAmenitiesRepository.findById(hotelId)
                .orElseThrow(() -> new RuntimeException("Hotel amenities not found for hotel id: " + hotelId));

        // Update amenity fields
        existingAmenities.setHasWifi(updatedAmenities.getHasWifi());
        existingAmenities.setHasParking(updatedAmenities.getHasParking());
        existingAmenities.setHasPool(updatedAmenities.getHasPool());
        existingAmenities.setHasGym(updatedAmenities.getHasGym());
        existingAmenities.setHasSpa(updatedAmenities.getHasSpa());
        existingAmenities.setHasRestaurant(updatedAmenities.getHasRestaurant());
        existingAmenities.setHasRoomService(updatedAmenities.getHasRoomService());
        existingAmenities.setHasBusinessCenter(updatedAmenities.getHasBusinessCenter());
        existingAmenities.setHasAirportShuttle(updatedAmenities.getHasAirportShuttle());
        existingAmenities.setIsPetFriendly(updatedAmenities.getIsPetFriendly());
        existingAmenities.setHasBreakfast(updatedAmenities.getHasBreakfast());

        // Save and return
        return hotelAmenitiesRepository.save(existingAmenities);
    }

    /**
     * Delete hotel and its amenities
     */
    public void deleteHotel(Long id) {
        // Check if hotel exists
        Hotel hotel = getHotelById(id);

        // Delete hotel (amenities will be deleted automatically due to cascade)
        hotelRepository.deleteById(id);
    }

}
