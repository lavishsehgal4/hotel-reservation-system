import { useState, useEffect } from 'react'
import apiService from '../services/api'
import RoomCard from './RoomCard'
import RoomForm from './RoomForm'
import RoomSearch from './RoomSearch'
import './RoomManagement.css'

function RoomManagement({ hotel, onBack }) {
  const [rooms, setRooms] = useState([])
  const [filteredRooms, setFilteredRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingRoom, setEditingRoom] = useState(null)
  const [showAvailableOnly, setShowAvailableOnly] = useState(false)

  useEffect(() => {
    if (hotel) {
      loadRooms()
    }
  }, [hotel])

  useEffect(() => {
    applyFilters()
  }, [rooms, showAvailableOnly])

  const loadRooms = async () => {
    try {
      setLoading(true)
      const data = await apiService.getRoomsByHotelId(hotel.id)
      setRooms(data)
      setError(null)
    } catch (err) {
      setError('Failed to load rooms')
      console.error('Error loading rooms:', err)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...rooms]
    
    if (showAvailableOnly) {
      filtered = filtered.filter(room => room.availableRooms > 0)
    }
    
    setFilteredRooms(filtered)
  }

  const handleSearchResults = (searchResults) => {
    setFilteredRooms(searchResults)
  }

  const handleCreateRoom = () => {
    setEditingRoom(null)
    setShowForm(true)
  }

  const handleEditRoom = (room) => {
    setEditingRoom(room)
    setShowForm(true)
  }

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditingRoom(null)
    loadRooms()
  }

  const handleDeleteRoom = async (roomId) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        await apiService.deleteRoom(roomId)
        setRooms(rooms.filter(room => room.id !== roomId))
      } catch (err) {
        setError('Failed to delete room')
        console.error('Error deleting room:', err)
      }
    }
  }

  const handleReserveRoom = async (roomId, quantity) => {
    try {
      const updatedRoom = await apiService.reserveRooms(roomId, quantity)
      setRooms(rooms.map(room => 
        room.id === roomId ? updatedRoom : room
      ))
    } catch (err) {
      setError('Failed to reserve rooms')
      console.error('Error reserving rooms:', err)
    }
  }

  const handleReleaseRoom = async (roomId, quantity) => {
    try {
      const updatedRoom = await apiService.releaseRooms(roomId, quantity)
      setRooms(rooms.map(room => 
        room.id === roomId ? updatedRoom : room
      ))
    } catch (err) {
      setError('Failed to release rooms')
      console.error('Error releasing rooms:', err)
    }
  }

  if (loading) {
    return <div className="loading">Loading rooms...</div>
  }

  if (showForm) {
    return (
      <RoomForm
        hotel={hotel}
        room={editingRoom}
        onSuccess={handleFormSuccess}
        onCancel={() => setShowForm(false)}
      />
    )
  }

  return (
    <div className="room-management">
      <div className="room-management-header">
        <div>
          <button className="btn btn-secondary" onClick={onBack}>
            ← Back to Hotels
          </button>
          <h2>Rooms - {hotel.name}</h2>
        </div>
        <button className="btn btn-primary" onClick={handleCreateRoom}>
          Add New Room
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="room-controls">
        <RoomSearch 
          hotelId={hotel.id} 
          onResults={handleSearchResults}
          onReset={() => applyFilters()}
        />
        
        <div className="room-filters">
          <label className="filter-checkbox">
            <input
              type="checkbox"
              checked={showAvailableOnly}
              onChange={(e) => setShowAvailableOnly(e.target.checked)}
            />
            Show available rooms only
          </label>
        </div>
      </div>

      {filteredRooms.length === 0 ? (
        <div className="empty-state">
          <p>No rooms found. Create your first room!</p>
          <button className="btn btn-primary" onClick={handleCreateRoom}>
            Create Room
          </button>
        </div>
      ) : (
        <div className="rooms-grid">
          {filteredRooms.map(room => (
            <RoomCard
              key={room.id}
              room={room}
              onEdit={() => handleEditRoom(room)}
              onDelete={() => handleDeleteRoom(room.id)}
              onReserve={(quantity) => handleReserveRoom(room.id, quantity)}
              onRelease={(quantity) => handleReleaseRoom(room.id, quantity)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default RoomManagement