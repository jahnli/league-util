import { UserType } from "@/interface/user";
import { Get, httpsAgent } from "@/service/axios";
import { getLcuImg, LcuImgPath } from "@/main-process/lcu-assets";
import { app, BrowserWindow, ipcMain } from "electron";
import LCU_EVENT from "./event";
import "./lcu-assets.ts";
import { LCU_API } from "./api";

app.whenReady().then(() => {
  const mainWin = BrowserWindow.fromId(1);

  // 获取用户信息和头像
  ipcMain.handle(LCU_EVENT.GET_USER_InFO, async (event, arg) => {
    try {
      const userInfoRes = await Get<UserType>(LCU_API.USER_INFO, { httpsAgent });
      const userIconRes = await getLcuImg(LcuImgPath.PROFILE, userInfoRes?.profileIconId, "jpg");
      return {
        userInfoRes,
        userIconRes
      };
    } catch (error) {}
  });

  // 获取 lcu 资源
  ipcMain.handle(LCU_EVENT.GET_LCU_IMG, async (event, id) => {
    try {
      const res = await getLcuImg(LcuImgPath.CHAMPION, id);
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
