import create from 'zustand';
import { persist } from 'zustand/middleware';
import ApiService from '../services/api';
import { User, Admin, Trip } from '../types';
import { toast } from 'react-hot-toast';



interface Store {
  users: User[];
  admins: Admin[];
  trips: Trip[];
  
  // User actions
  fetchUsers: () => Promise<void>;
  addUser: (userData: Partial<User>) => Promise<User>;
  updateUser: (id: string, userData: Partial<User>) => Promise<User>;
  deleteUser: (id: string) => Promise<void>;

  // Admin actions
  fetchAdmins: () => Promise<void>;
  addAdmin: (adminData: Partial<Admin>) => Promise<Admin>;
  updateAdmin: (id: string, adminData: Partial<Admin>) => Promise<Admin>;
  deleteAdmin: (id: string) => Promise<void>;

  // Trip actions
  fetchTrips: () => Promise<void>;
  addTrip: (tripData: Partial<Trip>) => Promise<Trip>;
  updateTrip: (id: string, tripData: Partial<Trip>) => Promise<Trip>;
  deleteTrip: (id: string) => Promise<void>;
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      users: [],
      admins: [],
      trips: [],

      // User CRUD Operations
      fetchUsers: async () => {
        try {
          const users = await ApiService.getUsers();
          set({ users });
        } catch (error) {
          console.error('Failed to fetch users:', error);
          toast.error('Failed to load users');
          throw error;
        }
      },

      addUser: async (userData) => {
        try {
          const newUser = await ApiService.createUser(userData);
          set((state) => ({ users: [...state.users, newUser] }));
          toast.success('User added successfully');
          return newUser;
        } catch (error) {
          console.error('Failed to add user:', error);
          toast.error('Failed to add user');
          throw error;
        }
      },

      // In your Zustand store
    deleteUser: async (id) => {
      try {
        // Prevent multiple toast notifications
        await ApiService.deleteUser(id);

        // Update local state
        set((state) => ({
          users: state.users.filter((user) => user.id !== id)
        }));

        // Only show success toast once
        toast.success('User deleted successfully');
      } catch (error) {
        // This will be handled by the interceptor
        console.error('Failed to delete user:', error);
        throw error;
      }
    },

    updateUser: async (id, userData) => {
      try {
        // Only include name, email, and role in update
        const updateData = {
          name: userData.name,
          email: userData.email,
          role: userData.role
        };

    const updatedUser = await ApiService.updateUser(id, updateData);

    // Update local state
    set((state) => ({
      users: state.users.map((user) => 
        user.id === id ? { ...user, ...updatedUser } : user
      )
    }));

    toast.success('User updated successfully');
    return updatedUser;
  } catch (error) {
    console.error('Failed to update user:', error);
    throw error;
  }
},

      // Admin CRUD Operations
      fetchAdmins: async () => {
        try {
          const admins = await ApiService.getAdmins();
          set({ admins });
        } catch (error) {
          console.error('Failed to fetch admins:', error);
          toast.error('Failed to load admins');
          throw error;
        }
      },

      addAdmin: async (adminData) => {
        try {
          const newAdmin = await ApiService.createAdmin(adminData);
          set((state) => ({ admins: [...state.admins, newAdmin] }));
          toast.success('Admin added successfully');
          return newAdmin;
        } catch (error) {
          console.error('Failed to add admin:', error);
          toast.error('Failed to add admin');
          throw error;
        }
      },

      deleteAdmin: async (id: string) => {
        try {
          await ApiService.deleteAdmin(id);
          set((state) => ({
            admins: state.admins.filter((admin) => admin.id !== id)
          }));
          toast.success('Admin deleted successfully');
        } catch (error) {
          toast.error('Failed to delete admin');
          throw error;
        }
      },
      
      updateAdmin: async (id: string, data: any) => {
        try {
          const updatedAdmin = await ApiService.updateAdmin(id, data);
          set((state) => ({
            admins: state.admins.map((admin) => 
              admin.id === id ? updatedAdmin : admin
            )
          }));
          toast.success('Admin updated successfully');
          return updatedAdmin;
        } catch (error) {
          toast.error('Failed to update admin');
          throw error;
        }
      },
      

      

      // Trip CRUD Operations
      fetchTrips: async () => {
        try {
          const trips = await ApiService.getTrips();
          set({ trips });
        } catch (error) {
          console.error('Failed to fetch trips:', error);
          toast.error('Failed to load trips');
          throw error;
        }
      },

      addTrip: async (tripData) => {
        try {
          const newTrip = await ApiService.createTrip(tripData);
          set((state) => ({ trips: [...state.trips, newTrip] }));
          toast.success('Trip added successfully');
          return newTrip;
        } catch (error) {
          console.error('Failed to add trip:', error);
          toast.error('Failed to add trip');
          throw error;
        }
      },

      updateTrip: async (id, tripData) => {
        try {
          // Validate ID
          if (!id) {
            throw new Error('Trip ID is required for update');
          }

          console.log('Updating trip:', { id, tripData });

          // Call API to update trip
          const updatedTrip = await ApiService.updateTrip(id, tripData);

          // Update local state
          set((state) => ({
            trips: state.trips.map((trip) => 
              trip.id === id ? { ...trip, ...updatedTrip } : trip
            )
          }));

          toast.success('Trip updated successfully');
          return updatedTrip;
        } catch (error) {
          console.error('Failed to update trip:', error);
          toast.error('Failed to update trip');
          throw error;
        }
      },

      deleteTrip: async (id) => {
        try {
          // Validate ID
          if (!id) {
            throw new Error('Trip ID is required for deletion');
          }

          // Call API to delete trip
          await ApiService.deleteTrip(id);

          // Update local state
          set((state) => ({
            trips: state.trips.filter((trip) => trip.id !== id)
          }));

          toast.success('Trip deleted successfully');
        } catch (error) {
          console.error('Failed to delete trip:', error);
          toast.error('Failed to delete trip');
          throw error;
        }
      },
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({}), // Customize persistence as needed
    }
  )
);