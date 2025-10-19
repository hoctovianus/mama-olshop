// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const cartIcon = document.querySelector('.cart-icon');
const cartModal = document.querySelector('.cart-modal');
const closeCart = document.querySelector('.close-cart');
const cartItemsContainer = document.querySelector('.cart-items');
const cartCount = document.querySelector('.cart-count');
const totalPriceElement = document.querySelector('.total-price');
const clearCartBtn = document.querySelector('.clear-cart');
const checkoutBtn = document.querySelector('.checkout-btn');

// Slider Elements
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dots = document.querySelectorAll('.dot');
const sliderContainer = document.querySelector('.slider-container');

// Cart Data
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize the website
document.addEventListener('DOMContentLoaded', () => {
    initSlider();
    updateCart();
    
    // Add event listeners
    hamburger.addEventListener('click', toggleMobileMenu);
    cartIcon.addEventListener('click', openCart);
    closeCart.addEventListener('click', closeCartModal);
    clearCartBtn.addEventListener('click', clearCart);
    checkoutBtn.addEventListener('click', checkout);
    
    // Close cart when clicking outside
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            closeCartModal();
        }
    });
    
    // Add event listeners to all "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const product = {
                id: parseInt(e.target.dataset.id),
                name: e.target.dataset.name,
                price: parseInt(e.target.dataset.price),
                image: e.target.dataset.image
            };
            
            addToCart(product);
        });
    });
});

// Mobile Menu Toggle
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Slider Functionality - VERSI FINAL YANG SMOOTH
function initSlider() {
    let currentSlide = 0;
    const slideCount = slides.length;
    let isTransitioning = false;
    let autoSlideInterval;
    
    // Function to show a specific slide
    function showSlide(index, direction = 'next') {
        if (isTransitioning) return;
        
        isTransitioning = true;
        
        // Handle slide boundaries dengan loop
        if (index < 0) {
            currentSlide = slideCount - 1;
        } else if (index >= slideCount) {
            currentSlide = 0;
        } else {
            currentSlide = index;
        }
        
        // Apply transform dengan transition
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update dots
        updateDots();
        
        // Update konten slide dengan animasi
        updateSlideContent();
        
        // Reset flag setelah transition selesai
        setTimeout(() => {
            isTransitioning = false;
        }, 800);
    }
    
    // Function untuk update dots
    function updateDots() {
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }
    
    // Function untuk update konten slide dengan animasi
    function updateSlideContent() {
        // Sembunyikan semua konten slide terlebih dahulu
        document.querySelectorAll('.slide-content').forEach(content => {
            content.style.opacity = '0';
            content.style.animation = 'none';
        });
        
        // Tampilkan konten slide aktif dengan animasi
        setTimeout(() => {
            const activeContent = slides[currentSlide].querySelector('.slide-content');
            if (activeContent) {
                activeContent.style.animation = 'fadeInUp 0.8s ease-out 0.3s forwards';
            }
        }, 300);
    }
    
    // Next slide dengan efek yang lebih terkontrol
    function nextSlide() {
        showSlide(currentSlide + 1, 'next');
    }
    
    // Previous slide dengan efek yang lebih terkontrol
    function prevSlide() {
        showSlide(currentSlide - 1, 'prev');
    }
    
    // Event listeners untuk tombol navigasi
    nextBtn.addEventListener('click', () => {
        if (!isTransitioning) {
            nextSlide();
        }
    });
    
    prevBtn.addEventListener('click', () => {
        if (!isTransitioning) {
            prevSlide();
        }
    });
    
    // Dot navigation dengan delay untuk mencegah spam click
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            if (!isTransitioning && i !== currentSlide) {
                showSlide(i);
            }
        });
    });
    
    // Touch events untuk swipe di mobile
    let startX = 0;
    let endX = 0;
    
    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    slider.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && !isTransitioning) {
                nextSlide(); // Swipe kiri
            } else if (diff < 0 && !isTransitioning) {
                prevSlide(); // Swipe kanan
            }
        }
    }
    
    // Auto slide dengan interval yang lebih panjang
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            if (!isTransitioning) {
                nextSlide();
            }
        }, 6000); // 6 detik
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Pause auto slide saat hover (untuk desktop)
    sliderContainer.addEventListener('mouseenter', stopAutoSlide);
    sliderContainer.addEventListener('mouseleave', startAutoSlide);
    
    // Juga pause saat berinteraksi dengan tombol/dots
    nextBtn.addEventListener('mouseenter', stopAutoSlide);
    prevBtn.addEventListener('mouseenter', stopAutoSlide);
    dots.forEach(dot => {
        dot.addEventListener('mouseenter', stopAutoSlide);
    });
    
    // Mulai auto slide
    startAutoSlide();
    
    // Inisialisasi konten slide pertama
    updateSlideContent();
}

// Cart Functions
function openCart() {
    cartModal.style.display = 'flex';
}

function closeCartModal() {
    cartModal.style.display = 'none';
}

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
    saveCartToLocalStorage();
    
    // Show confirmation
    showNotification(`${product.name} telah ditambahkan ke keranjang`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    saveCartToLocalStorage();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity += change;
        
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCart();
            saveCartToLocalStorage();
        }
    }
}

function clearCart() {
    cart = [];
    updateCart();
    saveCartToLocalStorage();
    closeCartModal();
}

function checkout() {
    if (cart.length === 0) {
        alert('Keranjang belanja Anda kosong!');
        return;
    }
    
    alert('Terima kasih! Pesanan Anda sedang diproses.');
    clearCart();
    closeCartModal();
}

function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Keranjang belanja Anda kosong</p>';
        totalPriceElement.textContent = 'Rp 0';
        return;
    }
    
    let totalPrice = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;
        
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <div class="cart-item-price">Rp ${formatPrice(item.price)}</div>
                </div>
            </div>
            <div class="cart-item-controls">
                <button class="quantity-btn minus" data-id="${item.id}">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn plus" data-id="${item.id}">+</button>
                <button class="remove-item" data-id="${item.id}">Hapus</button>
            </div>
        `;
        
        cartItemsContainer.appendChild(cartItemElement);
    });
    
    // Update total price
    totalPriceElement.textContent = `Rp ${formatPrice(totalPrice)}`;
    
    // Add event listeners to cart controls
    document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            updateQuantity(productId, -1);
        });
    });
    
    document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            updateQuantity(productId, 1);
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            removeFromCart(productId);
        });
    });
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}