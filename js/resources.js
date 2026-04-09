/**
 * ============================================
 * FARM FRESH NIGERIA - RESOURCES.JS
 * Educational resources with search, filter, and PDF download
 * ============================================
 */

(function () {
  'use strict';

  // ----- RESOURCE DATA (Nigerian farming context) -----
  const resourcesData = [
    // Farming Guides
    {
      id: 1,
      title: "Cassava Farming Guide",
      category: "guides",
      description: "Complete guide to growing cassava in Nigeria: land preparation, planting, pest control, harvesting, and processing.",
      icon: "🌾",
      fileSize: "2.4 MB",
      author: "IITA Nigeria",
      date: "2025-02-10",
      fullContent: `Cassava (Manihot esculenta) is a major staple crop in Nigeria. This guide provides step-by-step instructions for successful cassava production.

1. LAND PREPARATION
- Clear vegetation and plow to 20-25cm depth.
- Create ridges or mounds spaced 1m apart.

2. PLANTING MATERIALS
- Use healthy stems from mature plants (8-12 months old).
- Cut into 25cm stakes with 5-7 nodes.

3. PLANTING
- Plant stakes at 45° angle, leaving 2-3 nodes above ground.
- Space 1m x 1m. Best planted at start of rainy season (April-May).

4. FERTILIZER APPLICATION
- Apply NPK 15:15:15 at 400kg per hectare at planting.
- Top dress with urea at 2-3 months after planting.

5. WEED CONTROL
- Keep field weed-free for first 3-4 months.
- Weed at 4 and 8 weeks after planting.

6. HARVESTING
- Harvest 9-12 months after planting when leaves begin to yellow.
- Use cutlass or mechanical harvester for larger farms.`
    },
    {
      id: 2,
      title: "Maize Production Manual",
      category: "guides",
      description: "Step-by-step manual for maize farmers: hybrid varieties, fertilizer application, weed control, and post-harvest handling.",
      icon: "🌽",
      fileSize: "3.1 MB",
      author: "NAERLS",
      date: "2025-01-15",
      fullContent: `Maize (Zea mays) is a key cereal crop in Nigeria. Follow these practices for high yields.

1. LAND PREPARATION
- Plow to 20-25cm depth, harrow to fine tilth.
- Create ridges 75cm apart.

2. PLANTING
- Plant 2-3 seeds per hole, 3-5cm deep.
- Space 75cm between rows, 25cm within rows.
- Plant with first rains (March-April or August-September).

3. FERTILIZER
- Apply NPK 15:15:15 at planting (200kg/hectare).
- Top dress with urea at 4-6 weeks after planting.

4. WEED CONTROL
- Keep weed-free for first 6 weeks.
- Use pre-emergence herbicides like Atrazine.

5. PEST MANAGEMENT
- Watch for stem borers and fall armyworm.
- Use recommended pesticides or natural control.

6. HARVESTING
- Harvest when cobs are dry and husks turn brown (3-4 months).
- Dry to 14% moisture before storage.`
    },
    {
      id: 3,
      title: "Tomato Farming in Nigeria",
      category: "guides",
      description: "Best practices for tomato cultivation: nursery management, staking, irrigation, and disease prevention.",
      icon: "🍅",
      fileSize: "1.8 MB",
      author: "FMARD",
      date: "2024-12-05",
      fullContent: `Tomato (Solanum lycopersicum) is a high-value vegetable. This guide covers nursery to harvest.

1. NURSERY PREPARATION
- Prepare fine seedbed with well-rotted manure.
- Sow seeds in rows 10cm apart, cover lightly.

2. TRANSPLANTING
- Transplant 4-6 week old seedlings (4-6 leaves).
- Space 60cm between rows, 45cm within rows.

3. STAKING
- Install stakes within 2 weeks of transplanting.
- Tie stems loosely as plants grow.

4. WATER MANAGEMENT
- Water regularly but avoid wetting leaves.
- Use drip irrigation if possible. Mulch to conserve moisture.

5. PEST AND DISEASE CONTROL
- Watch for tomato leaf miner, whiteflies, and blight.
- Practice crop rotation and use recommended pesticides.

6. HARVESTING
- Start harvesting 60-80 days after transplanting.
- Pick at breaker stage for longer shelf life.`
    },
    {
      id: 4,
      title: "Yam Cultivation Guide",
      category: "guides",
      description: "Traditional and modern yam farming techniques for higher yields in Nigeria.",
      icon: "🌱",
      fileSize: "2.0 MB",
      author: "NRCRI",
      date: "2025-01-05",
      fullContent: `Yam (Dioscorea spp.) is a culturally important crop. This guide covers best practices.

1. SEED SELECTION
- Use healthy yam sets or small whole tubers (200-300g).
- Select disease-free material.

2. LAND PREPARATION
- Create mounds or ridges 1m apart.
- Add well-decomposed manure.

3. PLANTING
- Plant at beginning of rainy season (March-April).
- Place seed yam on mound and cover with 5-10cm soil.

4. STAKING
- Provide stakes 2-3m tall for vines to climb.
- Stake within 4-6 weeks after planting.

5. MAINTENANCE
- Mulch around plants to retain moisture.
- Weed regularly. Apply fertilizer 6-8 weeks after planting.

6. HARVESTING
- Harvest 7-9 months after planting when leaves turn yellow.
- Carefully dig around mounds to avoid damaging tubers.`
    },
    // Soil Health
    {
      id: 5,
      title: "Soil Testing Guide",
      category: "soil",
      description: "How to collect soil samples, interpret results, and improve soil fertility for Nigerian farms.",
      icon: "🧪",
      fileSize: "1.2 MB",
      author: "Soil Science Society of Nigeria",
      date: "2025-01-20",
      fullContent: `Soil testing is essential for optimal crop production.

1. SAMPLING
- Collect samples from 10-15 spots per field.
- Take from 0-20cm depth for plow layer.

2. SAMPLE PREPARATION
- Air dry and crush lumps.
- Send to accredited laboratory.

3. INTERPRETING RESULTS
- pH: 6.0-6.5 is ideal for most crops.
- Organic matter: >2% is good.
- N,P,K levels: Follow fertilizer recommendations.

4. IMPROVING SOIL
- Add lime if pH is low.
- Use organic manure to boost organic matter.
- Apply specific fertilizers based on deficiencies.`
    },
    {
      id: 6,
      title: "Compost Making for Smallholders",
      category: "soil",
      description: "Turn farm waste into rich organic fertilizer with simple composting methods.",
      icon: "♻️",
      fileSize: "1.5 MB",
      author: "Nigerian Organic Agriculture Network",
      date: "2024-11-10",
      fullContent: `Composting recycles organic waste into valuable soil amendment.

1. MATERIALS
- Green materials: fresh leaves, grass clippings, kitchen scraps.
- Brown materials: dry leaves, straw, sawdust.

2. BUILDING THE PILE
- Layer green and brown materials alternately.
- Keep pile moist but not soggy.
- Turn every 2-3 weeks for aeration.

3. MATURITY
- Compost is ready in 2-4 months when dark, crumbly, and earthy-smelling.

4. APPLICATION
- Mix into soil before planting or use as mulch.`
    },
    // Pest Management
    {
      id: 7,
      title: "Integrated Pest Management (IPM)",
      category: "pest",
      description: "Eco-friendly pest control strategies for major Nigerian crops.",
      icon: "🐛",
      fileSize: "2.2 MB",
      author: "FAO Nigeria",
      date: "2025-02-01",
      fullContent: `IPM combines biological, cultural, and chemical methods.

1. PREVENTION
- Use resistant varieties.
- Rotate crops to break pest cycles.
- Maintain field hygiene.

2. MONITORING
- Scout fields weekly for pests.
- Use pheromone traps for moths.

3. BIOLOGICAL CONTROL
- Encourage natural predators (ladybugs, parasitic wasps).
- Apply neem oil or Bacillus thuringiensis.

4. CHEMICAL CONTROL
- Use pesticides only when thresholds are exceeded.
- Rotate chemical classes to prevent resistance.`
    },
    {
      id: 8,
      title: "Fall Armyworm Management",
      category: "pest",
      description: "Identification and control of fall armyworm in maize and other cereals.",
      icon: "🦋",
      fileSize: "1.9 MB",
      author: "IITA",
      date: "2025-03-01",
      fullContent: `Fall armyworm (Spodoptera frugiperda) is a devastating pest.

1. IDENTIFICATION
- Look for windowing on leaves, frass in whorl.
- Larvae have inverted Y on head.

2. MONITORING
- Scout 20 plants per field weekly.
- Use pheromone traps to detect moth flights.

3. CONTROL
- Hand-pick and destroy egg masses and young larvae.
- Apply neem extract or Bt products.
- Use recommended insecticides only when thresholds exceeded.`
    },
    // Sustainable Techniques
    {
      id: 9,
      title: "Conservation Agriculture",
      category: "sustainable",
      description: "Principles and practices of conservation agriculture for Nigerian smallholders.",
      icon: "🌍",
      fileSize: "2.8 MB",
      author: "FAO",
      date: "2024-10-20",
      fullContent: `Conservation Agriculture (CA) is based on three principles:

1. MINIMUM SOIL DISTURBANCE
- Use direct seeding or minimum tillage.
- Avoid plowing unless necessary.

2. PERMANENT SOIL COVER
- Keep soil covered with crop residues or cover crops.
- Reduces erosion and conserves moisture.

3. CROP ROTATION
- Rotate cereals with legumes.
- Breaks pest cycles and improves soil fertility.

Benefits: higher yields, lower costs, improved soil health.`
    },
    {
      id: 10,
      title: "Agroforestry Practices",
      category: "sustainable",
      description: "Integrating trees with crops and livestock for multiple benefits.",
      icon: "🌳",
      fileSize: "3.0 MB",
      author: "ICRAF",
      date: "2025-01-25",
      fullContent: `Agroforestry systems suitable for Nigeria:

1. ALLEY CROPPING
- Plant rows of nitrogen-fixing trees (e.g., Leucaena) between crop rows.
- Prune trees for mulch and green manure.

2. HOMEGARDENS
- Mix fruit trees, vegetables, and medicinal plants around homestead.

3. SILVOPASTURE
- Combine trees with pasture for livestock.

Benefits: improved soil fertility, additional income from tree products, microclimate regulation.`
    },
    // Market Information
    {
      id: 11,
      title: "Nigerian Agricultural Commodity Prices",
      category: "market",
      description: "Weekly price updates for major crops across Nigerian markets.",
      icon: "📊",
      fileSize: "0.8 MB",
      author: "FMARD Market Intelligence",
      date: "2026-04-01",
      fullContent: `Current average wholesale prices (₦/kg):

Maize: 350 - 420
Cassava (fresh): 120 - 150
Yam: 400 - 550
Tomatoes: 300 - 450
Rice (paddy): 280 - 320

Prices vary by location and season. Contact your local extension agent for updated prices.`
    },
    {
      id: 12,
      title: "Export Opportunities for Nigerian Farmers",
      category: "market",
      description: "Guide to exporting agricultural products to regional and international markets.",
      icon: "✈️",
      fileSize: "1.7 MB",
      author: "NEPC",
      date: "2025-02-15",
      fullContent: `Key export crops with high demand:

1. SESAME SEEDS
- Major markets: Japan, China, Turkey.
- Requirements: 99% purity, low moisture.

2. GINGER
- Demand from Europe and Asia.
- Must be properly dried and cleaned.

3. CASHEW NUTS
- Export to Vietnam and India for processing.

4. COCOA BEANS
- Nigeria is a major producer; focus on quality fermentation.

Export procedures: obtain NEPC registration, phytosanitary certificate, and meet buyer specifications.`
    },
    // Government Programs
    {
      id: 13,
      title: "Anchor Borrowers' Programme",
      category: "govt",
      description: "Overview of CBN's Anchor Borrowers' Programme for smallholder farmers.",
      icon: "🏦",
      fileSize: "1.3 MB",
      author: "Central Bank of Nigeria",
      date: "2025-01-10",
      fullContent: `The Anchor Borrowers' Programme (ABP) provides loans to smallholder farmers.

1. ELIGIBILITY
- Must be in a registered cooperative.
- Engage in selected commodities (rice, maize, cotton, etc.).

2. LOAN DETAILS
- Single-digit interest rate (9%).
- Repayment with harvested produce.

3. HOW TO APPLY
- Join a cooperative.
- Register with your state's agricultural development program.
- Link with an anchor processor.`
    },
    {
      id: 14,
      title: "NAADS Extension Services",
      category: "govt",
      description: "How to access free agricultural extension services in your state.",
      icon: "👨‍🌾",
      fileSize: "0.9 MB",
      author: "Federal Ministry of Agriculture",
      date: "2024-12-01",
      fullContent: `Agricultural extension agents provide free advice to farmers.

1. SERVICES OFFERED
- Crop production techniques.
- Pest and disease identification.
- Soil testing recommendations.
- Market linkages.

2. HOW TO CONTACT
- Visit your Local Government Area agricultural office.
- Call state ADP hotline.
- Attend farmer field schools in your community.`
    }
  ];

  // ----- DOM ELEMENTS -----
  const container = document.getElementById('resources-container');
  const searchInput = document.getElementById('resource-search');
  const searchBtn = document.getElementById('search-resources-btn');
  const categorySelect = document.getElementById('category-filter');
  const bundleBtn = document.getElementById('download-bundle-btn');

  // ----- RENDER RESOURCES -----
  function renderResources(resources) {
    if (!container) return;

    if (!resources.length) {
      container.innerHTML = '<p class="no-results">📭 No resources found. Try adjusting your search or filter.</p>';
      return;
    }

    const html = resources.map(res => `
      <div class="resource-card" data-resource-id="${res.id}">
        <div class="resource-icon">${res.icon}</div>
        <div class="resource-content">
          <span class="resource-category-tag">${getCategoryName(res.category)}</span>
          <h3 class="resource-title">${res.title}</h3>
          <p class="resource-description">${res.description}</p>
          <div class="resource-meta">
            <span>📄 ${res.fileSize}</span>
            <span>👤 ${res.author}</span>
          </div>
          <div class="resource-actions">
            <button class="btn-small preview-btn" data-id="${res.id}">🔍 Preview</button>
            <button class="btn-small btn-outline download-btn" data-id="${res.id}">⬇️ PDF</button>
          </div>
        </div>
      </div>
    `).join('');

    container.innerHTML = html;
  }

  function getCategoryName(cat) {
    const map = {
      guides: '📘 Farming Guide',
      soil: '🌱 Soil Health',
      pest: '🐞 Pest Management',
      sustainable: '♻️ Sustainable',
      market: '💰 Market Info',
      govt: '🏛️ Government'
    };
    return map[cat] || cat;
  }

  // ----- FILTER LOGIC -----
  function filterResources() {
    const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : '';
    const category = categorySelect ? categorySelect.value : 'all';

    let filtered = resourcesData;

    if (searchTerm) {
      filtered = filtered.filter(r =>
        r.title.toLowerCase().includes(searchTerm) ||
        r.description.toLowerCase().includes(searchTerm) ||
        r.author.toLowerCase().includes(searchTerm)
      );
    }

    if (category !== 'all') {
      filtered = filtered.filter(r => r.category === category);
    }

    renderResources(filtered);
  }

  // ----- PDF GENERATION (using jsPDF) -----
  async function generatePDF(resource) {
    // Ensure jsPDF is available
    if (typeof window.jspdf === 'undefined') {
      showToast('Loading PDF generator...', 'info');
      await new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        script.onload = resolve;
        document.head.appendChild(script);
      });
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.setTextColor(46, 125, 50); // primary green
    doc.text(resource.title, 20, 20);

    // Meta
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Author: ${resource.author} | Date: ${resource.date} | Size: ${resource.fileSize}`, 20, 30);

    // Description
    doc.setFontSize(12);
    doc.setTextColor(0);
    const descLines = doc.splitTextToSize(resource.description, 170);
    doc.text(descLines, 20, 45);

    // Full content
    let y = 65;
    const content = resource.fullContent || resource.description;
    const contentLines = doc.splitTextToSize(content, 170);
    for (let line of contentLines) {
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
      doc.text(line, 20, y);
      y += 7;
    }

    // Save
    doc.save(`${resource.title.replace(/\s+/g, '_')}.pdf`);
    showToast(`📄 "${resource.title}" downloaded!`, 'success');
  }

  // ----- PREVIEW MODAL (simple) -----
  function previewResource(resource) {
    // Create a modal or use alert for simplicity (we'll use a nicer approach)
    const modal = document.createElement('div');
    modal.className = 'preview-modal';
    modal.innerHTML = `
      <div class="preview-modal-content">
        <span class="close-modal">&times;</span>
        <h2>${resource.icon} ${resource.title}</h2>
        <p class="preview-meta">${resource.author} | ${resource.date} | ${resource.fileSize}</p>
        <div class="preview-body">
          <p>${resource.description}</p>
          <hr>
          <pre style="white-space: pre-wrap; font-family: inherit;">${resource.fullContent?.substring(0, 500)}...</pre>
        </div>
        <button class="btn download-from-preview" data-id="${resource.id}">⬇️ Download Full PDF</button>
      </div>
    `;

    // Style dynamically if not in main CSS
    modal.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center;
      z-index: 1000;
    `;
    const contentDiv = modal.querySelector('.preview-modal-content');
    contentDiv.style.cssText = `
      background: white; padding: 30px; border-radius: 16px; max-width: 700px;
      max-height: 80vh; overflow-y: auto; position: relative;
    `;

    document.body.appendChild(modal);

    // Close handlers
    modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
    modal.querySelector('.download-from-preview').addEventListener('click', () => {
      generatePDF(resource);
      modal.remove();
    });
  }

  // ----- BUNDLE DOWNLOAD (generates actual PDF) -----
  async function downloadBundle() {
    showToast('📦 Preparing your Nigerian Farming Starter Kit...', 'info');

    // Ensure jsPDF is available
    if (typeof window.jspdf === 'undefined') {
      await new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        script.onload = resolve;
        document.head.appendChild(script);
      });
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // ---- Cover Page ----
    doc.setFontSize(24);
    doc.setTextColor(46, 125, 50);
    doc.text('Farm Fresh Nigeria', 20, 30);
    doc.setFontSize(18);
    doc.setTextColor(0);
    doc.text('Nigerian Farming Starter Kit', 20, 45);
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text('Planting calendars • Pest control charts • Market price tracker', 20, 60);
    doc.text(`Generated: ${new Date().toLocaleDateString('en-NG')}`, 20, 75);

    // Add a simple line
    doc.setDrawColor(255, 143, 0);
    doc.line(20, 85, 190, 85);

    // ---- Selected Resources (first few from each category) ----
    const selectedResources = [
      resourcesData.find(r => r.id === 1), // Cassava
      resourcesData.find(r => r.id === 5), // Soil Testing
      resourcesData.find(r => r.id === 7), // IPM
      resourcesData.find(r => r.id === 11) // Market Prices
    ].filter(Boolean);

    let y = 100;

    selectedResources.forEach((resource, index) => {
      // Add new page for each resource except first
      if (index > 0) {
        doc.addPage();
        y = 20;
      }

      doc.setFontSize(16);
      doc.setTextColor(46, 125, 50);
      doc.text(`${resource.icon} ${resource.title}`, 20, y);
      y += 10;

      doc.setFontSize(11);
      doc.setTextColor(100);
      doc.text(`Author: ${resource.author} | Size: ${resource.fileSize}`, 20, y);
      y += 10;

      doc.setFontSize(12);
      doc.setTextColor(0);
      const descLines = doc.splitTextToSize(resource.description, 170);
      doc.text(descLines, 20, y);
      y += descLines.length * 7 + 5;

      // Add a portion of full content (first ~800 chars)
      const contentPreview = resource.fullContent.substring(0, 800) + '... (full guide available on Farm Fresh Nigeria)';
      const contentLines = doc.splitTextToSize(contentPreview, 170);
      doc.text(contentLines, 20, y);
      y += contentLines.length * 7;

      // Add a separator line
      if (index < selectedResources.length - 1) {
        doc.setDrawColor(200);
        doc.line(20, y + 5, 190, y + 5);
      }
    });

    // Final page with website info
    doc.addPage();
    doc.setFontSize(18);
    doc.setTextColor(46, 125, 50);
    doc.text('Visit Farm Fresh Nigeria', 20, 30);
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('www.farmfresh.ng', 20, 45);
    doc.text('Abuja, Nigeria | +234 803 000 0000', 20, 55);

    // Save the PDF
    doc.save('FarmFresh_Nigeria_Starter_Kit.pdf');
    showToast('✅ Bundle downloaded! Check your downloads folder.', 'success');
  }

  // ----- TOAST NOTIFICATION (uses main.js) -----
  function showToast(message, type = 'info') {
    if (typeof window.showNotification === 'function') {
      window.showNotification(message, type);
    } else {
      console.warn('showNotification not available', message);
    }
  }

  // ----- EVENT LISTENERS (Delegation) -----
  function attachEventListeners() {
    if (searchInput) {
      searchInput.addEventListener('input', filterResources);
    }
    if (searchBtn) {
      searchBtn.addEventListener('click', filterResources);
    }
    if (categorySelect) {
      categorySelect.addEventListener('change', filterResources);
    }
    if (bundleBtn) {
      bundleBtn.addEventListener('click', downloadBundle);
    }

    // Event delegation for preview and download buttons
    if (container) {
      container.addEventListener('click', (e) => {
        const previewBtn = e.target.closest('.preview-btn');
        const downloadBtn = e.target.closest('.download-btn');

        if (previewBtn) {
          const id = parseInt(previewBtn.dataset.id);
          const resource = resourcesData.find(r => r.id === id);
          if (resource) previewResource(resource);
        }

        if (downloadBtn) {
          const id = parseInt(downloadBtn.dataset.id);
          const resource = resourcesData.find(r => r.id === id);
          if (resource) generatePDF(resource);
        }
      });
    }
  }

  // ----- INITIALIZATION -----
  function init() {
    renderResources(resourcesData);
    attachEventListeners();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();