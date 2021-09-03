import { GetterTree } from "vuex";
import { RootState } from "./types";
import { Round, RoundType } from "../models";

export const getters: GetterTree<RootState, RootState> = {
  rounds(state: RootState): Round[] {
    const rounds = state.rounds;
    rounds.forEach((round: Round) => {
      if (round.name === RoundType.Focus) {
        round.time = state.focusDuration;
      }
      if (round.name === RoundType.Break) {
        round.time = state.breakDuration;
      }
      if (round.name === RoundType.LongBreak) {
        round.time = state.longBreakDuration;
      }
    });
    return rounds;
  },
  focusDuration(state: RootState): number {
    return state.focusDuration;
  },
  breakDuration(state: RootState): number {
    return state.breakDuration;
  },
  longBreakDuration(state: RootState): number {
    return state.longBreakDuration;
  },
};
