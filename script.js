// This ensures the script runs only after the entire HTML document is loaded
    document.addEventListener('DOMContentLoaded', () => {
        // Select all buttons with the class 'add-to-cart-btn'
        const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

        // Loop over each button and add a click event listener
        addToCartButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                // 'event.target' refers to the specific button that was clicked
                const productCard = event.target.closest('.product-card'); // Find the parent product card
                const productName = productCard.querySelector('h3').textContent; // Get product name

                alert(`"${productName}" has been added to your cart! (Not really, just an alert for now)`);
            });
        });
    });

    // Global variable to keep track of cart items (for now, will be replaced later)
    let cartItemCount = 0;
    const cartCountElement = document.querySelector('.nav-cart .cart-count'); // Select the cart count element

    document.addEventListener('DOMContentLoaded', () => {
        const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

        addToCartButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const productCard = event.target.closest('.product-card');
                const productName = productCard.querySelector('h3').textContent;

                alert(`"${productName}" has been added to your cart! (Not really, just an alert for now)`);

                // Increment the cart count and update the display
                cartItemCount++;
                cartCountElement.textContent = cartItemCount;
            });
        });
    });