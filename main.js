// Sample product data
const products = [
    {
        id: 1,
        name: "Filtro de Aceite Ford F-150",
        price: 25.99,
        brand: "ford",
        image: "https://images.unsplash.com/photo-1635773054019-33b29b3a4d08?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        description: "Filtro de aceite original para Ford F-150"
    },
    {
        id: 2,
        name: "Pastillas de Freno Chevrolet",
        price: 45.99,
        brand: "chevrolet",
        image: "https://images.unsplash.com/photo-1635773054019-33b29b3a4d08?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        description: "Pastillas de freno para Chevrolet Cruze"
    },
    // Add more products as needed
];

// Cart functionality
let cart = [];

// DOM Elements
const productsContainer = document.getElementById('productsContainer');
const cartModal = document.getElementById('cart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.getElementById('cartCount');
const closeCart = document.getElementById('closeCart');
const checkoutBtn = document.getElementById('checkoutBtn');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

// Navigation Toggle
navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Display Products
function displayProducts(filterBrand = 'todos') {
    const filteredProducts = filterBrand === 'todos' 
        ? products 
        : products.filter(product => product.brand === filterBrand);

    productsContainer.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p>${product.description}</p>
                <p class="product-price">$${product.price}</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    Agregar al Carrito
                </button>
            </div>
        </div>
    `).join('');
}

// Filter Products by Brand
document.querySelectorAll('.category-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        displayProducts(e.target.dataset.brand);
    });
});

// Cart Functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function updateCart() {
    // Update cart items display
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" width="50">
            <div>
                <h4>${item.name}</h4>
                <p>$${item.price} x ${item.quantity}</p>
            </div>
            <button onclick="removeFromCart(${item.id})">×</button>
        </div>
    `).join('');

    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);

    // Update cart count
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = count;
}

// Cart Modal Toggle
document.querySelector('.cart-icon').addEventListener('click', (e) => {
    e.preventDefault();
    cartModal.style.display = 'block';
});

closeCart.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

// Checkout
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('El carrito está vacío');
        return;
    }
    alert('¡Gracias por tu compra! Te contactaremos pronto para finalizar el proceso.');
    cart = [];
    updateCart();
    cartModal.style.display = 'none';
});

// Contact Form
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Mensaje enviado. Te contactaremos pronto.');
    e.target.reset();
});

// Initialize
displayProducts();

// WhatsApp ChatBot Integration
// Note: Replace this comment with the actual WhatsApp ChatBot code
// Example: 
/*
window.addEventListener('load', function() {
    // Add your WhatsApp ChatBot widget code here
    // Usually provided by your ChatBot service provider
});
*/