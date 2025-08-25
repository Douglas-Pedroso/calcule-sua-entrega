function calculateDelivery() {
    const distance = parseFloat(document.getElementById("distance").value) || 0;
    const multiplier = parseFloat(document.getElementById("multiplier").value) || 1;
    const rain = parseFloat(document.getElementById("rain").value) || 1;
    const vehicle = parseFloat(document.getElementById("vehicle").value) || 1;
    const meal = parseFloat(document.getElementById("meal").value) || 0;

    const basePricePerKm = 0.90;
    const baseDelivery = distance * basePricePerKm;
    const afterMultiplier = baseDelivery * multiplier;
    const afterRain = afterMultiplier * rain;
    const deliveryValue = afterRain * vehicle;
    const totalValue = deliveryValue + meal;

    const animatedEl = document.getElementById("animatedDelivery");
    const detailsEl = document.getElementById("deliveryDetails");
    const button = document.querySelector("button");

    button.disabled = true;

    // Atualiza detalhes
    detailsEl.innerHTML = `
        Valor base (distância x €${basePricePerKm.toFixed(2)}/km): €${baseDelivery.toFixed(2)}<br>
        Multiplicador aplicado: x${multiplier} → €${afterMultiplier.toFixed(2)}<br>
        Bônus de chuva: x${rain} → €${afterRain.toFixed(2)}<br>
        Tipo de veículo: x${vehicle} → €${deliveryValue.toFixed(2)}<br>
        Valor do lanche: €${meal.toFixed(2)}<br>
        TOTAL: €${totalValue.toFixed(2)}
    `;

    // Cor dinâmica
    if (deliveryValue < 5) animatedEl.style.color = "#28a745";
    else if (deliveryValue < 15) animatedEl.style.color = "#ffc107";
    else animatedEl.style.color = "#dc3545";

    // Animação do valor
    animateValue(animatedEl, 0, deliveryValue, 800);

    setTimeout(() => { button.disabled = false; }, 800);
}

// Função separada para animação
function animateValue(element, start, end, duration) {
    let range = end - start;
    let current = start;
    let increment = range / (duration / 20);

    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.innerText = `€${current.toFixed(2)}`;
    }, 20);
}
