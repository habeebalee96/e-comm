
    // --- Cart Utility Functions ---

    // Function to get the cart from localStorage
    function getCart() {
        const cartJSON = localStorage.getItem('shoppingCart');
        return cartJSON ? JSON.parse(cartJSON) : [];
    }

    // Function to save the cart to localStorage
    function saveCart(cart) {
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
        updateCartCountDisplay(); // Update count every time cart is saved
    }

    // Function to update the cart count in the header
    function updateCartCountDisplay() {
        const cart = getCart();
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartCountElement = document.querySelector('.nav-cart .cart-count');
        if (cartCountElement) { // Ensure the element exists on the page
            cartCountElement.textContent = totalItems;
        }
    }

    // --- Event Listeners ---

    document.addEventListener('DOMContentLoaded', () => {
        // --- Code for index.html (Product Listing Page) ---
        const productListingSection = document.querySelector('#product-listing');
        if (productListingSection) { // Only run if on the product listing page
            const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

            addToCartButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    const productCard = event.target.closest('.product-card');
                    const productId = productCard.dataset.productId; // Get ID from data-product-id
                    const productName = productCard.querySelector('h3').textContent;
                    // Remove '$' and convert to number
                    const productPrice = parseFloat(productCard.querySelector('.product-price').textContent.replace('$', ''));
                    const productImage = productCard.querySelector('img').dataset.productImage; // Get image from data-product-image

                    let cart = getCart();
                    const existingItem = cart.find(item => item.id === productId);

                    if (existingItem) {
                        existingItem.quantity++;
                    } else {
                        cart.push({
                            id: productId,
                            name: productName,
                            price: productPrice,
                            image: productImage,
                            quantity: 1
                        });
                    }

                    saveCart(cart);
                    alert(`"${productName}" added to cart!`);
                });
            });
        }

        // --- Code for cart.html (Shopping Cart Page) ---
        const cartItemsSection = document.querySelector('#cart-items');
        if (cartItemsSection) { // Only run if on the shopping cart page
            renderCartItems(); // Initial render of cart items
        }

        // --- Initial Load ---
        updateCartCountDisplay(); // Update cart count in header on any page load
    });

    // --- Functions specific to cart.html ---

    function renderCartItems() {
        const cartItemsContainer = document.querySelector('#cart-items');
        const cart = getCart();

        // Clear existing items
        cartItemsContainer.innerHTML = '<h2>Your Items</h2>';

        if (cart.length === 0) {
            cartItemsContainer.innerHTML += '<p>Your cart is currently empty.</p>';
            return;
        }

        const cartList = document.createElement('div');
        cartList.classList.add('cart-list');

        let cartTotal = 0;

        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>Price: $${item.price.toFixed(2)}</p>
                    <p>Quantity: ${item.quantity}</p>
                    <p>Subtotal: $${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <button class="remove-from-cart-btn" data-product-id="${item.id}">Remove</button>
            `;
            cartList.appendChild(itemElement);
            cartTotal += item.price * item.quantity;
        });

        cartItemsContainer.appendChild(cartList);

        const cartSummary = document.createElement('div');
        cartSummary.classList.add('cart-summary');
        cartSummary.innerHTML = `
            <h3>Total: $${cartTotal.toFixed(2)}</h3>
            <button id="clear-cart-btn">Clear Cart</button>
            <button id="checkout-btn">Proceed to Checkout</button>
        `;
        cartItemsContainer.appendChild(cartSummary);

        // Add event listeners for remove buttons
        document.querySelectorAll('.remove-from-cart-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.dataset.productId;
                removeFromCart(productId);
            });
        });

        // Add event listener for clear cart button
        document.getElementById('clear-cart-btn').addEventListener('click', clearCart);
    }

    function removeFromCart(productId) {
        let cart = getCart();
        cart = cart.filter(item => item.id !== productId); // Remove item by ID
        saveCart(cart);
        renderCartItems(); // Re-render the cart display
    }

    function clearCart() {
        localStorage.removeItem('shoppingCart');
        renderCartItems(); // Re-render to show empty cart
        alert('Your cart has been cleared.');
    }
