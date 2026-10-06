export default async function handler(req, res) {
  try {
    const configUrl =
      "https://resultados.tse.jus.br/oficial/comum/config/ele-c.json";

    const configResponse = await fetch(configUrl);

    if (!configResponse.ok) {
      throw new Error(
        `Configuração do TSE respondeu com status ${configResponse.status}`
      );
    }

    const config = await configResponse.json();

    // Eleição presidencial do 2º turno
    const eleicaoSegundoTurno = config.e?.find(
      item => item.t === "2" && item.abr?.some(
        uf => uf.cd === "br" &&
        uf.cp?.some(cargo => cargo.cd === "1")
      )
    );

    if (!eleicaoSegundoTurno) {
      return res.status(200).json({
        sucesso: true,
        disponivel: false,
        fonte: "Tribunal Superior Eleitoral",
        mensagem: "Dados do 2º turno ainda não disponíveis."
      });
    }

    const codigoEleicao = eleicaoSegundoTurno.cd;

    const urlResultado =
      `https://resultados.tse.jus.br/oficial/ele2026/${codigoEleicao}/dados/br/br-c0001-e${codigoEleicao}-u.json`;

    const resultadoResponse = await fetch(urlResultado);

    if (resultadoResponse.status === 404) {
      return res.status(200).json({
        sucesso: true,
        disponivel: false,
        fonte: "Tribunal Superior Eleitoral",
        mensagem: "O 2º turno foi configurado, mas os resultados ainda não foram publicados.",
        codigoEleicao
      });
    }

    if (!resultadoResponse.ok) {
      throw new Error(
        `Resultado do TSE respondeu com status ${resultadoResponse.status}`
      );
    }

    const dados = await resultadoResponse.json();

    return res.status(200).json({
      sucesso: true,
      disponivel: true,
      fonte: "Tribunal Superior Eleitoral",
      eleicao: "Presidente - 2º Turno",
      codigoEleicao,
      dados
    });

  } catch (erro) {
    console.error("Erro ao consultar TSE:", erro);

    return res.status(500).json({
      sucesso: false,
      fonte: "Tribunal Superior Eleitoral",
      erro: erro.message
    });
  }
}
