import "./style.css";

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

const handleMouseMove = (e: MouseEvent) => {
    mouseCord.x = e.pageX;
    mouseCord.y = e.pageY;
    drawCircle();
};

myCanvas.addEventListener('mousedown', () => {
  myCanvas.addEventListener('mousemove', handleMouseMove)
});

myCanvas.addEventListener('mouseup', () => {
  myCanvas.removeEventListener('mousemove', handleMouseMove);
});

function drawCircle() {
  ctx.fillStyle = 'pink';
  // ctx.strokeStyle = 'pink';
  // ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(mouseCord.x ?? 0, mouseCord.y ?? 0, 25, 0, Math.PI * 2);
  ctx.fill();
}

// console.log('CTX: ', ctx);