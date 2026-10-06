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


function formatarNumero(numero) {

  return numero.toLocaleString("pt-BR");

}


function renderEstados(lista = estados) {

  const container =
    document.getElementById("states");

  container.innerHTML = "";

  lista.forEach(estado => {

    const lider =
      estado.vermelho > estado.azul
        ? "red"
        : "blue";

    const card =
      document.createElement("div");

    card.className = "state";

    card.innerHTML = `

      <div class="state-name">

        <span>
          ${estado.uf} · ${estado.nome}
        </span>

        <span>
          ${lider === "red" ? "C1" : "C2"}
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

        ${estado.vermelho}%
        ×
        ${estado.azul}%

        ·

        ${estado.apurado}%
        apurado

      </small>

    `;

    container.appendChild(card);

  });

}


function atualizarInformacaoEstado(estado) {

  const info =
    document.getElementById("stateInfo");

  const lider =
    estado.vermelho > estado.azul
      ? "Candidato 1"
      : "Candidato 2";

  const porcentagem =
    Math.max(
      estado.vermelho,
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

  /*
    O mapa visual abaixo é uma representação
    simplificada dos estados brasileiros.
    Os dados continuam sendo fictícios.
  */

  const posicoes = {

    AC: [5, 60],
    AM: [18, 38],
    RR: [28, 10],
    AP: [53, 12],

    RO: [20, 72],
    PA: [48, 34],
    TO: [53, 58],

    MA: [70, 28],
    PI: [73, 42],
    CE: [86, 27],
    RN: [95, 25],
    PB: [94, 37],
    PE: [89, 48],
    AL: [96, 50],
    SE: [94, 61],
    BA: [78, 64],

    MT: [39, 76],
    GO: [57, 78],
    DF: [62, 70],
    MS: [47, 94],

    MG: [70, 83],
    ES: [87, 78],
    RJ: [88, 92],

    SP: [67, 94],
    PR: [55, 105],
    SC: [59, 116],
    RS: [51, 128]

  };


  const largura = 600;
  const altura = 150;

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

    const x = posicao[0] * 6;
    const y = posicao[1];

    const lider =
      estado.vermelho > estado.azul
        ? "red"
        : "blue";

    svg += `

      <rect
        class="map-state ${lider}"
        x="${x}"
        y="${y}"
        width="34"
        height="18"
        rx="4"
        data-uf="${estado.uf}"
      />

      <text
        x="${x + 17}"
        y="${y + 12}"
        text-anchor="middle"
        font-size="7"
        fill="white"
        pointer-events="none"
        font-weight="bold"
      >
        ${estado.uf}
      </text>

    `;

  });


  svg += `</svg>`;

  container.innerHTML = svg;


  const estadosMapa =
    container.querySelectorAll(".map-state");


  estadosMapa.forEach(elemento => {

    elemento.addEventListener(
      "click",
      () => {

        const uf =
          elemento.dataset.uf;

        const estado =
          estados.find(
            item => item.uf === uf
          );

        if (estado) {

          atualizarInformacaoEstado(
            estado
          );

        }

      }
    );

  });

}


renderEstados();

criarMapa();


document.getElementById("redBar")
  .style.width = "52.4%";


document.getElementById("blueBar")
  .style.width = "47.6%";


document.getElementById("sort")
  .addEventListener(
    "change",
    function () {

      const tipo =
        this.value;

      let lista =
        [...estados];


      if (tipo === "name") {

        lista.sort(
          (a, b) =>
            a.nome.localeCompare(
              b.nome,
              "pt-BR"
            )
        );

      }


      if (tipo === "margin") {

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


      if (tipo === "counted") {

        lista.sort(
          (a, b) =>
            b.apurado - a.apurado
        );

      }


      renderEstados(lista);

    }
  );
```
