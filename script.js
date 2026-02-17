window.addEventListener("load", () => {

    const sections = document.querySelectorAll(".hidden");

    sections.forEach((section, index) => {
        setTimeout(() => {
            section.classList.remove("hidden");
            section.classList.add("show");
        }, index * 700);
    });

    // Confetti inicial
    confetti({
        particleCount: 200,
        spread: 120,
        origin: { y: 0.6 }
    });

    // Corazones flotando
    setInterval(() => {
        const heart = document.createElement("div");
        heart.classList.add("heart");
        heart.innerHTML = "💖";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = (Math.random() * 20 + 20) + "px";
        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 6000);
    }, 600);

    // BOTONES
    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");
    const response = document.getElementById("response");
    const container = document.querySelector(".buttons");

    let noClickCount = 0;

    const frases = [
        "¿Segura? 🥺",
        "Te daré otra oportunidad... 😏",
        "Mujer malilla 😌",
        "Seguro ya no me amas tanto 💖",
        "Tu te lo pierdes... ",
        "Ultima oportunidad",
        "El destino ya está decidido 💘"
    ];

    // Cuando presiona SÍ
    yesBtn.addEventListener("click", () => {
        response.innerHTML = "Sabía que dirías que sí 😍💖✨";
        response.style.fontSize = "1.6rem";

        confetti({
            particleCount: 400,
            spread: 180,
            origin: { y: 0.6 }
        });

        yesBtn.style.transform = "scale(1.3)";
        noBtn.style.display = "none";
    });

    function moveNoButton(e) {
        e.preventDefault();

        noClickCount++;

        response.innerHTML = frases[noClickCount % frases.length];

        // Reducir tamaño del NO
        let scale = Math.max(0.5, 1 - noClickCount * 0.08);
        noBtn.style.transform = `scale(${scale})`;

        // Aumentar tamaño del SÍ
        let yesScale = 1 + noClickCount * 0.08;
        yesBtn.style.transform = `scale(${yesScale})`;

        // Mover SOLO dentro del contenedor visible
        const containerRect = container.getBoundingClientRect();
        const btnWidth = noBtn.offsetWidth;
        const btnHeight = noBtn.offsetHeight;

        const padding = 10;

        const maxX = containerRect.width - btnWidth - padding;
        const maxY = containerRect.height - btnHeight - padding;

        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        noBtn.style.position = "absolute";
        noBtn.style.left = randomX + "px";
        noBtn.style.top = randomY + "px";

        // Después de varios intentos desaparece
        if (noClickCount > 7) {
            noBtn.style.display = "none";
            response.innerHTML = "Sabia que dirías que si 😌💖";
        }
    }

    noBtn.addEventListener("mouseover", moveNoButton);
    noBtn.addEventListener("touchstart", moveNoButton);
});