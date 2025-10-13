// src/api/permissions.js
import axios from 'axios';

export const fetchMyPermissions = async () => {
  const { data } = await axios.get('/api/permissions/me', {
    withCredentials: true,
  });

  return data.data;
};
