let text = document.getElementById("fact");
const button = document.getElementById("button");
const main = document.querySelector(".main");
const catPortrait = document.getElementById("cat_portrait");

//api
const getData = function () {
  fetch("https://catfact.ninja/fact")
    .then((response) => {
      if (!response.ok) {
        throw new Error("No cat fact found.");
      }
      return response.json();
    })
    .then((data) => changeText(data));

  const changeText = (data) => {
    text.innerText = data.fact;
  };
};

const keywords = ["cat", "CAT", "kitten", "cAt"];

let catWord = -1;

const keywordIterator = () => {
  if (catWord <= 2) {
    catWord++;
  }

  if (catWord > 2) {
    catWord = catWord - 3;
  }
};

button.addEventListener("click", function changeCat() {
  getData();
  keywordIterator();
  catPortrait.src =
    "https://source.unsplash.com/500x500/?" + keywords[catWord] + "";
});

//button-animation

window.addEventListener("load", () => {
  button.classList.add("animate");
});

button.addEventListener("click", () => {
  button.classList.remove("animate");
});

//button-animation-END

//canvas-cat-floating
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];

const img = document.getElementById("cat-icon");

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const mouse = {
  x: undefined,
  y: undefined,
};

button.addEventListener("click", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
  for (let i = 0; i < 5; i++) {
    particlesArray.push(new Particle());
  }
});

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 5 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  draw() {
    ctx.drawImage(img, this.y, this.x);
  }
}

const handleParticles = () => {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }
};
const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  requestAnimationFrame(animate);
};
animate();
