let lastDeliveryData = null;

// ------------------------------
// Cálculo da Entrega
// ------------------------------
document.getElementById("calculateDelivery").addEventListener("click", () => {
    const distance = parseFloat(document.getElementById("distance").value) || 0;
    const basePricePerKm = parseFloat(document.getElementById("basePrice").value) || 0.90;
    const multiplier = parseFloat(document.getElementById("multiplier").value) || 1;

    const rainSelect = document.getElementById("rain");
    const rainMultiplier = parseFloat(rainSelect.value);
    const rainText = rainSelect.options[rainSelect.selectedIndex].text;

    const vehicleSelect = document.getElementById("vehicle");
    const vehicleMultiplier = parseFloat(vehicleSelect.value);
    const vehicleName = vehicleSelect.options[vehicleSelect.selectedIndex].text;

    const meal = parseFloat(document.getElementById("meal").value) || 0;

    const baseDelivery = distance * basePricePerKm;
    const afterMultiplier = baseDelivery * multiplier;
    const afterRain = afterMultiplier * rainMultiplier;
    let deliveryValue = afterRain * vehicleMultiplier;

    // Aplicar valor mínimo de 2,50€
    if (deliveryValue < 2.50) deliveryValue = 2.50;

    const totalValue = deliveryValue + meal;


    const details = `
        <p>Valor base (distância x €${basePricePerKm.toFixed(2)}/km): €${baseDelivery.toFixed(2)}</p>
        <p>Multiplicador aplicado: x${multiplier} → €${afterMultiplier.toFixed(2)}</p>
        <p>Bônus de chuva: ${rainText} → x${rainMultiplier} → €${afterRain.toFixed(2)}</p>
        <p>Tipo de veículo: ${vehicleName} → €${deliveryValue.toFixed(2)}</p>
        <p>Valor do lanche: €${meal.toFixed(2)}</p>
        <h3>TOTAL: €${totalValue.toFixed(2)}</h3>
    `;
    document.getElementById("deliveryDetails").innerHTML = details;

    lastDeliveryData = {
        distance, basePricePerKm, multiplier, rainMultiplier, rainText,
        vehicleMultiplier, vehicleName, meal,
        baseDelivery, afterMultiplier, afterRain, deliveryValue, totalValue
    };
});

// ------------------------------
// Gerar Nota Fiscal Estilizada Profissional
// ------------------------------
document.getElementById("generateInvoice").addEventListener("click", () => {
    if (!lastDeliveryData) {
        alert("Primeiro calcule a entrega!");
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const invoiceNumber = `NF${new Date().getTime()}`;
    const date = new Date().toLocaleDateString('pt-PT');

    const clientNIFInput = document.getElementById("clientNIF").value.trim();
    let clientNIFText = "";
    if (clientNIFInput) {
        const nifPattern = /^\d{9}$/;
        clientNIFText = nifPattern.test(clientNIFInput) ?
            `NIF do Cliente: ${clientNIFInput}` :
            `NIF do Cliente: ${clientNIFInput} (INVÁLIDO)`;
    }

    const d = lastDeliveryData;

    // --------------------------
    // Cabeçalho com box azul
    // --------------------------
    doc.setFillColor(0, 102, 204);
    doc.rect(0, 0, 210, 25, 'F'); // retângulo de cabeçalho
    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.text("NOTA FISCAL", 105, 17, null, null, "center");

    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.setFont("helvetica", "normal");
    doc.text(`Número: ${invoiceNumber}`, 20, 35);
    doc.text(`Data: ${date}`, 20, 43);
    if (clientNIFText) {
        doc.text(clientNIFText, 20, 51);
    }

    // --------------------------
    // Linha separadora
    // --------------------------
    doc.setDrawColor(0, 102, 204);
    doc.setLineWidth(0.6);
    doc.line(20, 57, 190, 57);

    // --------------------------
    // Detalhes da entrega com boxes
    // --------------------------
    let y = 65;
    doc.setFillColor(240, 240, 240);
    doc.rect(15, y - 5, 180, 55, 'F'); // caixa de detalhes
    doc.setFontSize(11);
    doc.setTextColor(30);
    doc.text("Detalhes da Entrega:", 20, y); y += 7;
    doc.text(`- Valor base: €${d.baseDelivery.toFixed(2)}`, 20, y); y += 7;
    doc.text(`- Multiplicador: x${d.multiplier} → €${d.afterMultiplier.toFixed(2)}`, 20, y); y += 7;
    doc.text(`- Bônus de chuva: ${d.rainText} → x${d.rainMultiplier} → €${d.afterRain.toFixed(2)}`, 20, y); y += 7;
    doc.text(`- Tipo de veículo: ${d.vehicleName} → €${d.deliveryValue.toFixed(2)}`, 20, y); y += 7;
    doc.text(`- Valor do lanche: €${d.meal.toFixed(2)}`, 20, y); y += 10;

    // --------------------------
    // Total em destaque
    // --------------------------
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 128, 0);
    doc.text(`TOTAL: €${d.totalValue.toFixed(2)}`, 105, y + 10, null, null, 'center');

    // --------------------------
    // Rodapé
    // --------------------------
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    doc.text('Documento não oficial – apenas para fins informativos. Não substitui fatura certificada pela AT.', 105, 280, null, null, 'center');

    doc.save(`nota_fiscal_${invoiceNumber}.pdf`);
});
