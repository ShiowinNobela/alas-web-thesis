import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix missing default Leaflet marker icons in React builds
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export const STORE_LOCATION = {
  lat: 14.6676,
  lng: 121.0736,
  address: 'Old Balara, Tandang Sora Avenue Quezon City, Philippines'
};

export default function StoreLocationCard() {
  return (
    <Card className="pb-0">
      <CardHeader>
        <CardTitle className="text-lg font-bold">Our Walk In Store Location</CardTitle>
        <CardDescription>{STORE_LOCATION.address}</CardDescription>
      </CardHeader>
      <CardContent className="p-0 z-49">
        <MapContainer
          center={[STORE_LOCATION.lat, STORE_LOCATION.lng]}
          zoom={21}
          scrollWheelZoom={false}
          dragging={false}
          doubleClickZoom={false}
          zoomControl={false}
          style={{ height: '300px', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[STORE_LOCATION.lat, STORE_LOCATION.lng]}>
            <Popup>
              <b>Alas Delis & Spices</b>
              <br />
              {STORE_LOCATION.address}
            </Popup>
          </Marker>
        </MapContainer>
      </CardContent>
    </Card>
  );
}
