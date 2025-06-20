
  // Get all audio elements on the page
  const audios = document.querySelectorAll("audio");

  audios.forEach(audio => {
    audio.addEventListener("play", () => {
      // Pause all other audio elements
      audios.forEach(other => {
        if (other !== audio) {
          other.pause();
          other.currentTime = 0; // Optional: reset to start
        }
      });
    });
  });

