import { IpcRendererEvent } from 'electron';

export enum ICPEvents {
  APP_CLOSE = 'invoke/close',
  APP_MAXIMIZE = 'invoke/maximize',
  APP_MINIMIZE = 'invoke/minimize',
  APP_OPEN_EXTERNAL = 'invoke/open-external',

  GET_IS_MAXIMIZED = 'get/is-maximized',
}

export enum ListenerAction {
  ON = 'on',
  OFF = 'off',
}

export type ListenerFunction = (action: ListenerAction, cb: (event: IpcRendererEvent, ...args: any[]) => void) => Promise<any>;
