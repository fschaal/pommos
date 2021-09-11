export interface Round {
  type: RoundType;
  time: number;
  sequence: number;
}

export enum RoundType {
  Focus = "Focus",
  Break = "Break",
  LongBreak = "Long Break",
}
