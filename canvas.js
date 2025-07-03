
const canvas = document.getElementById("lines-demo");
const ctx = canvas.getContext("2d");

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

window.addEventListener("resize", () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
});

class FloatingSphere {
  constructor() {
    this.reset();
  }

  reset() {
    this.radius = 2 + Math.random() * 6;
    this.x = Math.random() * width;
    this.y = height + this.radius + Math.random() * height;
    this.speed = 1 + Math.random() * 1;
    this.alpha = 0.08 + Math.random() * 0.4;
    this.blur = 10 + Math.random() * 10;
  }

  update() {
    this.y -= this.speed;
    if (this.y < -this.radius) {
      this.reset();
      this.y = height + this.radius;
    }
  }

  draw() {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.shadowColor = `rgba(187, 224, 235, ${this.alpha})`;
    ctx.shadowBlur = this.blur;
    ctx.fillStyle = `rgba(187, 224, 235, ${this.alpha})`;
    ctx.fill();
    ctx.restore();
  }
}

const sphereCount = 60;
const spheres = Array.from({ length: sphereCount }, () => new FloatingSphere());

function animate() {
  ctx.fillStyle = "#022727"; // solid background
  ctx.fillRect(0, 0, width, height);

  for (let s of spheres) {
    s.update();
    s.draw();
  }

  requestAnimationFrame(animate);
}
animate();

