import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import * as mallList from "./malls.json"
import images from './components/images'

const App = () => {
  const [activeMall, setActiveMall] = useState(null)  

  return (
    <div>    
    <MapContainer center = {[14.596699688557514, 120.97303782481114]} zoom = {30}>  
      <TileLayer 
        url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {mallList.malls.map(mall => (
        <Marker
          key = {mall.id}
          position = {[mall.location[0], mall.location[1]]}
          icon = {images(mall)}                   
        >          
          <Popup>
            <h2>{mall.name}</h2>
            <p>{mall.desc}</p>
          </Popup>
        </Marker>
      ))}     
      
    </MapContainer>     
    </div>       
  )
}

export default App