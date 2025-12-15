// Menu functionality
class MenuManager {
    constructor() {
        this.init();
    }

    // Initialize menu functionality
    init() {
        this.generateCategoryTabs();
        this.generateMenuItems();
        this.setupTabSwitching();
        this.setupSaveMenuButton();
        this.setupCustomizationModal();
        this.updateCurrentYear();
    }

    // Generate category tabs
    generateCategoryTabs() {
        const tabsContainer = document.getElementById('categoryTabs');
        let first = true;

        for (const [categoryName] of Object.entries(MENU)) {
            const tabId = categoryName.toLowerCase().replace(/[ &\/]/g, '-');
            const button = document.createElement('button');
            button.className = `category-tab ${first ? 'active' : ''}`;
            button.setAttribute('data-category', tabId);

            button.innerHTML = `
                <div class="tab-content">
                    <div class="tab-image">
                        <img src="${CATEGORY_IMAGES[categoryName]}" alt="${categoryName}" loading="lazy" onerror="handleTabImageError(this, '${categoryName}')">
                    </div>
                    <span class="tab-text">${categoryName}</span>
                </div>
            `;

            tabsContainer.appendChild(button);
            first = false;
        }
    }

    // Generate menu items
    generateMenuItems() {
        const menuContainer = document.getElementById('menuItems');
        let first = true;

        for (const [categoryName, items] of Object.entries(MENU)) {
            const categoryId = categoryName.toLowerCase().replace(/[ &\/]/g, '-');
            const categoryDiv = document.createElement('div');
            categoryDiv.className = `category-content ${first ? 'active' : ''}`;
            categoryDiv.id = categoryId;

            let itemsHTML = '';
            for (const item of items) {
                const hasVariants = item.variants && item.variants.length > 0;
                const hasExtras = item.extras && item.extras.length > 0;

                // Display price range for variant items
                let displayPrice = `Rs ${item.price}`;
                if (hasVariants) {
                    const prices = item.variants.map(v => v.price);
                    const minPrice = Math.min(...prices);
                    const maxPrice = Math.max(...prices);
                    displayPrice = `Rs ${minPrice} - ${maxPrice}`;
                }

                // Button logic
                let buttonText = 'Add to Cart';
                let buttonIcon = 'plus';
                let btnClass = '';

                if (hasVariants) {
                    buttonText = 'Choose Variant';
                    buttonIcon = 'list-ul';
                    btnClass = 'customize-btn';
                }

                itemsHTML += `
                    <div class="menu-item-card">
                        <div class="item-main-container">
                            <div class="item-left">
                                <h3 class="item-name">${item.name}</h3>
                            </div>
                            <div class="item-right">
                                <div class="item-price">${displayPrice}</div>
                                ${item.variations ? `<div class="item-variations">${item.variations}</div>` : ''}
                            </div>
                        </div>
                        ${item.details ? `<div class="item-details">${item.details}</div>` : ''}
                        <button class="add-to-cart-btn ${btnClass}" 
                                data-name="${item.name}" 
                                data-price="${item.price}"
                                data-has-variants="${hasVariants}"
                                data-has-extras="${hasExtras}">
                            <i class="fas fa-${buttonIcon}"></i> 
                            ${buttonText}
                        </button>
                    </div>
                `;
            }

            categoryDiv.innerHTML = `
                <div class="category-header">
                    <h2 class="category-title">${categoryName}</h2>
                </div>
                <div class="category-items">
                    ${itemsHTML}
                </div>
            `;

            menuContainer.appendChild(categoryDiv);
            first = false;
        }
    }

    // Setup tab switching
    setupTabSwitching() {
        const tabs = document.querySelectorAll('.category-tab');
        const contents = document.querySelectorAll('.category-content');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));

                tab.classList.add('active');
                const id = tab.getAttribute('data-category');
                document.getElementById(id).classList.add('active');
            });
        });
    }

    // Setup save menu button
    setupSaveMenuButton() {
        const saveMenuBtn = document.getElementById('saveMenuBtn');
        const notification = document.getElementById('saveNotification');

        saveMenuBtn.addEventListener('click', function () {
            notification.classList.add('show');
            const link = document.createElement('a');
            link.href = 'images/menu.jpg';
            link.download = 'da-aloo-menu.jpg';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        });
    }

    // Setup customization modal
    setupCustomizationModal() {
        const modal = document.getElementById('customizationModal');
        const closeBtn = document.getElementById('closeCustomization');
        const cancelBtn = document.getElementById('cancelCustomization');
        const addBtn = document.getElementById('addToCartCustom');

        closeBtn.addEventListener('click', this.closeCustomizationModal.bind(this));
        cancelBtn.addEventListener('click', this.closeCustomizationModal.bind(this));

        addBtn.addEventListener('click', () => {
            if (!cart.currentCustomizationItem) return;

            const selectedVariant = document.querySelector('input[name="variant"]:checked');
            let variant = null;
            if (selectedVariant) {
                variant = {
                    name: selectedVariant.value,
                    price: parseInt(selectedVariant.getAttribute('data-price'))
                };
            }

            cart.addToCart(
                cart.currentCustomizationItem.name,
                variant ? variant.price : cart.currentCustomizationItem.price,
                variant,
                []
            );
            this.closeCustomizationModal();
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeCustomizationModal();
            }
        });
    }

    // Open customization modal
    openCustomizationModal(itemName, hasVariants, hasExtras) {
        const item = findMenuItem(itemName);
        if (!item) return;

        cart.currentCustomizationItem = item;
        const modal = document.getElementById('customizationModal');
        const title = document.getElementById('customizationItemName');
        const body = document.getElementById('customizationBody');
        const totalPrice = document.getElementById('customTotalPrice');
        
        title.style.fontSize = "20px";
        title.textContent = `Select Variant for ${itemName}`;

        let html = '';
        let basePrice = 0;

        // Variants section
        if (hasVariants && item.variants) {
            html += `<div class="customization-section">
                <h4>Select Variant</h4>`;
            item.variants.forEach((variant, index) => {
                html += `
                    <label class="variant-option">
                        <input type="radio" name="variant" value="${variant.name}" data-price="${variant.price}" ${index === 0 ? 'checked' : ''}>
                        <span class="variant-name">${variant.name}</span>
                        <span class="variant-price">Rs ${variant.price}</span>
                    </label>
                `;
                if (index === 0) basePrice = variant.price;
            });
            html += `</div>`;
        } else {
            basePrice = item.price;
        }

        body.innerHTML = html;
        totalPrice.textContent = basePrice;

        // Add event listeners for price updates
        document.querySelectorAll('input[name="variant"]').forEach(input => {
            input.addEventListener('change', this.updateCustomizationPrice.bind(this));
        });

        modal.style.display = 'block';
    }

    // Close customization modal
    closeCustomizationModal() {
        const modal = document.getElementById('customizationModal');
        modal.style.display = 'none';
        cart.currentCustomizationItem = null;
    }

    // Update customization price
    updateCustomizationPrice() {
        const totalPrice = document.getElementById('customTotalPrice');
        let price = 0;

        const selectedVariant = document.querySelector('input[name="variant"]:checked');
        if (selectedVariant) {
            price = parseInt(selectedVariant.getAttribute('data-price'));
        } else if (cart.currentCustomizationItem && cart.currentCustomizationItem.price) {
            price = cart.currentCustomizationItem.price;
        }

        totalPrice.textContent = price;
    }

    // Update current year in footer
    updateCurrentYear() {
        document.getElementById('currentYear').textContent = new Date().getFullYear();
    }
}

// Initialize menu when page loads
document.addEventListener('DOMContentLoaded', function() {
    const menuManager = new MenuManager();
});