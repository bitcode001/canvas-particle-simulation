const greetCanvas: HTMLCanvasElement = document.getElementById("greetings-canvas") as HTMLCanvasElement;
const greetCtx = greetCanvas.getContext("2d")!;

greetCanvas.width = window.innerWidth;
greetCanvas.height = window.innerHeight;

// On every window resize - reset the drawing
window.addEventListener('resize', () => {
  greetCanvas.width = window.innerWidth;
  greetCanvas.height = window.innerHeight;
});

const greetFireworks: Firework[] = [];
let greetFireworkHue = 0;
class GreetFirework {
    posX: number;
    posY: number;
    size: number;
    // velocityX: number;
    velocityY: number;
    hslColor: string;
    destructCord: number;

    constructor() {
        this.posX = Math.random() * (greetCanvas.width - 100) + 50;
        this.posY = greetCanvas.height;
        this.size = Math.random() * 2 + 5;
        this.velocityY = Math.random() * 4 + 4;
        // this.hslColor = `hsl(${myFireworkHue}, 100%, 50%)`;
        this.hslColor = `white`;
        this.destructCord = Math.random() * (30/100 * greetCanvas.height / 2) + (20/100 * greetCanvas.height / 2);
    }

    draw() {
        greetCtx.fillStyle = this.hslColor;
        greetCtx.beginPath();
        greetCtx.arc(this.posX, this.posY, this.size, 0, Math.PI * 2);
        greetCtx.fill();
    }

    update() {
        this.posY -= this.velocityY;
    }
}

const myGreetBlastParticles: GreetBlast[] = [];
const greetBlastRateOfShrink: number = 0.1;
class GreetBlast {
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
        this.velocityY = Math.random() * 4 - 2;
        this.hslColor = `hsl(${greetFireworkHue}, 100%, 50%)`;
    }

    update() {
        this.posX += this.velocityX;
        this.posY += this.velocityY;
        this.size -= greetBlastRateOfShrink;
    }

    draw() {
        // ctx.fillStyle = `white`;
        greetCtx.fillStyle = this.hslColor;
        greetCtx.beginPath();
        greetCtx.arc(this.posX, this.posY, this.size, 0, Math.PI * 2);
        greetCtx.fill();
    }
}

window.onload = () => {
    setInterval(() => {
        greetFireworks.push(new GreetFirework());
    }, 300);
};

// Setting up menu design and function
function handleGreetFireworkAnimation() {
    if(greetFireworks.length > 0) {
        for(let i = 0; i < greetFireworks.length; i++) {
            if(greetFireworks[i].posY <= greetFireworks[i].destructCord) {
                myGreetBlastParticles.push(...Array.from({length: 50}, (_) => new GreetBlast(greetFireworks[i].posX, greetFireworks[i].posY)));
                greetFireworks.splice(i, 1);
                i--;
            }else {
                greetFireworks[i].update();
                greetFireworks[i].draw();
            }
        }
    }
}

function handleGreetBlastAnimation() {
    if(myGreetBlastParticles.length > 0) {
        for (let i = 0; i < myGreetBlastParticles.length; i++) {
            myGreetBlastParticles[i].update();
            myGreetBlastParticles[i].draw();
            if (myGreetBlastParticles[i].size < greetBlastRateOfShrink) {
                myGreetBlastParticles.splice(i, 1);
                i--;
            }
        }
    }
}

// Animation Function
function animateGreetFirework() {
    // fireworkCtx.clearRect(0, 0, fireworkCanvas.width, fireworkCanvas.height);
    greetCtx.fillStyle = 'rgba(0,0,0,0.25)';
    greetCtx.fillRect(0, 0, greetCanvas.width, greetCanvas.height);
    requestAnimationFrame(animateGreetFirework);
    handleGreetFireworkAnimation();
    handleGreetBlastAnimation();
    greetFireworkHue+=3;
}

animateGreetFirework();