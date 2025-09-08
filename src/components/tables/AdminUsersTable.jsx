// AdminUsersTable.jsx
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Badge, ToggleSwitch } from 'flowbite-react';
import RoleBadge from '@/components/bigComponents/RoleBadge';
import TableSkeleton from '@/components/skeletons/TableSkeleton';

function AdminUsersTable({ users, isLoading, isError, onToggleStatus }) {
  if (isLoading) return <TableSkeleton columns={6} rows={3} />;
  if (isError) return <div className="p-6 text-center text-red-600">Failed to load users.</div>;

  return (
    <div className="overflow-x-auto">
      <Table hoverable striped>
        <TableHead className="uppercase">
          <TableRow>
            <TableHeadCell>Username</TableHeadCell>
            <TableHeadCell>Role</TableHeadCell>
            <TableHeadCell className="hidden lg:table-cell">Address</TableHeadCell>
            <TableHeadCell className="hidden lg:table-cell">Contact</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
            <TableHeadCell>Actions</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="text-content">
          {users.map((user) => (
            <TableRow key={user.id} className="transition duration-150 ease-in-out hover:bg-gray-50">
              <TableCell className="text-sm">
                <div className="font-medium text-teal-600 dark:text-teal-400">{user.username ?? '–'}</div>
                <div className="text-xs">{user.email ?? '–'}</div>
              </TableCell>

              <TableCell>
                <RoleBadge role={user.role_name} />
              </TableCell>

              <TableCell className="hidden text-sm lg:table-cell">
                {user.address || <span className="text-lighter text-xs italic">Not given yet</span>}
              </TableCell>

              <TableCell className="hidden text-sm lg:table-cell">
                {user.contact_number || <span className="text-lighter text-xs italic">Not given yet</span>}
              </TableCell>

              <TableCell className="text-sm">
                <Badge color={user.is_active ? 'success' : 'failure'} className="justify-center">
                  {user.is_active ? 'Active' : 'Inactive'}
                </Badge>
              </TableCell>

              <TableCell className="flex items-center">
                <ToggleSwitch
                  color={user.is_active ? 'success' : 'failure'}
                  checked={user.is_active}
                  onChange={() => onToggleStatus(user)}
                  label=""
                  disabled={user.role_name === 'admin' || user._isUpdating}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminUsersTable;
