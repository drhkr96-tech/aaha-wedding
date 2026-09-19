const preloader = document.getElementById("preloader");
const hero = document.getElementById("opening");

window.addEventListener("load", () => {
  setTimeout(() => {
    preloader.classList.add("hide");
    setTimeout(() => hero.classList.add("open"), 450);
  }, 900);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.16 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

/* Subtle pointer parallax for the cinematic atmosphere */
document.addEventListener("pointermove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5);
  const y = (e.clientY / window.innerHeight - 0.5);

  document.querySelectorAll(".temple, .final-temple").forEach(el => {
    el.style.transform = `translateX(calc(-50% + ${x * 14}px)) translateY(${y * 8}px)`;
  });
});

/* The music button is intentionally UI-ready without forcing autoplay.
   Add your own /assets/music.mp3 and uncomment the audio section below if desired. */
const soundToggle = document.getElementById("soundToggle");
let audio = null;
let playing = false;

soundToggle.addEventListener("click", () => {
  if (!audio) {
    audio = new Audio("assets/music.mp3");
    audio.loop = true;
    audio.volume = 0.35;
  }

  if (playing) {
    audio.pause();
    soundToggle.textContent = "♪";
  } else {
    audio.play().catch(() => {});
    soundToggle.textContent = "Ⅱ";
  }
  playing = !playing;
});
