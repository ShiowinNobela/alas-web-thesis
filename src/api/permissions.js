// src/api/permissions.js
import axios from 'axios';

export const fetchMyPermissions = async () => {
  const { data } = await axios.get('/api/permissions/me', {
    withCredentials: true,
  });

  return data.data;
};

export const fetchAllPermissions = async () => {
  const res = await axios.get('/api/permissions/');
  return res.data.data || [];
};

export const fetchStaffPermissions = async (id) => {
  const res = await axios.get(`/api/permissions/staff/${id}`);
  return res.data.data || [];
};

export const updateStaffPermissions = async ({ id, permissions }) => {
  const res = await axios.put(`/api/permissions/control/${id}`, { permissions });
  return res.data;
};
