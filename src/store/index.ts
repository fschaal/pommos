import { RootState } from "./types";
import Vuex, { StoreOptions } from "vuex";
import createPersistedState from "vuex-persistedstate";
import { getters } from "./getters";
import { mutations } from "./mutations";
import { RoundType } from "../models";
import { timer } from "./timer";

const store: StoreOptions<RootState> = {
  plugins: [createPersistedState()],
  state: {
    rounds: [
      {
        type: RoundType.Focus,
        time: 25,
        sequence: 1,
      },
      {
        type: RoundType.Break,
        time: 5,
        sequence: 2,
      },
      {
        type: RoundType.Focus,
        time: 25,
        sequence: 3,
      },
      {
        type: RoundType.Break,
        time: 5,
        sequence: 4,
      },
      {
        type: RoundType.Focus,
        time: 25,
        sequence: 5,
      },
      {
        type: RoundType.Break,
        time: 5,
        sequence: 6,
      },
      {
        type: RoundType.Focus,
        time: 25,
        sequence: 7,
      },
      {
        type: RoundType.LongBreak,
        time: 15,
        sequence: 8,
      },
    ],
    focusDuration: 25,
    breakDuration: 5,
    longBreakDuration: 15,
  },
  getters: getters,
  mutations: mutations,
  modules: {
    timer,
  },
};

export default new Vuex.Store<RootState>(store);
