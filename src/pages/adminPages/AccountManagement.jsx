import { useState } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Button } from 'flowbite-react';
import { UserCircle, Users, User, Contact, UserPlus } from 'lucide-react';
import ButtonGroupFilter from '@/components/bigComponents/ButtonGroupFilter';
import AddUserModal from '@/components/modals/AddUserModal';
import AdminUsersTable from '@/components/tables/AdminUsersTable';

const fetchAdminUsers = async (role) => {
  const params = {};
  if (role && role !== 'All') params.role = role;
  const res = await axios.get('/api/adminUser', { params });
  return res.data.data || [];
};

function AccountManagement() {
  const [statusFilter, setStatusFilter] = useState('All');
  const [openModal, setOpenModal] = useState(false);

  const queryClient = useQueryClient();

  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['adminUsers', statusFilter],
    queryFn: () => fetchAdminUsers(statusFilter),
  });

  const toggleUserStatus = useMutation({
    mutationFn: async ({ id, newStatus }) => {
      const response = await axios.patch(`/api/adminUser/manage/${id}`, {
        is_active: newStatus,
      });
      return response.data;
    },
    onMutate: async ({ id, newStatus }) => {
      await queryClient.cancelQueries(['adminUsers']);

      const previousUsers = queryClient.getQueryData(['adminUsers', statusFilter]);

      // Optimistically update
      queryClient.setQueryData(['adminUsers', statusFilter], (old) =>
        old?.map((user) => (user.id === id ? { ...user, is_active: newStatus, _isUpdating: true } : user))
      );

      return { previousUsers, id };
    },
    onError: (context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(['adminUsers', statusFilter], context.previousUsers);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(['adminUsers']);
    },
  });

  const filteredUsers =
    statusFilter === 'All'
      ? users
      : users.filter((user) => user.role_name.toLowerCase() === statusFilter.toLowerCase());

  const roleTabs = [
    { label: 'All', value: 'All', icon: UserCircle },
    { label: 'Admin', value: 'admin', icon: Users },
    { label: 'Staff', value: 'staff', icon: User },
    { label: 'Customer', value: 'customer', icon: Contact },
  ];

  return (
    <div className="bg-admin flex h-full flex-col overflow-x-auto p-4">
      <main className="bg-card mx-auto w-full overflow-x-auto rounded-xl border shadow ring-1 dark:text-white">
        <div className="flex flex-row justify-between p-5">
          <ButtonGroupFilter
            options={roleTabs}
            value={statusFilter}
            onChange={setStatusFilter}
            color="alternative"
            className="border border-black dark:border-white"
          />

          <Button color="gray" className="gap-2" onClick={() => setOpenModal(true)}>
            <UserPlus className="h-5 w-5" />
            Add User
          </Button>
        </div>

        <AdminUsersTable
          users={filteredUsers}
          isLoading={isLoading}
          isError={isError}
          onToggleStatus={(user) => toggleUserStatus.mutate({ id: user.id, newStatus: !user.is_active })}
        />
      </main>
      <AddUserModal show={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
}

export default AccountManagement;
