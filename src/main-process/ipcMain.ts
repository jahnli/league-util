import { UserType } from "@/interface/user";
import LCU_API from "@/service/api";
import { Get, httpsAgent } from "@/service/axios";
import { app, BrowserWindow, ipcMain } from "electron";
import LCU_EVENT from "./event";

app.whenReady().then(() => {
  const mainWin = BrowserWindow.fromId(1);

  // 获取用户信息
  ipcMain.handle(LCU_EVENT.getUserInfo, async (event, arg) => {
    try {
      const res = await Get<UserType>(LCU_API.CURRENT_SUMMONER, { httpsAgent });
      return res;
    } catch (error) {}
  });

  ipcMain.on("min", () => mainWin?.minimize());
  // 收起展开
  ipcMain.on("setMainWin", (event, bounds) => {
    mainWin?.setBounds(bounds);
  });
  ipcMain.on("close", () => mainWin?.hide());

  // 更改音效
  ipcMain.on("getSetting", (event, arg) => {
    mainWin?.webContents.send("getSetting");
  });
});
