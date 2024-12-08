export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface Admin {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'super_admin';
  createdAt: string;
}

export interface Trip {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'cancelled';
  createdAt?: string;
}