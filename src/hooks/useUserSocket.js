import { useEffect } from 'react';
import { socket } from '@/socket';
import { toast } from 'sonner';
import useUserStore from '@/stores/userStore';

export default function useUserSocket() {
  const { user, isAuthenticated } = useUserStore();

  useEffect(() => {
    if (!isAuthenticated || !user || user.role_name !== 'customer') return;

    socket.connect();

    const handleConnect = () => {
      socket.emit('join-user', user.id);
      console.log(`🙋‍♂️ Joined user socket: user_${user.id}`);
    };

    const handleToast = (data) => {
      toast[data.type || 'info'](data.message);
    };

    const handleOrderUpdate = (data) => {
      console.log('📦 Order update received:', data);
      toast[data.type || 'info'](data.message);
    };

    const handleError = (err) => {
      console.error('❌ Socket connection error:', err.message);
    };

    // Register listeners
    socket.on('connect', handleConnect);
    socket.on('toast', handleToast);
    socket.on('order:update', handleOrderUpdate);
    socket.on('connect_error', handleError);

    // Cleanup
    return () => {
      socket.off('connect', handleConnect);
      socket.off('toast', handleToast);
      socket.off('order:update', handleOrderUpdate);
      socket.off('connect_error', handleError);
      socket.disconnect();
    };
  }, [isAuthenticated, user]);
}
