/**
 * ============================================
 * FARM FRESH NIGERIA - GUIDES.JS
 * Plant care guides with search and accordion
 * ============================================
 */

(function () {
    'use strict';

    // ----- GUIDES DATA (Nigerian Crops) -----
    const guidesData = [
        {
            id: 1,
            crop: "Cassava",
            icon: "🥔",
            season: "Plant at start of rainy season (April–May)",
            steps: [
                { title: "Land Preparation", description: "Clear vegetation and plow to 20–25 cm depth. Create ridges or mounds spaced 1 m apart. Cassava grows best in well‑drained sandy loam soil." },
                { title: "Planting Material", description: "Use healthy, mature stems (8–12 months old). Cut into 25 cm stakes with 5–7 nodes each." },
                { title: "Planting", description: "Plant stakes at 45° angle, leaving 2–3 nodes above ground. Spacing: 1 m × 1 m. Best planted at the start of the rainy season (April–May)." },
                { title: "Fertilizer", description: "Apply NPK 15:15:15 at 400 kg per hectare at planting. Top‑dress with urea at 2–3 months after planting." },
                { title: "Weed Control", description: "Keep field weed‑free for the first 3–4 months. Weed at 4 and 8 weeks after planting. Use pre‑emergence herbicides if needed." },
                { title: "Harvesting", description: "Harvest 9–12 months after planting when leaves begin to yellow. Use a cutlass or a mechanical harvester." }
            ],
            image: "images/cassava-plant.jpg",
            fallbackImage: "images/placeholder-cassava.jpg"
        },
        {
            id: 2,
            crop: "Yam",
            icon: "🌱",
            season: "Plant March–April with first rains",
            steps: [
                { title: "Seed Selection", description: "Use healthy yam sets or small whole tubers (200–300 g). Select disease‑free material from reputable sources." },
                { title: "Land Preparation", description: "Create mounds or ridges 1 m apart. Yam prefers loose, well‑drained soil. Add well‑decomposed manure to mounds." },
                { title: "Planting", description: "Plant at the beginning of the rainy season (March–April). Place seed yam on the mound and cover with 5–10 cm of soil." },
                { title: "Staking", description: "Provide stakes 2–3 m tall for yam vines to climb. Stake within 4–6 weeks after planting." },
                { title: "Maintenance", description: "Mulch around plants to retain moisture. Weed regularly. Apply fertilizer 6–8 weeks after planting." },
                { title: "Harvesting", description: "Harvest 7–9 months after planting when leaves turn yellow. Carefully dig around mounds to avoid damaging tubers." }
            ],
            image: "images/yam.jpg",
            fallbackImage: "images/placeholder-yam.jpg"
        },
        {
            id: 3,
            crop: "Maize",
            icon: "🌽",
            season: "Plant March–April or August–September",
            steps: [
                { title: "Land Preparation", description: "Plow to 20–25 cm depth, then harrow to create a fine seedbed. Create ridges 75 cm apart for better drainage." },
                { title: "Planting", description: "Plant 2–3 seeds per hole at 3–5 cm depth. Spacing: 75 cm between rows, 25 cm within rows. Plant with the first rains." },
                { title: "Fertilizer", description: "Apply NPK 15:15:15 at planting (200 kg/hectare). Top‑dress with urea at 4–6 weeks after planting." },
                { title: "Weed Control", description: "Keep weed‑free for the first 6 weeks. Use pre‑emergence herbicides like Atrazine. Hand‑weed as needed." },
                { title: "Pest Management", description: "Watch for stem borers and fall armyworm. Use recommended pesticides or natural control methods (e.g., neem)." },
                { title: "Harvesting", description: "Harvest when cobs are dry and husks turn brown (3–4 months after planting). Dry to 14% moisture before storage." }
            ],
            image: "images/maize.jpg",
            fallbackImage: "images/placeholder-maize.jpg"
        },
        {
            id: 4,
            crop: "Rice (Lowland)",
            icon: "🍚",
            season: "Nursery 2–3 weeks before rains",
            steps: [
                { title: "Nursery Preparation", description: "Prepare a seedbed of 500 m² per hectare of main field. Sow pre‑germinated seeds 2–3 weeks before transplanting." },
                { title: "Land Preparation", description: "Puddle the soil to 15–20 cm depth. Level the field for even water distribution. Construct bunds to retain water." },
                { title: "Transplanting", description: "Transplant 21–25 day old seedlings. Plant 2–3 seedlings per hill, spaced 20 cm × 20 cm. Transplant during cool hours." },
                { title: "Water Management", description: "Maintain 5–7 cm water depth during the vegetative stage. Drain the field 2 weeks before harvest." },
                { title: "Fertilizer", description: "Apply NPK at transplanting. Top‑dress with urea at tillering and panicle initiation stages." },
                { title: "Harvesting", description: "Harvest when 80–85% of grains are straw‑coloured (4–5 months after planting). Thresh and dry to 14% moisture." }
            ],
            image: "images/rice.jpg",
            fallbackImage: "images/placeholder-rice.jpg"
        },
        {
            id: 5,
            crop: "Tomatoes",
            icon: "🍅",
            season: "Start nursery 4–6 weeks before rains end",
            steps: [
                { title: "Nursery Preparation", description: "Prepare a fine seedbed with well‑rotted manure. Sow seeds in rows 10 cm apart. Cover lightly and mulch." },
                { title: "Transplanting", description: "Transplant 4–6 week old seedlings when they have 4–6 leaves. Spacing: 60 cm between rows, 45 cm within rows." },
                { title: "Staking", description: "Install stakes or trellises within 2 weeks of transplanting. Train plants and tie loosely as they grow." },
                { title: "Water Management", description: "Water regularly but avoid wetting leaves. Use drip irrigation if possible. Mulch to conserve moisture." },
                { title: "Pest & Disease Control", description: "Watch for tomato leaf miner, whiteflies, and blight. Practice crop rotation and use recommended pesticides." },
                { title: "Harvesting", description: "Start harvesting 60–80 days after transplanting. Pick at the breaker stage (light red) for longer shelf life." }
            ],
            image: "images/tomatoes.jpg",
            fallbackImage: "images/placeholder-tomato.jpg"
        },
        {
            id: 6,
            crop: "Beans (Cowpea)",
            icon: "🫘",
            season: "Plant with first rains",
            steps: [
                { title: "Land Preparation", description: "Plow to 15–20 cm depth. Beans prefer well‑drained sandy loam with pH 6.0–6.5." },
                { title: "Planting", description: "Sow 2–3 seeds per hole at 3–5 cm depth. Spacing: 60 cm between rows, 20 cm within rows." },
                { title: "Inoculation", description: "Treat seeds with rhizobium bacteria to enhance nitrogen fixation (especially if beans are new to the field)." },
                { title: "Fertilizer", description: "Apply a small amount of phosphorus (SSP) at planting. Avoid excess nitrogen." },
                { title: "Pest Control", description: "Watch for aphids, thrips, and pod borers. Use neem oil or recommended insecticides." },
                { title: "Harvesting", description: "Harvest green pods 60–70 days after planting for fresh consumption. For dry beans, wait until pods are dry and brown (90–100 days)." }
            ],
            image: "images/beans.jpg",
            fallbackImage: "images/placeholder-beans.jpg"
        },
        {
            id: 7,
            crop: "Groundnuts (Peanuts)",
            icon: "🥜",
            season: "Plant at start of rainy season",
            steps: [
                { title: "Land Preparation", description: "Plow to 15–20 cm depth. Create ridges or flat beds. Groundnuts prefer light, well‑drained soil." },
                { title: "Seed Selection", description: "Use certified, disease‑free seeds. Remove any shrivelled or damaged kernels." },
                { title: "Planting", description: "Sow seeds at 5–7 cm depth. Spacing: 60 cm between rows, 15 cm within rows." },
                { title: "Fertilizer", description: "Apply SSP or NPK 15:15:15 at planting (150–200 kg/hectare). Avoid high nitrogen." },
                { title: "Weed & Pest Control", description: "Keep weed‑free for the first 6 weeks. Watch for leaf spots and rosette virus – use resistant varieties." },
                { title: "Harvesting", description: "Harvest when 70–80% of pods are mature and the inside of the shell shows dark veining (90–120 days)." }
            ],
            image: "images/groundnuts.jpg",
            fallbackImage: "images/placeholder-groundnut.jpg"
        },
        {
            id: 8,
            crop: "Okra",
            icon: "🌿",
            season: "Plant after danger of frost has passed",
            steps: [
                { title: "Land Preparation", description: "Plow to 20 cm depth and harrow. Create ridges or flat beds. Okra grows well in many soil types." },
                { title: "Planting", description: "Sow 2–3 seeds per hole at 2–3 cm depth. Spacing: 60 cm between rows, 30 cm within rows. Thin to one plant per stand after emergence." },
                { title: "Fertilizer", description: "Apply NPK 15:15:15 at 200 kg/hectare at planting. Top‑dress with urea 4 weeks later." },
                { title: "Watering", description: "Water regularly, especially during flowering and pod formation. Drip irrigation is ideal." },
                { title: "Pest Control", description: "Watch for aphids, whiteflies, and okra mosaic virus. Use insecticidal soap or neem oil." },
                { title: "Harvesting", description: "Start harvesting 50–60 days after planting. Pick pods when they are 5–8 cm long (tender). Harvest every 2–3 days." }
            ],
            image: "images/okra.jpg",
            fallbackImage: "images/placeholder-okra.jpg"
        }
    ];

    // ----- DOM ELEMENTS -----
    const container = document.getElementById('guides-container');
    const searchInput = document.getElementById('guide-search');
    let debounceTimer = null;

    // ----- RENDER GUIDES WITH ACCORDION -----
    function renderGuides(guides) {
        if (!container) return;

        if (!guides || guides.length === 0) {
            container.innerHTML = `<p class="no-results">🌾 No guides match your search. Try a different crop name.</p>`;
            return;
        }

        const html = guides.map(guide => {
            const stepsHtml = guide.steps.map((step, idx) => `
                <div class="guide-step">
                    <div class="step-number">${idx + 1}</div>
                    <div class="step-content">
                        <h3>${step.title}</h3>
                        <p>${step.description}</p>
                    </div>
                </div>
            `).join('');

            return `
                <div class="guide-section" data-guide-id="${guide.id}">
                    <div class="guide-header" role="button" tabindex="0" aria-expanded="false" aria-controls="guide-content-${guide.id}">
                        <h2>${guide.icon} ${guide.crop} Growing Guide</h2>
                        <span class="arrow" aria-hidden="true">▶</span>
                    </div>
                    <div class="guide-content" id="guide-content-${guide.id}" aria-hidden="true">
                        <div class="guide-body">
                            <img class="guide-image" 
                                 src="${guide.image}" 
                                 alt="${guide.crop} field" 
                                 data-fallback="${guide.fallbackImage || 'images/placeholder-crop.jpg'}"
                                 loading="lazy"
                                 onerror="this.onerror=null; this.src=this.dataset.fallback;">
                            <p class="guide-season"><strong>📅 Best Planting Time:</strong> ${guide.season}</p>
                            ${stepsHtml}
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = html;

        // Handle image errors via dataset fallback (inline onerror is okay here)
        // We'll also attach accordion behavior via event delegation
    }

    // ----- ACCORDION TOGGLE (Event Delegation) -----
    function handleAccordionClick(e) {
        const header = e.target.closest('.guide-header');
        if (!header) return;

        e.preventDefault();
        const section = header.closest('.guide-section');
        const content = section.querySelector('.guide-content');
        const arrow = header.querySelector('.arrow');
        const isExpanded = header.getAttribute('aria-expanded') === 'true';

        // Toggle current
        header.setAttribute('aria-expanded', !isExpanded);
        content.setAttribute('aria-hidden', isExpanded);
        content.classList.toggle('show', !isExpanded);
        if (arrow) {
            arrow.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(90deg)';
        }

        // Optional: close others? We'll keep it simple—allow multiple open.
        // If you want only one open at a time, uncomment the block below:
        /*
        if (!isExpanded) {
            document.querySelectorAll('.guide-header').forEach(otherHeader => {
                if (otherHeader !== header) {
                    const otherContent = otherHeader.closest('.guide-section').querySelector('.guide-content');
                    const otherArrow = otherHeader.querySelector('.arrow');
                    otherHeader.setAttribute('aria-expanded', 'false');
                    otherContent.setAttribute('aria-hidden', 'true');
                    otherContent.classList.remove('show');
                    if (otherArrow) otherArrow.style.transform = 'rotate(0deg)';
                }
            });
        }
        */
    }

    // ----- KEYBOARD ACCESSIBILITY (Enter/Space) -----
    function handleAccordionKeydown(e) {
        const header = e.target.closest('.guide-header');
        if (!header) return;
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            header.click();
        }
    }

    // ----- SEARCH WITH DEBOUNCE -----
    function filterGuides(searchTerm) {
        const term = searchTerm.toLowerCase().trim();
        if (!term) {
            renderGuides(guidesData);
            return;
        }
        const filtered = guidesData.filter(guide => {
            return guide.crop.toLowerCase().includes(term) ||
                guide.steps.some(step =>
                    step.title.toLowerCase().includes(term) ||
                    step.description.toLowerCase().includes(term)
                );
        });
        renderGuides(filtered);
    }

    function handleSearchInput(e) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            filterGuides(e.target.value);
        }, 300);
    }

    // ----- INITIALIZATION -----
    function init() {
        if (!container) return;

        // Render all guides initially
        renderGuides(guidesData);

        // Event delegation for accordion (click and keydown)
        container.addEventListener('click', handleAccordionClick);
        container.addEventListener('keydown', handleAccordionKeydown);

        // Search functionality
        if (searchInput) {
            searchInput.addEventListener('input', handleSearchInput);
            // Clear search on page load (if there was a query param from another page)
            const urlParams = new URLSearchParams(window.location.search);
            const query = urlParams.get('search');
            if (query) {
                searchInput.value = query;
                filterGuides(query);
            }
        }

        // Make guide headers focusable for keyboard navigation
        document.querySelectorAll('.guide-header').forEach(header => {
            header.setAttribute('tabindex', '0');
        });
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();