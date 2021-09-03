import { RootState } from "./types";
import Vuex, { StoreOptions } from "vuex";
import createPersistedState from "vuex-persistedstate";
import { getters } from "./getters";
import { mutations } from "./mutations";
import { RoundType } from "../models";

const store: StoreOptions<RootState> = {
  plugins: [createPersistedState()],
  state: {
    rounds: [
      {
        name: RoundType.Focus,
        time: 25,
        sequence: 1,
      },
      {
        name: RoundType.Break,
        time: 5,
        sequence: 2,
      },
      {
        name: RoundType.Focus,
        time: 25,
        sequence: 3,
      },
      {
        name: RoundType.Break,
        time: 5,
        sequence: 4,
      },
      {
        name: RoundType.Focus,
        time: 25,
        sequence: 5,
      },
      {
        name: RoundType.Break,
        time: 5,
        sequence: 6,
      },
      {
        name: RoundType.Focus,
        time: 25,
        sequence: 7,
      },
      {
        name: RoundType.LongBreak,
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
};

export default new Vuex.Store<RootState>(store);
