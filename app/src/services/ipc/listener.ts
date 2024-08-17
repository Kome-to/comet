import { IpcRenderer } from 'electron';
import { ICPEvents, ListenerFunction } from '../types/icpType';

export class IcpListener {
  private icp: IpcRenderer;

  constructor(icp: IpcRenderer) {
    this.icp = icp;
  }

  maximizedWindow: ListenerFunction = async (action, cb) => this.icp[action](ICPEvents.GET_IS_MAXIMIZED, cb);
}
