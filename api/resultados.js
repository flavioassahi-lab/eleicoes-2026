export default async function handler(req, res) {
  try {
    const url =
      "https://resultados.tse.jus.br/oficial/ele2026/3220/dados/br/br-c0001-e006257-u.json";

    const resposta = await fetch(url);

    if (!resposta.ok) {
      throw new Error(`TSE respondeu com status ${resposta.status}`);
    }

    const dados = await resposta.json();

    res.status(200).json({
      sucesso: true,
      fonte: "Tribunal Superior Eleitoral",
      eleicao: "Eleições Gerais 2026",
      abrangencia: "Brasil",
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
