document.addEventListener("DOMContentLoaded", () => {
  (function () {
    const selecionarValor = (element, valor) => {
      if (element) {
        element.value = valor;
        element.dispatchEvent(new Event("input", { bubbles: true }));
        element.dispatchEvent(new Event("change", { bubbles: true }));
        console.log(`✅ Valor definido para ${valor} em elemento`, element);

      } else {
        console.warn("❌ Elemento não encontrado para definir valor:", valor);
      }
    };

const esperarElemento = (seletor, timeout = 10000) => {
  return new Promise((resolve, reject) => {
    const tempoInicial = Date.now();
    const intervalo = setInterval(() => {
      const el = document.querySelector(seletor);
      if (el) {
        clearInterval(intervalo);
        resolve(el);
      } else if (Date.now() - tempoInicial > timeout) {
        clearInterval(intervalo);
        reject(new Error(`⏰ Timeout esperando elemento: ${seletor}`));
      }
    }, 300);
  });
};

    async function preencherFormulario() {
      try {
        console.log("🚀 Iniciando preenchimento automático...");

        // 1. Esperar e definir a marca
        const marca = await esperarElemento('select[name="printer_type"]');
        selecionarValor(marca, "creality");

        // 2. Esperar o select de modelos aparecer com a classe correta
        const modelo = await esperarElemento('select.select-menu.full-width.printer_models.printer-creality.selected');
        console.log("✅ Select de modelos encontrado");

        // 3. Esperar até as opções do modelo carregarem e conter "Ender 3"
        await new Promise((resolve) => {
          const intervalo = setInterval(() => {
            const opcoes = [...modelo.options].map(o => o.value);
            console.log("🔄 Opções de modelo disponíveis:", opcoes);
            if (opcoes.includes("Ender 3")) {
              clearInterval(intervalo);
              resolve();
            }
          }, 500);
        });

        // 4. Selecionar o modelo
        selecionarValor(modelo, "Ender 3");

        // 5. Esperar e definir suporte e raft
        const suporte = await esperarElemento('select[name="[supports]"]');
        selecionarValor(suporte, "No");

        const raft = await esperarElemento('select[name="[rafts]"]');
        selecionarValor(raft, "No");

	const resolution = await esperarElemento('input[name="[resolution]"]');
	selecionarValor(resolution, "0.2mm");

	const infill = await esperarElemento('input[name="[infill]"]');
	selecionarValor(infill, "10%");

	const filament_band = await esperarElemento('input[name="[filament_brand]"]');
	selecionarValor(filament_band, "3D Prime");

	const filament_color = await esperarElemento('input[name="[filament_color]"]');
	selecionarValor(filament_color, "Blue");

	const filament_material = await esperarElemento('input[name="[filament_material]"]');
	selecionarValor(filament_material, "PLA");

        console.log("✅ Preenchimento automático concluído.");
      } catch (err) {
        console.error("❌ Erro ao preencher formulário:", err);
      }
    }

    preencherFormulario();
  })();
});
