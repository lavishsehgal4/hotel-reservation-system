import './Navigation.css'

function Navigation({ currentView, onViewChange, selectedHotel }) {
  return (
    <nav className="navigation">
      <div className="nav-brand">
        <h1>Hotel Reservation System</h1>
      </div>
      <div className="nav-links">
        <button 
          className={currentView === 'hotels' ? 'active' : ''}
          onClick={() => onViewChange('hotels')}
        >
          Hotels
        </button>
        {selectedHotel && (
          <button 
            className={currentView === 'rooms' ? 'active' : ''}
            onClick={() => onViewChange('rooms')}
          >
            Rooms - {selectedHotel.name}
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navigation