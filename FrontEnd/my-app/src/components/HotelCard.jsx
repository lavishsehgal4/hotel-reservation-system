import './HotelCard.css'

function HotelCard({ hotel, onSelect, onDelete }) {
  const formatTime = (timeString) => {
    if (!timeString) return 'Not specified'
    return timeString.substring(0, 5) // Format HH:MM
  }

  const renderStars = (rating) => {
    if (!rating) return 'Not rated'
    return '★'.repeat(rating) + '☆'.repeat(5 - rating)
  }

  const renderAmenities = (amenities) => {
    if (!amenities) return []
    
    const amenityList = []
    if (amenities.hasWifi) amenityList.push('WiFi')
    if (amenities.hasParking) amenityList.push('Parking')
    if (amenities.hasPool) amenityList.push('Pool')
    if (amenities.hasGym) amenityList.push('Gym')
    if (amenities.hasSpa) amenityList.push('Spa')
    if (amenities.hasRestaurant) amenityList.push('Restaurant')
    
    return amenityList.slice(0, 3) // Show only first 3 amenities
  }

  return (
    <div className="hotel-card">
      <div className="hotel-card-header">
        <h3>{hotel.name}</h3>
        <div className="hotel-rating">
          {renderStars(hotel.starRating)}
        </div>
      </div>
      
      <div className="hotel-card-body">
        <p className="hotel-description">{hotel.description}</p>
        
        <div className="hotel-location">
          <strong>Location:</strong>
          <p>{hotel.street}, {hotel.city}, {hotel.state} {hotel.zipCode}</p>
          <p>{hotel.country}</p>
        </div>
        
        <div className="hotel-contact">
          <div><strong>Phone:</strong> {hotel.phone || 'Not provided'}</div>
          <div><strong>Email:</strong> {hotel.email || 'Not provided'}</div>
        </div>
        
        <div className="hotel-operations">
          <div><strong>Check-in:</strong> {formatTime(hotel.checkInTime)}</div>
          <div><strong>Check-out:</strong> {formatTime(hotel.checkOutTime)}</div>
        </div>
        
        {hotel.amenities && (
          <div className="hotel-amenities">
            <strong>Amenities:</strong>
            <div className="amenities-list">
              {renderAmenities(hotel.amenities).map((amenity, index) => (
                <span key={index} className="amenity-tag">{amenity}</span>
              ))}
              {renderAmenities(hotel.amenities).length === 3 && <span className="amenity-tag">+more</span>}
            </div>
          </div>
        )}
      </div>
      
      <div className="hotel-card-actions">
        <button className="btn btn-primary" onClick={onSelect}>
          Manage Rooms
        </button>
        <button className="btn btn-danger" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default HotelCard