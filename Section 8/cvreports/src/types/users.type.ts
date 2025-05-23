export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    password?: string;
}

export type UserRegister = Omit<User, 'id'>;

export type UserLogin = Pick<User, 'email' | 'password'>;