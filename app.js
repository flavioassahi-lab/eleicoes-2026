function criarRotulosMapa() {
  const objeto = document.getElementById("mapSvg");
  if (!objeto) return;

  const svg = objeto.contentDocument;
  if (!svg) return;

  const svgRoot = svg.documentElement;

  svgRoot
    .querySelectorAll(".map-label-layer")
    .forEach(elemento => elemento.remove());

  const camada = svg.createElementNS(
    "http://www.w3.org/2000/svg",
    "g"
  );

  camada.setAttribute(
    "class",
    "map-label-layer"
  );

  const labels = [];

  estados.forEach(estado => {
    const elemento = svg.getElementById(estado.uf);
    if (!elemento) return;

    let caixa;

    try {
      caixa = elemento.getBBox();
    } catch {
      return;
    }

    if (!caixa.width || !caixa.height) return;

    const percentual = Math.max(
      estado.azul,
      estado.vermelho
    );

    labels.push({
      estado,
      x: caixa.x + caixa.width / 2,
      y: caixa.y + caixa.height / 2,
      labelX: caixa.x + caixa.width / 2,
      labelY: caixa.y + caixa.height / 2,
      percentual,
      deslocado: false
    });
  });

  /*
   * Afasta etiquetas que estejam muito próximas.
   */
  for (let i = 0; i < labels.length; i++) {
    const atual = labels[i];

    for (let j = 0; j < i; j++) {
      const anterior = labels[j];

      const distanciaX =
        Math.abs(
          atual.labelX - anterior.labelX
        );

      const distanciaY =
        Math.abs(
          atual.labelY - anterior.labelY
        );

      if (
        distanciaX < 32 &&
        distanciaY < 13
      ) {
        /*
         * Primeiro tenta jogar para a direita.
         */
        atual.labelX += 35;

        /*
         * Depois joga um pouco para baixo.
         */
        atual.labelY += 18;

        atual.deslocado = true;
      }
    }
  }

  labels.forEach(label => {
    const grupo = svg.createElementNS(
      "http://www.w3.org/2000/svg",
      "g"
    );

    grupo.setAttribute(
      "class",
      "map-label"
    );

    grupo.setAttribute(
      "transform",
      `translate(
        ${label.labelX}
        ${label.labelY}
      )`
    );

    grupo.style.cursor = "pointer";

    /*
     * Linha ligando a etiqueta ao estado.
     */
    if (label.deslocado) {
      const linha = svg.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );

      linha.setAttribute(
        "x1",
        label.x - label.labelX
      );

      linha.setAttribute(
        "y1",
        label.y - label.labelY
      );

      linha.setAttribute(
        "x2",
        "0"
      );

      linha.setAttribute(
        "y2",
        "0"
      );

      linha.setAttribute(
        "stroke",
        "#111111"
      );

      linha.setAttribute(
        "stroke-width",
        "1"
      );

      linha.setAttribute(
        "opacity",
        "0.65"
      );

      grupo.appendChild(linha);
    }

    const texto = svg.createElementNS(
      "http://www.w3.org/2000/svg",
      "text"
    );

    texto.setAttribute("x", "0");
    texto.setAttribute("y", "0");

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
      `${label.estado.uf} ${formatarPercentual(
        label.percentual
      )}`;

    const titulo = svg.createElementNS(
      "http://www.w3.org/2000/svg",
      "title"
    );

    titulo.textContent =
      `${label.estado.nome}: ` +
      `Lula ${formatarPercentual(
        label.estado.vermelho
      )} · ` +
      `Flávio Bolsonaro ${formatarPercentual(
        label.estado.azul
      )}`;

    grupo.appendChild(texto);
    grupo.appendChild(titulo);

    grupo.addEventListener(
      "click",
      function() {
        atualizarEstado(
          label.estado.uf
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

    camada.appendChild(grupo);
  });

  svgRoot.appendChild(camada);
}
