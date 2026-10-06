const CANDIDATO_VERMELHO = "Lula";
const CANDIDATO_AZUL = "Flávio Bolsonaro";

const estados = [
  { uf: "AC", nome: "Acre", vermelho: 28.73, azul: 64.56 },
  { uf: "AL", nome: "Alagoas", vermelho: 54.73, azul: 40.45 },
  { uf: "AP", nome: "Amapá", vermelho: 45.71, azul: 45.67 },
  { uf: "AM", nome: "Amazonas", vermelho: 48.23, azul: 45.08 },
  { uf: "BA", nome: "Bahia", vermelho: 66.17, azul: 28.58 },
  { uf: "CE", nome: "Ceará", vermelho: 63.29, azul: 31.29 },
  { uf: "DF", nome: "Distrito Federal", vermelho: 38.11, azul: 51.31 },
  { uf: "ES", nome: "Espírito Santo", vermelho: 37.76, azul: 54.78 },
  { uf: "GO", nome: "Goiás", vermelho: 31.06, azul: 53.60 },
  { uf: "MA", nome: "Maranhão", vermelho: 63.99, azul: 30.93 },
  { uf: "MT", nome: "Mato Grosso", vermelho: 29.18, azul: 65.15 },
  { uf: "MS", nome: "Mato Grosso do Sul", vermelho: 34.68, azul: 58.60 },
  { uf: "MG", nome: "Minas Gerais", vermelho: 43.33, azul: 48.24 },
  { uf: "PA", nome: "Pará", vermelho: 49.91, azul: 44.51 },
  { uf: "PB", nome: "Paraíba", vermelho: 61.31, azul: 33.07 },
  { uf: "PR", nome: "Paraná", vermelho: 31.20, azul: 59.91 },
  { uf: "PE", nome: "Pernambuco", vermelho: 63.45, azul: 31.03 },
  { uf: "PI", nome: "Piauí", vermelho: 70.99, azul: 24.10 },
  { uf: "RJ", nome: "Rio de Janeiro", vermelho: 39.41, azul: 53.01 },
  { uf: "RN", nome: "Rio Grande do Norte", vermelho: 59.75, azul: 34.77 },
  { uf: "RS", nome: "Rio Grande do Sul", vermelho: 35.73, azul: 55.64 },
  { uf: "RO", nome: "Rondônia", vermelho: 25.89, azul: 67.45 },
  { uf: "RR", nome: "Roraima", vermelho: 22.86, azul: 71.06 },
  { uf: "SC", nome: "Santa Catarina", vermelho: 25.04, azul: 66.65 },
  { uf: "SP", nome: "São Paulo", vermelho: 38.20, azul: 51.93 },
  { uf: "SE", nome: "Sergipe", vermelho: 62.75, azul: 30.63 },
  { uf: "TO", nome: "Tocantins", vermelho: 43.42, azul: 50.44 }
];

function formatarPercentual(valor) {
  return valor.toFixed(2).replace(".", ",") + "%";
}

function atualizarPainelPrimeiroTurno() {

  const redPercentage =
    document.getElementById("redPercentage");

  const bluePercentage =
    document.getElementById("bluePercentage");

  const redVotes =
    document.getElementById("redVotes");

  const blueVotes =
    document.getElementById("blueVotes");

  const redBar =
    document.getElementById("redBar");

  const blueBar =
    document.getElementById("blueBar");

  const diferenca =
    document.getElementById("difference");

  const contado =
    document.getElementById("counted");

  if (redPercentage)
    redPercentage.textContent = "45,16%";

  if (bluePercentage)
    bluePercentage.textContent = "47,03%";

  if (redVotes)
    redVotes.textContent = "53.876.617 votos";

  if (blueVotes)
    blueVotes.textContent = "56.104.268 votos";

  if (redBar)
    redBar.style.width = "45.16%";

  if (blueBar)
    blueBar.style.width = "47.03%";

  if (diferenca)
    diferenca.textContent = "2.227.651 votos";

  if (contado)
    contado.textContent = "100%";

  criarStatusAtualizacao(
    "Resultado final oficial do 1º turno — TSE"
  );
}

function renderEstados(lista = estados) {

  const container =
    document.getElementById("states");

  if (!container) return;

  container.innerHTML = "";

  lista.forEach(estado => {

    const vencedor =
      estado.azul > estado.vermelho
        ? CANDIDATO_AZUL
        : CANDIDATO_VERMELHO;

    const corVencedor =
      estado.azul > estado.vermelho
        ? "blue"
        : "red";

    const card =
      document.createElement("div");

    card.className = "state";

    card.innerHTML = `
      <div class="state-name">
        <span>
          ${estado.uf} · ${estado.nome}
        </span>

        <strong
          style="
            color:${
              corVencedor === "blue"
                ? "#2563eb"
                : "#dc2626"
            };
          "
        >
          ${vencedor}
        </strong>
      </div>

      <div class="state-bar">

        <div
          class="red"
          style="width:${estado.vermelho}%"
        ></div>

        <div
          class="blue"
          style="width:${estado.azul}%"
        ></div>

      </div>

      <small>
        Lula ${formatarPercentual(estado.vermelho)}
        ·
        Flávio Bolsonaro ${formatarPercentual(estado.azul)}
      </small>
    `;

    container.appendChild(card);

  });
}

function atualizarEstado(uf) {

  const estado =
    estados.find(
      item => item.uf === uf
    );

  const info =
    document.getElementById("stateInfo");

  if (!estado || !info) return;

  const vencedor =
    estado.azul > estado.vermelho
      ? CANDIDATO_AZUL
      : CANDIDATO_VERMELHO;

  const percentualVencedor =
    Math.max(
      estado.azul,
      estado.vermelho
    );

  info.innerHTML = `
    <small>
      ${estado.uf} · ${estado.nome}
    </small>

    <strong>
      ${vencedor}
    </strong>

    <span>
      Resultado final do 1º turno
    </span>

    <div class="state-percent">
      ${formatarPercentual(percentualVencedor)}
    </div>

    <span>
      ${CANDIDATO_VERMELHO}:
      ${formatarPercentual(estado.vermelho)}
    </span>

    <span>
      ${CANDIDATO_AZUL}:
      ${formatarPercentual(estado.azul)}
    </span>
  `;
}

function conectarMapa() {

  const objeto =
    document.getElementById("mapSvg");

  if (!objeto) return;

  objeto.addEventListener(
    "load",
    function() {

      const svg =
        objeto.contentDocument;

      if (!svg) return;

      estados.forEach(estado => {

        const elemento =
          svg.getElementById(estado.uf);

        if (!elemento) return;

        const vencedorAzul =
          estado.azul > estado.vermelho;

        elemento.style.fill =
          vencedorAzul
            ? "#2563eb"
            : "#dc2626";

        elemento.style.cursor =
          "pointer";

        elemento.style.transition =
          "opacity 0.2s";

        elemento.addEventListener(
          "mouseenter",
          function() {
            this.style.opacity = "0.7";
          }
        );

        elemento.addEventListener(
          "mouseleave",
          function() {
            this.style.opacity = "1";
          }
        );

        elemento.addEventListener(
          "click",
          function() {
            atualizarEstado(estado.uf);
          }
        );

      });

    }
  );
}

function configurarOrdenacao() {

  const select =
    document.getElementById("sort");

  if (!select) return;

  select.addEventListener(
    "change",
    function() {

      const lista =
        [...estados];

      if (this.value === "name") {

        lista.sort(
          (a, b) =>
            a.nome.localeCompare(
              b.nome,
              "pt-BR"
            )
        );

      }

      renderEstados(lista);

    }
  );
}

function criarStatusAtualizacao(mensagem) {

  const painel =
    document.querySelector(
      ".result-card"
    );

  if (!painel) return;

  const existente =
    document.getElementById(
      "demoUpdate"
    );

  if (existente) {

    existente.innerHTML = `
      <strong
        style="
          color:#c2410c;
          margin-right:6px;
        "
      >
        TSE
      </strong>
      ${mensagem}
    `;

    return;
  }

  const status =
    document.createElement(
      "div"
    );

  status.id = "demoUpdate";

  status.style.marginTop =
    "14px";

  status.style.paddingTop =
    "12px";

  status.style.borderTop =
    "1px solid #eee";

  status.style.fontSize =
    "9px";

  status.style.color =
    "#6b7280";

  status.innerHTML = `
    <strong
      style="
        color:#c2410c;
        margin-right:6px;
      "
    >
      TSE
    </strong>
    ${mensagem}
  `;

  painel.appendChild(status);
}

function iniciar() {

  renderEstados();

  conectarMapa();

  configurarOrdenacao();

  atualizarPainelPrimeiroTurno();

}

iniciar();
