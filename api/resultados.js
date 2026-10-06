export default async function handler(req, res) {
  try {
    const url =
      "https://resultados.tse.jus.br/oficial/ele2026/comum/config/ele-c.json";

    const resposta = await fetch(url);

    if (!resposta.ok) {
      throw new Error(`TSE respondeu com status ${resposta.status}`);
    }

    const dados = await resposta.json();

    res.status(200).json({
      sucesso: true,
      fonte: "Tribunal Superior Eleitoral",
      atualizadoEm: new Date().toISOString(),
      dados
    });

  } catch (erro) {
    console.error("Erro ao consultar TSE:", erro);

    res.status(500).json({
      sucesso: false,
      fonte: "Tribunal Superior Eleitoral",
      erro: "Não foi possível consultar os dados do TSE."
    });
  }
}
