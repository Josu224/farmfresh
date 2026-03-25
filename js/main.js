// ===== MAIN JAVASCRIPT - SHARED FUNCTIONALITY =====
// Farm Fresh Nigeria - Abuja

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all components
    initSearch();
    initFavorites();
    initWeather();
    initMobileMenu();
    highlightActiveNav();
    initNewsletter();
    initBackToTop();
    initCartIcon();      // Cart icon in navigation
    
});

// ===== SEARCH FUNCTIONALITY =====
function initSearch() {
    const searchInput = document.getElementById('main-search');
    const searchBtn = document.getElementById('search-btn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', function() {
            performSearch(searchInput.value);
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(searchInput.value);
            }
        });
    }
}

function performSearch(query) {
    if (!query.trim()) {
        showNotification('Please enter a search term', 'error');
        return;
    }
    
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage.includes('tools.html')) {
        if (typeof window.filterTools === 'function') {
            window.filterTools(query);
        }
    } else if (currentPage.includes('guides.html')) {
        const searchInput = document.getElementById('guide-search');
        if (searchInput) {
            searchInput.value = query;
            searchInput.dispatchEvent(new Event('input'));
        }
    } else {
        window.location.href = `tools.html?search=${encodeURIComponent(query)}`;
    }
}

// ===== FAVORITES USING LOCALSTORAGE =====
function initFavorites() {
    let favorites = JSON.parse(localStorage.getItem('farmFreshNigeriaFavorites')) || [];
    
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        const itemId = btn.dataset.id;
        
        if (favorites.includes(itemId)) {
            btn.classList.add('active');
            btn.innerHTML = '★ Saved';
        } else {
            btn.innerHTML = '☆ Save';
        }
        
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            toggleFavorite(this, itemId);
        });
    });
}

function toggleFavorite(btn, itemId) {
    let favorites = JSON.parse(localStorage.getItem('farmFreshNigeriaFavorites')) || [];
    
    if (favorites.includes(itemId)) {
        favorites = favorites.filter(id => id !== itemId);
        btn.classList.remove('active');
        btn.innerHTML = '☆ Save';
        showNotification('Removed from your favorites', 'info');
    } else {
        favorites.push(itemId);
        btn.classList.add('active');
        btn.innerHTML = '★ Saved';
        showNotification('Added to your favorites!', 'success');
    }
    
    localStorage.setItem('farmFreshNigeriaFavorites', JSON.stringify(favorites));
}

// ===== WEATHER WIDGET =====
async function initWeather() {
    const weatherContainer = document.getElementById('weather-info');
    if (!weatherContainer) return;
    
    const defaultCity = 'Abuja';
    weatherContainer.innerHTML = '<div class="loading">Loading Nigerian weather...</div>';
    
    try {
        let city = defaultCity;
        try {
            const position = await getCurrentPosition();
            const { latitude, longitude } = position.coords;
            city = await getNigerianCityFromCoords(latitude, longitude);
        } catch (error) {
            console.log('Using default location: Abuja');
            city = defaultCity;
        }
        
        const apiKey = 'YOUR_API_KEY';
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city},ng&units=metric&appid=${apiKey}`
        );
        
        if (!response.ok) throw new Error('Weather data unavailable');
        
        const data = await response.json();
        const farmingAdvice = getNigerianFarmingAdvice(data.weather[0].main, data.main.temp);
        
        weatherContainer.innerHTML = `
            <div class="weather-info">
                <div>
                    <h3>${data.name}, Nigeria</h3>
                    <p>${data.weather[0].description}</p>
                </div>
                <div class="weather-temp">${Math.round(data.main.temp)}°C</div>
                <div>
                    <p>💧 Humidity: ${data.main.humidity}%</p>
                    <p>🌬️ Wind: ${data.wind.speed} m/s</p>
                    <p class="farming-tip">🌱 ${farmingAdvice}</p>
                </div>
            </div>
        `;
        
    } catch (error) {
        weatherContainer.innerHTML = `
            <div class="weather-info">
                <div>
                    <h3>Abuja, Nigeria</h3>
                    <p>Typical farming weather</p>
                </div>
                <div class="weather-temp">28°C</div>
                <div>
                    <p>💧 Humidity: 65%</p>
                    <p>🌬️ Wind: 5 m/s</p>
                    <p class="farming-tip">🌱 Good for planting maize and cassava</p>
                </div>
            </div>
        `;
    }
}

function getNigerianFarmingAdvice(weatherCondition, temperature) {
    const advice = {
        'Clear': 'Great day for planting and harvesting',
        'Clouds': 'Good for spraying and field work',
        'Rain': 'Perfect for transplanting - soil is moist',
        'Thunderstorm': 'Avoid field work. Check drainage systems',
        'Drizzle': 'Good for fertilizer application',
        'Mist': 'Watch for fungal diseases in tomatoes',
        'Haze': 'Protect seedlings from harsh sun',
        'Smoke': 'Limit outdoor work, protect crops'
    };
    
    if (temperature > 35) {
        return 'Too hot - irrigate crops and provide shade for seedlings';
    } else if (temperature < 20) {
        return 'Cool - good for leafy vegetables like spinach and lettuce';
    }
    
    return advice[weatherCondition] || 'Normal farming conditions';
}

function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation not supported'));
        } else {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        }
    });
}

function getNigerianCityFromCoords(lat, lon) {
    const majorCities = {
        'Abuja': { lat: 9.0579, lon: 7.4951 },
        'Lagos': { lat: 6.5244, lon: 3.3792 },
        'Kano': { lat: 12.0022, lon: 8.5920 },
        'Ibadan': { lat: 7.3776, lon: 3.9470 },
        'Kaduna': { lat: 10.5264, lon: 7.4388 },
        'Port Harcourt': { lat: 4.8156, lon: 7.0498 },
        'Benin City': { lat: 6.3350, lon: 5.6037 },
        'Maiduguri': { lat: 11.8311, lon: 13.1511 }
    };
    
    let closestCity = 'Abuja';
    let minDistance = Infinity;
    
    for (const [city, coords] of Object.entries(majorCities)) {
        const distance = Math.sqrt(
            Math.pow(lat - coords.lat, 2) + 
            Math.pow(lon - coords.lon, 2)
        );
        if (distance < minDistance) {
            minDistance = distance;
            closestCity = city;
        }
    }
    
    return Promise.resolve(closestCity);
}

// ===== MOBILE MENU (fixed: button on right) =====
function initMobileMenu() {
    const headerContainer = document.querySelector('header .container');
    const nav = document.querySelector('nav');
    const navUl = nav?.querySelector('ul');
    if (!headerContainer || !nav || !navUl) return;

    // Remove any existing menu button to avoid duplicates
    const existingBtn = document.querySelector('.mobile-menu-btn');
    if (existingBtn) existingBtn.remove();

    // Create the button with custom hamburger icon
    const menuBtn = document.createElement('button');
    menuBtn.className = 'mobile-menu-btn';
    menuBtn.setAttribute('aria-label', 'Toggle navigation menu');
    menuBtn.innerHTML = '<span class="hamburger-icon"></span>';
    headerContainer.appendChild(menuBtn);

    function toggleMenu(open) {
        if (open === undefined) {
            const isOpen = nav.classList.contains('active');
            open = !isOpen;
        }
        if (open) {
            nav.classList.add('active');
            menuBtn.classList.add('active');
            document.body.classList.add('menu-open');
        } else {
            nav.classList.remove('active');
            menuBtn.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    }

    menuBtn.addEventListener('click', () => toggleMenu());

    // Close menu when a link is clicked
    navUl.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });

    // Close menu on window resize if screen becomes larger than mobile
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            toggleMenu(false);
        }
    });
}

// ===== HIGHLIGHT ACTIVE NAVIGATION =====
function highlightActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        }
    });
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.setAttribute('role', 'alert');
    
    const colors = {
        success: 'var(--primary-green)',
        error: '#f44336',
        info: '#2196F3',
        warning: '#ff9800'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.success};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 1000;
        animation: slideIn 0.3s ease;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) notification.remove();
        }, 300);
    }, 3000);
}

// ===== FORM VALIDATION =====
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return true;
    
    let isValid = true;
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        input.style.borderColor = '';
        const existingError = input.parentNode.querySelector('.error-message');
        if (existingError) existingError.remove();
        
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#f44336';
            const error = document.createElement('small');
            error.className = 'error-message';
            error.style.cssText = 'color: #f44336; display: block; margin-top: 5px;';
            error.textContent = 'This field is required';
            input.parentNode.appendChild(error);
        }
        
        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                isValid = false;
                input.style.borderColor = '#f44336';
                const error = document.createElement('small');
                error.className = 'error-message';
                error.style.cssText = 'color: #f44336; display: block; margin-top: 5px;';
                error.textContent = 'Please enter a valid email address';
                input.parentNode.appendChild(error);
            }
        }
        
        if (input.id === 'phone' && input.value) {
            const phoneRegex = /^(0|234|\+234)[0-9]{10}$/;
            if (!phoneRegex.test(input.value.replace(/\s/g, ''))) {
                isValid = false;
                input.style.borderColor = '#f44336';
                const error = document.createElement('small');
                error.className = 'error-message';
                error.style.cssText = 'color: #f44336; display: block; margin-top: 5px;';
                error.textContent = 'Please enter a valid Nigerian phone number';
                input.parentNode.appendChild(error);
            }
        }
    });
    
    return isValid;
}

// ===== NEWSLETTER SIGNUP =====
function initNewsletter() {
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (!email) {
                showNotification('Please enter your email address', 'error');
                return;
            }
            showNotification('Thank you for subscribing to Farm Fresh Nigeria!', 'success');
            this.reset();
            const subscribers = JSON.parse(localStorage.getItem('farmFreshNewsletter')) || [];
            subscribers.push({ email, date: new Date().toISOString() });
            localStorage.setItem('farmFreshNewsletter', JSON.stringify(subscribers));
        });
    }
}

// ===== BACK TO TOP BUTTON =====
function initBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-green);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 1.5rem;
        box-shadow: var(--shadow-lg);
        opacity: 0;
        transition: opacity 0.3s, transform 0.3s;
        z-index: 90;
        display: none;
    `;
    
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'block';
            setTimeout(() => { backToTopBtn.style.opacity = '1'; }, 10);
        } else {
            backToTopBtn.style.opacity = '0';
            setTimeout(() => { backToTopBtn.style.display = 'none'; }, 300);
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    backToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    backToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
}

// ===== NIGERIAN FARMING TIPS =====
function getRandomFarmingTip() {
    const tips = [
        'Plant cassava at the start of rainy season for best yields',
        'Use neem leaves as natural pesticide for your vegetables',
        'Mulch around tomato plants to conserve moisture during harmattan',
        'Plant maize in rows 75cm apart for easy weeding',
        'Apply fertilizer to yam mounds before planting for better tuber growth',
        'Water your vegetables early morning or late evening to reduce evaporation',
        'Rotate crops to prevent soil-borne diseases',
        'Keep farm tools clean to prevent spread of plant diseases',
        'Harvest cassava 12 months after planting for best starch content',
        'Store grains in airtight containers to prevent weevil infestation'
    ];
    return tips[Math.floor(Math.random() * tips.length)];
}

// ===== E-COMMERCE CART FUNCTIONS =====
function getCart() {
    return JSON.parse(localStorage.getItem('farmFreshCart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('farmFreshCart', JSON.stringify(cart));
    updateCartIcon();
}

function addToCart(product) {
    let cart = getCart();
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    saveCart(cart);
    showNotification(`${product.name} added to cart`, 'success');
}

function updateCartItemQuantity(id, quantity) {
    let cart = getCart();
    const item = cart.find(i => i.id === id);
    if (item) {
        if (quantity <= 0) {
            cart = cart.filter(i => i.id !== id);
        } else {
            item.quantity = quantity;
        }
        saveCart(cart);
    }
}

function removeCartItem(id) {
    let cart = getCart();
    cart = cart.filter(i => i.id !== id);
    saveCart(cart);
    showNotification('Item removed from cart', 'info');
}

function getCartTotal() {
    const cart = getCart();
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function getCartCount() {
    const cart = getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
}

function updateCartIcon() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        const count = getCartCount();
        cartCountElement.textContent = count;
        cartCountElement.style.display = count > 0 ? 'inline-block' : 'none';
    }
}

function initCartIcon() {
    const nav = document.querySelector('nav ul');
    if (nav && !document.getElementById('cart-link')) {
        const cartLi = document.createElement('li');
        cartLi.innerHTML = `<a href="cart.html" id="cart-link">🛒 Cart <span id="cart-count" style="display:none; background: #FF8F00; border-radius: 50%; padding: 2px 6px; font-size: 0.75rem; margin-left: 5px;">0</span></a>`;
        nav.appendChild(cartLi);
        updateCartIcon();
    }
}

// ===== EXPORT FUNCTIONS FOR GLOBAL USE =====
window.showNotification = showNotification;
window.validateForm = validateForm;
window.performSearch = performSearch;
window.getRandomFarmingTip = getRandomFarmingTip;
window.addToCart = addToCart;
window.updateCartItemQuantity = updateCartItemQuantity;
window.removeCartItem = removeCartItem;
window.getCart = getCart;
window.getCartTotal = getCartTotal;
window.getCartCount = getCartCount;