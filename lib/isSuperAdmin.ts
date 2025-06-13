export const isSuperAdmin = (userId?: string | null) => {
    const superAdminIds = process.env.NEXT_PUBLIC_SUPER_ADMIN_ID?.split(',') || [];
    return superAdminIds.includes(userId || '');
  };
  