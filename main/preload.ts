import { contextBridge, ipcRenderer } from "electron";

const validChannels = ["notification"];
contextBridge.exposeInMainWorld("ipc", {
  send: (channel: string, data: any[]) => {
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  on: (channel: string, func: any) => {
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event: any, ...args) =>
        func(...args)
      );
    }
  },
});
