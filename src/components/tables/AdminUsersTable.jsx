// AdminUsersTable.jsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Badge,
  ToggleSwitch,
  Button,
} from 'flowbite-react';
import RoleBadge from '@/components/bigComponents/RoleBadge';
import TableSkeleton from '@/components/skeletons/TableSkeleton';
import { Key } from 'lucide-react';

function AdminUsersTable({ users, isLoading, isError, onToggleStatus, onStaffClick }) {
  if (isLoading) return <TableSkeleton columns={6} rows={3} />;
  if (isError) return <div className="text-error p-6 text-center">Failed to load users.</div>;

  return (
    <div className="overflow-x-auto">
      <Table hoverable striped>
        <TableHead className="uppercase">
          <TableRow>
            <TableHeadCell className="table-header">Username</TableHeadCell>
            <TableHeadCell className="table-header">Role</TableHeadCell>
            <TableHeadCell className="table-header hidden lg:table-cell">Address</TableHeadCell>
            <TableHeadCell className="table-header hidden lg:table-cell">Contact</TableHeadCell>
            <TableHeadCell className="table-header">Status</TableHeadCell>
            <TableHeadCell className="table-header">Actions</TableHeadCell>
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

              <TableCell className="flex items-center gap-4">
                <ToggleSwitch
                  color={user.is_active ? 'success' : 'failure'}
                  checked={user.is_active}
                  onChange={() => onToggleStatus(user)}
                  label=""
                  disabled={user.role_name === 'admin' || user._isUpdating}
                />
                {user.role_name === 'staff' && (
                  <Button
                    size="sm"
                    color="gray"
                    className="rounded-full p-2 transition hover:bg-gray-100"
                    onClick={() => onStaffClick(user)}
                    aria-label="View Permissions"
                  >
                    <Key className="h-4 w-4 text-white" />
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminUsersTable;
