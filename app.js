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
co
```
