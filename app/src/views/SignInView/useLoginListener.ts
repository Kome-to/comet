import { decryptWithAES, textToBase64 } from '@/common/utils/crypto';
import { routes } from '@/common/utils/routes';
import { CookieKeys, storage } from '@/common/utils/storage';
import api from '@/services/apiServies';
import icp from '@/services/ipc/icp';
import { ListenerAction } from '@/services/types/icpType';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useLoginListener = () => {
  const navigate = useNavigate();

  const getUser = async (hashKey: string) => {
    try {
      const { publicKey, ePrivateKey, email } = await api.user.getMe();
      const iv = await textToBase64(email);
      const privateKey = await decryptWithAES(hashKey, ePrivateKey, iv);
      storage.set(CookieKeys.publicKey, publicKey);
      storage.set(CookieKeys.privateKey, privateKey);
    } catch (e) {
      console.log(e);
      storage.removeToken();
    }
  };

  useEffect(() => {
    const listenLogin = async (_event: any, token: string, hashKey: string) => {
      storage.setToken(token);
      getUser(hashKey);
      navigate(routes.DEFAULT);
    };

    icp.listener.loginFromWeb(ListenerAction.ON, listenLogin);

    return () => {
      icp.listener.loginFromWeb(ListenerAction.OFF, listenLogin);
    };
  }, []);

  return null;
};
