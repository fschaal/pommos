import Timer from "easytimer.js";
import { RoundType } from "../models";

export class CustomTimer extends Timer {
  public roundType: RoundType;
  public elapsedTime = 0;

  constructor(roundType: RoundType) {
    super();
    this.roundType = roundType;
  }
}
