import "./style.css";
import "./canvas-style.css";

const myCanvas: HTMLCanvasElement = document.getElementById('my-canvas') as HTMLCanvasElement;
const ctx = myCanvas.getContext('2d')!;
myCanvas.width = window.innerWidth;
myCanvas.height = window.innerHeight;

// console.log('my canvas: ', myCanvas);
// console.log('my context: ', ctx);

// On every window resize - reset the drawing
window.addEventListener('resize', () => {
  myCanvas.width = window.innerWidth;
  myCanvas.height = window.innerHeight;
});

const mouseCord: { x: number | undefined, y: number | undefined } = {
  x: undefined,
  y: undefined,
}

// const handleMouseMove = (e: MouseEvent) => {
//     mouseCord.x = e.pageX;
//     mouseCord.y = e.pageY;
//     drawCircle();
// };

// myCanvas.addEventListener('mousedown', () => {
//   myCanvas.addEventListener('mousemove', handleMouseMove)
// });

// myCanvas.addEventListener('mouseup', () => {
//   myCanvas.removeEventListener('mousemove', handleMouseMove);
// });

let myParticles: Particle[] = [];
const rateOfShrink: number = 0.2;
let myHue = 0;
class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  hslColor: string;

  constructor() {
    this.x = mouseCord.x ?? 0;
    this.y = mouseCord.y ?? 0;
    // this.x = Math.random() * window.innerWidth;
    // this.y = Math.random() * window.innerHeight;
    this.size = Math.random() * 16 + 4;
    this.speedX = Math.random() * (1.5 - (-1.5)) + (-1.5);
    this.speedY = Math.random() * 3 - 1.5;
    this.hslColor = `hsl(${myHue}, 100%, 50%)`;
  };

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.size -= rateOfShrink;
  }
  draw() {
    // ctx.fillStyle = `white`;
    ctx.fillStyle = this.hslColor;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

myCanvas.addEventListener('click', (e: MouseEvent) => {
  mouseCord.x = e.x;
  mouseCord.y = e.y;

  myParticles.push(...Array.from({ length: 15 }, () => new Particle()));
});

myCanvas.addEventListener('mousemove', (e: MouseEvent) => {
  mouseCord.x = e.x;
  mouseCord.y = e.y;

  myParticles.push(...Array.from({ length: 15 }, () => new Particle()));
});

// function init() {
//   myParticles = Array.from({length: 100}, () => new Particle());
// }
// init();

function handleParticleAnimation() {
  if (myParticles) {
    for (let i = 0; i < myParticles.length; i++) {
      myParticles[i].update();
      myParticles[i].draw();
      if (myParticles[i].size < rateOfShrink) {
        myParticles.splice(i, 1);
        i--;
      }
    }
  }
}


// Animation loop - Game loop
function animate() {
  // ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

  // Add transparent layer every time to mimic clearing screen
  ctx.fillStyle = 'rgba(0,0,0,0.1)';
  ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);
  handleParticleAnimation();
  requestAnimationFrame(animate);
  myHue++;
}
animate();