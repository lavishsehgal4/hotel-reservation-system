import { useState, useEffect } from 'react'
import apiService from '../services/api'
import './HotelForm.css'

function HotelForm({ hotel, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    hotel: {
      name: '',
      description: '',
      street: '',
      city: '',
      state: '',
      country: '',
      zipCode: '',
      phone: '',
      email: '',
      checkInTime: '',
      checkOutTime: '',
      starRating: 1
    },
    amenities: {
      hasWifi: false,
      hasParking: false,
      hasPool: false,
      hasGym: false,
      hasSpa: false,
      hasRestaurant: false,
      hasRoomService: false,
      hasBusinessCenter: false,
      hasAirportShuttle: false,
      isPetFriendly: false,
      hasBreakfast: false
    }
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (hotel) {
      setFormData({
        hotel: {
          name: hotel.name || '',
          description: hotel.description || '',
          street: hotel.street || '',
          city: hotel.city || '',
          state: hotel.state || '',
          country: hotel.country || '',
          zipCode: hotel.zipCode || '',
          phone: hotel.phone || '',
          email: hotel.email || '',
          checkInTime: hotel.checkInTime || '',
          checkOutTime: hotel.checkOutTime || '',
          starRating: hotel.starRating || 1
        },
        amenities: hotel.amenities || {
          hasWifi: false,
          hasParking: false,
          hasPool: false,
          hasGym: false,
          hasSpa: false,
          hasRestaurant: false,
          hasRoomService: false,
          hasBusinessCenter: false,
          hasAirportShuttle: false,
          isPetFriendly: false,
          hasBreakfast: false
        }
      })
    }
  }, [hotel])

  const handleHotelChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      hotel: {
        ...prev.hotel,
        [field]: value
      }
    }))
  }

  const handleAmenityChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        [field]: value
      }
    }))
  }

  const formatTimeToHHMMSS = (timeValue) => {
    if (!timeValue) return ''
    // If already in HH:mm:ss format, return as is
    if (timeValue.includes(':') && timeValue.split(':').length === 3) {
      return timeValue
    }
    // If in HH:mm format, add :00 for seconds
    if (timeValue.includes(':') && timeValue.split(':').length === 2) {
      return `${timeValue}:00`
    }
    return timeValue
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const flattenedPayload = {
  hotel: {
    ...formData.hotel,
    checkInTime: formatTimeToHHMMSS(formData.hotel.checkInTime),
    checkOutTime: formatTimeToHHMMSS(formData.hotel.checkOutTime)
  },
  amenities: formData.amenities
}


      console.log(flattenedPayload);
      if (hotel) {
        // Update existing hotel
        await apiService.updateHotel(hotel.id, flattenedPayload)
      } else {
        // Create new hotel
        await apiService.createHotel(flattenedPayload)
      }
      onSuccess()
    } catch (err) {
      setError(hotel ? 'Failed to update hotel' : 'Failed to create hotel')
      console.error('Error saving hotel:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="hotel-form">
      <div className="hotel-form-header">
        <h2>{hotel ? 'Edit Hotel' : 'Create New Hotel'}</h2>
        <button className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Basic Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Hotel Name *</label>
              <input
                type="text"
                value={formData.hotel.name}
                onChange={(e) => handleHotelChange('name', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Star Rating</label>
              <select
                value={formData.hotel.starRating}
                onChange={(e) => handleHotelChange('starRating', parseInt(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map(rating => (
                  <option key={rating} value={rating}>{rating} Star</option>
                ))}
              </select>
            </div>

            <div className="form-group full-width">
              <label>Description</label>
              <textarea
                value={formData.hotel.description}
                onChange={(e) => handleHotelChange('description', e.target.value)}
                rows="3"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Location</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Street Address</label>
              <input
                type="text"
                value={formData.hotel.street}
                onChange={(e) => handleHotelChange('street', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                value={formData.hotel.city}
                onChange={(e) => handleHotelChange('city', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>State</label>
              <input
                type="text"
                value={formData.hotel.state}
                onChange={(e) => handleHotelChange('state', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Country</label>
              <input
                type="text"
                value={formData.hotel.country}
                onChange={(e) => handleHotelChange('country', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Zip Code</label>
              <input
                type="text"
                value={formData.hotel.zipCode}
                onChange={(e) => handleHotelChange('zipCode', e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Contact Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                value={formData.hotel.phone}
                onChange={(e) => handleHotelChange('phone', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={formData.hotel.email}
                onChange={(e) => handleHotelChange('email', e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Operations</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Check-in Time</label>
              <input
                type="time"
                value={formData.hotel.checkInTime}
                onChange={(e) => handleHotelChange('checkInTime', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Check-out Time</label>
              <input
                type="time"
                value={formData.hotel.checkOutTime}
                onChange={(e) => handleHotelChange('checkOutTime', e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Amenities</h3>
          <div className="amenities-grid">
            {Object.entries(formData.amenities).map(([key, value]) => (
              <div key={key} className="amenity-checkbox">
                <label>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => handleAmenityChange(key, e.target.checked)}
                  />
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).replace('Has ', '').replace('Is ', '')}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : (hotel ? 'Update Hotel' : 'Create Hotel')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default HotelForm