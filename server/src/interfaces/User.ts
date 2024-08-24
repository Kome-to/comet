export interface UserAttributes {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  publicKey: string;
  password: string;
  ePrivateKey: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type UserCreation = Omit<UserAttributes, 'id'>;
