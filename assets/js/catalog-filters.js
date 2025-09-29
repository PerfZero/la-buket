document.addEventListener('DOMContentLoaded', function() {
    const priceHeader = document.querySelector('.catalog__price-header');
    const priceDropdown = document.querySelector('.catalog__price-dropdown');
    
    if (priceHeader && priceDropdown) {
        priceHeader.addEventListener('click', function() {
            priceDropdown.classList.toggle('active');
        });
    }

    const sortHeader = document.querySelector('.catalog__sort-header');
    const sortDropdown = document.querySelector('.catalog__sort-dropdown');
    const sortText = document.querySelector('.catalog__sort-text');
    const sortOptions = document.querySelectorAll('.catalog__sort-option');
    
    if (sortHeader && sortDropdown) {
        sortHeader.addEventListener('click', function(e) {
            e.stopPropagation();
            sortDropdown.classList.toggle('active');
        });

        sortOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.stopPropagation();
                const value = this.getAttribute('data-value');
                const text = this.textContent;
                
                if (sortText) {
                    sortText.textContent = text;
                }
                
                sortOptions.forEach(opt => opt.classList.remove('catalog__sort-option--active'));
                this.classList.add('catalog__sort-option--active');
                
                sortDropdown.classList.remove('active');
            });
        });
    }

    document.addEventListener('click', function(e) {
        if (sortDropdown && !sortDropdown.contains(e.target)) {
            sortDropdown.classList.remove('active');
        }
    });

    const filterButtons = document.querySelectorAll('.catalog__filter-btn');
    const activeFiltersContainer = document.querySelector('.catalog__active-filters');
    
    if (filterButtons.length > 0 && activeFiltersContainer) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                if (this.classList.contains('catalog__filter-btn--active')) {
                    this.classList.remove('catalog__filter-btn--active');
                    removeActiveFilter(this.textContent);
                } else {
                    this.classList.add('catalog__filter-btn--active');
                    addActiveFilter(this.textContent);
                }
            });
        });

        function addActiveFilter(text) {
            const existingChip = activeFiltersContainer.querySelector(`[data-filter="${text}"]`);
            if (!existingChip) {
                const chip = document.createElement('div');
                chip.className = 'catalog__filter-chip';
                chip.setAttribute('data-filter', text);
                chip.innerHTML = `
                    <span class="catalog__filter-chip-text">${text}</span>
                    <button class="catalog__filter-chip-remove">×</button>
                `;
                activeFiltersContainer.appendChild(chip);
                
                chip.querySelector('.catalog__filter-chip-remove').addEventListener('click', function() {
                    chip.remove();
                    const button = Array.from(filterButtons).find(btn => btn.textContent === text);
                    if (button) button.classList.remove('catalog__filter-btn--active');
                });
            }
        }

        function removeActiveFilter(text) {
            const chip = activeFiltersContainer.querySelector(`[data-filter="${text}"]`);
            if (chip) {
                chip.remove();
            }
        }
    }
});
