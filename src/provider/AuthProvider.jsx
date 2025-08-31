// Updated AuthProvider.jsx
import { useEffect } from 'react';
import axios from 'axios';
import useUserStore from '@/stores/userStore';
import PropTypes from 'prop-types';

const AuthProvider = ({ children }) => {
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);

  useEffect(() => {
    // This will run once when app loads to check if user is authenticated
    axios
      .get('/api/users', { withCredentials: true })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error('User not authenticated' + err);
        clearUser();
      });
  }, [setUser, clearUser]);

  return children;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
