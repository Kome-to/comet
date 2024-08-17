import { IpcRenderer } from 'electron';
import { ICPEvents } from '../types/icpType';

export class IcpInvoker {
  private icp: IpcRenderer;

  constructor(icp: IpcRenderer) {
    this.icp = icp;
  }

  closeApp = async () => this.icp.invoke(ICPEvents.APP_CLOSE);

  minimizeApp = async () => this.icp.invoke(ICPEvents.APP_MINIMIZE);

  maximizeApp = async () => this.icp.invoke(ICPEvents.APP_MAXIMIZE);

  openExternal = async (url: string) => this.icp.invoke(ICPEvents.APP_OPEN_EXTERNAL, url);
}
