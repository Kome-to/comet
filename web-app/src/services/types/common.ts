export interface SignUpParams {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  publicKey: string;
  ePrivateKey: string;
}

export interface SignInParams {
  email: string;
  password: string;
}
