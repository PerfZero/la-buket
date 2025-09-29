document.addEventListener('DOMContentLoaded', function() {
    const promoInput = document.getElementById('promo-code');
    const applyBtn = document.getElementById('apply-promo');
    const promoMessage = document.getElementById('promo-message');
    const totalPriceElement = document.querySelector('.cart__total-price');
    
    const promoCodes = {
        'WELCOME10': { discount: 10, type: 'percent' },
        'SAVE500': { discount: 500, type: 'fixed' },
        'FLOWER20': { discount: 20, type: 'percent' },
        'NEWUSER': { discount: 15, type: 'percent' }
    };
    
    let currentTotal = 7300;
    let appliedPromo = null;
    
    function updateTotal() {
        if (totalPriceElement) {
            totalPriceElement.textContent = `${currentTotal.toLocaleString()} ₽`;
        }
    }
    
    function showMessage(text, type) {
        promoMessage.textContent = text;
        promoMessage.className = `promo-message ${type}`;
    }
    
    function applyPromoCode() {
        const code = promoInput.value.trim().toUpperCase();
        
        if (!code) {
            showMessage('Введите промокод', 'error');
            return;
        }
        
        if (appliedPromo) {
            showMessage('Промокод уже применен', 'error');
            return;
        }
        
        if (promoCodes[code]) {
            const promo = promoCodes[code];
            let discount = 0;
            
            if (promo.type === 'percent') {
                discount = (currentTotal * promo.discount) / 100;
            } else {
                discount = promo.discount;
            }
            
            currentTotal = Math.max(0, currentTotal - discount);
            appliedPromo = { code, discount };
            
            showMessage(`Промокод "${code}" применен! Скидка: ${discount.toLocaleString()} ₽`, 'success');
            updateTotal();
            
            promoInput.disabled = true;
            applyBtn.textContent = 'Применен';
            applyBtn.disabled = true;
        } else {
            showMessage('Промокод не найден', 'error');
        }
    }
    
    function resetPromo() {
        if (appliedPromo) {
            currentTotal = 7300;
            appliedPromo = null;
            updateTotal();
            
            promoInput.value = '';
            promoInput.disabled = false;
            applyBtn.textContent = 'Применить';
            applyBtn.disabled = false;
            promoMessage.textContent = '';
            promoMessage.className = 'promo-message';
        }
    }
    
    applyBtn.addEventListener('click', applyPromoCode);
    
    promoInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            applyPromoCode();
        }
    });
    
    promoInput.addEventListener('input', function() {
        if (this.value.trim().toUpperCase() !== appliedPromo?.code) {
            resetPromo();
        }
    });
});
