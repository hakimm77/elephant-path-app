export const handleRewind = async (
  soundObject: any,
  position: number,
  isPlaying: boolean
) => {
  if (soundObject) {
    const newPosition = position - 5000;
    if (newPosition < 0) {
      await soundObject.stopAsync();
    } else {
      await soundObject.setPositionAsync(newPosition);
      if (!isPlaying) {
        await soundObject.playAsync();
      }
    }
  }
};
