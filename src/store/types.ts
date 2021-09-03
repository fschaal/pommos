import { Round } from "../models";

export interface RootState {
  rounds: Round[];
  focusDuration: number;
  breakDuration: number;
  longBreakDuration: number;
}
