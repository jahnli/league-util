process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import { BrowserWindow } from "electron";
import WebSocket from "ws";
import LCU_EVENT from "./event";

const url = `riot:T_ub8OV9r1zWuvGopASnkQ@127.0.0.1:8403`;
const ws = new WebSocket(`wss://${url}`);

enum LcuMessageType {
  WELCOME,
  PREFIX,
  CALL,
  CALLRESULT,
  CALLERROR,
  SUBSCRIBE,
  UNSUBSCRIBE,
  PUBLISH,
  EVENT
}

interface WsData {
  eventType: LcuMessageType;
  uri: string;
  data: any;
}

type LcuWsResponse = [number, string, WsData];

ws.on("open", () => {
  ws.send(`[${LcuMessageType.SUBSCRIBE},"OnJsonApiEvent"]`);
});

ws.on("message", (message: string) => {
  try {
    const msg: LcuWsResponse = JSON.parse(message);
    const [type, eventName, WsData] = msg;

    switch (type) {
      case LcuMessageType.WELCOME:
        break;
      case LcuMessageType.CALLRESULT:
        console.log("CALLRESULT：", WsData);
        break;
      case LcuMessageType.CALLERROR:
        console.log("CALLERROR：", WsData);
        break;
      case LcuMessageType.EVENT:
        const { eventType, uri, data } = WsData;
        if (uri === `/lol-champ-select-legacy/v1/session`) {
          console.log(data.actions);
          const mainWin = BrowserWindow.fromId(1);
          mainWin?.webContents.send(LCU_EVENT.selectSession, data);
        }
        // console.log(eventType, uri, data);
        break;
      default:
        console.log("default：", [data[0], data]);
        break;
    }
  } catch (error) {}
});
