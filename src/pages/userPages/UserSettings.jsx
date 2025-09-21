import { useState, useEffect } from 'react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import useUserStore from '@/stores/userStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import TextInput from '@/components/bigComponents/TextInput';
import { toast } from 'sonner';
import { User } from 'lucide-react';
import dayjs from 'dayjs';

function UserSettings() {
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
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    },
  });

  return (
    <section className="bg-neutral min-h-screen py-10">
      <div className="mx-auto max-w-2xl space-y-8 px-4 pb-25">
        <div className="mx-auto flex flex-col items-center justify-center">
          <h1 className="text-content font-heading text-5xl">Profile</h1>
          <p className="text-lighter mt-2">Your profile information here </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Profile Card (Left) */}
          <Card>
            <CardContent className="py-6 text-center">
              <div className="bg-primary mx-auto mb-4 flex size-20 items-center justify-center rounded-full text-white shadow-lg">
                <User size={36} />
              </div>
              <h1 className="font-heading text-content text-xl font-semibold">{user.username}</h1>
              <p className="text-lighter text-sm">{user.email}</p>
              <p className="text-content text-sm">Joined {dayjs(user.created_at).format('MMMM YYYY')}</p>
            </CardContent>
          </Card>
          {/* Stats (Right) */}
          <div className="grid grid-cols-1 gap-6">
            <Card className="transition hover:shadow-md">
              <CardContent asChild className="flex h-full items-center justify-between p-6">
                <div>
                  <CardTitle>Total Orders</CardTitle>
                  <CardDescription>The amount of sauces </CardDescription>
                </div>
                <p className="font-heading text-primary text-2xl">100</p>
              </CardContent>
            </Card>
            <Card className="transition hover:shadow-md">
              <CardContent asChild className="flex h-full items-center justify-between p-6">
                <div>
                  <CardTitle>Reviews</CardTitle>
                  <CardDescription>Sauces reviewed</CardDescription>
                </div>
                <p className="font-heading text-primary text-2xl">100</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Account Details + Editable Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-content text-xl">Account Details</CardTitle>
            <CardDescription>Update your data as you need </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <TextInput
              label="Username"
              type="text"
              value={username}
              onChange={setUsername}
              placeholder="Enter your username"
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

            <div className="flex justify-end pt-8">
              <Button
                disabled={
                  isPending || !(username || '').trim() || !(address || '').trim() || !(contactNumber || '').trim()
                }
                onClick={() =>
                  updateUser({
                    username,
                    address,
                    contact_number: contactNumber,
                  })
                }
              >
                {isPending ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default UserSettings;
