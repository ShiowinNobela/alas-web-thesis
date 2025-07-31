// Unlike the other modals this is a smart modal
// It handles it's own states and operations
// Because it's function is to update user info
// Which only happens on this modal anyway
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
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
import TextInput from '../TextInput';
import PasswordInput from '../PasswordInput';
import { useMutation } from '@tanstack/react-query';

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
      onClose();
    },
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update User Data</DialogTitle>
          <DialogDescription>
            Update your data for whatever you need below.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="account" className="max-w-sm">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <div className="space-y-4 py-2">
              <TextInput
                label="Username"
                type="text"
                value={username}
                onChange={setUsername}
                placeholder={user.username}
                // error={errors.username}
              />
              <TextInput
                label="Address"
                type="text"
                value={address}
                onChange={setAddress}
                placeholder={address}
                // error={errors.username}
              />
              <TextInput
                label="Contact Number"
                type="text"
                value={contactNumber}
                onChange={setContactNumber}
                placeholder={user.contact_number}
                // error={errors.username}
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
          </TabsContent>

          <TabsContent value="password">
            <div className="space-y-4 py-2">
              <PasswordInput
                label="Password"
                // value={password}
                // onChange={setPassword}
                placeholder="********"
                // error={errors.password}
                showRequirements={false}
              />
              <PasswordInput
                label="Input New Password"
                // value={password}
                // onChange={setPassword}
                placeholder="********"
                // error={errors.password}
              />
              <PasswordInput
                label="Confirm new password"
                // value={password}
                // onChange={setPassword}
                placeholder="********"
                // error={errors.password}
                showRequirements={false}
              />
              <div className="mt-2 w-full max-w-1/3">
                <Button>Update Password</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

UserUpdateModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default UserUpdateModal;
