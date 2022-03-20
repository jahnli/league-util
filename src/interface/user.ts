// To parse this data:
//
//   import { Convert, UserType } from "./file";
//
//   const userType = Convert.toUserType(json);

export interface UserType {
  accountId: number;
  displayName: string;
  internalName: string;
  nameChangeFlag: boolean;
  percentCompleteForNextLevel: number;
  privacy: string;
  profileIconId: number;
  puuid: string;
  rerollPoints: RerollPoints;
  summonerId: number;
  summonerLevel: number;
  unnamed: boolean;
  xpSinceLastLevel: number;
  xpUntilNextLevel: number;
}

export interface RerollPoints {
  currentPoints: number;
  maxRolls: number;
  numberOfRolls: number;
  pointsCostToRoll: number;
  pointsToReroll: number;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toUserType(json: string): UserType {
    return JSON.parse(json);
  }

  public static userTypeToJson(value: UserType): string {
    return JSON.stringify(value);
  }
}
