package com.project.hotel_reservation_system.controller;

import com.project.hotel_reservation_system.dto.CreateHotelRequest;
import com.project.hotel_reservation_system.entity.Hotel;
import com.project.hotel_reservation_system.entity.HotelAmenities;
import com.project.hotel_reservation_system.service.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/hotels")
@CrossOrigin
public class HotelController {
    @Autowired
    private HotelService hotelService;

    @PostMapping
    public ResponseEntity<Hotel> createHotel(@RequestBody CreateHotelRequest request){
        try {

            Hotel createdHotel = hotelService.createHotel(request.getHotel(), request.getAmenities());
            return ResponseEntity.status(HttpStatus.CREATED).body(createdHotel);
        } catch (IllegalArgumentException e) {

            System.out.println("IllegalArgumentException: " + e.getMessage());
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {

            System.out.println("Exception: " + e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
    @GetMapping({"/{id}", "/{hotelname}/{id}"})
    public ResponseEntity<Hotel> getHotelById(@PathVariable Long id) {
        try {
            Hotel hotel = hotelService.getHotelById(id);
            return ResponseEntity.ok(hotel);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }



    @GetMapping
    public ResponseEntity<List<Hotel>> getAllHotels(){
        List<Hotel> hotels = hotelService.getAllHotels();
        return ResponseEntity.ok(hotels);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Hotel> updateHotel(@PathVariable Long id, @RequestBody Hotel hotel) {
        try {
            Hotel updatedHotel = hotelService.updateHotel(id, hotel);
            System.out.println("old id "+id+" new id "+updatedHotel.getId() );
            System.out.println("enter update controller");

            return ResponseEntity.ok(updatedHotel);
        } catch (RuntimeException e) {
            System.out.println("enter update controller error ");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PutMapping("/{id}/amenities")
    public ResponseEntity<HotelAmenities> updateHotelAmenities(@PathVariable Long id, @RequestBody HotelAmenities amenities) {
        try {
            HotelAmenities updatedAmenities = hotelService.updateHotelAmenities(id, amenities);
            return ResponseEntity.ok(updatedAmenities);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/remove/{id}")
    public ResponseEntity<Void> deleteHotel(@PathVariable Long id) {
        try {
            hotelService.deleteHotel(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }


}
