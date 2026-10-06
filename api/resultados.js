export default async function handler(req, res) {
  try {
    const configUrl =
      "https://resultados.tse.jus.br/oficial/comum/config/ele-c.json";

    const resposta = await fetch(configUrl);

    if (!resposta.ok) {
      throw new Error(
        `Arquivo de configuração do TSE respondeu com status ${resposta.status}`
      );
    }

    const configuracao = await resposta.json();

    res.status(200).json({
      sucesso: true,
      fonte: "Tribunal Superior Eleitoral",
      mensagem: "Conexão com a configuração oficial estabelecida.",
      configuracao
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
