const CANDIDATO_VERMELHO = "Lula";
const CANDIDATO_AZUL = "Flávio Bolsonaro";

const estados = [
  { uf: "AC", nome: "Acre" },
  { uf: "AL", nome: "Alagoas" },
  { uf: "AP", nome: "Amapá" },
  { uf: "AM", nome: "Amazonas" },
  { uf: "BA", nome: "Bahia" },
  { uf: "CE", nome: "Ceará" },
  { uf: "DF", nome: "Distrito Federal" },
  { uf: "ES", nome: "Espírito Santo" },
  { uf: "GO", nome: "Goiás" },
  { uf: "MA", nome: "Maranhão" },
  { uf: "MT", nome: "Mato Grosso" },
  { uf: "MS", nome: "Mato Grosso do Sul" },
  { uf: "MG", nome: "Minas Gerais" },
  { uf: "PA", nome: "Pará" },
  { uf: "PB", nome: "Paraíba" },
  { uf: "PR", nome: "Paraná" },
  { uf: "PE", nome: "Pernambuco" },
  { uf: "PI", nome: "Piauí" },
  { uf: "RJ", nome: "Rio de Janeiro" },
  { uf: "RN", nome: "Rio Grande do Norte" },
  { uf: "RS", nome: "Rio Grande do Sul" },
  { uf: "RO", nome: "Rondônia" },
  { uf: "RR", nome: "Roraima" },
  { uf: "SC", nome: "Santa Catarina" },
  { uf: "SP", nome: "São Paulo" },
  { uf: "SE", nome: "Sergipe" },
  { uf: "TO", nome: "Tocantins" }
];


/*
=========================================================
PAINEL NACIONAL
Resultado oficial do 1º turno
=========================================================
*/

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
    contado.textContent = "99,99%";


  criarStatusAtualizacao(
    "Resultado oficial do 1º turno — 2º turno aguardando apuração"
  );

}


/*
=========================================================
ESTADOS
Sem dados fictícios.
=========================================================
*/

function renderEstados(lista = estados) {

  const container =
    document.getElementById("states");

  if (!container) return;

  container.innerHTML = "";

  lista.forEach(estado => {

    const card =
      document.createElement("div");

    card.className = "state";

    card.innerHTML = `

      <div class="state-name">

        <span>
          ${estado.uf} · ${estado.nome}
        </span>

        <span>
          Aguardando dados
        </span>

      </div>


      <div class="state-bar">

        <div
          class="red"
          style="width:50%;opacity:.15;"
        ></div>

        <div
          class="blue"
          style="width:50%;opacity:.15;"
        ></div>

      </div>


      <small>
        Resultado estadual oficial do TSE
        aguardando carregamento.
      </small>

    `;

    container.appendChild(card);

  });

}


/*
=========================================================
INFORMAÇÕES DO ESTADO
=========================================================
*/

function atualizarEstado(uf) {

  const estado =
    estados.find(item => item.uf === uf);

  const info =
    document.getElementById("stateInfo");

  if (!estado || !info) return;

  info.innerHTML = `

    <small>
      ${estado.uf} · ${estado.nome}
    </small>

    <strong>
      Dados oficiais
    </strong>

    <span>
      Resultado estadual do 1º turno.
    </span>

    <div class="state-percent">
      —
    </div>

    <span>
      ${CANDIDATO_VERMELHO}: aguardando dados
    </span>

    <span>
      ${CANDIDATO_AZUL}: aguardando dados
    </span>

  `;

}


/*
=========================================================
MAPA
Sem vencedor fictício.
=========================================================
*/

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

        /*
        Remove qualquer definição de
        vencedor fictício.
        */

        elemento.style.fill = "#cbd5e1";

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


/*
=========================================================
ORDENAÇÃO
=========================================================
*/

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


/*
=========================================================
STATUS
=========================================================
*/

function criarStatusAtualizacao(
  mensagem
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
      style="
        color:#c2410c;
        margin-right:6px;
      "
    >
      TSE
    </strong>

    ${mensagem}

  `;


  painel.appendChild(
    status
  );

}


/*
=========================================================
API
=========================================================
*/

async function atualizarPainelComTSE() {

  try {

    const resposta =
      await fetch(
        "/api/resultados"
      );

    const resultado =
      await resposta.json();


    if (!resultado.sucesso) {

      criarStatusAtualizacao(
        "Não foi possível consultar os dados oficiais do TSE."
      );

      return;

    }


    if (!resultado.disponivel) {

      criarStatusAtualizacao(
        "Resultado oficial do 1º turno — 2º turno aguardando apuração."
      );

      return;

    }


    console.log(
      "Dados oficiais recebidos:",
      resultado
    );


  } catch (erro) {

    console.error(
      "Erro ao consultar API:",
      erro
    );


    criarStatusAtualizacao(
      "Aguardando atualização dos dados oficiais do TSE."
    );

  }

}


/*
=========================================================
INICIALIZAÇÃO
=========================================================
*/

function iniciar() {

  renderEstados();

  conectarMapa();

  configurarOrdenacao();

  atualizarPainelPrimeiroTurno();

  atualizarPainelComTSE();

}


iniciar();
