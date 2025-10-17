import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Modal, ModalHeader, ModalBody, Label, TextInput, Checkbox, Button } from 'flowbite-react';
import { toast } from 'sonner';
import { fetchAllPermissions, fetchStaffPermissions, updateStaffPermissions } from '@/api/permissions';

// Not only smart but genius as hail modal because overengineering is a trap
// Will refactor if needed later
function StaffModal({ show, onClose, staff }) {
  const queryClient = useQueryClient();

  const {
    data: allPermissions = [],
    isLoading: loadingAll,
    isError: errorAll,
  } = useQuery({
    queryKey: ['allPermissions'],
    queryFn: fetchAllPermissions,
  });

  const {
    data: staffPermissions = [],
    isLoading: loadingStaff,
    isError: errorStaff,
  } = useQuery({
    queryKey: ['staffPermissions', staff?.id],
    queryFn: () => fetchStaffPermissions(staff.id),
    enabled: !!staff?.id,
  });

  const [selectedPermissions, setSelectedPermissions] = useState([]);

  useEffect(() => {
    if (staffPermissions && staffPermissions.length > 0) {
      setSelectedPermissions(staffPermissions.map((p) => p.name));
    } else {
      setSelectedPermissions([]);
    }
  }, [staff?.id, staffPermissions]);

  const mutation = useMutation({
    mutationFn: updateStaffPermissions,
    onSuccess: () => {
      queryClient.invalidateQueries(['staffPermissions', staff?.id]);
      toast.success('Permissions updated successfully! ✅');
    },
    onError: (err) => {
      console.error(err);
      toast.error('Failed to update permissions ❌');
    },
  });

  if (!staff) return null;

  const handleCheckboxChange = (permName) => {
    setSelectedPermissions((prev) =>
      prev.includes(permName) ? prev.filter((p) => p !== permName) : [...prev, permName]
    );
  };

  const handleSave = () => {
    if (!staff?.id) return;
    mutation.mutate({ id: staff.id, permissions: selectedPermissions });
  };

  return (
    <Modal show={show} onClose={onClose}>
      <ModalHeader>Staff Information</ModalHeader>
      <ModalBody>
        <div className="flex flex-col gap-4">
          <div>
            <Label htmlFor="name" value="Name" />
            <TextInput id="name" value={staff.username || ''} readOnly />
          </div>

          <div>
            <Label htmlFor="email" value="Email" />
            <TextInput id="email" value={staff.email || ''} readOnly />
          </div>

          <div>
            <Label htmlFor="role" value="Role" />
            <TextInput id="role" value={staff.role_name || ''} readOnly />
          </div>

          <div>
            <Label value="Permissions" />

            {loadingAll || loadingStaff ? (
              <p className="text-sm text-gray-500">Loading permissions...</p>
            ) : errorAll || errorStaff ? (
              <p className="text-sm text-red-500">Failed to load permissions.</p>
            ) : (
              <div className="mt-2 grid grid-cols-2 gap-2">
                {allPermissions.map((perm) => (
                  <div key={perm.id} className="flex items-center gap-2">
                    <Checkbox
                      id={`perm-${perm.id}`}
                      checked={selectedPermissions.includes(perm.name)}
                      onChange={() => handleCheckboxChange(perm.name)}
                    />
                    <Label htmlFor={`perm-${perm.id}`} className="capitalize">
                      {perm.name.replaceAll('_', ' ')}
                    </Label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <Button color="gray" onClick={onClose}>
            Close
          </Button>
          <Button onClick={handleSave} isProcessing={mutation.isLoading}>
            Save Changes
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
}

StaffModal.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  staff: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    username: PropTypes.string,
    email: PropTypes.string,
    role_name: PropTypes.string,
  }),
};

export default StaffModal;
