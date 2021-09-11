import { GetterTree } from "vuex";
import { TimerState } from "./types";
import { RootState } from "../types";

export const getters: GetterTree<TimerState, RootState> = {
  active(state: TimerState): boolean {
    return state.active;
  },
  currentElapsedSeconds(state: TimerState): number {
    return state.currentElapsedSeconds;
  },
  currentTimerRoundIndex(state: TimerState): number {
    return state.currentTimerRoundIndex;
  },
};
