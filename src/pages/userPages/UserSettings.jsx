import UserStats from '@/components/bigComponents/UserStats';
import { useState } from 'react';
// import { Toaster, toast } from 'sonner';

import useUserStore from '@/stores/userStore';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import dayjs from 'dayjs';
import UserUpdateModal from '@/components/modals/UserUpdateModal';

function UserSettings() {
  const user = useUserStore((state) => state.user);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  return (
    <section className="text-content h-full bg-white py-4">
      {/* User Information */}
      <div className="mx-auto max-w-5xl justify-center px-4 py-8 md:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <div className="mb-2 flex items-center justify-center">
            <h1 className="text-content font-heading text-3xl font-semibold">
              Customer Profile
            </h1>
          </div>
          <p className="text-lighter mx-auto max-w-3xl text-lg">
            Check your profile info and see how you're doing with your latest
            stats.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <UserStats icon="heart" label="Order Count" stats="10" />
          <UserStats icon="heart" label="Reviews" stats="20" />
          <UserStats icon="heart" label="Loyalty Points" stats="33" />
          <UserStats icon="heart" label="hello" stats="101" />
        </div>

        <div className="py-4">
          <Card className="mb-4 grid gap-4 p-8 sm:grid-cols-2 sm:gap-8 lg:gap-16">
            <div className="space-y-5">
              <div className="flex space-x-4">
                <img
                  className="h-16 w-16 rounded-lg"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0vehSxuqFZCFF7vZq1D0kiNm7eOEk7paxTA&s"
                  alt="Helene avatar"
                />
                <div>
                  <span className="bg-secondary text-primary mb-2 inline-block rounded px-2.5 py-0.5 text-xs font-medium">
                    {user?.role_name}
                  </span>
                  <h2 className="font-heading flex items-center text-xl font-bold sm:text-2xl">
                    {user.username}
                  </h2>
                </div>
              </div>
              <dl className="text-content">
                <dt className="text-lighter text-sm">Email Address</dt>

                <dd className="text-content flex items-center gap-1">
                  {user.email}
                </dd>
              </dl>
              <dl>
                <dt className="text-lighter text-sm">Home Address</dt>
                <dd className="flex items-center gap-1">{user.address}</dd>
              </dl>
              <dl>
                <dt className="text-lighter text-sm">Info</dt>
                <dd className="flex items-center">
                  {user.info || 'No additional info provided.'}
                </dd>
              </dl>
            </div>
            <div className="space-y-5">
              <dl>
                <dt className="text-lighter text-sm">Phone Number</dt>
                <dd className="text-content">{user.contact_number}</dd>
              </dl>
              <dl>
                <dt className="text-lighter text-sm">Account creation date</dt>
                <dd className="flex items-center gap-1">
                  {dayjs(user.created_at).format('MMMM D, YYYY')}
                </dd>
              </dl>
              <dl>
                <dt className="text-lighter text-sm">Last Account Update</dt>
                {dayjs(user.updated_at).format('MMMM D, YYYY')}
              </dl>
              <dl>
                <dt className="text-lighter mb-1 text-sm">Payment Methods</dt>
                <dd className="text-lighter flex items-center space-x-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                    <img
                      className="h-4 w-auto dark:hidden"
                      src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg"
                      alt=""
                    />
                    <img
                      className="hidden h-4 w-auto dark:flex"
                      src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa-dark.svg"
                      alt=""
                    />
                  </div>
                  <div>
                    <div className="text-sm">
                      <p className="mb-0.5 font-medium">Visa ending in 7658</p>
                      <p className="text-lighter font-normal">Expiry 10/2024</p>
                    </div>
                  </div>
                </dd>
              </dl>
            </div>
          </Card>
          <Button
            onClick={() => {
              setShowUpdateModal(true);
            }}
          >
            Edit your Data
          </Button>
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
