import { useState } from 'react'
import './RoomCard.css'

function RoomCard({ room, onEdit, onDelete, onReserve, onRelease }) {
  const [reserveQuantity, setReserveQuantity] = useState(1)
  const [releaseQuantity, setReleaseQuantity] = useState(1)

  const handleReserve = () => {
    if (reserveQuantity > 0 && reserveQuantity <= room.availableRooms) {
      onReserve(reserveQuantity)
      setReserveQuantity(1)
    }
  }

  const handleRelease = () => {
    if (releaseQuantity > 0) {
      onRelease(releaseQuantity)
      setReleaseQuantity(1)
    }
  }

  const getAvailabilityStatus = () => {
    if (room.availableRooms === 0) return 'unavailable'
    if (room.availableRooms <= room.totalRooms * 0.2) return 'low'
    return 'available'
  }

  return (
    <div className="room-card">
      <div className="room-card-header">
        <h3>{room.roomType}</h3>
        <div className={`availability-badge ${getAvailabilityStatus()}`}>
          {room.availableRooms}/{room.totalRooms} available
        </div>
      </div>
      
      <div className="room-card-body">
        <div className="room-info">
          <div className="info-item">
            <strong>Price per night:</strong> ${room.pricePerNight}
          </div>
          <div className="info-item">
            <strong>Max capacity:</strong> {room.maxCapacity} guests
          </div>
          <div className="info-item">
            <strong>Size:</strong> {room.size || 'Not specified'}
          </div>
        </div>
        
        {room.description && (
          <div className="room-description">
            <strong>Description:</strong>
            <p>{room.description}</p>
          </div>
        )}
        
        <div className="room-inventory">
          <div className="inventory-item">
            <span>Total Rooms:</span>
            <span className="inventory-value">{room.totalRooms}</span>
          </div>
          <div className="inventory-item">
            <span>Available:</span>
            <span className="inventory-value">{room.availableRooms}</span>
          </div>
          <div className="inventory-item">
            <span>Reserved:</span>
            <span className="inventory-value">{room.totalRooms - room.availableRooms}</span>
          </div>
        </div>
      </div>
      
      <div className="room-actions">
        <div className="reservation-controls">
          <div className="control-group">
            <label>Reserve:</label>
            <div className="quantity-control">
              <input
                type="number"
                min="1"
                max={room.availableRooms}
                value={reserveQuantity}
                onChange={(e) => setReserveQuantity(parseInt(e.target.value) || 1)}
              />
              <button 
                className="btn btn-sm btn-warning"
                onClick={handleReserve}
                disabled={room.availableRooms === 0 || reserveQuantity > room.availableRooms}
              >
                Reserve
              </button>
            </div>
          </div>
          
          <div className="control-group">
            <label>Release:</label>
            <div className="quantity-control">
              <input
                type="number"
                min="1"
                value={releaseQuantity}
                onChange={(e) => setReleaseQuantity(parseInt(e.target.value) || 1)}
              />
              <button 
                className="btn btn-sm btn-success"
                onClick={handleRelease}
                disabled={room.totalRooms === room.availableRooms}
              >
                Release
              </button>
            </div>
          </div>
        </div>
        
        <div className="management-actions">
          <button className="btn btn-primary" onClick={onEdit}>
            Edit
          </button>
          <button className="btn btn-danger" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default RoomCard