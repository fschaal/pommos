function timeToString(time: number): string {
  let minutes = time.toString();
  if (minutes.length === 1) {
    minutes = minutes.padStart(2, "0");
  }
  return `${minutes}:00`;
}

function elapsedTimeToString(
  elapsedSeconds: number,
  totalMinutesInRound: number
): string {
  const minutes = Math.floor(elapsedSeconds / 60);
  let remainingSeconds =
    60 - (elapsedSeconds - minutes * 60);
  let remainingMinutes = totalMinutesInRound - minutes;
  remainingMinutes =
    remainingMinutes >= 1
      ? remainingMinutes - 1
      : remainingMinutes;

  if (remainingSeconds === 60) {
    remainingMinutes += 1;
    remainingSeconds = 0;
  }

  return `${remainingMinutes.toString().padStart(2, "0")}:${
    remainingSeconds < 10
      ? remainingSeconds.toString().padStart(2, "0")
      : remainingSeconds
  }`;
}

export default { timeToString, elapsedTimeToString };
