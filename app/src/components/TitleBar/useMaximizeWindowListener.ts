import icp from '@/services/ipc/icp';
import { ListenerAction } from '@/services/types/icpType';
import { useEffect, useState } from 'react';

export const useMaximizeWindowListener = () => {
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    const listenMaximize = (_event: any, isMaximized: boolean) => {
      setIsMaximized(isMaximized);
    };

    icp.listener.maximizedWindow(ListenerAction.ON, listenMaximize);

    return () => {
      icp.listener.maximizedWindow(ListenerAction.OFF, listenMaximize);
    };
  }, []);

  return { isMaximized };
};
