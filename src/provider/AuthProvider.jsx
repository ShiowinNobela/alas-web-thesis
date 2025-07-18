import { useEffect } from 'react';
import axios from 'axios';
import useUserStore from '@/stores/userStore';

const AuthProvider = ({ children }) => {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) return;

    let token;
    try {
      token = JSON.parse(stored)?.token;
    } catch {
      return;
    }

    if (!token) return;

    axios
      .get('/api/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data); // store only valid user info in memory
      })
      .catch((err) => {
        console.error('Token invalid or expired');
      });
  }, []);

  return children;
};

export default AuthProvider;
