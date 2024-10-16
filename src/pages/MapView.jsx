import { useDispatch, useSelector } from "react-redux";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import { clearPath } from "../redux/slices/flightSlice";
import { icon } from "leaflet";
import "leaflet/dist/leaflet.css";

const MapView = ( {openModal}) => {
  const state = useSelector((store) => store.flight);
  
  const dispatch = useDispatch();
  
  const planeIcon = icon({
    iconUrl:'/plane-i.png',
    iconSize:[25,25],
  });

  return (

    <MapContainer
      center={[38.795069, 35.469991]}
      zoom={6}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
     {state.flights.map((flight) => (
      <Marker icon={planeIcon} position={[flight.lat,flight.lng]}>
        <Popup>
          <div className="popup">
            <span>Kod:{flight.code}</span>
            <button onClick={() => openModal(flight.id)}>
              Detay
           </button>
           <button onClick={() => dispatch(clearPath())}>
              Rotayı Temizle
           </button>
          </div>
        </Popup>
      </Marker>
     ))}    
      
     
      <Polyline positions= {state.path} />
    
    </MapContainer>

  )
}

export default MapView