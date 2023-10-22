const fireworkCanvas: HTMLCanvasElement = document.getElementById("firework-canvas") as HTMLCanvasElement;
const fireworkCtx = fireworkCanvas.getContext("2d")!;

fireworkCanvas.width = window.innerWidth;
fireworkCanvas.height = window.innerHeight;

// On every window resize - reset the drawing
window.addEventListener('resize', () => {
  myCanvas.width = window.innerWidth;
  myCanvas.height = window.innerHeight;
});

const myFireworks: Firework[] = [];
let myFireworkHue = 0;
class Firework {
    posX: number;
    posY: number;
    size: number;
    // velocityX: number;
    velocityY: number;
    hslColor: string;
    destructCord: number;

    constructor() {
        this.posX = Math.random() * (fireworkCanvas.width - 100) + 50;
        this.posY = fireworkCanvas.height;
        this.size = Math.random() * 2 + 5;
        this.velocityY = Math.random() * 6 + 4;
        // this.hslColor = `hsl(${myFireworkHue}, 100%, 50%)`;
        this.hslColor = `white`;
        this.destructCord = Math.random() * (30/100 * fireworkCanvas.height / 2) + (20/100 * fireworkCanvas.height / 2);
    }

    draw() {
        fireworkCtx.fillStyle = this.hslColor;
        fireworkCtx.beginPath();
        fireworkCtx.arc(this.posX, this.posY, this.size, 0, Math.PI * 2);
        fireworkCtx.fill();
    }

    update() {
        this.posY -= this.velocityY;
    }
}

const myBlastParticles: Blast[] = [];
const blastRateOfShrink: number = 0.1;
class Blast {
    posX: number;
    posY: number;
    velocityX: number;
    velocityY: number;
    size: number;
    hslColor: string;

    constructor(posX: number, posY: number) {
        this.posX = posX;
        this.posY = posY;
        this.size = Math.random() * 6 + 4;
        this.velocityX = Math.random() * (2 - (-2)) + (-2);
        this.velocityY = Math.random() * 2.5 - 1.5;
        this.hslColor = `hsl(${myFireworkHue}, 100%, 50%)`;
    }

    update() {
        this.posX += this.velocityX;
        this.posY += this.velocityY;
        this.size -= blastRateOfShrink;
    }

    draw() {
        // ctx.fillStyle = `white`;
        fireworkCtx.fillStyle = this.hslColor;
        fireworkCtx.beginPath();
        fireworkCtx.arc(this.posX, this.posY, this.size, 0, Math.PI * 2);
        fireworkCtx.fill();
    }
}

fireworkCanvas.addEventListener('click', (_) => {
    myFireworks.push(new Firework());
    // console.log('myFireworks: ', myFireworks);
});

function handleFireworkAnimation() {
    if(myFireworks.length > 0) {
        for(let i = 0; i < myFireworks.length; i++) {
            if(myFireworks[i].posY <= myFireworks[i].destructCord) {
                myBlastParticles.push(...Array.from({length: 50}, (_) => new Blast(myFireworks[i].posX, myFireworks[i].posY)));
                myFireworks.splice(i, 1);
                i--;
            }else {
                myFireworks[i].update();
                myFireworks[i].draw();
            }
        }
    }
}

function handleBlastAnimation() {
    if(myBlastParticles.length > 0) {
        for (let i = 0; i < myBlastParticles.length; i++) {
            myBlastParticles[i].update();
            myBlastParticles[i].draw();
            if (myBlastParticles[i].size < blastRateOfShrink) {
                myBlastParticles.splice(i, 1);
                i--;
            }
        }
    }
}

// Animation Function
function animateFirework() {
    // fireworkCtx.clearRect(0, 0, fireworkCanvas.width, fireworkCanvas.height);
    fireworkCtx.fillStyle = 'rgba(0,0,0,0.25)';
    fireworkCtx.fillRect(0, 0, fireworkCanvas.width, fireworkCanvas.height);
    requestAnimationFrame(animateFirework);
    handleFireworkAnimation();
    handleBlastAnimation();
    myFireworkHue+=2;
    // console.log('Animating', myFireworks);
}

animateFirework();