import { useState } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Button } from 'flowbite-react';
import { UserCircle, Users, User, Contact, UserPlus } from 'lucide-react';
import ButtonGroupFilter from '@/components/bigComponents/ButtonGroupFilter';
import AddUserModal from '@/components/modals/AddUserModal';
import AdminUsersTable from '@/components/tables/AdminUsersTable';
import RoleBadge from '@/components/bigComponents/RoleBadge';
import TableSkeleton from '@/components/skeletons/TableSkeleton';
import EmptyState from '@/components/States/EmptyState';
import ErrorState from '@/components/States/ErrorState';
import { toast, Toaster } from "sonner";

const fetchUser = async () => {
  const user = JSON.parse(window.localStorage.getItem('user'));
  const res = await axios.get('/api/users', {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  return res.data;
};

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
  const {isLoading: isVerifyingUser, isError: isVerificationError } = useQuery({
    queryKey: ['currentUser'],
    queryFn: fetchUser,
    onSuccess: (data) => {
      if (data.role_name !== 'admin') {
        window.location.href = '/';
      }
    },
    onError: () => {
      console.error('Unable to fetch user.');
      if (error.response?.status === 401) {
        window.location.href = '/login';
      }
    },
    retry: 1,
  });

  const {
    data: users = [],
    isLoading: isUsserLoading,
    isError: isUserError,
    refetch: refetchUsers
  } = useQuery({
    queryKey: ['adminUsers', statusFilter],
    queryFn: () => fetchAdminUsers(statusFilter),
    enabled: !isVerifyingUser && !isVerificationError,
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
    onError: (error) => {
      console.error('Error updating user status:', error);
      toast.error('Failed to update user status. Please try again.');
    }
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

  if (isVerifyingUser) {
    return (
      <div className="flex items-center justify-center h-full p-4 bg-admin">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto border-b-2 border-gray-900 rounded-full animate-spin"></div>
          <p className="mt-2">Verifying permissions...</p>
        </div>
      </div>
    );
  }     

  return (
    <>
    <Toaster richColors />
      <div className="flex flex-col h-full p-4 overflow-x-auto bg-admin">
        <main className="w-full mx-auto overflow-x-auto border shadow bg-card rounded-xl ring-1 dark:text-white">
          <div className="flex flex-row justify-between p-5">
            <ButtonGroupFilter
              options={roleTabs}
              value={statusFilter}
            onChange={setStatusFilter}
            color="alternative"
            className="border border-black dark:border-white" />

          <Button color="gray" className="gap-2" onClick={() => setOpenModal(true)}>
            <UserPlus className="w-5 h-5" />
            Add User
          </Button>
        </div>

        {isUsserLoading ? (
          <TableSkeleton rowCount={5} colCount={6} />
        ) : isUserError ? (
          <ErrorState
            error={isUserError}
            onRetry={refetchUsers}
            title="Failed to load users"
            retryText="Retry Request"
          />
        ) : (
          <AdminUsersTable
            users={filteredUsers}
            onToggleStatus={(user) => toggleUserStatus.mutate({ id: user.id, newStatus: !user.is_active })}
          />
        )}
      </main>
      <AddUserModal show={openModal} onClose={() => setOpenModal(false)} />
    </div>
    </>
  );
}

export default AccountManagement;
