import { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { IoPersonAddOutline } from 'react-icons/io5';
import { Badge, ToggleSwitch, ButtonGroup, Button } from 'flowbite-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'flowbite-react';
import {
  HiUserCircle,
  HiUserGroup,
  HiOutlineUsers,
  HiIdentification,
} from 'react-icons/hi';

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
    queryKey: ['adminUsers', statusFilter], // include filter in key
    queryFn: () => fetchAdminUsers(statusFilter),
  });

  const roleTabs = [
    { label: 'All', value: 'All', icon: HiUserCircle },
    { label: 'Admin', value: 'admin', icon: HiUserGroup },
    { label: 'Staff', value: 'staff', icon: HiOutlineUsers },
    { label: 'Customer', value: 'customer', icon: HiIdentification },
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
    <div className="flex flex-col overflow-x-auto">
      <main className="mx-auto w-full overflow-x-auto rounded-xs border bg-white shadow">
        {/* Tabs + Add Button */}
        <div className="flex flex-row justify-between px-4 py-4">
          <ButtonGroup outline>
            {roleTabs.map((tab) => {
              const isActive = statusFilter === tab.value;
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.value}
                  onClick={() => setStatusFilter(tab.value)}
                  color={isActive ? 'default' : 'gray'}
                  className="capitalize"
                >
                  <Icon className="me-2 h-4 w-4" />
                  {tab.label}
                </Button>
              );
            })}
          </ButtonGroup>

          <Link to="/Admin/AdminAddUser">
            <Button outline>
              <IoPersonAddOutline className="h-5 w-5" />
              Add User
            </Button>
          </Link>
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="p-6 text-center text-gray-600">Loading users...</div>
        ) : isError ? (
          <div className="p-6 text-center text-red-600">
            Failed to load users.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table hoverable>
              <TableHead className="text-black uppercase">
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
              <TableBody className="divide-y divide-gray-100 bg-white">
                {filteredUsers.map((user) => (
                  <TableRow
                    key={user.id}
                    className="transition duration-150 ease-in-out hover:bg-gray-50"
                  >
                    <TableCell className="w-[21%] text-sm text-gray-800">
                      <div className="font-medium text-blue-600">
                        {user.username ?? '–'}
                      </div>
                      <div className="text-xs text-gray-500">
                        {user.email ?? '–'}
                      </div>
                    </TableCell>

                    <TableCell className="w-[5%] text-sm text-gray-600 capitalize">
                      {user.role_name ?? '–'}
                    </TableCell>

                    <TableCell className="hidden w-[35%] text-sm text-gray-600 lg:table-cell">
                      {user.address ?? '–'}
                    </TableCell>

                    <TableCell className="hidden w-[18%] text-sm text-gray-600 lg:table-cell">
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

                    <TableCell className="flex items-center gap-2 py-2">
                      <ToggleSwitch
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
                        outline
                        onClick={() =>
                          navigate(`/Admin/AdminUserEdit/${user.id}`)
                        }
                      >
                        <FaEdit className="h-5 w-5" />
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
