export interface IUsuario {
    id: number;
    email?: string;
    password?: string;
    roles?: string[];
    isActive?: boolean;
    firstName?: string;
    lastName?: string;
    phone?: string;
    addressLine?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
    avatarUrl?: string;
    birthDate?: string; // formato ISO (ej: '1995-03-25')
    createdAt?: string;
}
