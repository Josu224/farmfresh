/**
 * ============================================
 * FARM FRESH NIGERIA - MAIN.JS
 * Shared functionality across all pages
 * ============================================
 */

// ----- SELF-INVOKING INITIALIZATION -----
(function () {
    'use strict';

    // ----- STATE -----
    let debounceTimer = null;

    // ----- DOM READY -----
    document.addEventListener('DOMContentLoaded', function () {
        initMobileMenu();
        highlightActiveNav();
        initSearch();
        initWeather();
        initCartIcon();
        initNewsletter();
        initBackToTop();
        initFavoritesButtons(); // Replaces old initFavorites to use delegation
        initSmoothScroll();
        initLazyImages();
    });

    // ===== MOBILE MENU (Hamburger Toggle) =====
    function initMobileMenu() {
        const header = document.querySelector('header');
        const nav = document.querySelector('nav');
        const navUl = nav?.querySelector('ul');
        if (!header || !nav || !navUl) return;

        // Create hamburger button if it doesn't exist
        let menuBtn = document.querySelector('.mobile-menu-btn');
        if (!menuBtn) {
            menuBtn = document.createElement('button');
            menuBtn.className = 'mobile-menu-btn';
            menuBtn.setAttribute('aria-label', 'Toggle navigation menu');
            menuBtn.setAttribute('aria-expanded', 'false');
            menuBtn.innerHTML = '<span class="hamburger-icon"></span>';
            header.querySelector('.container').appendChild(menuBtn);
        }

        // Toggle function
        const toggleMenu = (force) => {
            const isOpen = force !== undefined ? force : !nav.classList.contains('active');
            nav.classList.toggle('active', isOpen);
            menuBtn.classList.toggle('active', isOpen);
            menuBtn.setAttribute('aria-expanded', isOpen);
            document.body.classList.toggle('menu-open', isOpen);
        };

        // Event listeners
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        // Close when clicking a nav link
        navUl.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                toggleMenu(false);
            }
        });

        // Close on window resize if desktop view
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                toggleMenu(false);
            }
        });

        // Close if clicking outside (optional)
        document.addEventListener('click', (e) => {
            if (nav.classList.contains('active') && !nav.contains(e.target) && !menuBtn.contains(e.target)) {
                toggleMenu(false);
            }
        });
    }

    // ===== ACTIVE NAVIGATION HIGHLIGHT =====
    function highlightActiveNav() {
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('nav a');

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            } else {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
            }
        });
    }

    // ===== SEARCH FUNCTIONALITY (Debounced) =====
    function initSearch() {
        const searchInput = document.getElementById('main-search');
        const searchBtn = document.getElementById('search-btn');
        if (!searchInput) return;

        const performSearch = (query) => {
            if (!query.trim()) {
                showToast('Please enter a search term', 'error');
                return;
            }
            const currentPage = window.location.pathname.split('/').pop();
            if (currentPage.includes('tools.html')) {
                if (typeof window.filterTools === 'function') {
                    window.filterTools(query);
                }
            } else if (currentPage.includes('guides.html')) {
                const guideSearch = document.getElementById('guide-search');
                if (guideSearch) {
                    guideSearch.value = query;
                    guideSearch.dispatchEvent(new Event('input', { bubbles: true }));
                }
            } else {
                window.location.href = `tools.html?search=${encodeURIComponent(query)}`;
            }
        };

        // Debounced search for better UX on homepage
        const debouncedSearch = () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                performSearch(searchInput.value);
            }, 400);
        };

        if (searchBtn) {
            searchBtn.addEventListener('click', () => performSearch(searchInput.value));
        }
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch(searchInput.value);
            }
        });
        // If on homepage, also trigger debounced search for live results? 
        // We'll keep it simple: only on button/enter.
    }

    // ===== WEATHER WIDGET (Nigerian Context) =====
    async function initWeather() {
        const weatherContainer = document.getElementById('weather-info');
        if (!weatherContainer) return;

        weatherContainer.innerHTML = '<div class="loading">Loading Nigerian weather...</div>';

        // Helper: get user's nearest Nigerian city from coordinates
        const getNigerianCity = (lat, lon) => {
            const cities = {
                'Abuja': [9.0579, 7.4951],
                'Lagos': [6.5244, 3.3792],
                'Kano': [12.0022, 8.5920],
                'Ibadan': [7.3776, 3.9470],
                'Kaduna': [10.5264, 7.4388],
                'Port Harcourt': [4.8156, 7.0498],
                'Benin City': [6.3350, 5.6037],
                'Maiduguri': [11.8311, 13.1511],
                'Enugu': [6.4478, 7.5046],
                'Jos': [9.8965, 8.8583]
            };
            let closest = 'Abuja';
            let minDist = Infinity;
            for (const [city, [cLat, cLon]] of Object.entries(cities)) {
                const dist = Math.hypot(lat - cLat, lon - cLon);
                if (dist < minDist) {
                    minDist = dist;
                    closest = city;
                }
            }
            return closest;
        };

        // Helper: farming advice based on weather
        const getFarmingAdvice = (condition, temp) => {
            if (temp > 35) return '☀️ Too hot - irrigate crops and provide shade.';
            if (temp < 20) return '🌿 Cool weather - good for leafy vegetables.';
            const adviceMap = {
                'Clear': '☀️ Great day for planting and harvesting.',
                'Clouds': '☁️ Good for spraying and field work.',
                'Rain': '🌧️ Perfect for transplanting - soil is moist.',
                'Drizzle': '💧 Good for fertilizer application.',
                'Thunderstorm': '⛈️ Avoid field work. Check drainage.',
                'Mist': '🌫️ Watch for fungal diseases in tomatoes.',
                'Haze': '🌁 Protect seedlings from harsh sun.',
                'Smoke': '🔥 Limit outdoor work, protect crops.'
            };
            return adviceMap[condition] || '🌱 Normal farming conditions.';
        };

        try {
            // Get user location (optional)
            let city = 'Abuja';
            try {
                const position = await new Promise((resolve, reject) => {
                    if (!navigator.geolocation) reject('Geolocation not supported');
                    else navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
                });
                city = getNigerianCity(position.coords.latitude, position.coords.longitude);
            } catch {
                // Fallback to Abuja
            }

            // Fetch weather - you'll need to replace with a real API key
            const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'; // Get free key at openweathermap.org
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city},ng&units=metric&appid=${API_KEY}`
            );

            if (!response.ok) throw new Error('Weather fetch failed');
            const data = await response.json();

            const advice = getFarmingAdvice(data.weather[0].main, data.main.temp);
            weatherContainer.innerHTML = `
                <div class="weather-info">
                    <div>
                        <h3>${data.name}, Nigeria</h3>
                        <p style="text-transform: capitalize;">${data.weather[0].description}</p>
                    </div>
                    <div class="weather-temp">${Math.round(data.main.temp)}°C</div>
                    <div>
                        <p>💧 Humidity: ${data.main.humidity}%</p>
                        <p>🌬️ Wind: ${data.wind.speed} m/s</p>
                        <p class="farming-tip">${advice}</p>
                    </div>
                </div>
            `;
        } catch (error) {
            // Fallback static weather display
            weatherContainer.innerHTML = `
                <div class="weather-info">
                    <div>
                        <h3>Abuja, Nigeria</h3>
                        <p>Partly cloudy</p>
                    </div>
                    <div class="weather-temp">28°C</div>
                    <div>
                        <p>💧 Humidity: 65%</p>
                        <p>🌬️ Wind: 5 m/s</p>
                        <p class="farming-tip">🌱 Good season for maize and cassava planting.</p>
                    </div>
                </div>
            `;
        }
    }

    // ===== FAVORITES (Delegated to tools.js logic) =====
    function initFavoritesButtons() {
        // Use event delegation for favorite buttons (including dynamically added ones)
        document.body.addEventListener('click', (e) => {
            const favBtn = e.target.closest('.favorite-btn');
            if (!favBtn) return;

            const toolId = favBtn.dataset.id;
            if (!toolId) return;

            // If tools.js has toggleFavorite exported, use it; otherwise fallback to local
            if (typeof window.toggleFavorite === 'function') {
                window.toggleFavorite(parseInt(toolId));
                // The tools.js will update UI via filterTools or re-render
            } else {
                // Fallback simple toggle (for pages without tools.js)
                let favorites = JSON.parse(localStorage.getItem('farmFreshNigeriaFavorites')) || [];
                const idStr = toolId.toString();
                if (favorites.includes(idStr)) {
                    favorites = favorites.filter(id => id !== idStr);
                    favBtn.classList.remove('active');
                    favBtn.innerHTML = '☆ Save';
                    showToast('Removed from favorites', 'info');
                } else {
                    favorites.push(idStr);
                    favBtn.classList.add('active');
                    favBtn.innerHTML = '❤️ Saved';
                    showToast('Added to favorites!', 'success');
                }
                localStorage.setItem('farmFreshNigeriaFavorites', JSON.stringify(favorites));
            }
        });

        // Mark existing favorites on page load
        const favorites = JSON.parse(localStorage.getItem('farmFreshNigeriaFavorites')) || [];
        document.querySelectorAll('.favorite-btn').forEach(btn => {
            const id = btn.dataset.id;
            if (favorites.includes(id)) {
                btn.classList.add('active');
                btn.innerHTML = '❤️ Saved';
            }
        });
    }

    // ===== CART FUNCTIONS =====
    const CART_KEY = 'farmFreshCart';

    function getCart() {
        return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    }

    function saveCart(cart) {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        updateCartIcon();
    }

    function addToCart(product) {
        const cart = getCart();
        const existing = cart.find(item => item.id === product.id);
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        saveCart(cart);
        showToast(`${product.name} added to cart`, 'success');
    }

    function updateCartItemQuantity(id, quantity) {
        let cart = getCart();
        const item = cart.find(i => i.id === id);
        if (!item) return;

        if (quantity <= 0) {
            cart = cart.filter(i => i.id !== id);
            showToast('Item removed from cart', 'info');
        } else {
            item.quantity = quantity;
        }
        saveCart(cart);
    }

    function removeCartItem(id) {
        let cart = getCart();
        cart = cart.filter(i => i.id !== id);
        saveCart(cart);
        showToast('Item removed from cart', 'info');
    }

    function getCartTotal() {
        return getCart().reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    function getCartCount() {
        return getCart().reduce((count, item) => count + item.quantity, 0);
    }

    function updateCartIcon() {
        const countSpan = document.getElementById('cart-count');
        if (countSpan) {
            const count = getCartCount();
            countSpan.textContent = count;
            countSpan.style.display = count > 0 ? 'inline-block' : 'none';
        }
    }

    function initCartIcon() {
        const navUl = document.querySelector('nav ul');
        if (!navUl) return;

        // Check if cart link already exists
        if (!document.getElementById('cart-link')) {
            const cartLi = document.createElement('li');
            cartLi.innerHTML = `
                <a href="cart.html" id="cart-link">
                    🛒 Cart 
                    <span id="cart-count" class="cart-badge" style="display: none;">0</span>
                </a>
            `;
            navUl.appendChild(cartLi);
        }
        updateCartIcon();
    }

    // ===== TOAST NOTIFICATIONS (using CSS classes) =====
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        toast.setAttribute('role', 'alert');
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // ===== FORM VALIDATION (Nigerian context) =====
    function validateForm(formElement) {
        const form = typeof formElement === 'string' ? document.getElementById(formElement) : formElement;
        if (!form) return true;

        let isValid = true;
        const inputs = form.querySelectorAll('input, textarea, select');

        // Clear previous errors
        form.querySelectorAll('.error-message').forEach(el => el.remove());
        inputs.forEach(input => input.style.borderColor = '');

        inputs.forEach(input => {
            const value = input.value.trim();

            // Required fields
            if (input.hasAttribute('required') && !value) {
                showFieldError(input, 'This field is required');
                isValid = false;
            }

            // Email validation
            if (input.type === 'email' && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    showFieldError(input, 'Please enter a valid email address');
                    isValid = false;
                }
            }

            // Nigerian phone number (allow 080..., +234..., 234...)
            if (input.id === 'phone' && value) {
                const phoneRegex = /^(\+?234|0)[0-9]{10}$/;
                const cleaned = value.replace(/\s+/g, '');
                if (!phoneRegex.test(cleaned)) {
                    showFieldError(input, 'Enter a valid Nigerian phone number (e.g., 08012345678)');
                    isValid = false;
                }
            }

            // Password strength (if needed)
            if (input.type === 'password' && value && input.dataset.minLength) {
                if (value.length < parseInt(input.dataset.minLength)) {
                    showFieldError(input, `Password must be at least ${input.dataset.minLength} characters`);
                    isValid = false;
                }
            }
        });

        return isValid;
    }

    function showFieldError(input, message) {
        input.style.borderColor = '#f44336';
        const error = document.createElement('small');
        error.className = 'error-message';
        error.style.cssText = 'color: #f44336; display: block; margin-top: 5px; font-size: 0.85rem;';
        error.textContent = message;
        input.parentNode.appendChild(error);
    }

    // ===== NEWSLETTER SIGNUP =====
    function initNewsletter() {
        const form = document.getElementById('newsletter-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = form.querySelector('input[type="email"]');
            const email = emailInput.value.trim();

            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showToast('Please enter a valid email address', 'error');
                return;
            }

            // Save to localStorage
            const subscribers = JSON.parse(localStorage.getItem('farmFreshNewsletter')) || [];
            subscribers.push({ email, date: new Date().toISOString() });
            localStorage.setItem('farmFreshNewsletter', JSON.stringify(subscribers));

            showToast('Thanks for subscribing to Farm Fresh updates! 🌱', 'success');
            form.reset();
        });
    }

    // ===== BACK TO TOP BUTTON =====
    function initBackToTop() {
        const btn = document.createElement('button');
        btn.className = 'back-to-top hidden';
        btn.innerHTML = '↑';
        btn.setAttribute('aria-label', 'Back to top');
        document.body.appendChild(btn);

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                btn.classList.remove('hidden');
            } else {
                btn.classList.add('hidden');
            }
        }, { passive: true });

        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    // ===== LAZY LOAD IMAGES (Native) =====
    function initLazyImages() {
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }

    // ===== RANDOM FARMING TIP =====
    function getRandomFarmingTip() {
        const tips = [
            'Plant cassava at the start of rainy season for best yields.',
            'Use neem leaves as natural pesticide for vegetables.',
            'Mulch around tomato plants to conserve moisture.',
            'Plant maize in rows 75cm apart for easy weeding.',
            'Apply fertilizer to yam mounds before planting.',
            'Water vegetables early morning or late evening.',
            'Rotate crops to prevent soil-borne diseases.',
            'Keep farm tools clean to prevent disease spread.',
            'Harvest cassava 12 months after planting.',
            'Store grains in airtight containers to prevent weevils.'
        ];
        return tips[Math.floor(Math.random() * tips.length)];
    }

    // ===== EXPORT TO GLOBAL SCOPE =====
    window.showToast = showToast;
    window.validateForm = validateForm;
    window.addToCart = addToCart;
    window.updateCartItemQuantity = updateCartItemQuantity;
    window.removeCartItem = removeCartItem;
    window.getCart = getCart;
    window.getCartTotal = getCartTotal;
    window.getCartCount = getCartCount;
    window.getRandomFarmingTip = getRandomFarmingTip;

    // For backward compatibility with older code expecting showNotification
    window.showNotification = showToast;

})();