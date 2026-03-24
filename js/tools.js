// ===== TOOLS PAGE SPECIFIC JAVASCRIPT =====

// Sample tools data with Nigerian context – price as number (in Naira)
const toolsData = [
    {
        id: 1,
        name: "Massey Ferguson Tractor",
        category: "tractors",
        price: 45000,          // per day
        priceUnit: "/day",
        supplier: "Abuja Agro Services",
        location: "Abuja",
        image: "images/tractor.jpg",
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
        image: "images/cassava.jpg",
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
        image: "images/Knapsack.jpg",
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
        description: "Motorized maize sheller - processes 2 tons per day",
        stock: 4
    }
];

// Initialize tools page
document.addEventListener('DOMContentLoaded', function() {
    displayTools(toolsData);
    initToolFilters();
    loadFavoritesForTools();
    
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    if (searchQuery) {
        document.getElementById('tool-search').value = searchQuery;
        filterTools(searchQuery);
    }
});

// Display tools in grid
function displayTools(tools) {
    const container = document.getElementById('tools-container');
    if (!container) return;
    
    if (tools.length === 0) {
        container.innerHTML = '<p class="no-results">No tools found matching your criteria. Try adjusting your filters.</p>';
        return;
    }
    
    container.innerHTML = tools.map(tool => `
        <div class="tool-card" data-id="${tool.id}">
            <div class="tool-image" style="background-image: url('${tool.image}')">
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
                <div class="tool-stock">${tool.stock > 0 ? `In stock (${tool.stock})` : 'Out of stock'}</div>
                <div class="tool-actions" style="display: flex; gap: 10px; margin-top: 15px;">
                    ${tool.stock > 0 ? `
                        <button class="add-to-cart-btn" 
                            data-id="${tool.id}" 
                            data-name="${tool.name}" 
                            data-price="${tool.price}" 
                            data-unit="${tool.priceUnit}" 
                            data-image="${tool.image}">
                            🛒 Add to Cart
                        </button>
                    ` : '<button class="disabled-btn" disabled>Sold Out</button>'}
                    <button class="favorite-btn" data-id="${tool.id}">☆ Save</button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Add event listeners for add-to-cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        if (btn.disabled) return;
        btn.addEventListener('click', () => {
            const product = {
                id: parseInt(btn.dataset.id),
                name: btn.dataset.name,
                price: parseFloat(btn.dataset.price),
                priceUnit: btn.dataset.unit,
                image: btn.dataset.image,
                quantity: 1
            };
            addToCart(product);
        });
    });
    
    // Re-initialize favorite buttons
    initFavorites();
}

// Initialize filters
function initToolFilters() {
    const searchInput = document.getElementById('tool-search');
    const categoryFilter = document.getElementById('category-filter');
    const locationFilter = document.getElementById('location-filter');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterTools(this.value, categoryFilter?.value, locationFilter?.value);
        });
    }
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            filterTools(searchInput?.value, this.value, locationFilter?.value);
        });
    }
    if (locationFilter) {
        locationFilter.addEventListener('change', function() {
            filterTools(searchInput?.value, categoryFilter?.value, this.value);
        });
    }
}

// Filter tools based on criteria
function filterTools(searchTerm = '', category = 'all', location = 'all') {
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
    
    displayTools(filtered);
}

// Load and display favorites
function loadFavoritesForTools() {
    const favorites = JSON.parse(localStorage.getItem('farmFreshNigeriaFavorites')) || [];
    const favoriteTools = toolsData.filter(tool => favorites.includes(tool.id.toString()));
    const favSection = document.getElementById('favorite-tools');
    if (favSection && favoriteTools.length > 0) {
        favSection.innerHTML = '<h2>Your Saved Tools</h2>';
        displayTools(favoriteTools);
    }
}

// Export for use in main.js
window.filterTools = filterTools;