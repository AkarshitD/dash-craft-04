export const SUPER_ADMIN = {
  ORGANIZATIONS: {
    LIST: '/super-admin/organizations',
    CREATE: '/super-admin/organizations',
    UPDATE: '/super-admin/organizations/:id',
    DELETE: '/super-admin/organizations/:id',
    GET: '/super-admin/organizations/:id',
    STATS: '/super-admin/organizations/:id/stats',
  },
  ADMINS: {
    LIST: '/super-admin/admins',
    CREATE: '/super-admin/admins',
    UPDATE: '/super-admin/admins/:id',
    DELETE: '/super-admin/admins/:id',
  },
  USERS: {
    LIST: '/super-admin/users',
    GET: '/super-admin/users/:id',
  },
};
