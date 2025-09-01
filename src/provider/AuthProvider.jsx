import { useEffect } from 'react';
import axios from 'axios';
import useUserStore from '@/stores/userStore';
import PropTypes from 'prop-types';

const AuthProvider = ({ children }) => {
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);

  useEffect(() => {
    axios
      .get('/api/users', { withCredentials: true })
      .then((res) => {
        setUser(res.data);
        localStorage.setItem('user', JSON.stringify(res.data));
      })
      .catch((err) => {
        console.error('User not authenticated' + err);
        clearUser();
        localStorage.removeItem('user'); // cleanup
      });
  }, [setUser, clearUser]);

  return children;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
