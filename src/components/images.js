import img1 from '../images/lc.png'
import img2 from '../images/robinsons.png'
import img3 from '../images/landers.png'
import img4 from '../images/sm.png'

import L from 'leaflet'

const images = (mall) => {
    switch(mall.type) {
        case "lcm":            
            return(new L.Icon({iconUrl: img1, iconSize: [60, 60], iconAnchor: [17,45], popupAnchor: [3, -46]}))
            break;
        case "robinsons":
            return(new L.Icon({iconUrl: img2, iconSize: [60, 60], iconAnchor: [17,45], popupAnchor: [3, -46]}))
            break;
        case "landers":
            return(new L.Icon({iconUrl: img3, iconSize: [60, 60], iconAnchor: [17,45], popupAnchor: [3, -46]}))
            break;            
        case "sm":
            return(new L.Icon({iconUrl: img4, iconSize: [60, 60], iconAnchor: [17,45], popupAnchor: [3, -46]}))
            break;
        default: 
            return(new L.Icon({iconUrl: img1}))
    }   
}

export default images   