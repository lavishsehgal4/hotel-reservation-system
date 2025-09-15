import { useState, useEffect } from 'react'
import apiService from '../services/api'
import './RoomForm.css'

function RoomForm({ hotel, room, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    roomType: '',
    totalRooms: 1,
    availableRooms: 1,
    pricePerNight: '',
    maxCapacity: 1,
    description: '',
    size: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const roomTypes = [
    'Standard',
    'Deluxe',
    'Suite',
    'Presidential',
    'Family',
    'Honeymoon',
    'Business'
  ]

  useEffect(() => {
    if (room) {
      setFormData({
        roomType: room.roomType || '',
        totalRooms: room.totalRooms || 1,
        availableRooms: room.availableRooms || 1,
        pricePerNight: room.pricePerNight || '',
        maxCapacity: room.maxCapacity || 1,
        description: room.description || '',
        size: room.size || ''
      })
    }
  }, [room])

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (room) {
        // Update existing room
        await apiService.updateRoom(room.id, formData)
      } else {
        // Create new room
        const requestData = {
          hotelId: hotel.id,
          room: formData
        }
        await apiService.createRoom(requestData)
      }
      onSuccess()
    } catch (err) {
      setError(room ? 'Failed to update room' : 'Failed to create room')
      console.error('Error saving room:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="room-form">
      <div className="room-form-header">
        <h2>{room ? 'Edit Room' : 'Create New Room'}</h2>
        <button className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Room Details</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Room Type *</label>
              <select
                value={formData.roomType}
                onChange={(e) => handleChange('roomType', e.target.value)}
                required
              >
                <option value="">Select room type</option>
                {roomTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>Price per Night *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.pricePerNight}
                onChange={(e) => handleChange('pricePerNight', e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Max Capacity *</label>
              <input
                type="number"
                min="1"
                value={formData.maxCapacity}
                onChange={(e) => handleChange('maxCapacity', parseInt(e.target.value))}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Room Size</label>
              <input
                type="text"
                placeholder="e.g., 35 sqm"
                value={formData.size}
                onChange={(e) => handleChange('size', e.target.value)}
              />
            </div>
            
            <div className="form-group full-width">
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows="3"
                placeholder="Describe the room features and amenities..."
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Inventory</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Total Rooms *</label>
              <input
                type="number"
                min="1"
                value={formData.totalRooms}
                onChange={(e) => handleChange('totalRooms', parseInt(e.target.value))}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Available Rooms *</label>
              <input
                type="number"
                min="0"
                max={formData.totalRooms}
                value={formData.availableRooms}
                onChange={(e) => handleChange('availableRooms', parseInt(e.target.value))}
                required
              />
            </div>
          </div>
          
          <div className="inventory-info">
            <p>
              <strong>Reserved Rooms:</strong> {formData.totalRooms - formData.availableRooms}
            </p>
            <p className="help-text">
              Available rooms cannot exceed total rooms. Reserved rooms = Total - Available.
            </p>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : (room ? 'Update Room' : 'Create Room')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default RoomForm