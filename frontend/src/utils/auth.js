export const redirectPathForRole = (role) => {
  switch ((role || '').toLowerCase()) {
    case 'cashier':
      return '/cashier';
    case 'manager':
      return '/manager';
    case 'organizer':
      return '/organizer';
    case 'superuser':
      return '/admin';
    case 'regular':
    default:
      return '/dashboard';
  }
};
