import { Get, httpsAgent } from "@/service/axios";

const url = "https://127.0.0.1:8403";
const prefixPath = "/lol-game-data/assets/v1";
type LcuImgType = "jpg" | "png";

export class LcuImgPath {
  static PROFILE = `${url}${prefixPath}/profile-icons/`;
  static CHAMPION = `${url}${prefixPath}/champion-icons/`;
}

// 获取 lcu 资源图
export const getLcuImg = async (prePath: string, id?: number, type: LcuImgType = "png") => {
  try {
    if (id === 0) return;
    const imgUrl = await Get<any>(`${prePath}${id}.${type}`, {
      httpsAgent,
      responseType: "arraybuffer"
    });
    return `data:image/${type};base64,${Buffer.from(imgUrl, "binary").toString("base64")}`;
  } catch (error) {
    console.log("获取lcu资源图失败");
  }
};
