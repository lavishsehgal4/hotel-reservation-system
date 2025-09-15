import { useState } from 'react'
import './App.css'
import HotelList from './components/HotelList'
import HotelForm from './components/HotelForm'
import RoomManagement from './components/RoomManagement'
import Navigation from './components/Navigation'

function App() {
  const [currentView, setCurrentView] = useState('hotels')
  const [selectedHotel, setSelectedHotel] = useState(null)

  const renderCurrentView = () => {
    switch (currentView) {
      case 'hotels':
        return (
          <HotelList
            onSelectHotel={setSelectedHotel}
            onCreateHotel={() => setCurrentView('create-hotel')}
          />
        )
      case 'create-hotel':
        return (
          <HotelForm
            onSuccess={() => {
              setCurrentView('hotels')
              setSelectedHotel(null)
            }}
            onCancel={() => setCurrentView('hotels')}
          />
        )
      case 'edit-hotel':
        return (
          <HotelForm
            hotel={selectedHotel}
            onSuccess={() => {
              setCurrentView('hotels')
              setSelectedHotel(null)
            }}
            onCancel={() => setCurrentView('hotels')}
          />
        )
      case 'rooms':
        return (
          <RoomManagement
            hotel={selectedHotel}
            onBack={() => setCurrentView('hotels')}
          />
        )
      default:
        return <HotelList onSelectHotel={setSelectedHotel} />
    }
  }

  return (
    <div className="app">
      <Navigation
        currentView={currentView}
        onViewChange={setCurrentView}
        selectedHotel={selectedHotel}
      />
      <main className="main-content">
        {renderCurrentView()}
      </main>
    </div>
  )
}

export default App
