const AES_ALGORITHM = { name: 'AES-GCM', length: 256 };
const RSA_ALGORITHM = { name: 'RSA-OAEP', hash: { name: 'SHA-256' } };

const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
  const binaryString = String.fromCharCode(...new Uint8Array(buffer));
  return window.btoa(binaryString);
};

const base64ToArrayBuffer = (base64: string) => {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
};

const importKeyAESKey = (base64: string) => {
  const keyData = base64ToArrayBuffer(base64);
  return window.crypto.subtle.importKey('raw', keyData, AES_ALGORITHM, true, ['encrypt', 'decrypt']);
};

async function importRSAKey(base64Key: string, isPublicKey: boolean = false) {
  const keyData = base64ToArrayBuffer(base64Key);
  return window.crypto.subtle.importKey(isPublicKey ? 'spki' : 'pkcs8', keyData, RSA_ALGORITHM, true, [
    isPublicKey ? 'encrypt' : 'decrypt',
  ]);
}

export const textToBase64 = (text: string) => {
  const base64 = btoa(text);
  return base64;
};

export const generateRSAKeyPair = async () => {
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: 'RSA-OAEP',
      modulusLength: 1024,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: { name: 'SHA-256' },
    },
    true,
    ['encrypt', 'decrypt'],
  );

  const publicKey = await window.crypto.subtle.exportKey('spki', keyPair.publicKey);
  const privateKey = await window.crypto.subtle.exportKey('pkcs8', keyPair.privateKey);

  return {
    publicKey: arrayBufferToBase64(publicKey),
    privateKey: arrayBufferToBase64(privateKey),
  };
};

export const encryptWithRSA = async (publicKey: string, data: string) => {
  const encodedData = new TextEncoder().encode(data);
  const key = await importRSAKey(publicKey, true);
  const encryptedData = await window.crypto.subtle.encrypt(
    {
      name: 'RSA-OAEP',
    },
    key,
    encodedData,
  );
  return arrayBufferToBase64(encryptedData);
};

export const decryptWithRSA = async (privateKey: string, encryptedDataBase64: string) => {
  const encryptedData = base64ToArrayBuffer(encryptedDataBase64);
  const key = await importRSAKey(privateKey, false);
  const decryptedData = await window.crypto.subtle.decrypt(
    {
      name: 'RSA-OAEP',
    },
    key,
    encryptedData,
  );
  return new TextDecoder().decode(decryptedData);
};

export const encryptWithAES = async (key: string, data: string, ivString: string) => {
  const encodedData = new TextEncoder().encode(data);
  const importedKey = await importKeyAESKey(key);

  const iv = ivString ? new TextEncoder().encode(ivString) : window.crypto.getRandomValues(new Uint8Array(12));

  const encryptedData = await window.crypto.subtle.encrypt(
    {
      name: AES_ALGORITHM.name,
      iv: iv,
    },
    importedKey,
    encodedData,
  );

  return {
    iv: arrayBufferToBase64(iv),
    cipherText: arrayBufferToBase64(encryptedData),
  };
};

export const decryptWithAES = async (key: string, cipherTextBase64: string, ivBase64: string) => {
  const iv = base64ToArrayBuffer(ivBase64);
  const cipherText = base64ToArrayBuffer(cipherTextBase64);
  const importedKey = await importKeyAESKey(key);
  const decryptedData = await window.crypto.subtle.decrypt(
    {
      name: AES_ALGORITHM.name,
      iv: new Uint8Array(iv),
    },
    importedKey,
    cipherText,
  );

  return new TextDecoder().decode(decryptedData);
};

export const generateAESKey = async () => {
  const key = await window.crypto.subtle.generateKey(AES_ALGORITHM, true, ['encrypt', 'decrypt']);

  const keyData = await window.crypto.subtle.exportKey('raw', key);
  return arrayBufferToBase64(keyData);
};

export const hash = async (message: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);

  const hashBuffer = await crypto.subtle.digest('SHA-256', data);

  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashBase64 = btoa(hashArray.map((byte) => String.fromCharCode(byte)).join(''));

  return hashBase64;
};
