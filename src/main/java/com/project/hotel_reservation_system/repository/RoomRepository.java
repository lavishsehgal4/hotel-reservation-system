package com.project.hotel_reservation_system.repository;

import com.project.hotel_reservation_system.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room,Long> {

    // Find all rooms for a hotel
    List<Room> findByHotelId(Long hotelId);

    // Find available rooms for a hotel
    List<Room> findByHotelIdAndAvailableRoomsGreaterThan(Long hotelId, Integer minAvailable);

    // Find by hotel and room type
    List<Room> findByHotelIdAndRoomType(Long hotelId, String roomType);

    // Find by hotel and price range
    List<Room> findByHotelIdAndPricePerNightBetween(Long hotelId, BigDecimal minPrice, BigDecimal maxPrice);

    // Custom search with multiple filters
    @Query("SELECT r FROM Room r WHERE r.hotel.id = :hotelId AND " +
            "(:roomType IS NULL OR r.roomType = :roomType) AND " +
            "(:minPrice IS NULL OR r.pricePerNight >= :minPrice) AND " +
            "(:maxPrice IS NULL OR r.pricePerNight <= :maxPrice) AND " +
            "(:minCapacity IS NULL OR r.maxCapacity >= :minCapacity)")
    List<Room> searchRoomsByFilters(@Param("hotelId") Long hotelId,
                                    @Param("roomType") String roomType,
                                    @Param("minPrice") BigDecimal minPrice,
                                    @Param("maxPrice") BigDecimal maxPrice,
                                    @Param("minCapacity") Integer minCapacity);


//    List<Room> findByHotelHotelid(Long id);
}
