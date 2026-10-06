export default async function handler(req, res) {

  try {

    const BASE =
      "https://resultados.tse.jus.br/oficial/ele2026/6257/dados";

    const estados = [
      "ac", "al", "ap", "am", "ba", "ce", "df",
      "es", "go", "ma", "mt", "ms", "mg", "pa",
      "pb", "pr", "pe", "pi", "rj", "rn", "rs",
      "ro", "rr", "sc", "sp", "se", "to"
    ];

    const resultados = [];

    for (const uf of estados) {

      const url =
        `${BASE}/${uf}/${uf}-c0001-e006257-u.jws`;

      const resposta =
        await fetch(url);

      if (!resposta.ok) {

        console.log(
          `TSE ${uf.toUpperCase()}: ${resposta.status}`
        );

        continue;

      }

      const texto =
        await resposta.text();

      /*
       * Arquivos JWS possuem três partes:
       * header.payload.signature
       *
       * O payload contém os dados JSON
       * divulgados pelo TSE.
       */

      const partes =
        texto.split(".");

      if (partes.length < 2) {

        console.log(
          `Formato JWS inválido: ${uf}`
        );

        continue;

      }

      const payload =
        partes[1]
          .replace(/-/g, "+")
          .replace(/_/g, "/");

      const json =
        Buffer.from(
          payload,
          "base64"
        ).toString("utf8");

      const dados =
        JSON.parse(json);

      resultados.push({
        uf: uf.toUpperCase(),
        dados
      });

    }

    return res.status(200).json({

      sucesso: true,

      disponivel:
        resultados.length > 0,

      fonte:
        "Tribunal Superior Eleitoral",

      eleicao:
        "Presidente - 1º Turno",

      codigoEleicao:
        "6257",

      resultados

    });

  } catch (erro) {

    console.error(
      "Erro ao consultar resultados do TSE:",
      erro
    );

    return res.status(500).json({

      sucesso: false,

      fonte:
        "Tribunal Superior Eleitoral",

      erro:
        erro.message

    });

  }

}
