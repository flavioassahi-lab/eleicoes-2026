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

      try {

        const resposta =
          await fetch(url);

        if (!resposta.ok) {

          console.log(
            `TSE ${uf.toUpperCase()}: HTTP ${resposta.status}`
          );

          continue;

        }

        const texto =
          await resposta.text();

        /*
         * Arquivo JWS:
         *
         * header.payload.signature
         *
         * O payload contém o JSON
         * de resultado divulgado pelo TSE.
         */

        const partes =
          texto.split(".");

        if (partes.length < 2) {

          console.log(
            `TSE ${uf.toUpperCase()}: JWS inválido`
          );

          continue;

        }

        const payload =
          partes[1]
            .replace(/-/g, "+")
            .replace(/_/g, "/");

        const preenchimento =
          payload.length % 4;

        const payloadCompleto =
          preenchimento
            ? payload + "=".repeat(4 - preenchimento)
            : payload;

        const jsonTexto =
          Buffer
            .from(
              payloadCompleto,
              "base64"
            )
            .toString("utf8");

        const dados =
          JSON.parse(jsonTexto);

        resultados.push({

          uf:
            uf.toUpperCase(),

          dados

        });

      } catch (erroEstado) {

        console.log(
          `Erro TSE ${uf.toUpperCase()}:`,
          erroEstado.message
        );

      }

    }

    return res.status(200).json({

      sucesso: true,

      disponivel:
        resultados.length > 0,

      fonte:
        "Tribunal Superior Eleitoral",

      eleicao:
        "Eleições 2026",

      turno:
        "1º turno",

      codigoEleicao:
        "6257",

      cargo:
        "Presidente da República",

      resultados

    });

  } catch (erro) {

    console.error(
      "Erro geral ao consultar TSE:",
      erro
    );

    return res.status(500).json({

      sucesso: false,

      disponivel: false,

      fonte:
        "Tribunal Superior Eleitoral",

      erro:
        erro.message

    });

  }

}
