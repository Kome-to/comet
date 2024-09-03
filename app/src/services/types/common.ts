export interface UserAttributes {
  id: string;
  email: string;
  lastName: string;
  firstName: string;
}

export interface KeyPair {
  publicKey: string;
  privateKey: string;
}

export interface EKeyPair {
  publicKey: string;
  ePrivateKey: string;
}
