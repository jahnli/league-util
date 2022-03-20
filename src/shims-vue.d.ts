/* eslint-disable */
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface Window {
  fs: typeof import("fs");
  ipcRenderer: import("electron").IpcRenderer;
}
