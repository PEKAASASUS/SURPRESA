/* ============================================================
   SURPRESA ROMÂNTICA — script.js
   Para personalizar, mexa só nas seções 1 e 2.
   ============================================================ */
"use strict";

/* ---------- 1. TEXTOS E ARQUIVOS (edite aqui) ---------- */
const CONFIG = {
  para: "Vitória Oliveira Titon",                    // nome/apelido dela
  de: "João Pedro - Vulgo seu amor",          // seu nome/apelido (aparece no final)
  data: "",                           // opcional, ex.: "07/10/2026" (deixe "" para esconder)
  fraseInicial: "Eu fiz uma coisinha pra você...",
  fraseCoracao: "Você é a parte mais bonita dos meus dias.",
  mensagem: [                         // cada item é um parágrafo
    "Às vezes eu fico pensando em como uma pessoa consegue fazer tanta diferença na vida da outra.",
    "Ai eu lembro de você meu amor.",
    "Você tornou meus dias mais bonitos, meus momentos mais especiais e meu mundo infinitamente melhor simplesmente por fazer parte dele.",
    "Eu só queria te lembrar disso hoje e principalmente hoje."
  ],
  fraseFinal: "Eu te amo Vitória. ❤️",
  assinatura: "Feito especialmente para você amor.",
  foto: "assets/foto.jpg",
  musica: "assets/musica.mp3"          // se o arquivo não existir, o site segue sem música
};

/* ---------- 2. TEMPOS em milissegundos (ajuste a duração total) ---------- */
const TEMPO = {
  coracao: 6500,          // quanto a cena do coração fica na tela (toque avança antes)
  buque: 9500,            // quanto o buquê floresce antes da mensagem
  entreParagrafos: 3600,  // intervalo entre os parágrafos
  aposMensagem: 6500      // pausa depois do último parágrafo
};

/* ---------- 3. Utilidades ---------- */
const $ = (s) => document.querySelector(s);
const aleatorio = (a, b) => a + Math.random() * (b - a);

/* Coração em SVG: a foto é recortada com clip-path e "slice"
   (equivale a object-fit: cover), então nunca deforma. */
function coracaoSVG(id, classe) {
  const d = "M50 88C20 62 2 44 2 26 2 12 13 2 26 2 36 2 45 8 50 16 55 8 64 2 74 2 87 2 98 12 98 26 98 44 80 62 50 88Z";
  return `<svg class="heart ${classe || ""}" viewBox="0 0 100 90" role="img" aria-label="Foto dentro de um coração">
    <defs>
      <clipPath id="c${id}"><path d="${d}"/></clipPath>
      <linearGradient id="g${id}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#8c1d3f"/><stop offset="1" stop-color="#4f0d24"/>
      </linearGradient>
    </defs>
    <path d="${d}" fill="url(#g${id})"/>
    <image href="${CONFIG.foto}" x="0" y="0" width="100" height="90"
           preserveAspectRatio="xMidYMid slice" clip-path="url(#c${id})"/>
    <path d="${d}" fill="none" stroke="#d8b27a" stroke-width="1.2" stroke-opacity=".8"/>
  </svg>`;
}

/* Uma flor feita de camadas de pétalas (elipses giradas) */
function flor(x, y, r, c1, c2, atraso) {
  let p = "";
  const camada = (n, k, cor, giro) => {
    for (let i = 0; i < n; i++) {
      p += `<ellipse cx="0" cy="${-r * k * 0.55}" rx="${r * k * 0.42}" ry="${r * k * 0.6}"
        fill="${cor}" fill-opacity=".95" stroke="rgba(0,0,0,.18)" stroke-width=".6"
        transform="rotate(${giro + (i * 360) / n})"/>`;
    }
  };
  camada(7, 1, c1, 0);
  camada(6, 0.7, c2, 25);
  camada(5, 0.4, c1, 10);
  p += `<circle r="${r * 0.1}" fill="#d8b27a"/>`;
  return `<g transform="translate(${x} ${y})"><g class="flower" style="--d:${atraso}s">${p}</g></g>`;
}

/* Buquê: caules primeiro, depois folhas, embalagem e flores abrindo */
function montarBuque() {
  const flores = [ // x, y, raio, cor externa, cor interna, atraso (s)
    [100, 62, 27, "#9e1f40", "#c0607a", 2.6],
    [60, 98, 23, "#c0607a", "#f3d9d3", 3.1],
    [140, 96, 23, "#f3d9d3", "#d98aa0", 3.6],
    [32, 150, 19, "#b13a5a", "#e7a5b5", 4.1],
    [168, 148, 19, "#c0607a", "#9e1f40", 4.5],
    [100, 128, 21, "#f3d9d3", "#c0607a", 4.9]
  ];
  const folhas = [[78, 185, -50, 1.2], [122, 185, 50, 1.5], [52, 170, -70, 1.8], [148, 168, 70, 2.1]];
  let s = `<defs><linearGradient id="papel" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#ecd0cb"/><stop offset="1" stop-color="#b8788a"/></linearGradient></defs>`;
  flores.forEach(([x, y, r], i) => {
    const cx = 100 + (x - 100) * 0.25;
    s += `<path class="stem" pathLength="1" style="--d:${0.3 + i * 0.25}s"
      d="M100 262 Q${cx} 190 ${x} ${y + r * 0.4}"/>`;
  });
  folhas.forEach(([x, y, rot, d]) => {
    s += `<g transform="translate(${x} ${y}) rotate(${rot})">
      <ellipse class="leaf" rx="6" ry="16" cy="-14" style="--d:${d}s"/></g>`;
  });
  s += `<path class="wrap" d="M64 200 L136 200 L108 276 L92 276Z" fill="url(#papel)"/>
    <ellipse class="wrap" cx="91" cy="226" rx="9" ry="5" fill="#d8b27a" transform="rotate(-20 91 226)"/>
    <ellipse class="wrap" cx="109" cy="226" rx="9" ry="5" fill="#d8b27a" transform="rotate(20 109 226)"/>
    <circle class="wrap" cx="100" cy="227" r="3.2" fill="#b8905a"/>`;
  flores.forEach(([x, y, r, c1, c2, d]) => { s += flor(x, y, r, c1, c2, d); });
  $("#buque").innerHTML = s;
}

/* ---------- 4. Montagem inicial da página ---------- */
const cenas = [...document.querySelectorAll(".scene")];
const fx = $("#fx");
let atual = 0, timer = null, entrou = Date.now(), revelado = false;

$("#intro").textContent = CONFIG.fraseInicial;
$("#frase").textContent = CONFIG.fraseCoracao;
$("#heart1").innerHTML = coracaoSVG(1);
$("#heart2").innerHTML = coracaoSVG(2, "small");
// Se a foto não carregar, remove a imagem e o coração segue só com o degradê
document.querySelectorAll("image").forEach((img) =>
  img.addEventListener("error", () => img.remove()));
montarBuque();

const msg = $("#msg");
const paragrafos = [CONFIG.para + ","].concat(CONFIG.mensagem).map((t, i) => {
  const p = document.createElement("p");
  p.textContent = t;
  if (i === 0) p.className = "nome";
  msg.appendChild(p);
  return p;
});

$("#fim").textContent = CONFIG.fraseFinal;
$("#assina").textContent = CONFIG.assinatura;
$("#de").textContent = "— " + CONFIG.de;
$("#data").textContent = CONFIG.data;
$("#data").hidden = !CONFIG.data;

// Pontinhos de luz do fundo
for (let i = 0; i < 22; i++) {
  const d = document.createElement("span"), t = aleatorio(1, 3);
  d.className = "dot";
  d.style.cssText = `left:${aleatorio(0, 100)}%;top:${aleatorio(0, 100)}%;width:${t}px;height:${t}px;` +
    `--t:${aleatorio(3, 7)}s;--d:${aleatorio(0, 5)}s`;
  $("#dots").appendChild(d);
}

/* ---------- 5. Efeitos: pétalas caindo e corações subindo ---------- */
function petala() {
  if (fx.querySelectorAll(".petal").length > 8) return;
  const p = document.createElement("span"), s = aleatorio(9, 16);
  p.className = "petal";
  p.style.cssText = `left:${aleatorio(0, 100)}%;width:${s}px;height:${s * 1.3}px;` +
    `--dx:${aleatorio(-60, 60)}px;--r:${aleatorio(200, 520)}deg;animation-duration:${aleatorio(10, 16)}s`;
  p.addEventListener("animationend", () => p.remove());
  fx.appendChild(p);
}
function subir() {
  if (fx.querySelectorAll(".rise").length > 9) return;
  const h = document.createElement("span");
  h.className = "rise";
  h.textContent = "♥";
  h.style.cssText = `left:${aleatorio(5, 95)}%;font-size:${aleatorio(14, 30)}px;` +
    `--dx:${aleatorio(-40, 40)}px;--t:${aleatorio(7, 11)}s`;
  h.addEventListener("animationend", () => h.remove());
  fx.appendChild(h);
}
setInterval(() => {
  if (atual >= 2) petala();
  if (atual === 4) subir();
}, 1000);

/* ---------- 6. Navegação entre as cenas ---------- */
function ir(n) {
  clearTimeout(timer);
  atual = n;
  entrou = Date.now();
  cenas.forEach((c, i) => c.classList.toggle("on", i === n));
  cenas[n].classList.add("ativa"); // "ativa" dispara as animações e nunca é removida
  if (n === 1) timer = setTimeout(() => ir(2), TEMPO.coracao);
  if (n === 2) timer = setTimeout(() => ir(3), TEMPO.buque);
  if (n === 3) mostrarMensagem();
}

function mostrarMensagem() {
  paragrafos.forEach((p, i) =>
    setTimeout(() => p.classList.add("show"), 760 + i * TEMPO.entreParagrafos));
  const fim = 760 + (paragrafos.length - 1) * TEMPO.entreParagrafos;
  setTimeout(() => { revelado = true; }, fim + 1700);
  timer = setTimeout(() => ir(4), fim + TEMPO.aposMensagem);
}

// Tocar na tela avança (depois de 2 s em cada cena, para não pular sem querer)
$("#stage").addEventListener("click", () => {
  if (Date.now() - entrou < 2500) return;
  if (atual === 1 || atual === 2) ir(atual + 1);
  else if (atual === 3 && revelado) ir(4);
});

/* ---------- 7. Música (opcional) ---------- */
const botaoSom = $("#som");
let audio = null;

function iniciarMusica() {
  if (!CONFIG.musica) return;
  audio = new Audio();
  audio.loop = true;
  audio.volume = 0.6;
  audio.addEventListener("canplay", () => { botaoSom.hidden = false; }, { once: true });
  audio.addEventListener("error", () => { botaoSom.hidden = true; audio = null; });
  audio.src = CONFIG.musica;
  const r = audio.play();
  if (r && r.catch) r.catch(() => {}); // se o navegador bloquear, o botão ♪ liga
}

botaoSom.addEventListener("click", (e) => {
  e.stopPropagation();
  if (!audio) return;
  if (audio.paused) { audio.play().catch(() => {}); botaoSom.classList.remove("mudo"); }
  else { audio.pause(); botaoSom.classList.add("mudo"); }
});

$("#open").addEventListener("click", (e) => {
  e.stopPropagation();
  iniciarMusica(); // precisa estar dentro do toque do usuário
  ir(1);
});
