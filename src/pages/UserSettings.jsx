import axios from 'axios';
import { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';
import PasswordInput from '../components/PasswordInput';

function UserSettings() {
  const [getInfo, setGetInfo] = useState({
    username: '',
    email: '',
    contact_number: '',
    address: '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [passwordErrors, setPasswordErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    
    if (!user || !user.token) {
      toast.error('Please login to access this page');
      return;
    }
    
    axios
      .get('/api/users', {
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setGetInfo(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        if (error.response?.status === 401) {
          toast.error('Session expired. Please login again.');
        }
      });
  }, []);

  const handleUpdateInfo = (event) => {
    event.preventDefault();
    const user = JSON.parse(window.localStorage.getItem('user'));
    axios
      .put('/api/users/', getInfo, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        response.data && setGetInfo(response.data);
        toast.success('Info Update Successful');
      })
      .catch((error) => {
        console.error('Error updating user information:', error);
        toast.error('Invalid Input!');
      });
  };

  const handleUpdatePassword = (event) => {
    event.preventDefault();
    
    // Reset errors
    setPasswordErrors({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });

    // Validation
    let hasErrors = false;
    const newErrors = {};

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
      hasErrors = true;
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = 'New password is required';
      hasErrors = true;
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters long';
      hasErrors = true;
    }

    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
      hasErrors = true;
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      hasErrors = true;
    }

    if (hasErrors) {
      setPasswordErrors(newErrors);
      toast.error('Please fix the errors below');
      return;
    }

    const user = JSON.parse(window.localStorage.getItem('user'));
    
    if (!user || !user.token) {
      toast.error('Authentication required. Please login again.');
      return;
    }
    
    const updateData = {
      password: passwordData.currentPassword,
      newPassword: passwordData.newPassword,
      confirmPassword: passwordData.confirmPassword,
    };

    axios
      .post('/api/users/reset', updateData, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        setPasswordErrors({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        toast.success('Password Updated Successfully!');
      })
      .catch((error) => {
        if (error.response?.status === 400) {
          const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Current password is incorrect';
          setPasswordErrors({ currentPassword: errorMessage });
          toast.error(errorMessage);
        } else if (error.response?.status === 401) {
          toast.error('Authentication failed. Please login again.');
        } else {
          const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Failed to update password. Please try again.';
          toast.error(errorMessage);
        }
      });
  };

  return (
    <div className="flex min-h-full bg-gradient-to-b from-[#e8e6c2] to-[#eaeae7] justify-center items-center">
      {/* User Information */}
      <div className="mx-auto flex h-full max-w-7xl flex-col gap-8 p-10 lg:flex-row items-center">
        {/* Left Side */}
        <div className="flex h-9/11 flex-col rounded-3xl bg-white/70 p-8 text-black shadow-md">
          <p className="mb-5 text-3xl font-bold uppercase lg:text-4xl">
            User Info
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col">
              <p className="mb-2 text-black">Username</p>
              <input
                value={getInfo?.username}
                onChange={(e) =>
                  setGetInfo({ ...getInfo, username: e.target.value })
                }
                type="text"
                id="name"
                className="h-12 rounded-md px-4 text-[#000000]"
              />
            </div>

            <div className="flex flex-col">
              <p className="mb-2 text-black">Email</p>
              <input
                type="email"
                id="email"
                value={getInfo?.email}
                onChange={(e) =>
                  setGetInfo({ ...getInfo, email: e.target.value })
                }
                className="h-12 rounded-md px-4 text-[#000000]"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col">
            <p className="mb-2 text-black">Contact Number</p>
            <input
              type="text"
              id="subject"
              className="h-12 rounded-md px-4 text-[#000000]"
              value={getInfo?.contact_number}
              onChange={(e) =>
                setGetInfo({ ...getInfo, contact_number: e.target.value })
              }
            />
          </div>

          <div className="mt-6 flex flex-col">
            <p className="mb-2 text-black">Address</p>
            <textarea
              id="message"
              rows={2}
              className="resize-none rounded-md px-4 py-3 text-[#000000]"
              value={getInfo?.address}
              onChange={(e) =>
                setGetInfo({ ...getInfo, address: e.target.value })
              }
            />
          </div>
          <div className="pb-8">
            <button
              className="bg-secondary mt-8 h-12 w-full rounded-md border-1 border-[#5b5b58] font-semibold text-[#000000] uppercase transition hover:bg-[#6c6c6a] hover:text-black"
              onClick={handleUpdateInfo}
            >
              Save Info
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex h-9/11 flex-col rounded-3xl bg-white/70 p-8 text-black shadow-md">
          <p className="mb-5 text-3xl font-bold uppercase lg:text-4xl">
            Change Password
          </p>

          <div className="space-y-6">
            <PasswordInput
              label="Current Password"
              value={passwordData.currentPassword}
              onChange={(value) =>
                setPasswordData({ ...passwordData, currentPassword: value })
              }
              placeholder="Enter your current password"
              error={passwordErrors.currentPassword}
              showRequirements={false}
            />

            <PasswordInput
              label="New Password"
              value={passwordData.newPassword}
              onChange={(value) =>
                setPasswordData({ ...passwordData, newPassword: value })
              }
              placeholder="Enter your new password"
              error={passwordErrors.newPassword}
              showRequirements={true}
            />

            <PasswordInput
              label="Confirm New Password"
              value={passwordData.confirmPassword}
              onChange={(value) =>
                setPasswordData({ ...passwordData, confirmPassword: value })
              }
              placeholder="Confirm your new password"
              error={passwordErrors.confirmPassword}
              showRequirements={false}
            />
          </div>

          <div className="pb-8">
            <button
              className="bg-secondary mt-8 h-12 w-full rounded-md border-1 border-[#5b5b58] font-semibold text-[#000000] uppercase transition hover:bg-[#6c6c6a] hover:text-black"
              onClick={handleUpdatePassword}
            >
              Update Password
            </button>
          </div>
        </div> 
      </div>
      <Toaster richColors />
    </div>
  );
}

export default UserSettings;
