const handleFastForward = async (
  soundObject: any,
  position: number,
  duration: any
) => {
  if (soundObject) {
    const newPosition = position + 5000;
    if (newPosition < duration) {
      await soundObject.setPositionAsync(newPosition);
    }
  }
};
