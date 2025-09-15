import { useState, useEffect } from 'react'
import apiService from '../services/api'
import HotelCard from './HotelCard'
import './HotelList.css'

function HotelList({ onSelectHotel, onCreateHotel }) {
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadHotels()
  }, [])

  const loadHotels = async () => {
    try {
      setLoading(true)
      const data = await apiService.getAllHotels()
      setHotels(data)
      setError(null)
    } catch (err) {
      setError('Failed to load hotels')
      console.error('Error loading hotels:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteHotel = async (hotelId) => {
    if (window.confirm('Are you sure you want to delete this hotel?')) {
      try {
        await apiService.deleteHotel(hotelId)
        setHotels(hotels.filter(hotel => hotel.id !== hotelId))
      } catch (err) {
        setError('Failed to delete hotel')
        console.error('Error deleting hotel:', err)
      }
    }
  }

  if (loading) {
    return <div className="loading">Loading hotels...</div>
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
        <button onClick={loadHotels}>Retry</button>
      </div>
    )
  }

  return (
    <div className="hotel-list">
      <div className="hotel-list-header">
        <h2>Hotels</h2>
        <button className="btn btn-primary" onClick={onCreateHotel}>
          Add New Hotel
        </button>
      </div>
      
      {hotels.length === 0 ? (
        <div className="empty-state">
          <p>No hotels found. Create your first hotel!</p>
          <button className="btn btn-primary" onClick={onCreateHotel}>
            Create Hotel
          </button>
        </div>
      ) : (
        <div className="hotels-grid">
          {hotels.map(hotel => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
              onSelect={() => onSelectHotel(hotel)}
              onDelete={() => handleDeleteHotel(hotel.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default HotelList