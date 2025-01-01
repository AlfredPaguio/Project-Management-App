export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  avatar: string | null;
  created_at: string;
  updated_at: string;
  roles: Role[];
  permissions: Permission[];
  all_permissions: Permission[];
}
export interface PublicUser {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
}

// Spatie Permission types
export interface Role {
  id: number;
  name: string;
}

export interface Permission {
  id: number;
  name: string;
}
