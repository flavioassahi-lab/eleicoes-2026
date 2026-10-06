const estados = [

  {
    uf: "AC",
    nome: "Acre",
    vermelho: 54,
    azul: 46,
    apurado: 38
  },

  {
    uf: "AL",
    nome: "Alagoas",
    vermelho: 49,
    azul: 51,
    apurado: 44
  },

  {
    uf: "BA",
    nome: "Bahia",
    vermelho: 45,
    azul: 55,
    apurado: 51
  },

  {
    uf: "CE",
    nome: "Ceará",
    vermelho: 44,
    azul: 56,
    apurado: 49
  },

  {
    uf: "DF",
    nome: "Distrito Federal",
    vermelho: 52,
    azul: 48,
    apurado: 47
  },

  {
    uf: "ES",
    nome: "Espírito Santo",
    vermelho: 53,
    azul: 47,
    apurado: 43
  },

  {
    uf: "GO",
    nome: "Goiás",
    vermelho: 57,
    azul: 43,
    apurado: 52
  },

  {
    uf: "MG",
    nome: "Minas Gerais",
    vermelho: 54,
    azul: 46,
    apurado: 78
  },

  {
    uf: "MT",
    nome: "Mato Grosso",
    vermelho: 61,
    azul: 39,
    apurado: 55
  },

  {
    uf: "MS",
    nome: "Mato Grosso do Sul",
    vermelho: 59,
    azul: 41,
    apurado: 51
  },

  {
    uf: "PA",
    nome: "Pará",
    vermelho: 48,
    azul: 52,
    apurado: 42
  },

  {
    uf: "PB",
    nome: "Paraíba",
    vermelho: 46,
    azul: 54,
    apurado: 50
  },

  {
    uf: "PE",
    nome: "Pernambuco",
    vermelho: 44,
    azul: 56,
    apurado: 48
  },

  {
    uf: "PR",
    nome: "Paraná",
    vermelho: 58,
    azul: 42,
    apurado: 60
  },

  {
    uf: "RJ",
    nome: "Rio de Janeiro",
    vermelho: 58,
    azul: 42,
    apurado: 64
  },

  {
    uf: "RS",
    nome: "Rio Grande do Sul",
    vermelho: 55,
    azul: 45,
    apurado: 67
  },

  {
    uf: "SC",
    nome: "Santa Catarina",
    vermelho: 62,
    azul: 38,
    apurado: 58
  },

  {
    uf: "SP",
    nome: "São Paulo",
    vermelho: 49,
    azul: 51,
    apurado: 81
  },

  {
    uf: "TO",
    nome: "Tocantins",
    vermelho: 51,
    azul: 49,
    apurado: 37
  }

];


function renderEstados() {

  const container =
    document.getElementById("states");

  container.innerHTML = "";

  estados.forEach(estado => {

    const lider =
      estado.vermelho > estado.azul
        ? "red"
        : "blue";

    const card =
      document.createElement("div");

    card.className =
      "state";

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


renderEstados();


document.getElementById("redBar")
  .style.width = "52.4%";


document.getElementById("blueBar")
  .style.width = "47.6%";


document.getElementById("sort")
  .addEventListener("change", function () {

    const tipo = this.value;

    if (tipo === "name") {

      estados.sort(
        (a, b) =>
          a.uf.localeCompare(b.uf)
      );

    }


    if (tipo === "margin") {

      estados.sort(
        (a, b) =>
          Math.abs(b.vermelho - b.azul)
          -
          Math.abs(a.vermelho - a.azul)
      );

    }


    if (tipo === "counted") {

      estados.sort(
        (a, b) =>
          b.apurado - a.apurado
      );

    }

    renderEstados();

  });
