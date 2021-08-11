// Imports for React and React-Leaflet
import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Circle, MapConsumer} from 'react-leaflet'

// Imports for the slider from ant.design
import "antd/dist/antd.css";
import { Slider } from 'antd';

// Main app. 
const App = () => {  
  const [currentValue, setCurrentValue] = useState(0) // useState hook for slider values
  const [circleLoc, setCircleLoc] = useState([14.596699688557514, 120.97303782481114]) // useState hook for circle latlng
  const [circleRad, setCircleRad] = useState(400) // useState hook for circle radius
  const [position, setPosition] = useState(null) // useState hook for marker latlng

  return (
    <div>    
    <MapContainer center = {[14.600316439299878, 120.9874556853269]} zoom = {15}> {/* Container for the Map. Has starting position and zoom level passed in as props  */}
      <MapConsumer>
        {(map) => { 
          map.whenReady(() => { // whenReady event runs when the map object is first loaded      
            map.locate() // Locates the user's location. Will ask for permission from the user first.

            map.on('locationfound', (e) => { // Event that runs when map.locate() is succesful.
              setPosition(e.latlng) // Sets marker position to user's location
              setCircleLoc(e.latlng) // Sets circle's position to user's location
              map.flyTo(e.latlng, map.getZoom()) // Pans the map from the initial location to the user's current location
            })
          })
          
          return position === null ? null : ( // Ternary operator that checks if position is null
            <Marker 
              position={position} 
              draggable = {true}
              eventHandlers={{
                drag: (e) => { // Drag event listener. Will adjust circle's location to the marker's current location when dragged
                  setCircleLoc([e.latlng.lat, e.latlng.lng])                      
                }
              }}
            >
            <Circle center={circleLoc} pathOptions={{color: "lime"}} radius={circleRad}/>
            </Marker>
          )
        }}
      </MapConsumer>                  
      <TileLayer 
        url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      /> {/* TileLayer which contains the URL to the Tile provider + attribution */}
    </MapContainer> 
    
    {/* Slider from ant.design */}
    <div style={{
      display: 'block', width: 700, padding: 30
    }}>
      <Slider defaultValue={400} disabled={false} max={2000} onChange={(value)=> {
        setCurrentValue(value)
        setCircleRad(value)
      }}/>
      Distance: {`${currentValue*1.5} m`}
    </div>  
    </div>
  )
}

export default App