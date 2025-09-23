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
  // Default user for demo - in real app this would come from auth
  const [currentUser, setCurrentUser] = useState<User>({
    id: 'user-1',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@healthcare.com',
    role: 'Admin', // Change this to test different roles: 'SuperAdmin', 'Admin', 'User'
    organization: 'Health Corp',
    hasUploadAccess: true,
  });

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