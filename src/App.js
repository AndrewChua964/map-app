import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, Circle, useMapEvents, MapConsumer} from 'react-leaflet'
import L from 'leaflet'

import "antd/dist/antd.css";
import { Slider } from 'antd';

const App = () => {  
  const [currentValue, setCurrentValue] = useState(0)
  const [circleLoc, setCircleLoc] = useState([14.596699688557514, 120.97303782481114])  
  const [circleRad, setCircleRad] = useState(400)
  const [position, setPosition] = useState(null)  

  return (
    <div>    
    <MapContainer center = {[14.612822777072683, 120.94886916809494]} zoom = {15}>
      <MapConsumer>
        {(map) => {
          map.whenReady(() => {            
            map.locate()

            map.on('locationfound', (e) => {
              setPosition(e.latlng)
              setCircleLoc(e.latlng)
              map.flyTo(e.latlng, map.getZoom())
            })
          })
          
          return position === null ? null : (
            <Marker
              position={position}
              draggable = {true}
              eventHandlers={{
                drag: (e) => {
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
      />
    </MapContainer> 

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