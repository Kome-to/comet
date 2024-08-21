export interface UserAttributes {
  id: string;
}

export type UserCreation = Omit<UserAttributes, 'id'>;
