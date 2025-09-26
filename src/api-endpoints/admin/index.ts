export const PROFILE = {
  GET_PROFILE: () => ({
    url: '/admin/profile',
    method: 'GET' as const,
  }),
  UPDATE_PROFILE: {
    url: '/admin/profile',
    method: 'PUT' as const,
  },
  UPLOAD_PROFILE_PIC: () => ({
    url: '/admin/profile/upload',
    method: 'POST' as const,
  }),
  REMOVE_PROFILE_PIC: () => ({
    url: '/admin/profile/remove-pic',
    method: 'DELETE' as const,
  }),
  MAIN_DASHBOARD_DATA: {
    url: '/admin/dashboard',
    method: 'GET' as const,
  },
};

export const ADMIN = {
  GET_USERS: {
    url: '/admin/users',
    method: 'GET' as const,
  },
  CREATE_USER: {
    url: '/admin/users',
    method: 'POST' as const,
  },
  UPDATE_USER: {
    url: '/admin/users',
    method: 'PUT' as const,
  },
  DELETE_USER: {
    url: '/admin/users',
    method: 'DELETE' as const,
  },
  RESET_PASSWORD: {
    url: '/admin/users/reset-password',
    method: 'POST' as const,
  },
};