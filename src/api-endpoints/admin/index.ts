export const PROFILE = {
  GET: '/admin/profile',
  UPDATE: '/admin/profile',
};

export const USER = {
  LIST: '/admin/users',
  CREATE: '/admin/users',
  UPDATE: '/admin/users/:id',
  DELETE: '/admin/users/:id',
  GET: '/admin/users/:id',
};

export const ORGANIZATION = {
  LIST: '/admin/organizations',
  GET: '/admin/organizations/:id',
  STATS: '/admin/organizations/stats',
};
