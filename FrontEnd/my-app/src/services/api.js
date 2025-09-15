const API_BASE_URL = 'http://localhost:9090';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Handle empty responses (like DELETE operations)
      if (response.status === 204) {
        return null;
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Hotel API methods
  async getAllHotels() {
    return this.request('/hotels');
  }

  async getHotelById(id) {
    return this.request(`/hotels/${id}`);
  }

  async createHotel(hotelData) {
    
    return this.request('/hotels', {
      method: 'POST',
      body: JSON.stringify(hotelData),
    });
  }

  async updateHotel(id, hotelData) {
    return this.request(`/hotels/update/${id}`, {
      method: 'PUT',
      body: JSON.stringify(hotelData),
    });
  }

  async updateHotelAmenities(id, amenitiesData) {
    return this.request(`/hotels/${id}/amenities`, {
      method: 'PUT',
      body: JSON.stringify(amenitiesData),
    });
  }

  async deleteHotel(id) {
    return this.request(`/hotels/remove/${id}`, {
      method: 'DELETE',
    });
  }

  // Room API methods
  async createRoom(roomData) {
    return this.request('/rooms', {
      method: 'POST',
      body: JSON.stringify(roomData),
    });
  }

  async getRoomsByHotelId(hotelId) {
    return this.request(`/rooms/hotels/${hotelId}`);
  }

  async updateRoom(roomId, roomData) {
    return this.request(`/rooms/${roomId}`, {
      method: 'PUT',
      body: JSON.stringify(roomData),
    });
  }

  async deleteRoom(roomId) {
    return this.request(`/rooms/${roomId}`, {
      method: 'DELETE',
    });
  }

  async getAvailableRooms(hotelId, minVal = 0) {
    return this.request(`/rooms/hotels/${hotelId}/available?minVal=${minVal}`);
  }

  async searchRooms(hotelId, filters = {}) {
    const params = new URLSearchParams();
    
    if (filters.roomType) params.append('roomType', filters.roomType);
    if (filters.minPrice) params.append('minPrice', filters.minPrice);
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
    if (filters.minCapacity) params.append('minCapacity', filters.minCapacity);
    
    const queryString = params.toString();
    const endpoint = `/rooms/hotels/${hotelId}/search${queryString ? `?${queryString}` : ''}`;
    
    return this.request(endpoint);
  }

  async reserveRooms(roomId, roomsToReserve) {
    return this.request(`/rooms/${roomId}/reserve?roomsToReserve=${roomsToReserve}`, {
      method: 'PUT',
    });
  }

  async releaseRooms(roomId, roomsToRelease) {
    return this.request(`/rooms/${roomId}/release?roomsToRelease=${roomsToRelease}`, {
      method: 'PUT',
    });
  }
}

export default new ApiService();