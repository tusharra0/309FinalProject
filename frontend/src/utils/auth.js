export const redirectPathForRole = (role) => {
  switch ((role || '').toLowerCase()) {
    case 'user':
      return '/user/dashboard';
    case 'cashier':
      return '/cashier/dashboard';
    case 'manager':
      return '/manager/dashboard';
    case 'organizer':
      return '/organizer/dashboard';
    case 'superuser':
      return '/superuser/dashboard';
    default:
      return '/dashboard';
  }
};
