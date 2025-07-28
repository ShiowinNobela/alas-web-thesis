import { useEffect, useState } from 'react';
import axios from 'axios';
import useUserStore from '@/stores/userStore';
import PropTypes from 'prop-types';

const AuthProvider = ({ children }) => {
  const setUser = useUserStore((state) => state.setUser);
  const [loading, setLoading] = useState(true);
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get('/api/users', { withCredentials: true }) // fetch user using cookie
      .then((res) => {
        setUser(res.data);

        // optional: update user in localStorage (without token)
        localStorage.setItem('user', JSON.stringify(res.data));
      })
      .catch((err) => {
        console.error('User not authenticated');
        localStorage.removeItem('user'); // cleanup
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
