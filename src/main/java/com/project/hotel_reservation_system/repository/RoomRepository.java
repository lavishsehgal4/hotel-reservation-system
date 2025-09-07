package com.project.hotel_reservation_system.repository;

import com.project.hotel_reservation_system.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room,Long> {


//    List<Room> findByHotelHotelid(Long id);
}
