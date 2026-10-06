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



function atualizarEstado(uf) {

  const estado =
    estados.find(
      item => item.uf === uf
    );


  const info =
    document.getElementById("stateInfo");


  if (!estado || !info) return;


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
      ${estado.apurado}%
      das seções apuradas
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



function conectarMapa() {

  const objeto =
    document.getElementById("mapSvg");


  if (!objeto) {

    console.error(
      "Mapa SVG não encontrado."
    );

    return;

  }


  objeto.addEventListener(
    "load",
    function() {

      const svg =
        objeto.contentDocument;


      if (!svg) {

        console.error(
          "Não foi possível acessar o SVG."
        );

        return;

      }


      estados.forEach(estado => {

        const elemento =
          svg.getElementById(
            estado.uf
          );


        if (!elemento) return;


        const lider =
          estado.vermelho > estado.azul
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


      if (
        this.value === "name"
      ) {

        lista.sort(
          (a, b) =>
            a.nome.localeCompare(
              b.nome,
              "pt-BR"
            )
        );

      }


      if (
        this.value === "margin"
      ) {

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


      if (
        this.value === "counted"
      ) {

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



function atualizarBarraPrincipal() {

  const redBar =
    document.getElementById(
      "redBar"
    );


  const blueBar =
    document.getElementById(
      "blueBar"
    );


  if (redBar) {

    redBar.style.width =
      "52.4%";

  }


  if (blueBar) {

    blueBar.style.width =
      "47.6%";

  }

}



function iniciar() {

  renderEstados();

  atualizarBarraPrincipal();

  configurarOrdenacao();

  conectarMapa();

}



iniciar();
