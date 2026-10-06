```javascript
/* =====================================================
   DADOS DOS ESTADOS
   ===================================================== */

const estados = {
    AC: { nome: "Acre", c1: 52.4, c2: 47.6, urnas: 36.8 },
    AL: { nome: "Alagoas", c1: 51.2, c2: 48.8, urnas: 42.1 },
    AP: { nome: "Amapá", c1: 54.3, c2: 45.7, urnas: 39.4 },
    AM: { nome: "Amazonas", c1: 50.8, c2: 49.2, urnas: 31.5 },
    BA: { nome: "Bahia", c1: 53.1, c2: 46.9, urnas: 44.7 },
    CE: { nome: "Ceará", c1: 55.2, c2: 44.8, urnas: 41.9 },
    DF: { nome: "Distrito Federal", c1: 49.6, c2: 50.4, urnas: 52.2 },
    ES: { nome: "Espírito Santo", c1: 51.7, c2: 48.3, urnas: 38.6 },
    GO: { nome: "Goiás", c1: 48.9, c2: 51.1, urnas: 46.3 },
    MA: { nome: "Maranhão", c1: 56.2, c2: 43.8, urnas: 37.4 },
    MT: { nome: "Mato Grosso", c1: 47.5, c2: 52.5, urnas: 43.9 },
    MS: { nome: "Mato Grosso do Sul", c1: 49.2, c2: 50.8, urnas: 45.1 },
    MG: { nome: "Minas Gerais", c1: 52.4, c2: 47.6, urnas: 36.8 },
    PA: { nome: "Pará", c1: 54.1, c2: 45.9, urnas: 39.8 },
    PB: { nome: "Paraíba", c1: 55.4, c2: 44.6, urnas: 40.2 },
    PR: { nome: "Paraná", c1: 46.8, c2: 53.2, urnas: 48.7 },
    PE: { nome: "Pernambuco", c1: 53.6, c2: 46.4, urnas: 42.8 },
    PI: { nome: "Piauí", c1: 57.1, c2: 42.9, urnas: 35.6 },
    RJ: { nome: "Rio de Janeiro", c1: 47.3, c2: 52.7, urnas: 50.1 },
    RN: { nome: "Rio Grande do Norte", c1: 54.7, c2: 45.3, urnas: 37.2 },
    RS: { nome: "Rio Grande do Sul", c1: 49.1, c2: 50.9, urnas: 47.4 },
    RO: { nome: "Rondônia", c1: 46.7, c2: 53.3, urnas: 41.8 },
    RR: { nome: "Roraima", c1: 45.9, c2: 54.1, urnas: 44.6 },
    SC: { nome: "Santa Catarina", c1: 44.8, c2: 55.2, urnas: 49.3 },
    SP: { nome: "São Paulo", c1: 48.2, c2: 51.8, urnas: 51.4 },
    SE: { nome: "Sergipe", c1: 52.8, c2: 47.2, urnas: 38.9 },
    TO: { nome: "Tocantins", c1: 50.7, c2: 49.3, urnas: 40.7 }
};


/* =====================================================
   CONFIGURAÇÃO DOS CANDIDATOS
   ===================================================== */

const candidato1 = "Candidato 1";
const candidato2 = "Candidato 2";


/* =====================================================
   VARIÁVEIS
   ===================================================== */

let estadoSelecionado = null;
let alertaAtivo = false;
let grafico = null;


/* =====================================================
   SELEÇÃO DO ESTADO
   ===================================================== */

document.querySelectorAll(".estado").forEach(botao => {

    botao.addEventListener("click", () => {

        const sigla = botao.dataset.estado;

        selecionarEstado(sigla);

    });

});


function selecionarEstado(sigla) {

    const dados = estados[sigla];

    if (!dados) return;

    estadoSelecionado = sigla;

    /* Destaque no mapa */

    document.querySelectorAll(".estado").forEach(item => {
        item.classList.remove("selecionado");
    });

    const botao = document.querySelector(
        `.estado[data-estado="${sigla}"]`
    );

    if (botao) {
        botao.classList.add("selecionado");
    }


    /* Estado */

    document.getElementById("painelEstado")
        .classList.remove("hidden");

    document.getElementById("secaoTempo")
        .classList.remove("hidden");

    document.getElementById("secaoAlerta")
        .classList.remove("hidden");


    document.getElementById("nomeEstado").textContent =
        dados.nome;

    document.getElementById("alertaEstado").textContent =
        dados.nome;


    /* Candidatos */

    document.getElementById("nomeCandidato1").textContent =
        candidato1;

    document.getElementById("nomeCandidato2").textContent =
        candidato2;

    document.getElementById("percentualCandidato1").textContent =
        formatarPercentual(dados.c1);

    document.getElementById("percentualCandidato2").textContent =
        formatarPercentual(dados.c2);


    /* Somente aqui aparece a porcentagem das urnas.
       Ela fica separada e com menor destaque. */

    document.getElementById("urnasApuradas").textContent =
        formatarPercentual(dados.urnas);


    /* Atualiza gráfico */

    criarGrafico(sigla);

}


/* =====================================================
   FORMATAÇÃO
   ===================================================== */

function formatarPercentual(valor) {

    return valor.toFixed(1).replace(".", ",") + "%";

}


/* =====================================================
   GRÁFICO DE APURAÇÃO
   ===================================================== */

function criarGrafico(sigla) {

    const dados = estados[sigla];

    const canvas = document.getElementById("graficoApuracao");

    if (grafico) {
        grafico.destroy();
    }

    /*
       Dados de exemplo.
       Substitua pelos horários/dados reais da sua apuração.
    */

    const labels = [
        "18:00",
        "18:15",
        "18:30",
        "18:45",
        "19:00"
    ];

    const candidato1Dados = [
        dados.c1 - 2.4,
        dados.c1 - 1.7,
        dados.c1 - 1.1,
        dados.c1 - 0.5,
        dados.c1
    ];

    const candidato2Dados = candidato1Dados.map(
        valor => 100 - valor
    );


    grafico = new Chart(canvas, {

        type: "line",

        data: {

            labels: labels,

            datasets: [

                {
                    label: candidato1,
                    data: candidato1Dados,
                    tension: 0.3
                },

                {
                    label: candidato2,
                    data: candidato2Dados,
                    tension: 0.3
                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            scales: {

                y: {
                    beginAtZero: false,
                    max: 100,

                    ticks: {
                        callback: function(valor) {
                            return valor + "%";
                        }
                    }

                }

            },

            plugins: {

                tooltip: {

                    callbacks: {

                        label: function(context) {

                            return context.dataset.label +
                                ": " +
                                context.parsed.y.toFixed(1) +
                                "%";

                        }

                    }

                }

            }

        }

    });

}


/* =====================================================
   ALERTA
   ===================================================== */

document.getElementById("btnAlerta")
    .addEventListener("click", () => {

        if (!estadoSelecionado) return;

        alertaAtivo = !alertaAtivo;

        atualizarBotaoAlerta();

    });


function atualizarBotaoAlerta() {

    const botao = document.getElementById("btnAlerta");

    if (alertaAtivo) {

        botao.textContent = "🔕 Desativar alerta";

        botao.classList.add("ativo");

        document.getElementById("textoAlerta").textContent =
            "Alerta ativado para este estado.";

    } else {

        botao.textContent = "🔔 Ativar alerta";

        botao.classList.remove("ativo");

        document.getElementById("textoAlerta").textContent =
            "Receba um alerta quando houver atualização importante.";

    }

}


/* =====================================================
   LISTA RECOLHÍVEL DE ESTADOS
   ===================================================== */

const btnEstados = document.getElementById("btnEstados");
const listaEstados = document.getElementById("listaEstados");
const iconeEstados = document.getElementById("iconeEstados");


btnEstados.addEventListener("click", () => {

    listaEstados.classList.toggle("hidden");

    if (listaEstados.classList.contains("hidden")) {

        iconeEstados.textContent = "＋";

    } else {

        iconeEstados.textContent = "−";

    }

});


/* Cria lista */

Object.keys(estados)
    .sort()
    .forEach(sigla => {

        const dados = estados[sigla];

        const item = document.createElement("div");

        item.className = "item-estado";

        item.innerHTML = `
            <span>${sigla} — ${dados.nome}</span>
            <strong>${formatarPercentual(
                Math.max(dados.c1, dados.c2)
            )}</strong>
        `;

        item.addEventListener("click", () => {

            selecionarEstado(sigla);

            listaEstados.classList.add("hidden");

            iconeEstados.textContent = "＋";

            window.scrollTo({
                top: document.getElementById("painelEstado").offsetTop - 20,
                behavior: "smooth"
            });

        });

        listaEstados.appendChild(item);

    });


/* =====================================================
   PESQUISAS
   ===================================================== */

document.querySelectorAll(".tab").forEach(tab => {

    tab.addEventListener("click", () => {

        document.querySelectorAll(".tab")
            .forEach(item => item.classList.remove("active"));

        document.querySelectorAll(".pesquisas-conteudo")
            .forEach(item => item.classList.remove("active"));


        tab.classList.add("active");

        const alvo = tab.dataset.tab;

        document.getElementById(alvo)
            .classList.add("active");

    });

});


/* =====================================================
   PESQUISAS — EXEMPLO DE ESTRUTURA
   ===================================================== */

const pesquisasPrimeiroTurno = [
    // {
    //     instituto: "Instituto",
    //     data: "01/10/2026",
    //     resultado: "Candidato 1 45% x Candidato 2 40%"
    // }
];


const pesquisasSegundoTurno = [
    // Inserir aqui somente pesquisas do 2º turno
    // até a data atual.
];


function carregarPesquisas() {

    const primeiro =
        document.getElementById("pesquisasPrimeiroTurno");

    const segundo =
        document.getElementById("pesquisasSegundoTurno");


    primeiro.innerHTML = "";

    segundo.innerHTML = "";


    pesquisasPrimeiroTurno.forEach(pesquisa => {

        primeiro.innerHTML += `
            <div class="pesquisa-item">
                <strong>${pesquisa.instituto}</strong>
                <span>${pesquisa.data}</span>
                <p>${pesquisa.resultado}</p>
            </div>
        `;

    });


    pesquisasSegundoTurno.forEach(pesquisa => {

        segundo.innerHTML += `
            <div class="pesquisa-item">
                <strong>${pesquisa.instituto}</strong>
                <span>${pesquisa.data}</span>
                <p>${pesquisa.resultado}</p>
            </div>
        `;

    });

}


carregarPesquisas();
```
