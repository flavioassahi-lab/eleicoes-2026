const CANDIDATO_VERMELHO = "Lula";
const CANDIDATO_AZUL = "Flávio Bolsonaro";

const ultimaAtualizacao =
"05/10/2026 às 18:54";


const estados = [

{
uf: "AC",
nome: "Acre",
vermelho: 28.73,
azul: 64.56,
apurado: 100
},

{
uf: "AL",
nome: "Alagoas",
vermelho: 54.73,
azul: 40.45,
apurado: 100
},

{
uf: "AP",
nome: "Amapá",
vermelho: 45.71,
azul: 45.67,
apurado: 100
},

{
uf: "AM",
nome: "Amazonas",
vermelho: 48.23,
azul: 45.08,
apurado: 100
},

{
uf: "BA",
nome: "Bahia",
vermelho: 66.17,
azul: 28.58,
apurado: 100
},

{
uf: "CE",
nome: "Ceará",
vermelho: 63.29,
azul: 31.29,
apurado: 100
},

{
uf: "DF",
nome: "Distrito Federal",
vermelho: 38.11,
azul: 51.31,
apurado: 100
},

{
uf: "ES",
nome: "Espírito Santo",
vermelho: 37.76,
azul: 54.78,
apurado: 100
},

{
uf: "GO",
nome: "Goiás",
vermelho: 31.06,
azul: 53.60,
apurado: 100
},

{
uf: "MA",
nome: "Maranhão",
vermelho: 63.99,
azul: 30.93,
apurado: 100
},

{
uf: "MT",
nome: "Mato Grosso",
vermelho: 29.18,
azul: 65.15,
apurado: 100
},

{
uf: "MS",
nome: "Mato Grosso do Sul",
vermelho: 34.68,
azul: 58.60,
apurado: 100
},

{
uf: "MG",
nome: "Minas Gerais",
vermelho: 43.33,
azul: 48.24,
apurado: 100
},

{
uf: "PA",
nome: "Pará",
vermelho: 49.91,
azul: 44.51,
apurado: 100
},

{
uf: "PB",
nome: "Paraíba",
vermelho: 61.31,
azul: 33.07,
apurado: 100
},

{
uf: "PR",
nome: "Paraná",
vermelho: 31.20,
azul: 59.91,
apurado: 100
},

{
uf: "PE",
nome: "Pernambuco",
vermelho: 63.45,
azul: 31.03,
apurado: 100
},

{
uf: "PI",
nome: "Piauí",
vermelho: 70.99,
azul: 24.10,
apurado: 100
},

{
uf: "RJ",
nome: "Rio de Janeiro",
vermelho: 39.41,
azul: 53.01,
apurado: 100
},

{
uf: "RN",
nome: "Rio Grande do Norte",
vermelho: 59.75,
azul: 34.77,
apurado: 100
},

{
uf: "RS",
nome: "Rio Grande do Sul",
vermelho: 35.73,
azul: 55.64,
apurado: 100
},

{
uf: "RO",
nome: "Rondônia",
vermelho: 25.89,
azul: 67.45,
apurado: 100
},

{
uf: "RR",
nome: "Roraima",
vermelho: 22.86,
azul: 71.06,
apurado: 100
},

{
uf: "SC",
nome: "Santa Catarina",
vermelho: 25.04,
azul: 66.65,
apurado: 100
},

{
uf: "SP",
nome: "São Paulo",
vermelho: 38.20,
azul: 51.93,
apurado: 100
},

{
uf: "SE",
nome: "Sergipe",
vermelho: 62.75,
azul: 30.63,
apurado: 100
},

{
uf: "TO",
nome: "Tocantins",
vermelho: 43.42,
azul: 50.44,
apurado: 100
}

];


function formatarPercentual(valor) {

  return Number(valor)
    .toFixed(0) + "%";
  return Math.round(valor) + "%";

}


function formatarPercentualExato(valor) {

return Number(valor)
.toFixed(2)
.replace(".", ",") + "%";

}


function calcularCor(estado) {

const azulVence =
estado.azul >
estado.vermelho;

const maior =
Math.max(
estado.azul,
estado.vermelho
);

const menor =
Math.min(
estado.azul,
estado.vermelho
);

const margem =
maior - menor;

const intensidade =
Math.min(
1,
0.16 + margem / 55
);


if (azulVence) {

const r =
Math.round(
219 -
180 * intensidade
);

const g =
Math.round(
234 -
105 * intensidade
);

return `rgb(${r}, ${g}, 255)`;

}


const g =
Math.round(
225 -
125 * intensidade
);

const b =
Math.round(
225 -
125 * intensidade
);

return `rgb(255, ${g}, ${b})`;

}


/* =========================
  PAINEL PRINCIPAL
========================= */

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

const update =
document.getElementById(
"lastUpdate"
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
"100%";


if (update)
update.textContent =
ultimaAtualizacao;


criarStatusAtualizacao(
"Resultado final oficial do 1º turno — TSE"
);

}


/* =========================
  POR ESTADO
========================= */

function renderEstados(lista = estados) {

const container =
document.getElementById(
"states"
);

if (!container)
return;


container.innerHTML = "";


lista.forEach(
estado => {

const azulVence =
estado.azul >
estado.vermelho;


const vencedor =
azulVence
? CANDIDATO_AZUL
: CANDIDATO_VERMELHO;


const cor =
azulVence
? "#2563eb"
: "#dc2626";


const card =
document.createElement(
"div"
);


card.className =
"state";


card.innerHTML = `

       <div class="state-name">

         <span>
           ${estado.uf} ·
           ${estado.nome}
         </span>

         <strong
           style="color:${cor};"
         >
           ${vencedor}
         </strong>

       </div>


       <div class="state-counted">

         ${estado.apurado}%
          das seções totalizadas
          das urnas apuradas

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

         Lula
         ${formatarPercentualExato(
           estado.vermelho
         )}

         ·

         Flávio Bolsonaro
         ${formatarPercentualExato(
           estado.azul
         )}

       </small>

     `;


container.appendChild(
card
);

}
);

}


/* =========================
  INFORMAÇÕES DO ESTADO
========================= */

function atualizarEstado(uf) {

const estado =
estados.find(
item =>
item.uf === uf
);


const info =
document.getElementById(
"stateInfo"
);


if (
!estado ||
!info
)
return;


const azulVence =
estado.azul >
estado.vermelho;


const vencedor =
azulVence
? CANDIDATO_AZUL
: CANDIDATO_VERMELHO;


const percentualVencedor =
Math.max(
estado.azul,
estado.vermelho
);


info.innerHTML = `

   <small>
     ${estado.uf} ·
     ${estado.nome}
   </small>


   <strong>
     ${vencedor}
   </strong>


   <span>
     ${estado.apurado}%
      das seções totalizadas
      das urnas apuradas
   </span>


   <div class="state-percent">

     ${formatarPercentualExato(
       percentualVencedor
     )}

   </div>


   <span>
     Votos válidos:
     <strong>100%</strong>
   </span>


   <span>
     Lula:
     ${formatarPercentualExato(
       estado.vermelho
     )}
   </span>


   <span>
     Flávio Bolsonaro:
     ${formatarPercentualExato(
       estado.azul
     )}
   </span>

 `;

}


/* =========================
  RÓTULOS DO MAPA
========================= */

function criarRotulosMapa() {

const objeto =
document.getElementById(
"mapSvg"
);


if (!objeto)
return;


const svg =
objeto.contentDocument;


if (!svg)
return;


const svgRoot =
svg.documentElement;


svgRoot
.querySelectorAll(
".map-label-layer"
)
.forEach(
elemento =>
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


estados.forEach(
estado => {

const elemento =
svg.getElementById(
estado.uf
);


if (!elemento)
return;


let caixa;


try {

caixa =
elemento.getBBox();

} catch {

return;

}


if (
!caixa.width ||
!caixa.height
) {

return;

}


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
"8"
);


texto.setAttribute(
"font-weight",
"700"
);


texto.setAttribute(
"fill",
"#111111"
);


texto.textContent =
`${estado.uf} ${formatarPercentual(
         Math.max(
           estado.azul,
           estado.vermelho
         )
       )}`;


const titulo =
svg.createElementNS(
"http://www.w3.org/2000/svg",
"title"
);


titulo.textContent =
`${estado.nome}: ` +
`Lula ${formatarPercentualExato(
         estado.vermelho
       )} · ` +
`Flávio Bolsonaro ${formatarPercentualExato(
         estado.azul
       )}`;


grupo.appendChild(
texto
);


grupo.appendChild(
titulo
);


grupo.addEventListener(
"click",
function() {

atualizarEstado(
estado.uf
);

}
);


grupo.addEventListener(
"mouseenter",
function() {

texto.setAttribute(
"font-size",
"9"
);

}
);


grupo.addEventListener(
"mouseleave",
function() {

texto.setAttribute(
"font-size",
"8"
);

}
);


camada.appendChild(
grupo
);

}
);


svgRoot.appendChild(
camada
);

}


/* =========================
  MAPA
========================= */

function conectarMapa() {

const objeto =
document.getElementById(
"mapSvg"
);


if (!objeto)
return;


objeto.addEventListener(
"load",
function() {

const svg =
objeto.contentDocument;


if (!svg)
return;


estados.forEach(
estado => {

const elemento =
svg.getElementById(
estado.uf
);


if (!elemento)
return;


const cor =
calcularCor(
estado
);


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


elemento.style.transition =
"opacity .2s";


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

atualizarEstado(
estado.uf
);

}
);

}
);


criarRotulosMapa();

}
);

}


/* =========================
  ORDENAÇÃO
========================= */

function configurarOrdenacao() {

const select =
document.getElementById(
"sort"
);


if (!select)
return;


select.addEventListener(
"change",
function() {

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


renderEstados(
lista
);

}
);

}


/* =========================
  STATUS TSE
========================= */

function criarStatusAtualizacao(
mensagem
) {

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


/* =========================
  ALERTAS
========================= */

let ultimaLiderancaBrasil =
CANDIDATO_AZUL;


const ultimaLiderancaEstado =
{};


estados.forEach(
estado => {

ultimaLiderancaEstado[
estado.uf
] =
estado.azul >
estado.vermelho
? CANDIDATO_AZUL
: CANDIDATO_VERMELHO;

}
);


function mostrarNotificacao(
titulo,
mensagem
) {

if (
!("Notification" in window)
) {

return;

}


if (
Notification.permission ===
"granted"
) {

new Notification(
titulo,
{
body: mensagem
}
);

}

}


async function configurarAlertas() {

  const botao =
  const botaoAtivar =
document.getElementById(
"enableAlerts"
);


  const botaoDesativar =
    document.getElementById(
      "disableAlerts"
    );


const select =
document.getElementById(
"alertState"
);


const status =
document.getElementById(
"alertStatus"
);


if (
    !botao ||
    !botaoAtivar ||
    !botaoDesativar ||
!select ||
!status
) {

return;

}


  botao.addEventListener(
  botaoAtivar.addEventListener(
"click",
async function() {

if (
!("Notification" in window)
) {

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

status.textContent =
"As notificações não foram autorizadas.";

return;

}


const local =
select.value === "BR"
? "Brasil"
: select.options[
select.selectedIndex
].text;


localStorage.setItem(
"alertaLocal",
select.value
);


      localStorage.setItem(
        "alertasAtivos",
        "true"
      );


status.textContent =
`Alertas ativados para ${local}.`;


mostrarNotificacao(
"Alertas ativados",
`Você está acompanhando ${local}.`
);

}
);


  botaoDesativar.addEventListener(
    "click",
    function() {

      localStorage.removeItem(
        "alertasAtivos"
      );


      localStorage.removeItem(
        "alertaLocal"
      );


      status.textContent =
        "Alertas desativados.";

    }
  );


const salvo =
localStorage.getItem(
"alertaLocal"
);


  const ativos =
    localStorage.getItem(
      "alertasAtivos"
    );


if (salvo) {

select.value =
salvo;

}


  if (
    ativos === "true"
  ) {

    const local =
      select.value === "BR"
        ? "Brasil"
        : select.options[
            select.selectedIndex
          ].text;


    status.textContent =
      `Alertas ativos para ${local}.`;

  }

}


/* =========================
  VERIFICAÇÃO DE LIDERANÇA
========================= */

function verificarMudancaLideranca() {

  const alertasAtivos =
    localStorage.getItem(
      "alertasAtivos"
    );


  if (
    alertasAtivos !==
    "true"
  ) {

    return;

  }


const local =
localStorage.getItem(
"alertaLocal"
);


if (!local)
return;


/*
   * Temporariamente utiliza os dados
   * do 1º turno.
   * Estes dados ainda representam
   * o resultado do 1º turno.
  *
   * Na próxima etapa esta função será
   * alimentada automaticamente pelos
   * dados do 2º turno do TSE.
   * Durante o 2º turno esta função
   * será alimentada pelos dados
   * atualizados do TSE.
  */


if (
local === "BR"
) {

const azul =
47.03;


const vermelho =
45.16;


const novaLideranca =
azul >
vermelho
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

mostrarNotificacao(
"Mudança de liderança",
`${novaLideranca} passou a liderar em ${estado.nome}.`
);


ultimaLiderancaEstado[
estado.uf
] =
novaLideranca;

}

}


/* =========================
  INICIALIZAÇÃO
========================= */

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
