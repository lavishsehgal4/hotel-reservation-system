package com.project.hotel_reservation_system.service;

import com.project.hotel_reservation_system.dto.CreateRoomRequest;
import com.project.hotel_reservation_system.entity.Hotel;
import com.project.hotel_reservation_system.entity.Room;
import com.project.hotel_reservation_system.repository.HotelRepository;
import com.project.hotel_reservation_system.repository.RoomRepository;
import org.springframework.transaction.annotation.Transactional;import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@Transactional
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private HotelRepository hotelRepository;

    /**
     * Create a new room type for a hotel
     */
    public Room createRoom(CreateRoomRequest request) {
        // Validate hotel exists
        Hotel hotel = hotelRepository.findById(request.getHotelId())
                .orElseThrow(() -> new RuntimeException("Hotel not found"));

        // Set hotel and save
        Room room = request.getRoom();
        room.setHotel(hotel);

        // Business validation
        if (room.getAvailableRooms() > room.getTotalRooms()) {
            throw new IllegalArgumentException("Available rooms cannot exceed total rooms");
        }

        return roomRepository.save(room);
    }

    /**
     * Get all rooms for a specific hotel
     */
    @Transactional(readOnly = true)
    public List<Room> getRoomsByHotelId(Long hotelId) {
        if (hotelId == null) {
            throw new IllegalArgumentException("Hotel ID cannot be null");
        }

        // Verify hotel exists
        hotelRepository.findById(hotelId)
                .orElseThrow(() -> new RuntimeException("Hotel not found with id: " + hotelId));

        return roomRepository.findByHotelId(hotelId);
    }

    /**
     * Update room information
     */
    public Room updateRoom(Long roomId, Room updatedRoom) {
        if (roomId == null) {
            throw new IllegalArgumentException("Room ID cannot be null");
        }
        if (updatedRoom == null) {
            throw new IllegalArgumentException("Updated room data cannot be null");
        }

        // Find existing room
        Room existingRoom = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found with id: " + roomId));

        // Update fields
        if (updatedRoom.getRoomType() != null) {
            existingRoom.setRoomType(updatedRoom.getRoomType());
        }
        if (updatedRoom.getTotalRooms() != null) {
            existingRoom.setTotalRooms(updatedRoom.getTotalRooms());
        }
        if (updatedRoom.getAvailableRooms() != null) {
            existingRoom.setAvailableRooms(updatedRoom.getAvailableRooms());
        }
        if (updatedRoom.getPricePerNight() != null) {
            existingRoom.setPricePerNight(updatedRoom.getPricePerNight());
        }
        if (updatedRoom.getMaxCapacity() != null) {
            existingRoom.setMaxCapacity(updatedRoom.getMaxCapacity());
        }
        if (updatedRoom.getDescription() != null) {
            existingRoom.setDescription(updatedRoom.getDescription());
        }
        if (updatedRoom.getSize() != null) {
            existingRoom.setSize(updatedRoom.getSize());
        }

        // Validate updated data
        validateRoomData(existingRoom);

        // Ensure available rooms doesn't exceed total rooms
        if (existingRoom.getAvailableRooms() > existingRoom.getTotalRooms()) {
            throw new IllegalArgumentException("Available rooms cannot exceed total rooms");
        }

        return roomRepository.save(existingRoom);
    }

    /**
     * Delete a room type
     */
    public void deleteRoom(Long roomId) {
        if (roomId == null) {
            throw new IllegalArgumentException("Room ID cannot be null");
        }

        // Check if room exists
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found with id: " + roomId));

        roomRepository.deleteById(roomId);
    }

    /**
     * Get only  rooms for a specific hotel which are greater than given count
     */
    @Transactional(readOnly = true)
    public List<Room> getAvailableRoomsByHotelId(Long hotelId,int minVal) {
        if (hotelId == null) {
            throw new IllegalArgumentException("Hotel ID cannot be null");
        }
        if(minVal<0){
            throw new IllegalArgumentException("Minimum available rooms value cannot be negative");
        }

        // Verify hotel exists
        hotelRepository.findById(hotelId)
                .orElseThrow(() -> new RuntimeException("Hotel not found with id: " + hotelId));

        return roomRepository.findByHotelIdAndAvailableRoomsGreaterThan(hotelId, minVal);
    }

    /**
     * Update room inventory (total and available room counts)
     */
    public Room updateRoomInventory(Long roomId, Integer totalRooms, Integer availableRooms) {
        if (roomId == null) {
            throw new IllegalArgumentException("Room ID cannot be null");
        }
        if (totalRooms == null || availableRooms == null) {
            throw new IllegalArgumentException("Total rooms and available rooms cannot be null");
        }
        if (totalRooms < 0 || availableRooms < 0) {
            throw new IllegalArgumentException("Room counts cannot be negative");
        }
        if (availableRooms > totalRooms) {
            throw new IllegalArgumentException("Available rooms cannot exceed total rooms");
        }

        // Find existing room
        Room existingRoom = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found with id: " + roomId));

        // Update inventory
        existingRoom.setTotalRooms(totalRooms);
        existingRoom.setAvailableRooms(availableRooms);

        return roomRepository.save(existingRoom);
    }

    /**
     * Search rooms with filters
     */
    @Transactional(readOnly = true)
    public List<Room> findRoomsByFilters(Long hotelId, String roomType, BigDecimal minPrice,
                                         BigDecimal maxPrice, Integer minCapacity) {
        if (hotelId == null) {
            throw new IllegalArgumentException("Hotel ID cannot be null");
        }

        // Verify hotel exists
        hotelRepository.findById(hotelId)
                .orElseThrow(() -> new RuntimeException("Hotel not found with id: " + hotelId));

        return roomRepository.searchRoomsByFilters(hotelId, roomType, minPrice, maxPrice, minCapacity);
    }




    /**
     * Reserve rooms (decrease available count)
     */
    public Room reserveRooms(Long roomId, Integer roomsToReserve) {
        if (roomId == null) {
            throw new IllegalArgumentException("Room ID cannot be null");
        }
        if (roomsToReserve == null || roomsToReserve <= 0) {
            throw new IllegalArgumentException("Rooms to reserve must be greater than zero");
        }

        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found with id: " + roomId));

        if (room.getAvailableRooms() < roomsToReserve) {
            throw new IllegalArgumentException("Not enough available rooms. Available: " +
                    room.getAvailableRooms() + ", Requested: " + roomsToReserve);
        }

        room.setAvailableRooms(room.getAvailableRooms() - roomsToReserve);
        return roomRepository.save(room);
    }

    /**
     * Release rooms (increase available count)
     */
    public Room releaseRooms(Long roomId, Integer roomsToRelease) {
        if (roomId == null) {
            throw new IllegalArgumentException("Room ID cannot be null");
        }
        if (roomsToRelease == null || roomsToRelease <= 0) {
            throw new IllegalArgumentException("Rooms to release must be greater than zero");
        }

        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found with id: " + roomId));

        int newAvailableCount = room.getAvailableRooms() + roomsToRelease;
        if (newAvailableCount > room.getTotalRooms()) {
            throw new IllegalArgumentException("Cannot release more rooms than total capacity. " +
                    "Total: " + room.getTotalRooms() + ", Would be available: " + newAvailableCount);
        }

        room.setAvailableRooms(newAvailableCount);
        return roomRepository.save(room);
    }

    /**
     * Private helper method to validate room data
     */
    private void validateRoomData(Room room) {
        if (room.getRoomType() == null || room.getRoomType().trim().isEmpty()) {
            throw new IllegalArgumentException("Room type cannot be null or empty");
        }
        if (room.getTotalRooms() == null || room.getTotalRooms() < 0) {
            throw new IllegalArgumentException("Total rooms must be non-negative");
        }
        if (room.getAvailableRooms() == null || room.getAvailableRooms() < 0) {
            throw new IllegalArgumentException("Available rooms must be non-negative");
        }
        if (room.getPricePerNight() == null || room.getPricePerNight().compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Price per night must be non-negative");
        }
        if (room.getMaxCapacity() == null || room.getMaxCapacity() <= 0) {
            throw new IllegalArgumentException("Max capacity must be greater than zero");
        }
    }
}