import { Button } from '../ui/button';
import axios from 'axios';
import { useState, useEffect } from 'react';
import useUserStore from '@/stores/userStore';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog';
import PropTypes from 'prop-types';
import { useMutation } from '@tanstack/react-query';
import TextInput from '../bigComponents/TextInput';
import { toast } from 'sonner'; // <-- import Sonner toast

function UserUpdateModal({ open, onClose }) {
  const user = useUserStore((state) => state.user);
  const token = JSON.parse(window.localStorage.getItem('user'));

  const [username, setUsername] = useState(user.username);
  const [address, setAddress] = useState(user.address);
  const [contactNumber, setContactNumber] = useState(user.contact_number);

  useEffect(() => {
    setUsername(user.username);
    setAddress(user.address);
    setContactNumber(user.contact_number);
  }, [user]);

  const { mutate: updateUser, isPending } = useMutation({
    mutationFn: (data) =>
      axios.put('http://localhost:3000/api/users', data, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      }),
    onSuccess: (res) => {
      useUserStore.getState().setUser(res.data);
      toast.success('Profile updated successfully!');
      onClose();
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    },
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update User Information</DialogTitle>
          <DialogDescription>
            Update your account details below.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <TextInput
            label="Username"
            type="text"
            value={username}
            onChange={setUsername}
            placeholder={user.username}
          />
          <TextInput
            label="Address"
            type="text"
            value={address}
            onChange={setAddress}
            placeholder="Enter your address"
          />
          <TextInput
            label="Contact Number"
            type="text"
            value={contactNumber}
            onChange={setContactNumber}
            placeholder="Enter your contact number"
          />

          <div className="mt-2 w-1/3">
            <Button
              disabled={
                isPending ||
                !(username || '').trim() ||
                !(address || '').trim() ||
                !(contactNumber || '').trim()
              }
              onClick={() =>
                updateUser({
                  username,
                  address,
                  contact_number: contactNumber,
                })
              }
            >
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

UserUpdateModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default UserUpdateModal;
