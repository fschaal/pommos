import mitt from "mitt";
import { RoundType } from "../models";

type Events = {
  createTimer: RoundType;
  startTimer: number;
  pauseTimer: null;
  stopTimer: null;
  completedTimer: null;
  resetTimer: null;
  tick: number;
};

export const EventBus = mitt<Events>();
