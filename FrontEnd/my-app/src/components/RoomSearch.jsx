import { useState } from 'react'
import apiService from '../services/api'
import './RoomSearch.css'

function RoomSearch({ hotelId, onResults, onReset }) {
  const [filters, setFilters] = useState({
    roomType: '',
    minPrice: '',
    maxPrice: '',
    minCapacity: ''
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

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Filter out empty values
      const searchFilters = Object.entries(filters).reduce((acc, [key, value]) => {
        if (value !== '') {
          acc[key] = value
        }
        return acc
      }, {})

      const results = await apiService.searchRooms(hotelId, searchFilters)
      onResults(results)
    } catch (err) {
      setError('Failed to search rooms')
      console.error('Error searching rooms:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setFilters({
      roomType: '',
      minPrice: '',
      maxPrice: '',
      minCapacity: ''
    })
    setError(null)
    onReset()
  }

  const hasActiveFilters = Object.values(filters).some(value => value !== '')

  return (
    <div className="room-search">
      <h3>Search & Filter Rooms</h3>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSearch}>
        <div className="search-grid">
          <div className="search-group">
            <label>Room Type</label>
            <select
              value={filters.roomType}
              onChange={(e) => handleFilterChange('roomType', e.target.value)}
            >
              <option value="">All types</option>
              {roomTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <div className="search-group">
            <label>Min Price</label>
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
            />
          </div>
          
          <div className="search-group">
            <label>Max Price</label>
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="999.99"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
            />
          </div>
          
          <div className="search-group">
            <label>Min Capacity</label>
            <input
              type="number"
              min="1"
              placeholder="1"
              value={filters.minCapacity}
              onChange={(e) => handleFilterChange('minCapacity', e.target.value)}
            />
          </div>
        </div>
        
        <div className="search-actions">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
          
          {hasActiveFilters && (
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={handleReset}
            >
              Clear Filters
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default RoomSearch