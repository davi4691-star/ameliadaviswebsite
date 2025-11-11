class SparkleEffect {
    constructor() {
        this.sparkles = [];
        this.lastMouseX = 0;
        this.lastMouseY = 0;
        this.createSparkleContainer();
        this.bindEvents();
    }

    createSparkleContainer() {
        this.container = document.createElement('div');
        this.container.style.cssText = `
            position: fixed;
            inset: 0;
            pointer-events: none;
            z-index: 9999;
        `;
        document.body.appendChild(this.container);
    }

    createSparkle(x, y) {
        const sparkle = document.createElement('div');
        const hue = Math.random() * 60 + 40; // Golden yellow colors
        const size = Math.random() * 6 + 4;
        sparkle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle at center, hsl(${hue}, 100%, 75%), transparent 70%);
            pointer-events: none;
            transform-origin: center;
            animation: sparkleFloat 1s ease-out forwards;
        `;
        return sparkle;
    }

    addSparkle(x, y) {
        const sparkle = this.createSparkle(x, y);
        this.container.appendChild(sparkle);
        this.sparkles.push({
            element: sparkle,
            createdAt: Date.now()
        });

        // Clean up old sparkles
        setTimeout(() => {
            sparkle.remove();
            this.sparkles = this.sparkles.filter(s => s.element !== sparkle);
        }, 1000);
    }

    handleMouseMove(e) {
        const now = Date.now();
        const dx = e.clientX - this.lastMouseX;
        const dy = e.clientY - this.lastMouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const sparkleCount = Math.min(Math.floor(distance / 10), 3);

        for (let i = 0; i < sparkleCount; i++) {
            const ratio = i / sparkleCount;
            const x = this.lastMouseX + dx * ratio;
            const y = this.lastMouseY + dy * ratio;
            this.addSparkle(x, y);
        }

        this.lastMouseX = e.clientX;
        this.lastMouseY = e.clientY;
    }

    bindEvents() {
        document.addEventListener('mousemove', this.handleMouseMove.bind(this));
    }
}

// Initialize sparkle effect when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SparkleEffect();
});

// Add the necessary CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkleFloat {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: scale(1.5) rotate(180deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);