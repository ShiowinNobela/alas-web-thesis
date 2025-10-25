import { useEffect, useState } from 'react';
import axios from 'axios';
import useUserStore from '@/stores/userStore';

export default function useNotifications() {
  const { user, isAuthenticated } = useUserStore();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    axios
      .get(`/api/notifications`)
      .then((res) => setNotifications(res.data.data))
      .catch((err) => console.error('❌ Failed to fetch notifications:', err));
  }, [isAuthenticated, user]);

  return { notifications, setNotifications };
}
