export interface Round {
  name: RoundType;
  time: number;
  sequence: number;
}

export enum RoundType {
  Focus = "Focus",
  Break = "Break",
  LongBreak = "LongBreak",
}
