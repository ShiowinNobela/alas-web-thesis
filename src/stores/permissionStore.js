// stores/usePermissionsStore.js
import { create } from 'zustand';
import { fetchMyPermissions } from '@/api/permissions';

const usePermissionsStore = create((set) => ({
  permissions: [],
  fetchPermissions: async () => {
    try {
      const data = await fetchMyPermissions();
      set({ permissions: data || [] });
    } catch (err) {
      console.error('Failed to fetch permissions', err);
      set({ permissions: [] });
    }
  },
}));

export default usePermissionsStore;
