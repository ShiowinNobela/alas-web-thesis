import { useState } from 'react';
import useUserStore from '@/stores/userStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import dayjs from 'dayjs';
import UserUpdateModal from '@/components/modals/UserUpdateModal';
import {
  Edit,
  Calendar,
  Phone,
  MapPin,
  User as UserIcon,
  Lock,
  Bell,
  Package,
  Star,
  Flame,
  ShoppingCart,
  Award,
} from 'lucide-react';

function UserSettings() {
  const user = useUserStore((state) => state.user);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  // Dunno yet what to actually put here or design but I am keeping this look for now
  // Needs refactoring too
  return (
    <section className="bg-neutral min-h-screen py-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="font-heading text-content text-4xl font-bold">
            Hot Sauce Account
          </h1>
          <p className="text-lighter mt-2 font-medium">
            Your spicy profile at a glance and ready to update!
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="ring-primary relative overflow-hidden bg-white shadow-sm lg:col-span-1">
            <div className="absolute top-0 right-0 h-32 w-32 translate-x-16 -translate-y-16 rotate-45 transform bg-gradient-to-br from-red-50 to-amber-50"></div>

            <CardHeader className="flex flex-col items-center p-6 pt-10">
              <div className="relative mb-4">
                <div className="text-content flex size-24 items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-50 text-3xl font-bold shadow-inner">
                  {user.username?.[0]?.toUpperCase() || (
                    <UserIcon size={40} className="text-gray-400" />
                  )}
                </div>
                <div className="absolute inset-0 rounded-full"></div>
                <div className="absolute -inset-1 rounded-full"></div>
              </div>

              <h2 className="text-content font-heading text-2xl font-semibold">
                {user.username}
              </h2>
              <p className="text-lighter mt-1 text-sm">{user.email}</p>

              <span className="font-heading mt-3 rounded-full bg-gray-50 px-3 py-1 text-sm text-gray-700">
                {user.role_name === 'customer' && (
                  <>
                    <Flame className="mr-1 inline h-3 w-3 text-amber-500" />
                    Sauce Enthusiast
                  </>
                )}
              </span>

              <Button
                onClick={() => setShowUpdateModal(true)}
                variant="outline"
                size="lg"
                className="mt-5"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </CardHeader>

            {/* Footer with subtle accent */}
            <CardContent className="px-6 pb-6 text-center text-sm text-gray-500">
              <div className="inline-flex items-center">
                <Calendar className="mr-1 h-3 w-3" />
                Member since {dayjs(user.created_at).format('MMMM YYYY')}
                {dayjs().diff(user.created_at, 'year') >= 1 && (
                  <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs">
                    {dayjs().diff(user.created_at, 'year')} year
                    {dayjs().diff(user.created_at, 'year') !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4 lg:col-span-2">
            <Card className="font-heading flex flex-col items-center justify-center rounded-lg bg-white px-4 py-6 transition-all hover:-translate-y-1 hover:bg-red-50 hover:shadow-md">
              <div className="mb-3 rounded-full bg-red-100 p-3">
                <ShoppingCart className="text-red-600" size={24} />
              </div>
              <p className="font-heading text-3xl font-bold text-red-900">12</p>
              <p className="text-sm font-medium tracking-wider text-red-600 uppercase">
                Bottles Ordered
              </p>
            </Card>

            <Card className="font-heading flex flex-col items-center justify-center rounded-lg bg-white px-4 py-6 transition-all hover:-translate-y-1 hover:bg-amber-50 hover:shadow-md">
              <div className="mb-3 rounded-full bg-amber-100 p-3">
                <Star className="text-amber-500" size={24} />
              </div>
              <p className="font-heading text-3xl font-bold text-amber-900">
                5
              </p>
              <p className="text-sm font-medium tracking-wider text-amber-600 uppercase">
                Hot Reviews
              </p>
            </Card>

            <Card className="font-heading flex flex-col items-center justify-center rounded-lg bg-white px-4 py-6 transition-all hover:-translate-y-1 hover:bg-pink-50 hover:shadow-md">
              <div className="mb-3 rounded-full bg-pink-100 p-3">
                <Flame className="text-pink-500" size={24} />
              </div>
              <p className="font-heading text-3xl font-bold text-pink-900">8</p>
              <p className="text-sm font-medium tracking-wider text-pink-600 uppercase">
                Wishlist Items
              </p>
            </Card>

            <Card className="font-heading flex flex-col items-center justify-center rounded-lg bg-white px-4 py-6 transition-all hover:-translate-y-1 hover:bg-orange-50 hover:shadow-md">
              <div className="mb-3 rounded-full bg-orange-100 p-3">
                <Award className="text-orange-600" size={24} />
              </div>
              <p className="font-heading text-3xl font-bold text-orange-900">
                240
              </p>
              <p className="text-sm font-medium tracking-wider text-orange-600 uppercase">
                Spice Points
              </p>
            </Card>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Card className="relative overflow-hidden bg-white shadow-lg transition-all hover:shadow-red-200">
            <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-red-100 opacity-30"></div>
            <CardHeader className="relative z-10 pb-2">
              <CardTitle className="font-heading flex items-center gap-3 text-red-900">
                <div className="rounded-full bg-red-100 p-2">
                  <Phone size={18} className="text-red-600" />
                </div>
                <span className="font-bold">Sauce Hotline</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 pt-0">
              <p className="text-lg font-medium text-red-800">
                {user.contact_number || (
                  <span className="text-red-400 italic">
                    Add number for spicy updates
                  </span>
                )}
              </p>
              {user.contact_number && (
                <div className="mt-2 inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-600">
                  <Flame className="mr-1 inline h-3 w-3" />
                  We'll call you for hot sauce alerts
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-white shadow-lg transition-all hover:shadow-amber-200">
            <div className="absolute -top-6 -right-6 h-28 w-28 rotate-45 bg-amber-100 opacity-20"></div>
            <CardHeader className="relative z-10 pb-2">
              <CardTitle className="font-heading flex items-center gap-3 text-amber-900">
                <div className="rounded-full bg-amber-100 p-2">
                  <MapPin size={18} className="text-amber-600" />
                </div>
                <span className="font-bold">Sauce Delivery</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 pt-0">
              <p className="text-lg font-medium text-amber-800">
                {user.address || (
                  <span className="text-amber-400 italic">
                    Where to send your heat?
                  </span>
                )}
              </p>
              {user.address && (
                <div className="mt-2 inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-600">
                  <Package className="mr-1 inline h-3 w-3" />
                  Sent 4 orders to this address
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-white shadow-lg transition-all hover:shadow-orange-200">
            <div className="absolute -bottom-4 -left-4 h-20 w-20 rounded-full bg-orange-100 opacity-20"></div>
            <CardHeader className="relative z-10 pb-2">
              <CardTitle className="font-heading flex items-center gap-3 text-orange-900">
                <div className="rounded-full bg-orange-100 p-2">
                  <Calendar size={18} className="text-orange-600" />
                </div>
                <span className="font-bold">Spice Veteran</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 pt-0">
              <p className="text-lg font-medium text-orange-800">
                {dayjs(user.created_at).format('MMMM D, YYYY')}
              </p>
              <div className="mt-2 inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-600">
                <Award className="mr-1 h-3 w-3" />
                {dayjs().diff(user.created_at, 'year')} year
                {dayjs().diff(user.created_at, 'year') !== 1 ? 's' : ''} of heat
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-white shadow-lg transition-all hover:shadow-red-200">
            <div className="absolute -right-4 -bottom-4 h-16 w-16 rounded-full bg-red-200 opacity-20"></div>
            <CardHeader className="relative z-10 pb-2">
              <CardTitle className="font-heading flex items-center gap-3 text-red-900">
                <div className="rounded-full bg-red-100 p-2">
                  <Flame size={18} className="text-red-600" />
                </div>
                <span className="font-bold">Heat Meter</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 pt-0">
              <div className="mb-2 flex items-center justify-between text-sm font-medium text-red-800">
                <span>Mild</span>
                <span className="text-red-600">Your Level</span>
                <span>Extreme</span>
              </div>
              <div className="h-3 w-full rounded-full bg-gradient-to-r from-yellow-300 via-orange-400 to-red-600">
                <div
                  className="bg-opacity-70 relative h-3 rounded-full bg-white shadow-lg"
                  style={{ width: '25%', left: '75%' }}
                >
                  <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-600"></div>
                </div>
              </div>
              <p className="mt-3 text-sm font-medium text-red-800">
                You're at <span className="font-bold text-red-600">75/100</span>{' '}
                -
                <span className="ml-1 rounded bg-red-100 px-2 py-0.5 text-xs">
                  Hot Sauce Connoisseur
                </span>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap justify-center gap-4 pt-8">
          <Button
            variant="outline"
            className="flex items-center gap-2 text-red-700 hover:bg-red-50"
          >
            <Lock size={16} className="text-red-600" /> Change Password
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2 text-amber-700 hover:bg-amber-50"
          >
            <Bell size={16} className="text-amber-600" /> Manage Notifications
          </Button>
          <Button className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-amber-600 text-white hover:from-red-700 hover:to-amber-700">
            <Flame size={16} />
            Cool Gradient Button
          </Button>
        </div>
      </div>

      <UserUpdateModal
        open={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
      />
    </section>
  );
}

export default UserSettings;
