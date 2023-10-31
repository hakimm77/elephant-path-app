const handlePlayPause = async (
  soundObject: any,
  position: number,
  duration: any,
  playbackFinished: boolean,
  isPlaying: boolean,
  setPlaybackFinished: any
) => {
  if (playbackFinished) {
    await soundObject.replayAsync();
    setPlaybackFinished(false);
  } else if (isPlaying) {
    await soundObject.pauseAsync();
  } else {
    if (position >= duration) {
      await soundObject.stopAsync();
    }
    await soundObject.playAsync();
  }
};
