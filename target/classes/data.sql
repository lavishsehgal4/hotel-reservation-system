-- ==========================
-- Hotels
-- ==========================
INSERT INTO hotels (name, description, street, city, state, country, zip_code, phone, email, check_in_time, check_out_time, star_rating)
VALUES
('Grand Palace Hotel', 'A luxury hotel located in the heart of New Delhi.', 'Connaught Place', 'New Delhi', 'Delhi', 'India', '110001', '+91-9812345678', 'contact@grandpalace.com', '14:00:00', '11:00:00', 5),
('Ocean View Resort', 'A seaside resort with beautiful views of the Arabian Sea.', 'Beach Road', 'Goa', 'Goa', 'India', '403001', '+91-9823456789', 'info@oceanview.com', '13:00:00', '11:00:00', 4),
('Mountain Retreat', 'A peaceful hotel surrounded by the Himalayas.', 'Mall Road', 'Manali', 'Himachal Pradesh', 'India', '175131', '+91-9834567890', 'stay@mountainretreat.com', '12:00:00', '10:00:00', 3);

-- ==========================
-- Hotel Amenities
-- ==========================
-- hotel_id will match the auto-generated IDs in the same order (1,2,3)
INSERT INTO hotel_amenities (hotel_id, has_wifi, has_parking, has_pool, has_gym, has_spa, has_restaurant, has_room_service, has_business_center, has_airport_shuttle, is_pet_friendly, has_breakfast)
VALUES
(1, true, true, true, true, true, true, true, true, true, false, true),
(2, true, true, true, false, false, true, true, false, true, true, true),
(3, true, false, false, false, true, true, true, false, false, true, true);

-- ==========================
-- Rooms
-- ==========================
INSERT INTO rooms (hotel_id, room_type, total_rooms, available_rooms, price_per_night, max_capacity, description, size)
VALUES
-- Grand Palace Hotel
(1, 'Normal', 50, 45, 3000.00, 2, 'Comfortable standard room', '25 sqm'),
(1, 'Deluxe', 30, 28, 5000.00, 3, 'Spacious deluxe room with city view', '35 sqm'),
(1, 'Suite', 10, 9, 12000.00, 4, 'Luxury suite with separate living area', '60 sqm'),

-- Ocean View Resort
(2, 'Normal', 40, 35, 2500.00, 2, 'Standard room with balcony', '28 sqm'),
(2, 'Family', 15, 14, 6000.00, 5, 'Family room with ocean view', '50 sqm'),
(2, 'Presidential', 5, 4, 20000.00, 6, 'Presidential suite with private pool', '100 sqm'),

-- Mountain Retreat
(3, 'Normal', 25, 20, 2000.00, 2, 'Cozy room with mountain view', '22 sqm'),
(3, 'Deluxe', 15, 13, 4000.00, 3, 'Deluxe room with fireplace', '30 sqm'),
(3, 'Honeymoon', 5, 5, 8000.00, 2, 'Romantic honeymoon suite', '45 sqm');
