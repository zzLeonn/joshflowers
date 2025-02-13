// Universal Audio Handler
const audioHandler = (() => {
  const audioElement = document.getElementById('bgMusic');
  const songTitleElement = document.getElementById('song-title');
  let isPlaying = false;
  let userInteracted = false;

  const musicFile = {
    name: "Troye Sivan - 10/10",
    file: "music/10troye.mp3"
  };

  const initAudio = () => {
    audioElement.src = musicFile.file;
    audioElement.preload = 'metadata';
    audioElement.volume = 0.5;
    songTitleElement.textContent = `Track: ${musicFile.name}`;

    audioElement.addEventListener('loadedmetadata', () => {
      if (audioElement.duration > 30) {
        audioElement.currentTime = 30;
      }
    });

    audioElement.addEventListener('timeupdate', () => {
      if (audioElement.currentTime >= audioElement.duration - 1) {
        audioElement.currentTime = 30;
        if (isPlaying) audioElement.play();
      }
    });

    audioElement.addEventListener('error', (e) => {
      console.error('Audio error:', e);
    });
  };

  const startPlayback = () => {
    if (!userInteracted) return;
    
    audioElement.play().then(() => {
      if (audioElement.currentTime < 30) {
        audioElement.currentTime = 30;
      }
      isPlaying = true;
    }).catch((e) => {
      console.log('Playback failed:', e);
    });
  };

  const handleUserInteraction = () => {
    if (!userInteracted) {
      userInteracted = true;
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      startPlayback();
    }
  };

  // Public API
  return {
    init: () => {
      initAudio();
      document.addEventListener('click', handleUserInteraction);
      document.addEventListener('touchstart', handleUserInteraction);
    },
    togglePlayback: () => {
      isPlaying = !isPlaying;
      isPlaying ? audioElement.play() : audioElement.pause();
    }
  };
})();

// Fireflies System
const createFireflies = (() => {
  const createParticles = (num = 35) => {
    const container = document.querySelector('.fireflies') || document.createElement('div');
    container.className = 'fireflies';
    document.body.appendChild(container);

    for (let i = 0; i < num; i++) {
      const firefly = document.createElement('div');
      firefly.className = 'firefly';
      
      const centerX = 50;
      const centerY = 70;
      const radius = Math.random() * 30;
      const angle = Math.random() * 2 * Math.PI;
      
      firefly.style.setProperty('--x', `${centerX + radius * Math.cos(angle)}%`);
      firefly.style.setProperty('--y', `${centerY + radius * Math.sin(angle)}%`);
      firefly.style.setProperty('--d', `${(Math.random() * 3 + 2).toFixed(1)}s`);
      firefly.style.setProperty('--delay', `${(Math.random() * 3).toFixed(1)}s`);

      container.appendChild(firefly);
    }
  };

  return { init: createParticles };
})();

// Text Animation System
const textAnimator = (() => {
  const messages = [
    "hey pookie, <3",
    "happy valentine’s day.",
    "thank you for always being supportive and loving.",
    "i wish i was right beside you now.",
    "i’ll always cherish and be here for you.",
    "you mean so much to me."
  ];

  const initAnimation = () => {
    const messageContainer = document.querySelector(".text");
    let index = 0;
    let charIndex = 0;
    const speed = 50;

    const typeWriter = () => {
      if (index < messages.length) {
        if (charIndex < messages[index].length) {
          messageContainer.textContent += messages[index][charIndex];
          charIndex++;
          setTimeout(typeWriter, speed);
        } else if (index < messages.length - 1) {
          setTimeout(() => {
            messageContainer.textContent = "";
            charIndex = 0;
            index++;
            typeWriter();
          }, 1500);
        }
      }
    };

    messageContainer.addEventListener("animationend", typeWriter);
  };

  return { init: initAnimation };
})();

// Initialize all systems
document.addEventListener('DOMContentLoaded', () => {
  audioHandler.init();
  createFireflies.init();
  textAnimator.init();
  document.body.classList.remove("not-loaded");
});

// Pause audio when tab is hidden
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    audioHandler.togglePlayback();
  }
});