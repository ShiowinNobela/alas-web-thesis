import { useState } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Badge, ToggleSwitch, Button } from 'flowbite-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'flowbite-react';
import { UserCircle, Users, User, Contact, Edit, UserPlus } from 'lucide-react';
import ButtonGroupFilter from '@/components/bigComponents/ButtonGroupFilter';
import RoleBadge from '@/components/bigComponents/RoleBadge';
import TableSkeleton from '@/components/skeletons/TableSkeleton';

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
  if (role && role !== 'All') {
    params.role = role;
  }

  const res = await axios.get('/api/adminUser', { params });
  return res.data.data || [];
};

function AccountManagement() {
  const [statusFilter, setStatusFilter] = useState('All');
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading: isVerifyingUser, isError: isVerificationError } = useQuery({
    queryKey: ['currentUser'],
    queryFn: fetchUser,
    onSuccess: (data) => {
      if (data.role_name !== 'admin') {
        window.location.href = '/';
      }
    },
    onError: (error) => {
      console.error('Unable to fetch user:', error);
      if (error.response?.status === 401) {
        window.location.href = '/login';
      }
    },
    retry: 1,
  });

  const {
    data: users = [],
    isLoading: isUsersLoading,
    isError: isUsersError,
  } = useQuery({
    queryKey: ['adminUsers', statusFilter],
    queryFn: () => fetchAdminUsers(statusFilter),
    enabled: !isVerifyingUser && !isVerificationError, 
  });

  const roleTabs = [
    { label: 'All', value: 'All', icon: UserCircle },
    { label: 'Admin', value: 'admin', icon: Users },
    { label: 'Staff', value: 'staff', icon: User },
    { label: 'Customer', value: 'customer', icon: Contact },
  ];

  const toggleUserStatus = useMutation({
    mutationFn: async ({ id, newStatus }) => {
      const response = await axios.patch(`/api/adminUser/manage/${id}`, {
        is_active: newStatus,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries('adminUsers');
    },
    onError: (error) => {
      console.error('Failed to update user status:', error);
      // Will Add Toast Later - 1
    },
  });

  const filteredUsers =
    statusFilter === 'All'
      ? users
      : users.filter(
          (user) => user.role_name.toLowerCase() === statusFilter.toLowerCase()
        );

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
    <div className="flex flex-col h-full p-4 overflow-x-auto bg-admin">
      <main className="w-full mx-auto overflow-x-auto border shadow bg-card rounded-xl ring-1 dark:text-white">
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:justify-between sm:items-center">
          <ButtonGroupFilter
            options={roleTabs}
            value={statusFilter}
            onChange={setStatusFilter}
            color="alternative"
            className="border border-black dark:border-white"
          />

          <Link to="/Admin/AdminAddUser">
            <Button color="gray" className="w-full gap-2 dark:text-white sm:w-auto">
              <UserPlus className="w-5 h-5" />
              Add User
            </Button>
          </Link>
        </div>

        {/* Table Section */}
        {isUsersLoading ? (
          <TableSkeleton columns={6} rows={5} />
        ) : isUsersError ? (
          <div className="flex items-center justify-center p-6 text-red-600 bg-white rounded-lg shadow-sm ring-1 min-h-[200px] mx-4 mb-4 dark:bg-gray-800 dark:text-white">
            Failed to load users. Please try again.
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-6 text-gray-500 bg-white rounded-lg shadow-sm ring-1 min-h-[200px] mx-4 mb-4 dark:bg-gray-800 dark:text-white">
            <UserCircle className="w-12 h-12 mb-2 opacity-50" />
            <p>No users found</p>
            {statusFilter !== 'All' && (
              <p className="mt-1 text-sm">Try changing your filter settings</p>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table hoverable striped>
              <TableHead className="uppercase">
                <TableRow>
                  <TableHeadCell>Username</TableHeadCell>
                  <TableHeadCell>Role</TableHeadCell>
                  <TableHeadCell className="hidden lg:table-cell">
                    Address
                  </TableHeadCell>
                  <TableHeadCell className="hidden lg:table-cell">
                    Contact
                  </TableHeadCell>
                  <TableHeadCell>Status</TableHeadCell>
                  <TableHeadCell>Actions</TableHeadCell>
                </TableRow>
              </TableHead>
              <TableBody className="text-content">
                {filteredUsers.map((user) => (
                  <TableRow
                    key={user.id}
                    className="transition duration-150 ease-in-out hover:bg-gray-50"
                  >
                    <TableCell className="text-sm">
                      <div className="font-medium text-teal-600 dark:text-teal-400">
                        {user.username ?? '–'}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {user.email ?? '–'}
                      </div>
                    </TableCell>

                    <TableCell className="">
                      <RoleBadge role={user.role_name} />
                    </TableCell>

                    <TableCell className="hidden text-xs lg:table-cell">
                      {user.address ?? '–'}
                    </TableCell>

                    <TableCell className="hidden text-sm lg:table-cell">
                      {user.contact_number ?? '–'}
                    </TableCell>

                    <TableCell className="text-sm">
                      <Badge
                        color={user.is_active ? 'success' : 'failure'}
                        className="justify-center"
                      >
                        {user.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>

                    <TableCell className="flex items-center justify-end gap-2 py-4">
                      <div className="flex flex-col items-end gap-2 sm:flex-row">
                        <ToggleSwitch
                          color={user.is_active ? 'success' : 'failure'}
                          checked={user.is_active}
                          onChange={() =>
                            toggleUserStatus.mutate({
                              id: user.id,
                              newStatus: !user.is_active,
                            })
                          }
                          label=""
                          disabled={
                            user.role_name === 'admin' ||
                            toggleUserStatus.isLoading
                          }
                          title={user.role_name === 'admin' ? 'Cannot deactivate admin users' : ''}
                        />
                        <Button
                          color="gray"
                          onClick={() =>
                            navigate(`/Admin/AdminUserEdit/${user.id}`)
                          }
                          size="sm"
                        >
                          <Edit className="size-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </main>
    </div>
  );
}

export default AccountManagement;
