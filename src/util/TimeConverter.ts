function timeToString(time: number): string {
  let minutes = time.toString();
  if (minutes.length === 1) {
    minutes = minutes.padStart(2, "0");
  }
  return `${minutes}:00`;
}

export default { timeToString };
