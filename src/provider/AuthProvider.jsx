import { useEffect, useState } from 'react';
import axios from 'axios';
import useUserStore from '@/stores/userStore';
import PropTypes from 'prop-types';

const AuthProvider = ({ children }) => {
  const setUser = useUserStore((state) => state.setUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) {
      setLoading(false);
      return;
    }

    let token;
    try {
      token = JSON.parse(stored)?.token;
    } catch {
      setLoading(false);
      return;
    }

    if (!token) {
      setLoading(false);
      return;
    }

    axios
      .get('/api/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error('Token invalid or expired');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return children;
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
