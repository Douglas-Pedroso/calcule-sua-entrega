function calculateDelivery() {
    // Pega os valores ou assume 0/1 se estiver vazio
    const distance = parseFloat(document.getElementById("distance").value) || 0;
    const multiplier = parseFloat(document.getElementById("multiplier").value) || 1;
    const rain = parseFloat(document.getElementById("rain").value) || 1;
    const vehicle = parseFloat(document.getElementById("vehicle").value) || 1;
    const meal = parseFloat(document.getElementById("meal").value) || 0;

    const basePricePerKm = 1.00;

    // Valor base da entrega
    let baseDelivery = distance * basePricePerKm;

    // Aplicando multiplicador
    let afterMultiplier = baseDelivery * multiplier;

    // Aplicando bônus de chuva
    let afterRain = afterMultiplier * rain;

    // Aplicando tipo de veículo
    let deliveryValue = afterRain * vehicle;

    // Total final incluindo o lanche
    let totalValue = deliveryValue + meal;

    // Exibir resumo + detalhes escondidos
document.getElementById("deliveryValue").innerHTML = `
    <span style="color:#0077cc;">Valor da entrega: <strong>€${deliveryValue.toFixed(2)}</strong></span><br>
    Valor do lanche: <strong>€${meal.toFixed(2)}</strong><br><br>
    <span style="font-size:1.2em; color:#28a745;">TOTAL A PAGAR: <strong>€${totalValue.toFixed(2)}</strong></span>
    
    <details style="margin-top:15px;">
      <summary style="cursor:pointer; color:#555; font-weight:bold;">Ver detalhes do cálculo</summary>
      <div style="margin-top:10px; font-size:0.9em; color:#333;">
        Valor base (distância x €${basePricePerKm.toFixed(2)}/km): €${baseDelivery.toFixed(2)}<br>
        Multiplicador aplicado: x${multiplier} → €${afterMultiplier.toFixed(2)}<br>
        Bônus de chuva: x${rain} → €${afterRain.toFixed(2)}<br>
        Tipo de veículo: x${vehicle} → €${deliveryValue.toFixed(2)}<br>
      </div>
    </details>
`;

}
