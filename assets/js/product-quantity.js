document.addEventListener('DOMContentLoaded', function() {
    const quantityInput = document.querySelector('.product__quantity-input');
    const quantityMinus = document.querySelector('.product__quantity-btn:first-of-type');
    const quantityPlus = document.querySelector('.product__quantity-btn:last-of-type');

    if (quantityInput && quantityMinus && quantityPlus) {
        quantityMinus.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            if (value > 1) {
                quantityInput.value = value - 1;
            }
        });

        quantityPlus.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            quantityInput.value = value + 1;
        });
    }
});

