const CANDIDATO_VERMELHO = "Lula";
const CANDIDATO_AZUL = "Flávio Bolsonaro";

const ultimaAtualizacao = "05/10/2026 às 18:54";

const estados = [
{ uf: "AC", nome: "Acre", vermelho: 28.73, azul: 64.56, apurado: 100 },
{ uf: "AL", nome: "Alagoas", vermelho: 54.73, azul: 40.45, apurado: 100 },
{ uf: "AP", nome: "Amapá", vermelho: 45.71, azul: 45.67, apurado: 100 },
{ uf: "AM", nome: "Amazonas", vermelho: 48.23, azul: 45.08, apurado: 100 },
{ uf: "BA", nome: "Bahia", vermelho: 66.17, azul: 28.58, apurado: 100 },
{ uf: "CE", nome: "Ceará", vermelho: 63.29, azul: 31.29, apurado: 100 },
{ uf: "DF", nome: "Distrito Federal", vermelho: 38.11, azul: 51.31, apurado: 100 },
{ uf: "ES", nome: "Espírito Santo", vermelho: 37.76, azul: 54.78, apurado: 100 },
{ uf: "GO", nome: "Goiás", vermelho: 31.06, azul: 53.60, apurado: 100 },
{ uf: "MA", nome: "Maranhão", vermelho: 63.99, azul: 30.93, apurado: 100 },
{ uf: "MT", nome: "Mato Grosso", vermelho: 29.18, azul: 65.15, apurado: 100 },
{ uf: "MS", nome: "Mato Grosso do Sul", vermelho: 34.68, azul: 58.60, apurado: 100 },
{ uf: "MG", nome: "Minas Gerais", vermelho: 43.33, azul: 48.24, apurado: 100 },
{ uf: "PA", nome: "Pará", vermelho: 49.91, azul: 44.51, apurado: 100 },
{ uf: "PB", nome: "Paraíba", vermelho: 61.31, azul: 33.07, apurado: 100 },
{ uf: "PR", nome: "Paraná", vermelho: 31.20, azul: 59.91, apurado: 100 },
{ uf: "PE", nome: "Pernambuco", vermelho: 63.45, azul: 31.03, apurado: 100 },
{ uf: "PI", nome: "Piauí", vermelho: 70.99, azul: 24.10, apurado: 100 },
{ uf: "RJ", nome: "Rio de Janeiro", vermelho: 39.41, azul: 53.01, apurado: 100 },
{ uf: "RN", nome: "Rio Grande do Norte", vermelho: 59.75, azul: 34.77, apurado: 100 },
{ uf: "RS", nome: "Rio Grande do Sul", vermelho: 35.73, azul: 55.64, apurado: 100 },
{ uf: "RO", nome: "Rondônia", vermelho: 25.89, azul: 67.45, apurado: 100 },
{ uf: "RR", nome: "Roraima", vermelho: 22.86, azul: 71.06, apurado: 100 },
{ uf: "SC", nome: "Santa Catarina", vermelho: 25.04, azul: 66.65, apurado: 100 },
{ uf: "SP", nome: "São Paulo", vermelho: 38.20, azul: 51.93, apurado: 100 },
{ uf: "SE", nome: "Sergipe", vermelho: 62.75, azul: 30.63, apurado: 100 },
{ uf: "TO", nome: "Tocantins", vermelho: 43.42, azul: 50.44, apurado: 100 }
];

let estadoSelecionado = null;

let ultimaLiderancaBrasil = CANDIDATO_AZUL;

const ultimaLiderancaEstado = {};

estados.forEach(estado => {
ultimaLiderancaEstado[estado.uf] =
estado.azul > estado.vermelho
? CANDIDATO_AZUL
: CANDIDATO_VERMELHO;
});

function formatarPercentualExato(valor) {
return Number(valor)
.toFixed(2)
.replace(".", ",") + "%";
}

function formatarPercentual(valor) {
return Math.round(valor) + "%";
}

function calcularCor(estado) {

const azulVence = estado.azul > estado.vermelho;

const maior = Math.max(
estado.azul,
estado.vermelho
);

const menor = Math.min(
estado.azul,
estado.vermelho
);

const margem = maior - menor;

const intensidade = Math.min(
1,
0.16 + margem / 55
);

if (azulVence) {

```
const r = Math.round(
  219 - 180 * intensidade
);

const g = Math.round(
  234 - 105 * intensidade
);

return `rgb(${r}, ${g}, 255)`;
```

}

const g = Math.round(
225 - 125 * intensidade
);

const b = Math.round(
225 - 125 * intensidade
);

return `rgb(255, ${g}, ${b})`;
}

/* RESULTADO NACIONAL */

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

const update =
document.getElementById("lastUpdate");

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

if (update)
update.textContent = ultimaAtualizacao;

criarStatusAtualizacao(
"Resultado final oficial do 1º turno — TSE"
);
}

/* ESTADOS */

function renderEstados(lista = estados) {

const container =
document.getElementById("states");

if (!container)
return;

container.innerHTML = "";

lista.forEach(estado => {

```
const azulVence =
  estado.azul > estado.vermelho;

const vencedor =
  azulVence
    ? CANDIDATO_AZUL
    : CANDIDATO_VERMELHO;

const cor =
  azulVence
    ? "#2563eb"
    : "#dc2626";

const card =
  document.createElement("div");

card.className = "state";

card.innerHTML = `
  <div class="state-name">
    <span>${estado.uf} · ${estado.nome}</span>
    <strong style="color:${cor};">
      ${vencedor}
    </strong>
  </div>

  <div class="state-counted">
    ${estado.apurado}% das urnas apuradas
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
    Lula ${formatarPercentualExato(estado.vermelho)}
    ·
    Flávio Bolsonaro ${formatarPercentualExato(estado.azul)}
  </small>
`;

card.addEventListener(
  "click",
  () => selecionarEstado(estado.uf)
);

container.appendChild(card);
```

});
}

/* SELEÇÃO DO ESTADO */

function selecionarEstado(uf) {

const estado =
estados.find(item => item.uf === uf);

if (!estado)
return;

estadoSelecionado = estado;

atualizarEstadoSelecionado();

destacarEstadoNoMapa(uf);

window.setTimeout(() => {

```
const area =
  document.getElementById("selectedRegion");

if (area) {

  area.hidden = false;

  area.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

}
```

}, 80);
}

/* PAINEL DO ESTADO */

function atualizarEstadoSelecionado() {

if (!estadoSelecionado)
return;

const estado =
estadoSelecionado;

const area =
document.getElementById("selectedRegion");

const nome =
document.getElementById("selectedStateName");

const uf =
document.getElementById("selectedStateUf");

const vermelho =
document.getElementById(
"stateRedPercentage"
);

const azul =
document.getElementById(
"stateBluePercentage"
);

const apurado =
document.getElementById(
"stateCounted"
);

const evolutionTitle =
document.getElementById(
"evolutionTitle"
);

const evolutionDescription =
document.getElementById(
"evolutionDescription"
);

const alertTitle =
document.getElementById(
"alertTitle"
);

const alertDescription =
document.getElementById(
"alertDescription"
);

if (area)
area.hidden = false;

if (nome)
nome.textContent = estado.nome;

if (uf)
uf.textContent = estado.uf;

if (vermelho)
vermelho.textContent =
formatarPercentualExato(
estado.vermelho
);

if (azul)
azul.textContent =
formatarPercentualExato(
estado.azul
);

if (apurado)
apurado.textContent =
formatarPercentualExato(
estado.apurado
);

if (evolutionTitle)
evolutionTitle.textContent =
`Apuração ao longo do tempo — ${estado.nome}`;

if (evolutionDescription)
evolutionDescription.textContent =
`Evolução da apuração em ${estado.nome}.`;

if (alertTitle)
alertTitle.textContent =
`Receba alertas de ${estado.nome}`;

if (alertDescription)
alertDescription.textContent =
`Ative o alerta para receber uma notificação quando houver mudança de liderança em ${estado.nome}.`;

atualizarBotaoAlerta();

atualizarGraficoEstado(estado);
}

/* MAPA */

function conectarMapa() {

const objeto =
document.getElementById("mapSvg");

if (!objeto)
return;

objeto.addEventListener(
"load",
function() {

```
  const svg =
    objeto.contentDocument;

  if (!svg)
    return;

  estados.forEach(estado => {

    const elemento =
      svg.getElementById(
        estado.uf
      );

    if (!elemento)
      return;

    const cor =
      calcularCor(estado);

    elemento.setAttribute(
      "fill",
      cor
    );

    elemento.style.setProperty(
      "fill",
      cor,
      "important"
    );

    elemento.style.cursor =
      "pointer";

    elemento.addEventListener(
      "mouseenter",
      function() {

        this.style.opacity =
          "0.7";

      }
    );

    elemento.addEventListener(
      "mouseleave",
      function() {

        this.style.opacity =
          "1";

      }
    );

    elemento.addEventListener(
      "click",
      function() {

        selecionarEstado(
          estado.uf
        );

      }
    );

  });

  criarRotulosMapa();

}
```

);
}

/* SIGLAS NO MAPA */

function criarRotulosMapa() {

const objeto =
document.getElementById("mapSvg");

if (!objeto)
return;

const svg =
objeto.contentDocument;

if (!svg)
return;

const svgRoot =
svg.documentElement;

svgRoot
.querySelectorAll(".map-label-layer")
.forEach(elemento =>
elemento.remove()
);

const camada =
svg.createElementNS(
"http://www.w3.org/2000/svg",
"g"
);

camada.setAttribute(
"class",
"map-label-layer"
);

estados.forEach(estado => {

```
const elemento =
  svg.getElementById(
    estado.uf
  );

if (!elemento)
  return;

let caixa;

try {
  caixa = elemento.getBBox();
} catch {
  return;
}

if (!caixa.width || !caixa.height)
  return;

const x =
  caixa.x +
  caixa.width / 2;

const y =
  caixa.y +
  caixa.height / 2;

const grupo =
  svg.createElementNS(
    "http://www.w3.org/2000/svg",
    "g"
  );

grupo.setAttribute(
  "class",
  "map-label"
);

grupo.setAttribute(
  "transform",
  `translate(${x} ${y})`
);

grupo.style.cursor =
  "pointer";

const texto =
  svg.createElementNS(
    "http://www.w3.org/2000/svg",
    "text"
  );

texto.setAttribute(
  "x",
  "0"
);

texto.setAttribute(
  "y",
  "0"
);

texto.setAttribute(
  "text-anchor",
  "middle"
);

texto.setAttribute(
  "dominant-baseline",
  "middle"
);

texto.setAttribute(
  "font-family",
  "Inter, Segoe UI, Arial, sans-serif"
);

texto.setAttribute(
  "font-size",
  "9"
);

texto.setAttribute(
  "font-weight",
  "800"
);

texto.setAttribute(
  "fill",
  "#111111"
);

/* SOMENTE A SIGLA */

texto.textContent =
  estado.uf;

grupo.appendChild(texto);

grupo.addEventListener(
  "click",
  function() {

    selecionarEstado(
      estado.uf
    );

  }
);

camada.appendChild(
  grupo
);
```

});

svgRoot.appendChild(
camada
);
}

/* DESTACA O ESTADO SELECIONADO */

function destacarEstadoNoMapa(uf) {

const objeto =
document.getElementById("mapSvg");

if (!objeto)
return;

const svg =
objeto.contentDocument;

if (!svg)
return;

estados.forEach(estado => {

```
const elemento =
  svg.getElementById(
    estado.uf
  );

if (!elemento)
  return;

elemento.style.opacity =
  estado.uf === uf
    ? "0.72"
    : "1";
```

});
}

/* GRÁFICO */

function atualizarGraficoEstado(estado) {

const chart =
document.getElementById(
"chartContent"
);

if (!chart)
return;

chart.innerHTML = ` <div class="chart-selected"> <div class="chart-state-title">
${estado.nome} </div>

```
  <div class="chart-bars">

    <div class="chart-line">
      <span>Lula</span>
      <div class="chart-track">
        <div
          class="chart-red"
          style="width:${estado.vermelho}%"
        ></div>
      </div>
      <strong>
        ${formatarPercentualExato(
          estado.vermelho
        )}
      </strong>
    </div>

    <div class="chart-line">
      <span>Flávio Bolsonaro</span>
      <div class="chart-track">
        <div
          class="chart-blue"
          style="width:${estado.azul}%"
        ></div>
      </div>
      <strong>
        ${formatarPercentualExato(
          estado.azul
        )}
      </strong>
    </div>

  </div>

  <small>
    Resultado atual · ${estado.apurado}%
    das urnas apuradas
  </small>
</div>
```

`;
}

/* ORDENAÇÃO */

function configurarOrdenacao() {

const select =
document.getElementById("sort");

if (!select)
return;

select.addEventListener(
"change",
function() {

```
  const lista =
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

  renderEstados(lista);

}
```

);
}

/* STATUS */

function criarStatusAtualizacao(mensagem) {

const painel =
document.querySelector(
".result-card"
);

if (!painel)
return;

const existente =
document.getElementById(
"demoUpdate"
);

if (existente) {

```
existente.textContent =
  `TSE · ${mensagem}`;

return;
```

}

const status =
document.createElement(
"div"
);

status.id =
"demoUpdate";

status.textContent =
`TSE · ${mensagem}`;

painel.appendChild(
status
);
}

/* ALERTAS */

function mostrarNotificacao(
titulo,
mensagem
) {

if (
!("Notification" in window)
)
return;

if (
Notification.permission ===
"granted"
) {

```
new Notification(
  titulo,
  {
    body: mensagem
  }
);
```

}
}

function atualizarBotaoAlerta() {

const botao =
document.getElementById(
"enableAlerts"
);

const status =
document.getElementById(
"alertStatus"
);

if (!botao)
return;

if (!estadoSelecionado) {

```
botao.textContent =
  "🔔 Selecione um estado";

botao.disabled =
  true;

return;
```

}

botao.disabled =
false;

const uf =
estadoSelecionado.uf;

const alertaAtivo =
localStorage.getItem(
"alertasAtivos"
) === "true";

const localSalvo =
localStorage.getItem(
"alertaLocal"
);

const ativoParaEstado =
alertaAtivo &&
localSalvo === uf;

if (ativoParaEstado) {

```
botao.textContent =
  "🔕 Desativar alerta";

if (status)
  status.textContent =
    `Alertas ativos para ${estadoSelecionado.nome}.`;
```

} else {

```
botao.textContent =
  "🔔 Ativar alerta";

if (status)
  status.textContent =
    "";
```

}
}

async function configurarAlertas() {

const botao =
document.getElementById(
"enableAlerts"
);

if (!botao)
return;

botao.addEventListener(
"click",
async function() {

```
  if (!estadoSelecionado)
    return;

  const status =
    document.getElementById(
      "alertStatus"
    );

  const ativo =
    localStorage.getItem(
      "alertasAtivos"
    ) === "true";

  const localSalvo =
    localStorage.getItem(
      "alertaLocal"
    );

  if (
    ativo &&
    localSalvo ===
    estadoSelecionado.uf
  ) {

    localStorage.removeItem(
      "alertasAtivos"
    );

    localStorage.removeItem(
      "alertaLocal"
    );

    if (status)
      status.textContent =
        `Alertas desativados para ${estadoSelecionado.nome}.`;

    atualizarBotaoAlerta();

    return;
  }

  if (
    !("Notification" in window)
  ) {

    if (status)
      status.textContent =
        "Seu navegador não oferece suporte a notificações.";

    return;

  }

  const permissao =
    await Notification.requestPermission();

  if (
    permissao !==
    "granted"
  ) {

    if (status)
      status.textContent =
        "As notificações não foram autorizadas.";

    return;

  }

  localStorage.setItem(
    "alertaLocal",
    estadoSelecionado.uf
  );

  localStorage.setItem(
    "alertasAtivos",
    "true"
  );

  if (status)
    status.textContent =
      `Alertas ativados para ${estadoSelecionado.nome}.`;

  mostrarNotificacao(
    "Alerta ativado",
    `Você está acompanhando ${estadoSelecionado.nome}.`
  );

  atualizarBotaoAlerta();

}
```

);

}

/* VERIFICAÇÃO DE LIDERANÇA */

function verificarMudancaLideranca() {

const alertasAtivos =
localStorage.getItem(
"alertasAtivos"
);

if (
alertasAtivos !==
"true"
)
return;

const local =
localStorage.getItem(
"alertaLocal"
);

if (!local)
return;

if (local === "BR") {

```
const novaLideranca =
  47.03 > 45.16
    ? CANDIDATO_AZUL
    : CANDIDATO_VERMELHO;

if (
  novaLideranca !==
  ultimaLiderancaBrasil
) {

  mostrarNotificacao(
    "Mudança de liderança",
    `${novaLideranca} passou a liderar a apuração nacional.`
  );

  ultimaLiderancaBrasil =
    novaLideranca;

}

return;
```

}

const estado =
estados.find(
item =>
item.uf === local
);

if (!estado)
return;

const novaLideranca =
estado.azul >
estado.vermelho
? CANDIDATO_AZUL
: CANDIDATO_VERMELHO;

if (
novaLideranca !==
ultimaLiderancaEstado[
estado.uf
]
) {

```
mostrarNotificacao(
  "Mudança de liderança",
  `${novaLideranca} passou a liderar em ${estado.nome}.`
);

ultimaLiderancaEstado[
  estado.uf
] =
  novaLideranca;
```

}
}

/* INICIALIZAÇÃO */

function iniciar() {

renderEstados();

conectarMapa();

configurarOrdenacao();

atualizarPainelPrimeiroTurno();

configurarAlertas();

setInterval(
verificarMudancaLideranca,
60000
);
}

iniciar();
