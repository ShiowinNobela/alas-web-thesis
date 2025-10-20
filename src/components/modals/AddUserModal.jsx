import { useState } from 'react';
import { Modal, ModalHeader, ModalBody, Label, TextInput, Select, Button } from 'flowbite-react';
import { Eye, EyeOff } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import PropTypes from 'prop-types';

function AddUserModal({ show, onClose }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(1);
  const [showPassword, setShowPassword] = useState(false);

  const queryClient = useQueryClient();

  const addUserMutation = useMutation({
    mutationFn: async (values) => {
      const res = await axios.post('/api/adminUser/register', values);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['adminUsers']);
      handleClose();
    },
  });

  const handleClose = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setRole(1);
    onClose();
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    addUserMutation.mutate({ username, email, password, role });
  };

  return (
    <Modal show={show} size="md" onClose={handleClose}>
      <ModalHeader>
        <div>
          <h3 className="text-xl font-bold">Create a new user account</h3>
          <p className="text-lighter text-sm">Create dynamic accounts</p>
        </div>
      </ModalHeader>
      <ModalBody className="rounded-b-2xl">
        <form onSubmit={handleAddUser} className="space-y-7">
          <div>
            <Label htmlFor="email" value="Email" />
            <TextInput
              id="email"
              type="email"
              color="gray"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="username" value="Username" />
            <TextInput
              id="username"
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="password" value="Password" />
            <div className="relative">
              <TextInput
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pr-10" // space for the icon
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div>
            <Label htmlFor="role" value="Role" />
            <Select id="role" value={role} onChange={(e) => setRole(Number(e.target.value))} required>
              <option value={1}>Admin</option>
              <option value={2}>Customer</option>
              <option value={3}>Staff</option>
            </Select>
          </div>

          <Button type="submit" color="gray" isProcessing={addUserMutation.isLoading} className="w-full">
            Add User
          </Button>
        </form>
      </ModalBody>
    </Modal>
  );
}

AddUserModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddUserModal;
