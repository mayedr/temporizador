let intervalId;
const confettiCanvas = document.getElementById('confettiCanvas');
const ctx = confettiCanvas.getContext('2d');
const inputTime = document.getElementById('inputTime');
const timerDisplay = document.getElementById('timer');

function startTimer() {
    const timeInSeconds = parseInt(inputTime.value);
    let remainingTime = timeInSeconds;

    if (!isNaN(timeInSeconds)) {
        intervalId = setInterval(() => {
            remainingTime--;
            if (remainingTime >= 0) {
                timerDisplay.textContent = formatTime(remainingTime);
            } else {
                clearInterval(intervalId);
                showConfetti();
            }
        }, 1000);
    }
}

function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}

function showConfetti() {
    const confettiSize = 5;
    const particles = [];

    for (let i = 0; i < 200; i++) {
        particles.push({
            x: Math.random() * confettiCanvas.width,
            y: Math.random() * confettiCanvas.height,
            color: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`,
            size: Math.random() * confettiSize + 1,
            xSpeed: (Math.random() - 0.5) * 20,
            ySpeed: Math.random() * 20 + 10,
        });
    }

    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;

    setInterval(() => {
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.fillStyle = particle.color;
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();

            particle.x += particle.xSpeed;
            particle.y += particle.ySpeed;
            if (particle.y > confettiCanvas.height) {
                particle.y = -confettiSize;
                particle.x = Math.random() * confettiCanvas.width;
            }
        });
    }, 30);
}
