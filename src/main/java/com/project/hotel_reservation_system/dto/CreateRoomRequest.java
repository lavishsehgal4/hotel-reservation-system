package com.project.hotel_reservation_system.dto;

import com.project.hotel_reservation_system.entity.Room;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.NotNull;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateRoomRequest {

    @NotNull(message = "Hotel ID is required")
    private Long hotelId;

    @Valid
    @NotNull(message = "Room data is required")
    private Room room;
}