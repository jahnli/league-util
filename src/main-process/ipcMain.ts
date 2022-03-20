import { UserType } from "@/interface/user";
import LCU_API from "@/service/api";
import { Get, httpsAgent } from "@/service/axios";
import { app, BrowserWindow, ipcMain } from "electron";
import LCU_EVENT from "./event";

app.whenReady().then(() => {
  const mainWin = BrowserWindow.fromId(1);

  // 获取用户信息和头像
  ipcMain.handle(LCU_EVENT.getUserInfo, async (event, arg) => {
    try {
      const userInfoRes = await Get<UserType>(LCU_API.USER_INFO, { httpsAgent });
      const userIconRes = await Get<any>(`${LCU_API.USER_ICON}${userInfoRes?.profileIconId}.jpg`, {
        httpsAgent,
        responseType: "arraybuffer"
      });
      return {
        userInfoRes,
        userIconRes: `data:image/jpg;base64,${Buffer.from(userIconRes, "binary").toString("base64")}`
      };
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
