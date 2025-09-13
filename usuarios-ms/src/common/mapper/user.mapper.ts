export const toPublicUser = (u: any) => ({
    id: u.id,
    email: u.email,
    roles: String(u.roles || '').split(',').map(r => r.trim()).filter(Boolean),
    isActive: u.isActive,
});
