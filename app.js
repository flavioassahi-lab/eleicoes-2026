```javascript
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


function renderEstados() {

  const container = document.getElementById("states");

  if (!container) return;

  container.innerHTML = "";

  estados.forEach(estado => {

    const lider =
      estado.vermelho > estado.azul
        ? "C1"
        : "C2";

    const card = document.createElement("div");

    card.className = "state";

    card.innerHTML = `

      <div class="state-name">

        <span>
          ${estado.uf} · ${estado.nome}
        </span>

        <span>
          ${lider}
        </span>

      </div>

      <div class="state-bar">

        <div
          class="red"
          style="width:${estado.vermelho}%">
        </div>

        <div
          class="blue"
          style="width:${estado.azul}%">
        </div>

      </div>

      <small>
        ${estado.vermelho}% × ${estado.azul}%
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
      ? "Candidato 1"
      : "Candidato 2";

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
      ${Math.max(
        estado.vermelho,
        estado.azul
      )}%
    </div>

    <span>
      Candidato 1:
      ${estado.vermelho}%
      ·
      Candidato 2:
      ${estado.azul}%
    </span>

  `;

}


function criarMapa() {

  const container =
    document.getElementById("brazilMap");

  if (!container) return;


  const largura = 900;
  const altura = 650;


  const posicoes = {

    RR: [420, 40],
    AP: [650, 65],

    AM: [260, 130],
    PA: [500, 160],
    AC: [120, 270],
    RO: [250, 300],

    MT: [380, 330],
    TO: [540, 300],
    MA: [650, 230],

    PI: [690, 310],
    CE: [770, 250],
    RN: [835, 245],

    PB: [830, 300],
    PE: [790, 350],
    AL: [830, 405],
    SE: [800, 445],
    BA: [650, 410],

    GO: [500, 400],
    DF: [555, 385],

    MG: [600, 500],
    ES: [760, 490],
    RJ: [735, 560],

    SP: [500, 555],
    MS: [390, 505],

    PR: [470, 610],
    SC: [520, 650],
    RS: [440, 700]

  };


  let svg = `

    <svg
      class="map-svg"
      viewBox="0 0 ${largura} ${altura}"
      xmlns="http://www.w3.org/2000/svg"
    >

  `;


  estados.forEach(estado => {

    const posicao =
      posicoes[estado.uf];

    if (!posicao) return;

    const lider =
      estado.vermelho > estado.azul
        ? "red"
        : "blue";


    svg += `

      <g
        class="map-state ${lider}"
        data-uf="${estado.uf}"
        transform="translate(${posicao[0]},${posicao[1]})"
      >

        <rect
          width="68"
          height="42"
          rx="8"
        />

        <text
          x="34"
          y="27"
          text-anchor="middle"
        >
          ${estado.uf}
        </text>

      </g>

    `;

  });


  svg += `</svg>`;


  container.innerHTML = svg;


  const elementos =
    container.querySelectorAll(".map-state");


  elementos.forEach(elemento => {

    elemento.addEventListener(
      "click",
      function() {

        atualizarEstado(
          this.dataset.uf
        );

      }
    );

  });

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
          (a, b) =>
            Math.abs(
              b.vermelho - b.azul
            )
            -
            Math.abs(
              a.vermelho - a.azul
            )
        );

      }


      if (this.value === "counted") {

        lista.sort(
          (a, b) =>
            b.apurado - a.apurado
        );

      }


      renderEstadosLista(lista);

    }
  );

}


function renderEstadosLista(lista) {

  const container =
    document.getElementById("states");

  if (!container) return;

  container.innerHTML = "";

  lista.forEach(estado => {

    const lider =
      estado.vermelho > estado.azul
        ? "C1"
        : "C2";

    const card =
      document.createElement("div");

    card.className = "state";

    card.innerHTML = `

      <div class="state-name">

        <span>
          ${estado.uf} · ${estado.nome}
        </span>

        <span>
          ${lider}
        </span>

      </div>

      <div class="state-bar">

        <div
          class="red"
          style="width:${estado.vermelho}%">
        </div>

        <div
          class="blue"
          style="width:${estado.azul}%">
        </div>

      </div>

      <small>
        ${estado.vermelho}% × ${estado.azul}%
        · ${estado.apurado}% apurado
      </small>

    `;

    container.appendChild(card);

  });

}


function iniciar() {

  renderEstados();

  criarMapa();

  configurarOrdenacao();


  const redBar =
    document.getElementById("redBar");

  const blueBar =
    document.getElementById("blueBar");


  if (redBar) {
    redBar.style.width = "52.4%";
  }

  if (blueBar) {
    blueBar.style.width = "47.6%";
  }

}


iniciar();
```
