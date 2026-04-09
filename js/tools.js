/**
 * ============================================
 * FARM FRESH NIGERIA - TOOLS.JS
 * Tools directory with search, filter, favorites, and cart
 * ============================================
 */

(function () {
    'use strict';

    // ----- TOOLS DATA (Nigerian farming equipment) -----
    const toolsData = [
        {
            id: 1,
            name: "Massey Ferguson Tractor",
            category: "tractors",
            price: 45000,
            priceUnit: "/day",
            supplier: "Abuja Agro Services",
            location: "Abuja",
            image: "images/tractor.jpg",
            fallback: "images/placeholder-tractor.jpg",
            description: "75HP tractor perfect for plowing and hauling in Nigerian farms",
            stock: 3
        },
        {
            id: 2,
            name: "Drip Irrigation Kit",
            category: "irrigation",
            price: 180000,
            priceUnit: "",
            supplier: "GreenField Solutions",
            location: "Kaduna",
            image: "images/irrigation.jpg",
            fallback: "images/placeholder-irrigation.jpg",
            description: "Complete drip irrigation system for 1 acre - perfect for dry season farming",
            stock: 5
        },
        {
            id: 3,
            name: "Cassava Grating Machine",
            category: "processing",
            price: 250000,
            priceUnit: "",
            supplier: "FarmTech Nigeria",
            location: "Benue",
            image: "images/cassava-grater.jpg",
            fallback: "images/placeholder-processor.jpg",
            description: "Electric cassava grater for garri production - 2 tons per hour",
            stock: 2
        },
        {
            id: 4,
            name: "Power Tiller",
            category: "tractors",
            price: 25000,
            priceUnit: "/day",
            supplier: "Northern Farm Services",
            location: "Kano",
            image: "images/tiller.jpg",
            fallback: "images/placeholder-tiller.jpg",
            description: "Compact tiller for small farms - perfect for vegetable gardens",
            stock: 4
        },
        {
            id: 5,
            name: "Rice Mill",
            category: "processing",
            price: 850000,
            priceUnit: "",
            supplier: "Abakaliki Agro",
            location: "Ebonyi",
            image: "images/rice-mill.jpg",
            fallback: "images/placeholder-mill.jpg",
            description: "Complete rice milling machine - 1 ton per hour capacity",
            stock: 1
        },
        {
            id: 6,
            name: "Knapsack Sprayer",
            category: "sprayers",
            price: 15000,
            priceUnit: "/day",
            supplier: "CropCare Ltd",
            location: "Nasarawa",
            image: "images/knapsack.jpg",
            fallback: "images/placeholder-sprayer.jpg",
            description: "20L manual sprayer for pesticides and fertilizers",
            stock: 10
        },
        {
            id: 7,
            name: "Water Pump",
            category: "irrigation",
            price: 8000,
            priceUnit: "/day",
            supplier: "AquaFlow Nigeria",
            location: "Niger",
            image: "images/water-pump.jpg",
            fallback: "images/placeholder-pump.jpg",
            description: "2-inch diesel water pump for irrigation",
            stock: 6
        },
        {
            id: 8,
            name: "Yam Harvester",
            category: "harvesting",
            price: 12000,
            priceUnit: "/day",
            supplier: "Benue Agro Services",
            location: "Benue",
            image: "images/yam-harvester.jpg",
            fallback: "images/placeholder-harvester.jpg",
            description: "Specialized yam harvesting equipment - reduces labor by 70%",
            stock: 3
        },
        {
            id: 9,
            name: "Maize Sheller",
            category: "processing",
            price: 10000,
            priceUnit: "/day",
            supplier: "FarmPower Nigeria",
            location: "Plateau",
            image: "images/maize-sheller.jpg",
            fallback: "images/placeholder-sheller.jpg",
            description: "Motorized maize sheller - processes 2 tons per day",
            stock: 4
        }
    ];

    // ----- DOM ELEMENTS -----
    const container = document.getElementById('tools-container');
    const searchInput = document.getElementById('tool-search');
    const categorySelect = document.getElementById('category-filter');
    const locationSelect = document.getElementById('location-filter');
    const favSection = document.getElementById('favorite-tools');

    // ----- STATE -----
    let currentTools = [...toolsData];
    let debounceTimer = null;
    const FAVORITES_KEY = 'farmFreshNigeriaFavorites';

    // ----- INITIALIZATION -----
    function init() {
        if (!container) return;

        populateFilterDropdowns();
        renderTools(toolsData);
        attachEventListeners();
        renderFavoritesSection();

        // Handle URL search param (from homepage)
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get('search');
        if (searchQuery && searchInput) {
            searchInput.value = searchQuery;
            applyFilters();
        }
    }

    // ----- POPULATE FILTER DROPDOWNS DYNAMICALLY -----
    function populateFilterDropdowns() {
        // Categories
        const categories = [...new Set(toolsData.map(t => t.category))];
        if (categorySelect) {
            categorySelect.innerHTML = '<option value="all">All Categories</option>';
            categories.sort().forEach(cat => {
                const option = document.createElement('option');
                option.value = cat;
                option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
                categorySelect.appendChild(option);
            });
        }

        // Locations
        const locations = [...new Set(toolsData.map(t => t.location))];
        if (locationSelect) {
            locationSelect.innerHTML = '<option value="all">All Locations</option>';
            locations.sort().forEach(loc => {
                const option = document.createElement('option');
                option.value = loc;
                option.textContent = loc;
                locationSelect.appendChild(option);
            });
        }
    }

    // ----- RENDER TOOL CARDS -----
    function renderTools(tools) {
        if (!container) return;

        if (!tools.length) {
            container.innerHTML = '<p class="no-results">🚜 No tools match your criteria. Try adjusting your filters.</p>';
            return;
        }

        const favorites = getFavorites();
        const html = tools.map(tool => {
            const isFavorite = favorites.includes(tool.id.toString());
            const stockStatus = tool.stock > 0 ? `In stock (${tool.stock})` : 'Out of stock';
            const cartButton = tool.stock > 0
                ? `<button class="add-to-cart-btn" data-id="${tool.id}" data-name="${tool.name}" data-price="${tool.price}" data-unit="${tool.priceUnit}" data-image="${tool.image}" aria-label="Add ${tool.name} to cart">🛒 Add to Cart</button>`
                : `<button class="disabled-btn" disabled aria-label="${tool.name} is out of stock">Sold Out</button>`;
            const favIcon = isFavorite ? '❤️' : '☆';
            const favText = isFavorite ? 'Saved' : 'Save';

            return `
                <div class="tool-card" data-id="${tool.id}" role="article">
                    <div class="tool-image" style="background-image: url('${tool.image}')" role="img" aria-label="${tool.name}">
                        <span class="tool-category">${tool.category}</span>
                    </div>
                    <div class="tool-details">
                        <h3>${tool.name}</h3>
                        <p>${tool.description}</p>
                        <div class="tool-price">₦${tool.price.toLocaleString()}${tool.priceUnit}</div>
                        <div class="tool-supplier">
                            <span>🏪 ${tool.supplier}</span>
                            <span>📍 ${tool.location}</span>
                        </div>
                        <div class="tool-stock">${stockStatus}</div>
                        <div class="tool-actions">
                            ${cartButton}
                            <button class="favorite-btn" data-id="${tool.id}" aria-label="${favText} ${tool.name}">${favIcon} ${favText}</button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = html;

        // Handle image loading errors
        container.querySelectorAll('.tool-image').forEach((imgDiv, index) => {
            const tool = tools[index];
            const bgImage = imgDiv.style.backgroundImage;
            // Create a test image to detect failure
            const testImg = new Image();
            testImg.onerror = () => {
                imgDiv.style.backgroundImage = `url('${tool.fallback || 'images/placeholder-tool.jpg'}')`;
            };
            testImg.src = tool.image;
        });
    }

    // ----- EVENT LISTENERS (Delegation) -----
    function attachEventListeners() {
        // Filter controls
        if (searchInput) {
            searchInput.addEventListener('input', debouncedFilter);
        }
        if (categorySelect) {
            categorySelect.addEventListener('change', applyFilters);
        }
        if (locationSelect) {
            locationSelect.addEventListener('change', applyFilters);
        }

        // Event delegation for cart and favorite buttons
        if (container) {
            container.addEventListener('click', handleContainerClick);
        }

        // Favorites section removal delegation
        if (favSection) {
            favSection.addEventListener('click', (e) => {
                const removeBtn = e.target.closest('.remove-fav-btn');
                if (removeBtn) {
                    const id = parseInt(removeBtn.dataset.id);
                    toggleFavorite(id);
                    applyFilters(); // Re-render tools to update heart icons
                    renderFavoritesSection();
                }
            });
        }
    }

    function handleContainerClick(e) {
        // Add to Cart
        const addBtn = e.target.closest('.add-to-cart-btn');
        if (addBtn && !addBtn.disabled) {
            e.preventDefault();
            const product = {
                id: parseInt(addBtn.dataset.id),
                name: addBtn.dataset.name,
                price: parseFloat(addBtn.dataset.price),
                priceUnit: addBtn.dataset.unit,
                image: addBtn.dataset.image,
                quantity: 1
            };
            if (typeof window.addToCart === 'function') {
                window.addToCart(product);
                addBtn.textContent = '✅ Added!';
                setTimeout(() => {
                    addBtn.textContent = '🛒 Add to Cart';
                }, 1000);
            }
        }

        // Toggle Favorite
        const favBtn = e.target.closest('.favorite-btn');
        if (favBtn) {
            e.preventDefault();
            const toolId = parseInt(favBtn.dataset.id);
            toggleFavorite(toolId);
            applyFilters(); // Refresh display
            renderFavoritesSection();
        }
    }

    // ----- DEBOUNCED FILTER -----
    function debouncedFilter() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(applyFilters, 300);
    }

    function applyFilters() {
        const searchTerm = searchInput ? searchInput.value.trim() : '';
        const category = categorySelect ? categorySelect.value : 'all';
        const location = locationSelect ? locationSelect.value : 'all';

        let filtered = [...toolsData];

        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(tool =>
                tool.name.toLowerCase().includes(term) ||
                tool.description.toLowerCase().includes(term) ||
                tool.supplier.toLowerCase().includes(term) ||
                tool.location.toLowerCase().includes(term)
            );
        }

        if (category && category !== 'all') {
            filtered = filtered.filter(tool => tool.category === category);
        }

        if (location && location !== 'all') {
            filtered = filtered.filter(tool => tool.location === location);
        }

        currentTools = filtered;
        renderTools(filtered);
    }

    // ----- FAVORITES MANAGEMENT -----
    function getFavorites() {
        return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
    }

    function saveFavorites(favorites) {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }

    function toggleFavorite(toolId) {
        const favorites = getFavorites();
        const idStr = toolId.toString();
        const index = favorites.indexOf(idStr);

        if (index === -1) {
            favorites.push(idStr);
            showToast('Tool saved to favorites! ❤️', 'success');
        } else {
            favorites.splice(index, 1);
            showToast('Tool removed from favorites', 'info');
        }
        saveFavorites(favorites);
    }

    function renderFavoritesSection() {
        if (!favSection) return;

        const favorites = getFavorites();
        const favoriteTools = toolsData.filter(tool => favorites.includes(tool.id.toString()));

        if (favoriteTools.length === 0) {
            favSection.innerHTML = '<p class="empty-favorites">⭐ You haven\'t saved any tools yet. Click the ☆ button to save your favorites.</p>';
            return;
        }

        const itemsHtml = favoriteTools.map(tool => `
            <div class="favorite-item">
                <img src="${tool.image}" alt="${tool.name}" loading="lazy" onerror="this.src='${tool.fallback || 'images/placeholder-tool.jpg'}'">
                <span>${tool.name}</span>
                <button class="remove-fav-btn" data-id="${tool.id}" aria-label="Remove ${tool.name} from favorites">✖</button>
            </div>
        `).join('');

        favSection.innerHTML = `
            <h2>❤️ Your Saved Tools</h2>
            <div class="favorites-grid">
                ${itemsHtml}
            </div>
        `;
    }

    // ----- TOAST NOTIFICATION (Fallback if main.js not loaded) -----
    function showToast(message, type = 'info') {
        if (typeof window.showToast === 'function') {
            window.showToast(message, type);
        } else {
            // Fallback inline toast
            const toast = document.createElement('div');
            toast.className = `toast toast-${type}`;
            toast.textContent = message;
            toast.setAttribute('role', 'alert');
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 3000);
        }
    }

    // ----- EXPORT GLOBAL METHODS (for main.js/search integration) -----
    window.filterTools = function (searchTerm) {
        if (searchInput) searchInput.value = searchTerm;
        applyFilters();
    };
    window.toggleFavorite = toggleFavorite;

    // ----- START -----
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();