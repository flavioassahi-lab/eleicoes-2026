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
      elemento,
      caixa,

      x: caixa.x + caixa.width / 2,
      y: caixa.y + caixa.height / 2,

      labelX: caixa.x + caixa.width / 2,
      labelY: caixa.y + caixa.height / 2,

      percentual,

      deslocado: false
    });
  });

  /*
   * Evita que etiquetas fiquem sobrepostas.
   * Quando necessário, empurra a etiqueta para
   * fora da região central do estado.
   */
  for (let i = 0; i < labels.length; i++) {
    const atual = labels[i];

    for (let j = 0; j < i; j++) {
      const anterior = labels[j];

      let tentativas = 0;

      while (
        Math.abs(
          atual.labelX - anterior.labelX
        ) < 32 &&
        Math.abs(
          atual.labelY - anterior.labelY
        ) < 13 &&
        tentativas < 8
      ) {
        const dx =
          atual.labelX -
          anterior.labelX;

        const dy =
          atual.labelY -
          anterior.labelY;

        /*
         * Direção usada para afastar
         * a etiqueta da anterior.
         */
        let distancia =
          Math.sqrt(
            dx * dx +
            dy * dy
          );

        if (distancia < 1) {
          distancia = 1;
        }

        let direcaoX =
          dx / distancia;

        let direcaoY =
          dy / distancia;

        /*
         * Quando os pontos estão praticamente
         * na mesma posição, empurra para baixo
         * e para a direita.
         */
        if (
          Math.abs(dx) < 2 &&
          Math.abs(dy) < 2
        ) {
          direcaoX = 0.7;
          direcaoY = 0.7;
        }

        atual.labelX +=
          direcaoX * 28;

        atual.labelY +=
          direcaoY * 18;

        atual.deslocado = true;

        tentativas++;
      }
    }
  }

  /*
   * Limites do próprio mapa.
   */
  const viewBox =
    svgRoot.viewBox &&
    svgRoot.viewBox.baseVal;

  let limiteX = {
    min: 0,
    max: 1000
  };

  let limiteY = {
    min: 0,
    max: 1000
  };

  if (viewBox && viewBox.width) {
    limiteX.min = viewBox.x;
    limiteX.max =
      viewBox.x +
      viewBox.width;

    limiteY.min = viewBox.y;
    limiteY.max =
      viewBox.y +
      viewBox.height;
  }

  labels.forEach(label => {
    /*
     * Mantém uma pequena margem das bordas
     * para que a etiqueta não seja cortada.
     */
    const margem = 8;

    label.labelX = Math.max(
      limiteX.min + margem,
      Math.min(
        limiteX.max - margem,
        label.labelX
      )
    );

    label.labelY = Math.max(
      limiteY.min + margem,
      Math.min(
        limiteY.max - margem,
        label.labelY
      )
    );
  });

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

    grupo.style.cursor =
      "pointer";

    /*
     * Linha de ligação quando a etiqueta
     * foi afastada do estado.
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

      grupo.appendChild(
        linha
      );
    }

    const texto = svg.createElementNS(
      "http://www.w3.org/2000/svg",
      "text"
    );

    texto.setAttribute(
      "x",
      "0"
    );

    texto.setAttribute(
      "y",
      "0"
    );

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

    grupo.appendChild(
      texto
    );

    grupo.appendChild(
      titulo
    );

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

    camada.appendChild(
      grupo
    );
  });

  svgRoot.appendChild(
    camada
  );
}
