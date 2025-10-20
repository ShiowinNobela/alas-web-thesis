import PropTypes from 'prop-types';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { Button } from '@/components/ui/button';
import axios from '@/lib/axios-config';

function LocationMarker({ onSelect }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onSelect(e.latlng);
    },
  });

  return position ? <Marker position={position} /> : null;
}

function LocationPickerModal({ open, setOpen, onSave, onError }) {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [additionalAddress, setAdditionalAddress] = useState('');

  const handleConfirm = async () => {
    if (!selectedLocation) return;
    setLoading(true);
    try {
      const res = await axios.post('/api/landmarks', {
        latitude: selectedLocation.lat,
        longitude: selectedLocation.lng,
        additional_address: additionalAddress,
      });
      onSave(res.data.data.address);
      setOpen(false);
    } catch (err) {
        onError?.(err?.response?.data?.message || 'Failed to save location! please try again!');
    }finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-full h-[70vh] sm:max-w-lg flex flex-col">
        <DialogHeader>
          <DialogTitle>Pin Your Delivery Location 📍</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden rounded-md">
          <MapContainer
            center={[14.6760, 121.0437]} // Default for QC (Update this if we adding auto set for locations latur)
            zoom={13}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap contributors'
            />
            <LocationMarker onSelect={setSelectedLocation} />
          </MapContainer>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button disabled={!selectedLocation || loading} onClick={handleConfirm}>
            {loading ? 'Saving…' : 'Confirm'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

LocationPickerModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onError: PropTypes.func,
};

export default LocationPickerModal;
