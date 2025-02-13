// Audio initialization
const audioElement = document.getElementById("bgMusic");
const songTitleElement = document.getElementById("song-title");
let audioInitialized = false;

function initializeAudio() {
  const musicFile = {
    name: "Troye Sivan - 10/10",
    file: "music/10troye.mp3"
  };

  audioElement.src = musicFile.file;
  audioElement.load();
  
  const setStartTime = () => {
    if (audioElement.readyState > 0 && audioElement.duration > 30) {
      audioElement.currentTime = 30;
    }
  };

  audioElement.addEventListener('loadedmetadata', setStartTime);
  audioElement.addEventListener('canplaythrough', setStartTime);
  songTitleElement.innerText = `Track: ${musicFile.name}`;
}

function startAudio() {
  if (!audioInitialized) {
    initializeAudio();
    audioInitialized = true;
  }
  
  audioElement.play().then(() => {
    if (audioElement.currentTime < 30) {
      audioElement.currentTime = 30;
    }
  }).catch(err => {
    console.log("Audio play requires user interaction");
  });
}

document.addEventListener('click', () => {
  startAudio();
  document.removeEventListener('click', startAudio);
}, { once: true });

audioElement.addEventListener("ended", () => {
  audioElement.currentTime = 30;
  audioElement.play();
});

// Fireflies initialization
function createFireflies(numFireflies = 40) {
  const container = document.querySelector('.fireflies') || document.createElement('div');
  container.classList.add('fireflies');
  document.body.appendChild(container);
  container.innerHTML = "";

  const centerX = 50;
  const centerY = 70;

  for (let i = 0; i < numFireflies; i++) {
    const firefly = document.createElement('div');
    firefly.classList.add('firefly');

    const radius = Math.random() * 30;
    const angle = Math.random() * 2 * Math.PI;
    const posX = Math.max(0, Math.min(100, centerX + radius * Math.cos(angle)));
    const posY = Math.max(0, Math.min(100, centerY + radius * Math.sin(angle)));

    firefly.style.setProperty('--x', `${posX}%`);
    firefly.style.setProperty('--y', `${posY}%`);
    firefly.style.setProperty('--d', `${(Math.random() * 3 + 2).toFixed(1)}s`);
    firefly.style.setProperty('--delay', `${(Math.random() * 3).toFixed(1)}s`);

    container.appendChild(firefly);
  }
}

// Text animation
function initTextAnimation() {
  const messages = [
    "hey pookie, <3",
    "happy valentine’s day.",
    "thank you for always being supportive and loving.",
    "i wish i was right beside you now.",
    "i’ll always cherish and be here for you.",
    "you mean so much to me."
  ];

  let index = 0;
  let charIndex = 0;
  const speed = 50;
  const messageContainer = document.querySelector(".text");

  function typeWriter() {
    if (index < messages.length) {
      if (charIndex < messages[index].length) {
        messageContainer.textContent += messages[index].charAt(charIndex);
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
  }

  messageContainer.addEventListener("animationend", () => typeWriter());
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
  createFireflies();
  initTextAnimation();
  document.body.classList.remove("not-loaded");
});