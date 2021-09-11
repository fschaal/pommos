import { TimerState } from "./types";
import { Module } from "vuex";
import { RootState } from "../types";
import { mutations } from "./mutations";
import { getters } from "./getters";
import { actions } from "./actions";

const state: TimerState = {
  active: false,
  currentElapsedSeconds: 0,
  currentTimerRoundIndex: 0,
};

export const timer: Module<TimerState, RootState> = {
  state,
  getters,
  mutations,
  actions,
};
