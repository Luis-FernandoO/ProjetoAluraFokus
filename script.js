const html = document.querySelector("html");
const btnFoco = document.querySelector(".app__card-button--foco");
const btnCurto = document.querySelector(".app__card-button--curto");
const btnLongo = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const musicaFocoInput = document.querySelector("#alternar-musica");
const btnStartPause = document.querySelector("#start-pause");
const btnIniciarOuPausar = document.querySelector("#start-pause span");
const btnImg = document.querySelector("#start-pause img");
const secaoTempo = document.querySelector("#timer");

//Variaveis de Musica
const musica = new Audio("/sons/luna-rise-part-one.mp3");
const audioPlay = new Audio("/sons/play.wav");
const audioPause = new Audio("/sons/pause.mp3");
const audioTempoFinalizado = new Audio("/sons/beep.mp3");

musica.loop = true;
audioTempoFinalizado.volume = 0.5;

let tempoPercorridoEmSegs = 1500;
let intervaloId = null;

musicaFocoInput.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});
btnFoco.addEventListener("click", () => {
  tempoPercorridoEmSegs = 1500;
  alteraContexto("foco");
  btnFoco.classList.add("active");
});

btnCurto.addEventListener("click", () => {
  tempoPercorridoEmSegs = 300;

  alteraContexto("descanso-curto");
  btnCurto.classList.add("active");
});

btnLongo.addEventListener("click", () => {
  tempoPercorridoEmSegs = 900;
  alteraContexto("descanso-longo");
  btnLongo.classList.add("active");
});

function alteraContexto(contexto) {
  mostrarTempo();
  botoes.forEach(function (contexto) {
    contexto.classList.remove("active");
  });
  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `/imagens/${contexto}.png`);
  switch (contexto) {
    case "foco":
      titulo.innerHTML = `Otimize sua produtividade,<br>
                <b class="app__title-strong">mergulhe no que importa.</b>`;
      break;
    case "descanso-curto":
      titulo.innerHTML = `Que tal dar uma respirada?<br>
                <b class="app__title-strong">Faça uma pausa curta!</b>`;
      break;
    case "descanso-longo":
      titulo.innerHTML = `Hora de voltar à superficie.<br>
                <b class="app__title-strong">Faça uma pausa longa.</b> `;
      break;
    default:
      break;
  }
}

const contagemRegressiva = () => {
  if (tempoPercorridoEmSegs <= 0) {
    // audioTempoFinalizado.play();
    alert("Tempo Finalizado!");
    zerarTempo();
    return;
  }
  tempoPercorridoEmSegs -= 1;
  mostrarTempo();
};
btnStartPause.addEventListener("click", iniciarOuPausar);

function iniciarOuPausar() {
  if (intervaloId) {
    audioPause.play();
    zerarTempo();
    return;
  }
  audioPlay.play();
  intervaloId = setInterval(contagemRegressiva, 1000);
  btnIniciarOuPausar.textContent = "Pausar";
  btnImg.setAttribute("src", "/imagens/pause.png");
}

function zerarTempo() {
  clearInterval(intervaloId);
  btnIniciarOuPausar.textContent = "Começar";
  btnImg.setAttribute("src", "/imagens/play_arrow.png");
  intervaloId = null;
}

function mostrarTempo() {
  const tempo = new Date(tempoPercorridoEmSegs * 1000);
  const tempoFormatado = tempo.toLocaleTimeString("pt-br", {
    minute: "2-digit",
    second: "2-digit",
  });
  secaoTempo.innerHTML = `${tempoFormatado}`;
}
mostrarTempo();
