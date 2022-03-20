import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("myAPI", {
  desktop: true
});

contextBridge.exposeInMainWorld("ipcRenderer", ipcRenderer);
