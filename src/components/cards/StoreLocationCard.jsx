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

export default function StoreLocationCard() {
  // Approximate coordinates for Old Balara, Tandang Sora Ave, Quezon City
  const storeLocation = [14.6676, 121.0736];

  return (
    <Card className="pb-0">
      <CardHeader>
        <CardTitle className="text-lg font-bold">Our Walk In Store Location</CardTitle>
        <CardDescription>Old Balara, Tandang Sora Avenue Quezon City, Philippines</CardDescription>
      </CardHeader>
      <CardContent className="z-49 p-0">
        <MapContainer
          center={storeLocation}
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
          <Marker position={storeLocation}>
            <Popup>
              <b>Alas Delis & Spices</b>
              <br />
              Old Balara, Tandang Sora Ave, QC
            </Popup>
          </Marker>
        </MapContainer>
      </CardContent>
    </Card>
  );
}
