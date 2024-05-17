export const secondsToMinutes = (timeInSeconds) => {
  if (timeInSeconds === 0) {
    return `00:00`;
  }

  return Math.floor(timeInSeconds / 60) + ":" + Math.floor(timeInSeconds % 60);
};
