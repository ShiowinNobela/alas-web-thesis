import { useState } from 'react';
import axios from '@/lib/axios-config'
import { useMutation } from '@tanstack/react-query';
import useUserStore from '@/stores/userStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import TextInput from '@/components/bigComponents/TextInput';
import PasswordInput from '@/components/bigComponents/PasswordInput';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { User } from 'lucide-react';
import dayjs from 'dayjs';

function UserSettings() {
  const user = useUserStore((state) => state.user);

  // Profile states
  const [username, setUsername] = useState(user.username);
  const [address, setAddress] = useState(user.address);
  const [contactNumber, setContactNumber] = useState(user.contact_number);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const { mutate: updateUser, isPending } = useMutation({
    mutationFn: (data) =>
      axios.put('/api/users', data),
    onSuccess: (res) => {
      useUserStore.getState().setUser(res.data);
      toast.success('Profile updated successfully!');
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    },
  });

  const { mutate: updatePassword, isPending: isUpdatingPassword } = useMutation({
    mutationFn: (data) =>
      axios.post('/api/users/reset', data),
    onSuccess: () => {
      toast.success('Password updated successfully!');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setErrors({ oldPassword: '', newPassword: '', confirmPassword: '' });
      setIsModalOpen(false);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Failed to update password');
    },
  });

  const handleChangePassword = (e) => {
    e.preventDefault();
    const newErrors = {
      oldPassword: oldPassword.trim() ? '' : 'Current password is required',
      newPassword: newPassword.trim() ? '' : 'New password is required',
      confirmPassword: confirmPassword.trim() ? '' : 'Confirm password is required',
    };

    if (Object.values(newErrors).some((err) => err)) {
      setErrors(newErrors);
      toast.error('Please fill in all required fields!');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        newPassword: 'Passwords do not match',
        confirmPassword: 'Passwords do not match',
      }));
      toast.error('Passwords do not match!');
      return;
    }

    updatePassword({ password: oldPassword, newPassword, confirmPassword });
  };

  return (
    <section className="min-h-screen py-10 bg-neutral">
      <div className="max-w-2xl px-4 mx-auto space-y-8 pb-25">
        {/* HEADER */}
        <div className="flex flex-col items-center justify-center mx-auto">
          <h1 className="text-5xl text-content font-heading">Profile</h1>
          <p className="mt-2 text-lighter">Your profile information here </p>
        </div>

        {/* PROFILE */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <CardContent className="py-6 text-center">
              <div className="flex items-center justify-center mx-auto mb-4 text-white rounded-full shadow-lg bg-primary size-20">
                <User size={36} />
              </div>
              <h1 className="text-xl font-semibold font-heading text-content">{user.username}</h1>
              <p className="text-sm text-lighter">{user.email}</p>
              <p className="text-sm text-content">Joined {dayjs(user.created_at).format('MMMM YYYY')}</p>
            </CardContent>
          </Card>

          {/* Stats placeholder */}
          <div className="grid grid-cols-1 gap-6">
            <Card className="transition hover:shadow-md">
              <CardContent asChild className="flex items-center justify-between h-full p-6">
                <div>
                  <CardTitle>Total Orders</CardTitle>
                  <CardDescription>The amount of sauces</CardDescription>
                </div>
                <p className="text-2xl font-heading text-primary">100</p>
              </CardContent>
            </Card>
            <Card className="transition hover:shadow-md">
              <CardContent asChild className="flex items-center justify-between h-full p-6">
                <div>
                  <CardTitle>Reviews</CardTitle>
                  <CardDescription>Sauces reviewed</CardDescription>
                </div>
                <p className="text-2xl font-heading text-primary">100</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* ACCOUNT DETAILS */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-content">Account Details</CardTitle>
            <CardDescription>Update your data as you need</CardDescription>
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

            <div className="flex justify-between pt-8">
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">Change Password</Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Change Password</DialogTitle>
                    <DialogDescription>
                      Enter your current password and set a new one
                    </DialogDescription>
                  </DialogHeader>

                  <form onSubmit={handleChangePassword} className="space-y-4">
                    <PasswordInput
                      label="Current Password"
                      value={oldPassword}
                      onChange={(val) => {
                        setOldPassword(val);
                        setErrors((prev) => ({ ...prev, oldPassword: '' }));
                      }}
                      placeholder="********"
                      error={errors.oldPassword}
                      showRequirements={false}
                    />

                    <PasswordInput
                      label="New Password"
                      value={newPassword}
                      onChange={(val) => {
                        setNewPassword(val);
                        setErrors((prev) => ({ ...prev, newPassword: '' }));
                      }}
                      placeholder="********"
                      error={errors.newPassword}
                    />

                    <PasswordInput
                      label="Confirm New Password"
                      value={confirmPassword}
                      onChange={(val) => {
                        setConfirmPassword(val);
                        setErrors((prev) => ({ ...prev, confirmPassword: '' }));
                      }}
                      placeholder="********"
                      error={errors.confirmPassword}
                      showRequirements={false}
                    />

                    <DialogFooter>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsModalOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" disabled={isUpdatingPassword}>
                        {isUpdatingPassword ? 'Updating...' : 'Update Password'}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>

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
