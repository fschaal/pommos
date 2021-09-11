import { TimerState } from "./types";
import { MutationTree } from "vuex";

export enum TimerMutations {
  SET_TIMER_ACTIVE_STATE = "setTimerActiveState",
  SET_CURRENT_ELAPSED_SECONDS = "setCurrentElapsedSeconds",
  SET_CURRENT_TIMER_ROUND_INDEX = "setCurrentTimerRoundSequence",
}

export const mutations: MutationTree<TimerState> = {
  [TimerMutations.SET_TIMER_ACTIVE_STATE](
    state: TimerState,
    payload: boolean
  ): void {
    state.active = payload;
  },
  [TimerMutations.SET_CURRENT_ELAPSED_SECONDS](
    state: TimerState,
    payload: number
  ): void {
    state.currentElapsedSeconds = payload;
  },
  [TimerMutations.SET_CURRENT_TIMER_ROUND_INDEX](
    state: TimerState,
    payload: number
  ): void {
    state.currentTimerRoundIndex = payload;
  },
};
