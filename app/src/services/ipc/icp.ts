import { IpcRenderer } from 'electron';
import { IcpInvoker } from './invoker';
import { IcpListener } from './listener';

class ICP {
  private icp: IpcRenderer;

  public invoker: IcpInvoker;
  public listener: IcpListener;

  constructor() {
    this.icp = window.ipcRenderer;

    this.listener = new IcpListener(this.icp);

    this.invoker = new IcpInvoker(this.icp);
  }
}

const icp = new ICP();

export default icp;
