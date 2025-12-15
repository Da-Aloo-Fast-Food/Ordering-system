// Shopping cart functionality
class ShoppingCart {
    constructor() {
        this.cart = [];
        this.currentCustomizationItem = null;
        this.loadCart();
        this.init();
    }

    // Load cart from localStorage
    loadCart() {
        try {
            const savedCart = localStorage.getItem('daAlooCart');
            if (savedCart) {
                this.cart = JSON.parse(savedCart);
                console.log('Cart loaded from localStorage:', this.cart);
            }
        } catch (error) {
            console.error('Error loading cart:', error);
            this.cart = [];
        }
    }

    // Save cart to localStorage
    saveCart() {
        try {
            localStorage.setItem('daAlooCart', JSON.stringify(this.cart));
        } catch (error) {
            console.error('Error saving cart:', error);
            sessionStorage.setItem('daAlooCart', JSON.stringify(this.cart));
        }
    }

    // Initialize cart functionality
    init() {
        this.setupCartListeners();
        this.updateCartBadge();
    }

    // Setup cart event listeners
    setupCartListeners() {
        const cartIcon = document.getElementById('cartIcon');
        const cartModal = document.getElementById('cartModal');
        const closeCart = document.getElementById('closeCart');
        const clearCart = document.getElementById('clearCart');
        const checkoutBtn = document.getElementById('checkoutBtn');
        const cartItemsContainer = document.getElementById('cartItems');

        // Open cart modal
        cartIcon.addEventListener('click', () => {
            cartModal.style.display = 'block';
            this.updateCartDisplay();
        });

        // Close cart modal
        closeCart.addEventListener('click', () => {
            cartModal.style.display = 'none';
        });

        // Clear cart
        clearCart.addEventListener('click', () => {
            if (this.cart.length === 0) {
                alert('Cart is already empty!');
                return;
            }

            if (confirm('Want to clear your cart?')) {
                this.cart = [];
                this.saveCart();
                this.updateCartBadge();
                this.updateCartDisplay();
            }
        });

        // Checkout
        checkoutBtn.addEventListener('click', () => {
            if (this.cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            this.sendOrderToWhatsApp();
        });

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === cartModal) {
                cartModal.style.display = 'none';
            }
        });

        // Event Delegation for Cart Actions
        if (cartItemsContainer) {
            cartItemsContainer.addEventListener('click', this.handleCartItemClick.bind(this));
            cartItemsContainer.addEventListener('change', this.handleCartItemChange.bind(this));
        }

        // Add to cart buttons (delegated)
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart-btn') || e.target.closest('.add-to-cart-btn')) {
                const button = e.target.classList.contains('add-to-cart-btn') ? e.target : e.target.closest('.add-to-cart-btn');
                const name = button.getAttribute('data-name');
                const price = button.getAttribute('data-price');
                const hasVariants = button.getAttribute('data-has-variants') === 'true';

                if (hasVariants) {
                    // Open modal ONLY for Variants (Mo:Mo)
                    this.openCustomizationModal(name, true, false);
                } else {
                    // For items with extras or simple items
                    const itemData = findMenuItem(name);
                    const availableExtras = itemData.extras || [];
                    this.addToCart(name, parseInt(price), null, [], availableExtras);
                    this.showAddFeedback(button);
                }
            }
        });
    }

    // Handle checkbox and radio changes in cart
    handleCartItemChange(e) {
        if (e.target.classList.contains('extra-checkbox')) {
            this.handleExtraCheckbox(e.target);
        }

        if (e.target.classList.contains('extra-radio')) {
            this.handleExtraRadio(e.target);
        }
    }

    handleExtraCheckbox(checkbox) {
        const index = parseInt(checkbox.getAttribute('data-index'));
        const name = checkbox.getAttribute('data-name');
        const price = parseInt(checkbox.getAttribute('data-price'));
        const isChecked = checkbox.checked;

        if (isChecked) {
            // Add extra if not present
            if (!this.cart[index].extras.some(extra => extra.name === name)) {
                this.cart[index].extras.push({ name: name, price: price });
            }
        } else {
            // Remove extra
            this.cart[index].extras = this.cart[index].extras.filter(extra => extra.name !== name);
        }

        this.updateCartItemPrice(index);
        this.saveCart();
        this.updateCartDisplay();
    }

    handleExtraRadio(radio) {
        const index = parseInt(radio.getAttribute('data-index'));
        const name = radio.getAttribute('data-name');
        const price = parseInt(radio.getAttribute('data-price'));
        const group = radio.getAttribute('data-group');

        const item = this.cart[index];
        
        // Remove all extras from the same radio group
        item.extras = item.extras.filter(extra => {
            const extraData = item.availableExtras.find(e => e.name === extra.name);
            return !extraData || extraData.group !== group;
        });

        // Add the selected radio extra
        if (!item.extras.some(extra => extra.name === name)) {
            item.extras.push({ name: name, price: price });
        }

        this.updateCartItemPrice(index);
        this.saveCart();
        this.updateCartDisplay();
    }

    // Handle cart item click events
    handleCartItemClick(e) {
        // Handle quantity buttons
        if (e.target.classList.contains('quantity-btn') || e.target.closest('.quantity-btn')) {
            const button = e.target.classList.contains('quantity-btn') ? e.target : e.target.closest('.quantity-btn');
            const index = parseInt(button.getAttribute('data-index'));
            const action = button.getAttribute('data-action');

            this.updateQuantity(index, action);
        }

        // Handle remove buttons
        if (e.target.classList.contains('remove-btn') || e.target.closest('.remove-btn')) {
            const button = e.target.classList.contains('remove-btn') ? e.target : e.target.closest('.remove-btn');
            const index = parseInt(button.getAttribute('data-index'));

            if (confirm('Remove Item?')) {
                this.removeItem(index);
            }
        }
    }

    // Update item quantity
    updateQuantity(index, action) {
        if (action === 'increase') {
            this.cart[index].quantity += 1;
        } else if (action === 'decrease') {
            if (this.cart[index].quantity > 1) {
                this.cart[index].quantity -= 1;
            } else {
                this.removeItem(index);
                return;
            }
        }

        this.updateCartItemPrice(index);
        this.saveCart();
        this.updateCartBadge();
        this.updateCartDisplay();
    }

    // Remove item from cart
    removeItem(index) {
        this.cart.splice(index, 1);
        this.saveCart();
        this.updateCartBadge();
        this.updateCartDisplay();
    }

    // Update cart item price
    updateCartItemPrice(index) {
        if (this.cart[index]) {
            const extrasTotal = this.cart[index].extras.reduce((sum, extra) => sum + extra.price, 0);
            this.cart[index].totalPrice = (this.cart[index].basePrice + extrasTotal) * this.cart[index].quantity;
        }
    }

    // Add item to cart
    addToCart(name, price, variant, extras, availableExtras = []) {
        const cartItem = {
            name: name,
            basePrice: price,
            variant: variant,
            extras: extras,
            availableExtras: availableExtras,
            quantity: 1,
            totalPrice: price + extras.reduce((sum, extra) => sum + extra.price, 0)
        };

        let existingIndex = -1;

        // Only merge if no available extras
        if (availableExtras.length === 0) {
            existingIndex = this.cart.findIndex(item =>
                item.name === cartItem.name &&
                JSON.stringify(item.variant) === JSON.stringify(cartItem.variant) &&
                JSON.stringify(item.extras) === JSON.stringify(cartItem.extras)
            );
        }

        if (existingIndex > -1) {
            this.cart[existingIndex].quantity += 1;
            this.updateCartItemPrice(existingIndex);
        } else {
            this.cart.push(cartItem);
        }

        this.saveCart();
        this.updateCartBadge();

        const cartModal = document.getElementById('cartModal');
        if (cartModal.style.display === 'block') {
            this.updateCartDisplay();
        }
    }

    // Show add to cart feedback
    showAddFeedback(button) {
        const originalHTML = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Added!';
        button.style.background = '#2ecc71';
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.style.background = '';
        }, 1000);
    }

    // Update cart badge
    updateCartBadge() {
        const badge = document.getElementById('cartBadge');
        const totalItems = this.cart.reduce((total, item) => total + item.quantity, 0);
        badge.textContent = totalItems;
        
        // Add bounce animation
        badge.classList.add('bounce');
        setTimeout(() => badge.classList.remove('bounce'), 400);
    }

    // Update cart display
    updateCartDisplay() {
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');

        if (this.cart.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart-message" id="emptyCartMessage" style="display: block;">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                </div>`;
            cartTotal.textContent = 'Total: Rs 0';
            return;
        }

        let itemsHTML = '';
        let total = 0;

        this.cart.forEach((item, index) => {
            total += item.totalPrice;

            let description = '';
            if (item.variant) {
                description += `<div class="cart-item-variant">Variant: ${item.variant.name}</div>`;
            }

            // Render extras options
            let extrasHTML = '';
            if (item.availableExtras && item.availableExtras.length > 0) {
                extrasHTML += '<div class="cart-extras-options">';

                const groupedExtras = {};
                item.availableExtras.forEach(extra => {
                    const group = extra.group || 'default';
                    if (!groupedExtras[group]) {
                        groupedExtras[group] = [];
                    }
                    groupedExtras[group].push(extra);
                });

                Object.values(groupedExtras).forEach(extrasGroup => {
                    const isRadioGroup = extrasGroup[0].type === 'radio';
                    const groupName = extrasGroup[0].group || 'extras';

                    extrasHTML += `<div class="extras-group ${isRadioGroup ? 'radio-group' : ''}">`;

                    extrasGroup.forEach(opt => {
                        const isChecked = item.extras.some(e => e.name === opt.name);

                        if (isRadioGroup) {
                            extrasHTML += `
                                <label class="cart-extra-label">
                                    <input type="radio" 
                                           class="extra-radio" 
                                           name="extra-${index}-${groupName}"
                                           data-index="${index}" 
                                           data-name="${opt.name}" 
                                           data-price="${opt.price}"
                                           data-group="${groupName}"
                                           ${isChecked ? 'checked' : ''}>
                                    ${opt.name} ${opt.price > 0 ? `(+Rs ${opt.price})` : ''}
                                </label>
                            `;
                        } else {
                            extrasHTML += `
                                <label class="cart-extra-label">
                                    <input type="checkbox" 
                                           class="extra-checkbox" 
                                           data-index="${index}" 
                                           data-name="${opt.name}" 
                                           data-price="${opt.price}"
                                           ${isChecked ? 'checked' : ''}>
                                    ${opt.name} (+Rs ${opt.price})
                                </label>
                            `;
                        }
                    });
                    extrasHTML += '</div>';
                });

                extrasHTML += '</div>';
            }

            itemsHTML += `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name} × ${item.quantity}</div>
                        ${description}
                        ${extrasHTML}
                        <div class="cart-item-price">Rs ${item.totalPrice}</div>
                    </div>
                    <div class="cart-item-controls">
                        <button class="quantity-btn" data-index="${index}" data-action="decrease">-</button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn" data-index="${index}" data-action="increase">+</button>
                        <button class="remove-btn" data-index="${index}"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            `;
        });

        cartItems.innerHTML = itemsHTML;
        cartTotal.textContent = `Total: Rs ${total}`;
    }

    // Send order via WhatsApp
    sendOrderToWhatsApp() {
        let message = "My Order\n\n";
        message += "*Order Details:*\n";

        const now = new Date();
        const date = now.toLocaleDateString();
        const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        message += ` ${date} ${time}\n\n`;

        let total = 0;
        this.cart.forEach(item => {
            total += item.totalPrice;

            message += `• ${item.quantity}x ${item.name}`;
            if (item.variant) {
                message += ` (${item.variant.name})`;
            }
            if (item.extras && item.extras.length > 0) {
                message += ` - Extras: ${item.extras.map(extra => extra.name).join(', ')}`;
            }
            message += ` - Rs ${item.totalPrice}\n`;
        });

        message += `\n*Total Amount: Rs ${total}*\n\n`;
        message += "Please confirm this order. Thank you!";

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/9779847695529?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');

        this.cart = [];
        this.saveCart();
        this.updateCartBadge();
        this.updateCartDisplay();
        document.getElementById('cartModal').style.display = 'none';
    }
}

// Initialize cart when page loads
let cart;
document.addEventListener('DOMContentLoaded', function() {
    cart = new ShoppingCart();
});