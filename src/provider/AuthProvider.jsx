import { useEffect } from 'react';
import PropTypes from 'prop-types';
import useUserStore from '@/stores/userStore';

const AuthProvider = ({ children }) => {
  const fetchUser = useUserStore((state) => state.fetchUser);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return children;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
