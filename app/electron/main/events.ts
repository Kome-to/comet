import { BrowserWindow, ipcMain } from 'electron';
import { ICPEvents } from '../../src/services/types/icpType';

const sendMaximizedStatus = (win: BrowserWindow, status: boolean) => win.webContents.send(ICPEvents.GET_IS_MAXIMIZED, status);

export const initEvent = (win: BrowserWindow) => {
  if (!win) return;

  ipcMain.handle(ICPEvents.APP_CLOSE, () => win.close());

  ipcMain.handle(ICPEvents.APP_MINIMIZE, () => win.minimize());

  ipcMain.handle(ICPEvents.APP_MAXIMIZE, () => {
    const isMaximized = win.isMaximized();
    return isMaximized ? win.restore() : win.maximize();
  });

  win.on('maximize', () => sendMaximizedStatus(win, true));
  win.on('unmaximize', () => sendMaximizedStatus(win, false));
};
