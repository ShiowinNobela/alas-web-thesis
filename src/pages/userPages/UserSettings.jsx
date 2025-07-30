import UserStats from '@/components/bigComponents/UserStats';
import { useState } from 'react';
import useUserStore from '@/stores/userStore';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAction,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import dayjs from 'dayjs';
import UserUpdateModal from '@/components/modals/UserUpdateModal';
import { Camera, Edit, Lightbulb } from 'lucide-react';

function UserSettings() {
  const user = useUserStore((state) => state.user);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  return (
    <section className="text-content bg-neutral h-full py-4">
      {/* User Information */}
      <div className="mx-auto max-w-5xl justify-center px-4 py-8 md:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="mb-2 flex items-center justify-center">
            <h1 className="text-content font-heading text-3xl font-semibold">
              Customer Profile
            </h1>
          </div>
          <p className="text-lighter flex justify-center text-lg">
            Check your profile info and see how youre doing with your latest
            stats.
          </p>
        </div>
        <div className="space-y-4">
          {/* Profile Header */}
          <Card className="relative overflow-hidden rounded-lg border-2 border-red-200">
            <div className="flex flex-col items-center px-8 py-4 text-center sm:flex-row sm:text-left">
              {/* Avatar with change button */}
              <div className="group relative">
                <img
                  className="size-22 rounded-xl border-4 border-white shadow-lg transition-all duration-300 group-hover:opacity-90"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0vehSxuqFZCFF7vZq1D0kiNm7eOEk7paxTA&s"
                  alt="Profile avatar"
                />
                <div className="bg-opacity-30 absolute inset-0 flex items-center justify-center rounded-xl bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Button
                    variant="ghost"
                    className="bg-opacity-40 hover:bg-opacity-60 bg-black text-white"
                    // onClick={() => setShowAvatarModal(true)}
                  >
                    <Camera className="mr-2 h-5 w-5" />
                    Change
                  </Button>
                </div>
              </div>

              {/* User Info */}
              <div className="mt-4 sm:mt-0 sm:ml-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                  <h2 className="text-content text-2xl font-bold">
                    {user.username}
                  </h2>
                  <span className="mt-2 inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800 sm:mt-0">
                    {user?.role_name}
                  </span>
                </div>
                <p className="text-content mt-1">{user.email}</p>
                <p className="text-lighter mt-2 text-sm">
                  Member since {dayjs(user.created_at).format('MMMM YYYY')}
                </p>
              </div>

              {/* Tips Section */}
              <div className="hidden sm:mt-0 sm:ml-auto lg:block">
                <div className="rounded-lg bg-white/80 shadow-sm backdrop-blur-sm">
                  <div className="flex items-start rounded-lg border-l-4 border-red-500 bg-gradient-to-r from-red-50 to-orange-50 p-4">
                    <Lightbulb className="mt-0.5 mr-2 h-5 w-5 text-yellow-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        Profile Tip
                      </p>
                      <p className="text-lighter mt-1 text-xs">
                        Complete your profile to get 20% more engagement from
                        other users.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress bar (optional) */}
            <div className="px-8 pb-4">
              <div className="text-lighter mb-1 flex items-center justify-between text-sm">
                <span>Profile completeness</span>
                <span>65%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-200">
                <div
                  className="bg-brand h-2 rounded-full transition-all duration-500"
                  style={{ width: '65%' }}
                ></div>
              </div>
            </div>
          </Card>

          {/* Stats Section */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <UserStats icon="star" label="Orders" stats="10" />
            <UserStats icon="star" label="Reviews" stats="20" />
            <UserStats icon="heart" label="Loyalty Points" stats="33" />
            <UserStats icon="heart" label="Last Active" stats="2h ago" />
          </div>

          {/* Details Section */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Contact Information */}
            <Card className="relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">Contact Information</CardTitle>
                <CardAction>
                  <Button
                    onClick={() => setShowUpdateModal(true)}
                    size="sm"
                    className="hover:text-content text-lighter bg-white shadow-sm hover:bg-gray-50"
                    variant="outline"
                  >
                    <Edit className="h-4 w-4" />
                    <span className="ml-2">Edit</span>
                  </Button>
                </CardAction>
              </CardHeader>
              <CardContent>
                <dl className="mt-4 space-y-4">
                  <div>
                    <dt className="text-lighter text-sm font-medium">
                      Phone Number
                    </dt>
                    <dd className="text-content mt-1 text-sm">
                      {user.contact_number || 'Not provided'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-lighter text-sm font-medium">
                      Address
                    </dt>
                    <dd className="text-content mt-1 text-sm">
                      {user.address || 'Not specified'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-lighter text-sm font-medium">
                      Additional Info
                    </dt>
                    <dd className="text-content mt-1 text-sm">
                      {user.info || 'No additional information provided.'}
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            {/* Security Information */}
            <Card className="relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">Account Security</CardTitle>
                <CardAction>
                  <Button
                    // onClick={() => setShowPasswordModal(true)}
                    size="sm"
                    className="hover:text-content text-lighter bg-white shadow-sm hover:bg-gray-50"
                    variant="outline"
                  >
                    <Edit className="h-4 w-4" />
                    <span className="ml-2">Change</span>
                  </Button>
                </CardAction>
              </CardHeader>
              <CardContent>
                <dl className="mt-4 space-y-4">
                  <div>
                    <dt className="text-lighter text-sm font-medium">
                      Password
                    </dt>
                    <dd className="text-content mt-1 text-sm">•••••••••••</dd>
                  </div>
                  <div>
                    <dt className="text-lighter text-sm font-medium">
                      Last Changed
                    </dt>
                    <dd className="text-content mt-1 text-sm">
                      {dayjs(user.password_changed_at).format('MMMM D, YYYY') ||
                        'Never'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-lighter text-sm font-medium">
                      Two-Factor Auth
                    </dt>
                    <dd className="text-content mt-1 text-sm">
                      Disabled
                      <Button
                        variant="link"
                        className="ml-2 h-auto p-0 text-sm"
                      >
                        Enable
                      </Button>
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>

          {/* Additional Information */}
          <Card className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="p-6">
              <h3 className="text-content text-lg font-medium">Activity</h3>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-lighter text-sm font-medium">Last Login</p>
                  <p className="text-content mt-1 text-sm">
                    {dayjs(user.last_login).format('MMMM D, YYYY [at] h:mm A')}
                  </p>
                </div>
                <div>
                  <p className="text-lighter text-sm font-medium">
                    Account Updated
                  </p>
                  <p className="text-content mt-1 text-sm">
                    {dayjs(user.updated_at).format('MMMM D, YYYY')}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      {/* <Toaster richColors /> */}
      <UserUpdateModal
        open={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
      />
    </section>
  );
}

export default UserSettings;
