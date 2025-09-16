package com.project.hotel_reservation_system.controller;

import com.project.hotel_reservation_system.dto.CreateRoomRequest;
import com.project.hotel_reservation_system.entity.Room;
import com.project.hotel_reservation_system.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/rooms")
@CrossOrigin
public class RoomController {

    @Autowired
    private RoomService roomService;

    /**
     * Create a new room
     */
    @PostMapping
    public ResponseEntity<Room> createRoom(@RequestBody CreateRoomRequest request) {
        try {
            Room createdRoom = roomService.createRoom(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdRoom);
        } catch (IllegalArgumentException e) {
            System.out.println("IllegalArgumentException: " + e.getMessage());
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            System.out.println("Exception: " + e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Get all rooms for a specific hotel
     */
    @GetMapping("/hotels/{hotelId}")
    public ResponseEntity<List<Room>> getRoomsByHotelId(@PathVariable Long hotelId) {
        try {
            List<Room> rooms = roomService.getRoomsByHotelId(hotelId);
            return ResponseEntity.ok(rooms);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Update room information
     */
    @PutMapping("/{roomId}")
    public ResponseEntity<Room> updateRoom(@PathVariable Long roomId, @RequestBody Room updatedRoom) {
        try {
            Room room = roomService.updateRoom(roomId, updatedRoom);
            return ResponseEntity.ok(room);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Delete a room
     */
    @DeleteMapping("/{roomId}")
    public ResponseEntity<Void> deleteRoom(@PathVariable Long roomId) {
        try {
            roomService.deleteRoom(roomId);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Get available rooms for a hotel (with minimum availability count)
     */
    @GetMapping("/hotels/{hotelId}/available")
    public ResponseEntity<List<Room>> getAvailableRoomsByHotelId(
            @PathVariable Long hotelId,
            @RequestParam(defaultValue = "0") int minVal) {
        try {
            List<Room> availableRooms = roomService.getAvailableRoomsByHotelId(hotelId, minVal);
            return ResponseEntity.ok(availableRooms);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Search rooms with filters
     */
    @GetMapping("/hotels/{hotelId}/search")
    public ResponseEntity<List<Room>> searchRooms(
            @PathVariable Long hotelId,
            @RequestParam(required = false) String roomType,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) Integer minCapacity) {
        try {
            List<Room> rooms = roomService.findRoomsByFilters(hotelId, roomType, minPrice, maxPrice, minCapacity);
            return ResponseEntity.ok(rooms);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Reserve rooms (decrease available count)
     */
    @PutMapping("/{roomId}/reserve")
    public ResponseEntity<Room> reserveRooms(
            @PathVariable Long roomId,
            @RequestParam Integer roomsToReserve) {
        try {
            System.out.println(roomId+" "+roomsToReserve);
            Room room = roomService.reserveRooms(roomId, roomsToReserve);
            return ResponseEntity.ok(room);
        } catch (IllegalArgumentException e) {
            System.out.println("IllegalArgumentException: " + e.getMessage());
            return ResponseEntity.badRequest().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Release rooms (increase available count)
     */
    @PutMapping("/{roomId}/release")
    public ResponseEntity<Room> releaseRooms(
            @PathVariable Long roomId,
            @RequestParam Integer roomsToRelease) {
        try {
            Room room = roomService.releaseRooms(roomId, roomsToRelease);
            return ResponseEntity.ok(room);
        } catch (IllegalArgumentException e) {
            System.out.println("IllegalArgumentException: " + e.getMessage());
            return ResponseEntity.badRequest().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}