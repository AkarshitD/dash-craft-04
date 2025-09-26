export const USER = {
  GET_PROFILE: () => ({
    url: '/user/profile',
    method: 'GET' as const,
  }),
  UPDATE_PROFILE: {
    url: '/user/profile',
    method: 'PUT' as const,
  },
  UPLOAD_FILE: {
    url: '/user/upload',
    method: 'POST' as const,
  },
  GET_ORGANIZATIONS: {
    url: '/user/organizations',
    method: 'GET' as const,
  },
};