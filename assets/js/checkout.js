
// Выбор доставки
document.querySelectorAll('input[name="delivery_method"]').forEach((radio) => {
radio.addEventListener('change', () => {
    const val = radio.value;
    document.getElementById('dinein-block').style.display = val === 'dinein' ? 'grid' : 'none';
    document.getElementById('delivery-address').style.display = val === 'delivery' ? 'grid' : 'none';
    document.getElementById('pickup-point').style.display = val === 'pickup' ? 'grid' : 'none';
});
});
