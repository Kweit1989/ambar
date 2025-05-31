
// Выбор доставки
document.querySelectorAll('input[name="delivery_method"]').forEach((radio) => {
radio.addEventListener('change', () => {
    const val = radio.value;
    document.getElementById('dinein-block').style.display = val === 'dinein' ? 'grid' : 'none';
    document.getElementById('delivery-address').style.display = val === 'delivery' ? 'grid' : 'none';
    document.getElementById('pickup-point').style.display = val === 'pickup' ? 'grid' : 'none';
});
});


// Выбор стола в оформление заказа
const checkoutFormTable = document.querySelector('.checkout-form-table');
const tableModel = document.querySelector('.table-modal-container');

checkoutFormTable.addEventListener('click', function(){  
    tableModel.classList.add('active');
    document.body.style.overflow = 'hidden';
})


const closeModal = document.querySelector('.table-modal-close');
closeModal.addEventListener('click', function(){
    tableModel.classList.remove('active');
    document.body.style.overflow = '';
})
