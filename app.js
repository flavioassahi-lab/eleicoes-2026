const CANDIDATO_VERMELHO = "Lula";
const CANDIDATO_AZUL = "Flávio Bolsonaro";

const estados = [

  { uf: "AC", nome: "Acre", vermelho: 54, azul: 46, apurado: 38 },
  { uf: "AL", nome: "Alagoas", vermelho: 49, azul: 51, apurado: 44 },
  { uf: "AP", nome: "Amapá", vermelho: 47, azul: 53, apurado: 35 },
  { uf: "AM", nome: "Amazonas", vermelho: 51, azul: 49, apurado: 41 },
  { uf: "BA", nome: "Bahia", vermelho: 45, azul: 55, apurado: 51 },
  { uf: "CE", nome: "Ceará", vermelho: 44, azul: 56, apurado: 49 },
  { uf: "DF", nome: "Distrito Federal", vermelho: 52, azul: 48, apurado: 47 },
  { uf: "ES", nome: "Espírito Santo", vermelho: 53, azul: 47, apurado: 43 },
  { uf: "GO", nome: "Goiás", vermelho: 57, azul: 43, apurado: 52 },
  { uf: "MA", nome: "Maranhão", vermelho: 43, azul: 57, apurado: 46 },
  { uf: "MT", nome: "Mato Grosso", vermelho: 61, azul: 39, apurado: 55 },
  { uf: "MS", nome: "Mato Grosso do Sul", vermelho: 59, azul: 41, apurado: 51 },
  { uf: "MG", nome: "Minas Gerais", vermelho: 54, azul: 46, apurado: 78 },
  { uf: "PA", nome: "Pará", vermelho: 48, azul: 52, apurado: 42 },
  { uf: "PB", nome: "Paraíba", vermelho: 46, azul: 54, apurado: 50 },
  { uf: "PR", nome: "Paraná", vermelho: 58, azul: 42, apurado: 60 },
  { uf: "PE", nome: "Pernambuco", vermelho: 44, azul: 56, apurado: 48 },
  { uf: "PI", nome: "Piauí", vermelho: 42, azul: 58, apurado: 45 },
  { uf: "RJ", nome: "Rio de Janeiro", vermelho: 58, azul: 42, apurado: 64 },
  { uf: "RN", nome: "Rio Grande do Norte", vermelho: 45, azul: 55, apurado: 43 },
  { uf: "RS", nome: "Rio Grande do Sul", vermelho: 55, azul: 45, apurado: 67 },
  { uf: "RO", nome: "Rondônia", vermelho: 57, azul: 43, apurado: 39 },
  { uf: "RR", nome: "Roraima", vermelho: 60, azul: 40, apurado: 34 },
  { uf: "SC", nome: "Santa Catarina", vermelho: 62, azul: 38, apurado: 58 },
  { uf: "SP", nome: "São Paulo", vermelho: 49, azul: 51, apurado: 81 },
  { uf: "SE", nome: "Sergipe", vermelho: 47, azul: 53, apurado: 40 },
  { uf: "TO", nome: "Tocantins", vermelho: 51, azul: 49, apurado: 37 }

];

function renderEstados(lista = estados) {

  const container = document.getElementById("states");

  if (!container) return;

  container.innerHTML = "";

  lista.forEach(estado => {

    const lider =
      estado.vermelho > estado.azul
        ? CANDIDATO_VERMELHO
        : CANDIDATO_AZUL;

    const card = document.createElement("div");

    card.className = "state";

    card.innerHTML = `
      <div class="state-name">
        <span>${estado.uf} · ${estado.nome}</span>
        <span>${lider}</span>
      </div>

      <div class="state-bar">
        <div class="red" style="width:${estado.vermelho}%"></div>
        <div class="blue" style="width:${estado.azul}%"></div>
      </div>

      <small>
        ${CANDIDATO_VERMELHO}: ${estado.vermelho}%
        ×
        ${CANDIDATO_AZUL}: ${estado.azul}%
        · ${estado.apurado}% apurado
      </small>
    `;

    container.appendChild(card);

  });

}

function atualizarEstado(uf) {

  const estado =
    estados.find(item => item.uf === uf);

  const info =
    document.getElementById("stateInfo");

  if (!estado || !info) return;

  const lider =
    estado.vermelho > estado.azul
      ? CANDIDATO_VERMELHO
      : CANDIDATO_AZUL;

  const porcentagem =
    Math.max(
      estado.vermelho,
      estado.azul
    );

  const diferenca =
    Math.abs(
      estado.vermelho -
      estado.azul
    );

  info.innerHTML = `
    <small>
      ${estado.uf} · ${estado.nome}
    </small>

    <strong>
      ${lider} lidera
    </strong>

    <span>
      ${estado.apurado}% das seções apuradas
    </span>

    <div class="state-percent">
      ${porcentagem}%
    </div>

    <span>
      ${CANDIDATO_VERMELHO}: ${estado.vermelho}%
      ·
      ${CANDIDATO_AZUL}: ${estado.azul}%
    </span>

    <span>
      Diferença: ${diferenca} ponto(s) percentuais
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
          svg.getElementById(
            estado.uf
          );

        if (!elemento) return;

        const lider =
          estado.vermelho >
          estado.azul
            ? "red"
            : "blue";

        elemento.style.fill =
          lider === "red"
            ? "#dc2626"
            : "#2563eb";

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
            atualizarEstado(
              estado.uf
            );
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

      let lista =
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

      if (this.value === "margin") {

        lista.sort(
          (a, b) => {

            const margemA =
              Math.abs(
                a.vermelho -
                a.azul
              );

            const margemB =
              Math.abs(
                b.vermelho -
                b.azul
              );

            return margemB - margemA;

          }
        );

      }

      if (this.value === "counted") {

        lista.sort(
          (a, b) =>
            b.apurado -
            a.apurado
        );

      }

      renderEstados(lista);

    }
  );

}


/*
=========================================================
PAINEL NACIONAL — 1º TURNO
Dados oficiais utilizados temporariamente
enquanto o 2º turno ainda não possui apuração.
=========================================================
*/

function atualizarPainelPrimeiroTurno() {

  const redPercentage =
    document.getElementById(
      "redPercentage"
    );

  const bluePercentage =
    document.getElementById(
      "bluePercentage"
    );

  const redVotes =
    document.getElementById(
      "redVotes"
    );

  const blueVotes =
    document.getElementById(
      "blueVotes"
    );

  const redBar =
    document.getElementById(
      "redBar"
    );

  const blueBar =
    document.getElementById(
      "blueBar"
    );

  const diferenca =
    document.getElementById(
      "difference"
    );

  const contado =
    document.getElementById(
      "counted"
    );


  if (redPercentage)
    redPercentage.textContent =
      "45,16%";

  if (bluePercentage)
    bluePercentage.textContent =
      "47,03%";


  if (redVotes)
    redVotes.textContent =
      "53.876.617 votos";

  if (blueVotes)
    blueVotes.textContent =
      "56.104.268 votos";


  if (redBar)
    redBar.style.width =
      "45.16%";

  if (blueBar)
    blueBar.style.width =
      "47.03%";


  if (diferenca)
    diferenca.textContent =
      "2.227.651 votos";


  if (contado)
    contado.textContent =
      "99,99%";


  criarStatusAtualizacao(
    "Resultado oficial do 1º turno — 2º turno aguardando apuração"
  );

}

async function atualizarPainelComTSE() {

  try {

    const resposta =
      await fetch(
        "/api/resultados"
      );

    const resultado =
      await resposta.json();


    if (!resultado.sucesso)
      return;


    if (!resultado.disponivel) {

      /*
      O 2º turno ainda não possui
      resultados publicados.

      Mantemos o resultado oficial
      do 1º turno no painel.
      */

      atualizarPainelPrimeiroTurno();

      return;

    }


    console.log(
      "Dados oficiais do 2º turno recebidos:",
      resultado.dados
    );


    /*
    Quando o TSE publicar os dados
    do 2º turno, faremos aqui a
    substituição automática do
    resultado do 1º turno.
    */

  } catch (erro) {

    console.error(
      "Erro ao consultar API:",
      erro
    );

    /*
    Se a consulta falhar,
    continuamos mostrando os
    números oficiais do 1º turno.
    */

    atualizarPainelPrimeiroTurno();

  }

}


function criarStatusAtualizacao(
  mensagem =
    "Resultado oficial do 1º turno"
) {

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
        style="color:#c2410c;margin-right:6px;"
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

  status.id =
    "demoUpdate";

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
      style="color:#c2410c;margin-right:6px;"
    >
      TSE
    </strong>
    ${mensagem}
  `;


  painel.appendChild(
    status
  );

}


async function iniciar() {

  renderEstados();

  conectarMapa();

  configurarOrdenacao();

  /*
  Mostra imediatamente o resultado
  oficial do 1º turno enquanto o
  2º turno ainda não está disponível.
  */

  atualizarPainelPrimeiroTurno();

  await atualizarPainelComTSE();

}


iniciar();
