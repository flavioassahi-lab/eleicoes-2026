export default async function handler(req, res) {
  try {
    const url =
      "https://resultados.tse.jus.br/oficial/ele2026/6258/dados/br/br-e006258-ab.json";

    const resposta = await fetch(url);

    if (!resposta.ok) {
      throw new Error(
        `Arquivo de resultados do TSE respondeu com status ${resposta.status}`
      );
    }

    const dados = await resposta.json();

    res.status(200).json({
      sucesso: true,
      fonte: "Tribunal Superior Eleitoral",
      eleicao: "Eleições 2026 - Presidente - 2º Turno",
      dados
    });

  } catch (erro) {
    console.error("Erro ao consultar TSE:", erro);

    res.status(500).json({
      sucesso: false,
      fonte: "Tribunal Superior Eleitoral",
      erro: erro.message
    });
  }
}
