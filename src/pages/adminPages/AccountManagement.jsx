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

  useQuery({
    queryKey: ['currentUser'],
    queryFn: fetchUser,
    onSuccess: (data) => {
      if (data.role_name !== 'admin') {
        window.location.href = '/';
      }
    },
    onError: () => {
      console.error('Unable to fetch user.');
    },
  });

  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['adminUsers', statusFilter],
    queryFn: () => fetchAdminUsers(statusFilter),
  });

  // Updated roleTabs with Lucide icons
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
  });

  const filteredUsers =
    statusFilter === 'All'
      ? users
      : users.filter(
          (user) => user.role_name.toLowerCase() === statusFilter.toLowerCase()
        );

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

          <Link to="/Admin/AdminAddUser">
            <Button color="gray" className="gap-2 dark:text-white">
              <UserPlus className="h-5 w-5" />
              Add User
            </Button>
          </Link>
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="p-6 text-center">Loading users...</div>
        ) : isError ? (
          <div className="p-6 text-center text-red-600">
            Failed to load users.
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
                      <div className="text-xs">{user.email ?? '–'}</div>
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
                      />
                      <Button
                        color="gray"
                        onClick={() =>
                          navigate(`/Admin/AdminUserEdit/${user.id}`)
                        }
                      >
                        <Edit className="size-4" />
                      </Button>
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
