function calculateDelivery() {
    const distance = parseFloat(document.getElementById("distance").value) || 0;
    const multiplier = parseFloat(document.getElementById("multiplier").value) || 1;
    const rain = parseFloat(document.getElementById("rain").value) || 1;
    const vehicle = parseFloat(document.getElementById("vehicle").value) || 1;
    const meal = parseFloat(document.getElementById("meal").value) || 0;

    const basePricePerKm = 0.95;
    const baseDelivery = distance * basePricePerKm;
    const afterMultiplier = baseDelivery * multiplier;
    const afterRain = afterMultiplier * rain;
    const deliveryValue = afterRain * vehicle;
    const totalValue = deliveryValue + meal;

    const deliveryEl = document.getElementById("deliveryValue");
    const button = document.querySelector("button");

    // Bloqueia o botão durante animação
    button.disabled = true;

    // Define cor dinâmica
    if (deliveryValue < 5) {
        deliveryEl.style.color = "#28a745"; // verde
    } else if (deliveryValue < 15) {
        deliveryEl.style.color = "#ffc107"; // amarelo
    } else {
        deliveryEl.style.color = "#dc3545"; // vermelho
    }

    // HTML do resultado com detalhes
    deliveryEl.innerHTML = `
        <details style="margin-top:15px;">
          <summary style="cursor:pointer; color:#555; font-weight:bold;">Ver detalhes do cálculo</summary>
          <div style="margin-top:10px; font-size:0.9em; color:#333;">
            Valor base (distância x €${basePricePerKm.toFixed(2)}/km): €${baseDelivery.toFixed(2)}<br>
            Multiplicador aplicado: x${multiplier} → €${afterMultiplier.toFixed(2)}<br>
            Bônus de chuva: x${rain} → €${afterRain.toFixed(2)}<br>
            Tipo de veículo: x${vehicle} → €${deliveryValue.toFixed(2)}<br>
            Valor do lanche: €${meal.toFixed(2)}<br>
            TOTAL: €${totalValue.toFixed(2)}
          </div>
        </details>
    `;

    // Animação suave
    deliveryEl.classList.remove("show");
    void deliveryEl.offsetWidth; // trigger reflow
    deliveryEl.classList.add("show");

    // Contagem animada do valor da entrega
    animateValue(deliveryEl, 0, deliveryValue, 800);

    // Reabilita o botão após animação
    setTimeout(() => { button.disabled = false; }, 800);

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
            element.innerHTML = `€${current.toFixed(2)}`;
        }, 20);
    }
}
