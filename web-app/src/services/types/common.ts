export interface SignUpParams {
  email: string;
  password: string;
  confirmationPassword?: string;
}

export interface SignInParams {
  email: string;
  password: string;
}
