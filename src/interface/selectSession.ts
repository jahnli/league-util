// To parse this data:
//
//   import { Convert, SelectSessionType } from "./file";
//
//   const selectSessionType = Convert.toSelectSessionType(json);

export interface SelectSessionType {
  actions: Array<Action[]>;
  allowBattleBoost: boolean;
  allowRerolling: boolean;
  allowSkinSelection: boolean;
  bans: Bans;
  chatDetails: ChatDetails;
  hasSimultaneousBans: boolean;
  hasSimultaneousPicks: boolean;
  isCustomGame: boolean;
  isSpectating: boolean;
  localPlayerCellId: number;
  myTeam: MyTeam[];
  rerollsRemaining: number;
  theirTeam: any[];
  timer: Timer;
  trades: any[];
}

export interface Action {
  actorCellId: number;
  championId: number;
  completed: boolean;
  id: number;
  isAllyAction: boolean;
  isInProgress: boolean;
  pickTurn: number;
  type: string;
}

export interface Bans {
  myTeamBans: any[];
  numBans: number;
  theirTeamBans: any[];
}

export interface ChatDetails {
  chatRoomName: string;
  chatRoomPassword: string;
}

export interface MyTeam {
  assignedPosition: string;
  cellId: number;
  championId: number;
  championPickIntent: number;
  playerType: string;
  selectedSkinId: number;
  spell1Id: number;
  spell2Id: number;
  summonerId: number;
  team: number;
  wardSkinId: number;
}

export interface Timer {
  adjustedTimeLeftInPhase: number;
  internalNowInEpochMs: number;
  isInfinite: boolean;
  phase: string;
  totalTimeInPhase: number;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toSelectSessionType(json: string): SelectSessionType {
    return JSON.parse(json);
  }

  public static selectSessionTypeToJson(value: SelectSessionType): string {
    return JSON.stringify(value);
  }
}
