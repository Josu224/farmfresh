 // Resource data (Nigerian context)
    const resourcesData = [
      // Farming Guides
      {
        id: 1,
        title: "Cassava Farming Guide",
        category: "guides",
        description: "Complete guide to growing cassava in Nigeria: land preparation, planting, pest control, harvesting, and processing.",
        icon: "🌾",
        fileUrl: "/downloads/cassava-farming-guide.pdf",
        fileSize: "2.4 MB",
        author: "IITA Nigeria",
        date: "2025-02-10"
      },
      {
        id: 2,
        title: "Maize Production Manual",
        category: "guides",
        description: "Step-by-step manual for maize farmers: hybrid varieties, fertilizer application, weed control, and post-harvest handling.",
        icon: "🌽",
        fileUrl: "/downloads/maize-production.pdf",
        fileSize: "3.1 MB",
        author: "NAERLS",
        date: "2025-01-15"
      },
      {
        id: 3,
        title: "Tomato Farming in Nigeria",
        category: "guides",
        description: "Best practices for tomato cultivation: nursery management, staking, irrigation, and disease prevention.",
        icon: "🍅",
        fileUrl: "/downloads/tomato-farming.pdf",
        fileSize: "1.8 MB",
        author: "FMARD",
        date: "2024-12-05"
      },
      // Soil Health
      {
        id: 4,
        title: "Soil Testing Guide",
        category: "soil",
        description: "How to collect soil samples, interpret results, and improve soil fertility for Nigerian farms.",
        icon: "🧪",
        fileUrl: "/downloads/soil-testing.pdf",
        fileSize: "1.2 MB",
        author: "Soil Science Society of Nigeria",
        date: "2025-01-20"
      },
      {
        id: 5,
        title: "Organic Fertilizer Recipes",
        category: "soil",
        description: "DIY organic fertilizer formulas using local materials: compost, manure, and green manure techniques.",
        icon: "🌱",
        fileUrl: "/downloads/organic-fertilizer.pdf",
        fileSize: "1.5 MB",
        author: "AGRA Nigeria",
        date: "2024-11-10"
      },
      {
        id: 6,
        title: "Soil pH Management",
        category: "soil",
        description: "Adjusting soil pH for optimal crop growth: liming, sulfur application, and crop selection.",
        icon: "⚖️",
        fileUrl: "/downloads/soil-ph.pdf",
        fileSize: "0.9 MB",
        author: "Nigerian Institute of Soil Science",
        date: "2024-10-22"
      },
      // Pest Management
      {
        id: 7,
        title: "Integrated Pest Management (IPM)",
        category: "pest",
        description: "Eco-friendly pest control strategies for major Nigerian crops: maize, cassava, and vegetables.",
        icon: "🐛",
        fileUrl: "/downloads/ipm-guide.pdf",
        fileSize: "2.2 MB",
        author: "FAO Nigeria",
        date: "2025-02-01"
      },
      {
        id: 8,
        title: "Common Pests of Tomato",
        category: "pest",
        description: "Identification and control of Tuta absoluta, whiteflies, and fruit borers in tomato fields.",
        icon: "🦋",
        fileUrl: "/downloads/tomato-pests.pdf",
        fileSize: "1.7 MB",
        author: "CropLife Nigeria",
        date: "2024-09-18"
      },
      {
        id: 9,
        title: "Natural Pest Repellents",
        category: "pest",
        description: "Using neem, garlic, and chili to make organic pesticides for vegetable gardens.",
        icon: "🌿",
        fileUrl: "/downloads/natural-pesticides.pdf",
        fileSize: "0.8 MB",
        author: "Organic Farmers Association",
        date: "2024-12-15"
      },
      // Sustainable Techniques
      {
        id: 10,
        title: "Drip Irrigation Basics",
        category: "sustainable",
        description: "Setting up low-cost drip irrigation systems for small farms to conserve water.",
        icon: "💧",
        fileUrl: "/downloads/drip-irrigation.pdf",
        fileSize: "2.0 MB",
        author: "IWMI",
        date: "2025-01-05"
      },
      {
        id: 11,
        title: "Agroforestry Practices",
        category: "sustainable",
        description: "Integrating trees with crops for improved soil health, shade, and extra income.",
        icon: "🌳",
        fileUrl: "/downloads/agroforestry.pdf",
        fileSize: "2.5 MB",
        author: "World Agroforestry Centre",
        date: "2024-08-30"
      },
      {
        id: 12,
        title: "Conservation Agriculture",
        category: "sustainable",
        description: "No-till farming, cover cropping, and mulching techniques for Nigerian farmers.",
        icon: "🌍",
        fileUrl: "/downloads/conservation-agriculture.pdf",
        fileSize: "1.9 MB",
        author: "GIZ Nigeria",
        date: "2024-11-12"
      },
      // Market Information
      {
        id: 13,
        title: "2025 Crop Price Outlook",
        category: "market",
        description: "Forecast for maize, rice, cassava, and tomato prices in major Nigerian markets.",
        icon: "📊",
        fileUrl: "/downloads/price-outlook.pdf",
        fileSize: "1.1 MB",
        author: "Nigerian Commodity Exchange",
        date: "2025-02-20"
      },
      {
        id: 14,
        title: "Export Requirements",
        category: "market",
        description: "How to export Nigerian agricultural products: certifications, packaging, and market access.",
        icon: "✈️",
        fileUrl: "/downloads/export-guide.pdf",
        fileSize: "1.6 MB",
        author: "Nigerian Export Promotion Council",
        date: "2024-10-10"
      },
      // Government Programs
      {
        id: 15,
        title: "Agricultural Loan Programs",
        category: "govt",
        description: "List of federal and state government loans for farmers: CBN, BOA, and state agricultural schemes.",
        icon: "💰",
        fileUrl: "/downloads/agri-loans.pdf",
        fileSize: "0.9 MB",
        author: "Ministry of Agriculture",
        date: "2025-01-25"
      },
      {
        id: 16,
        title: "Extension Services Directory",
        category: "govt",
        description: "Contact information for agricultural extension officers in each state of Nigeria.",
        icon: "📞",
        fileUrl: "/downloads/extension-services.pdf",
        fileSize: "1.3 MB",
        author: "NAERLS",
        date: "2024-12-01"
      }
    ];

    let currentResources = [...resourcesData];

    // Function to render resources
    function renderResources(resources) {
      const container = document.getElementById('resources-container');
      if (!container) return;

      if (resources.length === 0) {
        container.innerHTML = `<div class="no-results">No resources found matching your criteria. Try adjusting your search or filter.</div>`;
        return;
      }

      container.innerHTML = resources.map(resource => `
                <div class="resource-card" data-id="${resource.id}" data-category="${resource.category}">
                    <div class="resource-icon">${resource.icon}</div>
                    <div class="resource-content">
                        <span class="resource-category-tag">${getCategoryName(resource.category)}</span>
                        <h3 class="resource-title">${resource.title}</h3>
                        <p class="resource-description">${resource.description}</p>
                        <div class="resource-meta">
                            <span>📄 ${resource.fileSize}</span>
                            <span>👤 ${resource.author}</span>
                        </div>
                        <div class="resource-actions">
                            <button class="btn-sm" onclick="previewResource(${resource.id})">🔍 Preview</button>
                            <button class="btn-sm btn-outline" onclick="downloadResource('${resource.fileUrl}', '${resource.title}')">⬇️ Download</button>
                        </div>
                    </div>
                </div>
            `).join('');
    }

    // Helper to get readable category name
    function getCategoryName(category) {
      const names = {
        'guides': 'Farming Guide',
        'soil': 'Soil Health',
        'pest': 'Pest Management',
        'sustainable': 'Sustainable',
        'market': 'Market Info',
        'govt': 'Government'
      };
      return names[category] || category;
    }

    // Filter resources based on search and category
    function filterResources() {
      const searchTerm = document.getElementById('resource-search')?.value.toLowerCase() || '';
      const category = document.getElementById('category-filter')?.value || 'all';

      let filtered = resourcesData;

      if (searchTerm) {
        filtered = filtered.filter(resource =>
          resource.title.toLowerCase().includes(searchTerm) ||
          resource.description.toLowerCase().includes(searchTerm) ||
          resource.author.toLowerCase().includes(searchTerm)
        );
      }

      if (category !== 'all') {
        filtered = filtered.filter(resource => resource.category === category);
      }

      currentResources = filtered;
      renderResources(filtered);
    }

    // Preview resource (simulate preview - could open modal or PDF viewer)
    function previewResource(id) {
      const resource = resourcesData.find(r => r.id === id);
      if (resource) {
        // In a real implementation, you could open a modal with content preview
        // For now, show an alert with details
        alert(`Preview: ${resource.title}\n\n${resource.description}\n\nFull content available in the PDF.`);
      }
    }

    // Download resource (simulate download)
    function downloadResource(fileUrl, title) {
      // In production, this would trigger actual file download
      // For demo, we'll simulate with a message
      alert(`Downloading "${title}"...\n\nFile will be saved to your device.`);

      // To actually download, you could use:
      // const link = document.createElement('a');
      // link.href = fileUrl;
      // link.download = title.replace(/\s/g, '_') + '.pdf';
      // link.click();
    }

    // Download bundle (all resources in one zip - simulated)
    function downloadBundle() {
      alert("Your Nigerian Farming Starter Kit is being prepared. You'll receive an email with download link shortly.");
    }

    // Event listeners
    document.addEventListener('DOMContentLoaded', function () {
      renderResources(resourcesData);

      const searchInput = document.getElementById('resource-search');
      const searchBtn = document.getElementById('search-resources-btn');
      const categorySelect = document.getElementById('category-filter');

      if (searchInput) {
        searchInput.addEventListener('input', filterResources);
      }
      if (searchBtn) {
        searchBtn.addEventListener('click', filterResources);
      }
      if (categorySelect) {
        categorySelect.addEventListener('change', filterResources);
      }
    });