const image = new Image();
image.src = '/image.png'
image.addEventListener("load", function () {
  const canvas = document.getElementById("pixel");
  const ctx = canvas.getContext("2d");
  canvas.width = 1200;
  canvas.height = 375;
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let particlesArray = [];
  let mappedImage = [];
  for (let y = 0; y < canvas.height; y++) {
    let row = [];
    for (let x = 0; x < canvas.width; x++) {
      const red = pixels.data[4 * y * pixels.width + 4 * x];
      const green = pixels.data[4 * y * pixels.width + (4 * x + 1)];
      const blue = pixels.data[4 * y * pixels.width + (4 * x + 2)];
      const brightness = getBrightness(red, green, blue);
      const cell = [
        cellBrightness = brightness,
      ];
      row.push(cell);
    }
    mappedImage.push(row);
  }

  function getBrightness(red, green, blue) {
    return (
      (red + green + blue) / (255 * 3)
    );
  }
  const particleCount = 1000;

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = 0;
      this.speed = 0;
      this.velocity = Math.random() * 1.5;
      this.size = Math.random() * 1.75;
      this.postion1 = Math.floor(this.y);
      this.postion2 = Math.floor(this.x);
    }

    update() {
      this.postion1 = Math.floor(this.y);
      this.postion2 = Math.floor(this.x);
      this.speed = Math.random() * mappedImage[this.postion1][this.postion2][0];
      this.movement = (1.5 - this.speed) + this.velocity;
      this.y += this.movement;
      if (this.y > canvas.height) {
        this.y = 0;
        this.x = Math.random() * canvas.width;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.fillStyle = "rgb(255, 0, 0)";
      // ctx.fillStyle = "white";
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  function init() {
    for (let i = 0; i < particleCount; i++) {
      particlesArray.push(new Particle());
    }
  }
  init();
  function animate() {
    ctx.globalAlpha = 0.01;
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particleCount; i++) {
      particlesArray[i].update();
      ctx.globalAlpha = particlesArray[i].speed;
      particlesArray[i].draw();
    }
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
});
