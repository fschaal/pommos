import { EventBus } from "./EventBus";
import { CustomTimer } from "./CustomTimer";
import { RoundType } from "../models";

let timer: CustomTimer;
const initialize = (): void => {
  EventBus.on("createTimer", (roundType) =>
    handleCreateTimer(roundType)
  );
  EventBus.on("startTimer", (minutes: number) =>
    handleStartTimer(minutes)
  );
  EventBus.on("pauseTimer", () => handlePauseTimer());
  EventBus.on("stopTimer", () => handleStopTimer());
  EventBus.on("resetTimer", () => handleResetTimer());
};

const handleCreateTimer = (roundType: RoundType) => {
  if (timer) return;
  timer = new CustomTimer(roundType);
  timer.addEventListener("secondsUpdated", timeElapsed);
  timer.addEventListener("targetAchieved", timerCompleted);
};

const handleStartTimer = (minutes: number) => {
  if (!timer.isRunning()) {
    timer.start({
      countdown: true,
      startValues: { minutes: minutes },
    });
  }
};

const handlePauseTimer = () => {
  if (!timer) return;
  timer.pause();
};

const handleStopTimer = () => {
  if (!timer) return;
  timer.stop();
};

const timeElapsed = () => {
  timer.elapsedTime++;
  EventBus.emit("tick", timer.elapsedTime);
};

const timerCompleted = () => {
  timer.elapsedTime = 0;
  if (timer.roundType === RoundType.Focus) {
    new Notification("Focus session ended", {
      body: "It's time for a break now.",
      icon: "/icon.png",
    });
  } else {
    new Notification("Break ended", {
      body: "Break ended so its time to focus again.",
      icon: "/icon.png",
    });
  }
  EventBus.emit("completedTimer", null);
};

const handleResetTimer = () => {
  if (!timer) return;
  timer.reset();
  timer.elapsedTime = 0;
  handleStopTimer();
};

export { initialize };
