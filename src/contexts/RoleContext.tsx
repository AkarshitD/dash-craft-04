import { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'SuperAdmin' | 'Admin' | 'User';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organization?: string;
  hasUploadAccess?: boolean;
}

interface RoleContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  hasUploadPermission: () => boolean;
  canSeeAdminPanel: () => boolean;
  canSeeSuperAdminPanel: () => boolean;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};

interface RoleProviderProps {
  children: ReactNode;
}

export const RoleProvider = ({ children }: RoleProviderProps) => {
  // Mock users for testing
  const mockUsers = [
    {
      id: 'super-1',
      name: 'Super Administrator',
      email: 'superadmin@test.com',
      role: 'SuperAdmin' as UserRole,
      organization: 'System Administration',
      hasUploadAccess: true,
    },
    {
      id: 'admin-1', 
      name: 'Healthcare Admin',
      email: 'admin@test.com',
      role: 'Admin' as UserRole,
      organization: 'Health Corp',
      hasUploadAccess: true,
    },
    {
      id: 'user-1',
      name: 'Dr. Sarah Johnson',
      email: 'user@test.com', 
      role: 'User' as UserRole,
      organization: 'Health Corp',
      hasUploadAccess: true,
    },
  ];

  // Default to Admin user for demo - change email to test different roles
  const [currentUser, setCurrentUser] = useState<User>(mockUsers[1]); // Change index: 0=SuperAdmin, 1=Admin, 2=User

  const hasUploadPermission = () => {
    if (currentUser.role === 'SuperAdmin' || currentUser.role === 'Admin') {
      return true;
    }
    return currentUser.hasUploadAccess || false;
  };

  const canSeeAdminPanel = () => {
    return currentUser.role === 'Admin';
  };

  const canSeeSuperAdminPanel = () => {
    return currentUser.role === 'SuperAdmin';
  };

  return (
    <RoleContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        hasUploadPermission,
        canSeeAdminPanel,
        canSeeSuperAdminPanel,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};