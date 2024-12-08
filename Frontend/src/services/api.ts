import axios from 'axios';
import { toast } from 'react-hot-toast';
import { User, Admin, Trip } from '../types';

class ApiService {
  private http = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  constructor() {
    this.http.interceptors.response.use(
      response => response,
      error => {
        console.error('API Error:', error);
        
        if (error.response) {
          const { status, data } = error.response;
          const errorMessage = data?.message || 'An error occurred';
          
          switch (status) {
            case 400:
              toast.error(`Bad Request: ${errorMessage}`);
              break;
            case 404:
              toast.error(`Not Found: ${errorMessage}`);
              break;
            case 500:
              toast.error(`Server Error: ${errorMessage}`);
              break;
            default:
              toast.error(errorMessage);
          }
        } else if (error.request) {
          toast.error('No response from server');
        } else {
          toast.error('Error setting up request');
        }
        
        return Promise.reject(error);
      }
    );
  }

  // User CRUD operations
  async getUsers() {
    const response = await this.http.get<User[]>('/users');
    return response.data;
  }

  async createUser(userData: Partial<User>) {
    const response = await this.http.post<User>('/users', userData);
    return response.data;
  }

  async updateUser(id: string, userData: Partial<User>) {
    console.log('Updating user with ID:', id, 'Data:', userData);
    const response = await this.http.patch<User>(`/users/${id}`, userData);
    return response.data;
  }

  async deleteUser(id: string) {
    console.log('Deleting user with ID:', id);
    await this.http.delete(`/users/${id}`);
  }

  // Admin CRUD operations
  async getAdmins() {
    const response = await this.http.get('/admins');
    return response.data;
  }

  async createAdmin(adminData: any) {
    const response = await this.http.post('/admins', adminData);
    return response.data;
  }

  async deleteAdmin(id: string) {
    await this.http.delete(`/admins/${id}`);
  }
  
  async updateAdmin(id: string, adminData: any) {
    const response = await this.http.patch(`/admins/${id}`, adminData);
    return response.data;
  }
  
  
  // Trip CRUD operations
  async getTrips() {
    const response = await this.http.get('/trips');
    return response.data;
  }

  async createTrip(tripData: any) {
    const response = await this.http.post('/trips', tripData);
    return response.data;
  }

  async updateTrip(id: string, tripData: Partial<{ name: string, email: string, role: string }>) {
    const response = await this.http.patch(`/trips/${id}`, tripData);
    return response.data;
  }

  async deleteTrip(id: string) {
    await this.http.delete(`/trips/${id}`);
  }
}

export default new ApiService();