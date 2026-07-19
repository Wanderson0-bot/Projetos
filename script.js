const elementos = document.querySelectorAll(".revelar");
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("ativo");
        }
    });
}, {
    threshold: 0.2
});
elementos.forEach((elemento) => {
    observer.observe(elemento);
});

const estatisticas = document.querySelectorAll(".estatistica-valor");
const animarEstatisticas = (entry) => {
    if (!entry.isIntersecting) return;

    entry.target.classList.add("animando");
    const valorAlvo = Number(entry.target.dataset.target || 0);
    const prefixo = entry.target.dataset.prefix || "";
    const sufixo = entry.target.dataset.suffix || "";
    const duracao = 1400;
    const incremento = Math.max(1, Math.round(valorAlvo / (duracao / 16)));
    let valorAtual = 0;

    const intervalo = setInterval(() => {
        valorAtual += incremento;
        if (valorAtual >= valorAlvo) {
            valorAtual = valorAlvo;
            clearInterval(intervalo);
        }

        entry.target.textContent = `${prefixo}${valorAtual}${sufixo}`;
    }, 16);

    observer.unobserve(entry.target);
};

const observerEstatisticas = new IntersectionObserver((entries) => {
    entries.forEach(anima => animarEstatisticas(anima));
}, {
    threshold: 0.4
});

estatisticas.forEach((estatistica) => {
    observerEstatisticas.observe(estatistica);
});

document.getElementById("ano").textContent = new Date().getFullYear();

const menuToggle = document.querySelector(".menu-toggle");
const menuPrincipal = document.querySelector("#menu-principal");

if (menuToggle && menuPrincipal) {
    menuToggle.addEventListener("click", () => {
        const aberto = menuPrincipal.classList.toggle("aberto");
        menuToggle.setAttribute("aria-expanded", aberto);
        menuToggle.setAttribute("aria-label", aberto ? "Fechar menu de navegação" : "Abrir menu de navegação");
        menuToggle.querySelector("i").className = aberto ? "bi bi-x-lg" : "bi bi-list";
    });

    menuPrincipal.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            menuPrincipal.classList.remove("aberto");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Abrir menu de navegação");
            menuToggle.querySelector("i").className = "bi bi-list";
        });
    });
}
