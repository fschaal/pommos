import { MutationTree } from "vuex";
import { RootState } from "./types";

export enum RootMutations {
  SET_FOCUS_DURATION = "setFocusDuration",
  SET_BREAK_DURATION = "setBreakDuration",
  SET_LONG_BREAK_DURATION = "setLongBreakDuration",
}

export const mutations: MutationTree<RootState> = {
  [RootMutations.SET_FOCUS_DURATION](
    state: RootState,
    payload: number
  ) {
    state.focusDuration = payload;
  },
  [RootMutations.SET_BREAK_DURATION](
    state: RootState,
    payload: number
  ) {
    state.breakDuration = payload;
  },
  [RootMutations.SET_LONG_BREAK_DURATION](
    state: RootState,
    payload: number
  ) {
    state.longBreakDuration = payload;
  },
};
