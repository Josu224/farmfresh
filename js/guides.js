// ===== GUIDES PAGE SPECIFIC JAVASCRIPT =====

// Sample guides data with Nigerian crops
const guidesData = [
    {
        id: 1,
        crop: "Cassava",
        icon: "🥔",
        steps: [
            {
                title: "Land Preparation",
                description: "Clear land and plow to a depth of 20-25cm. Create ridges or mounds spaced 1m apart. Cassava grows best in well-drained sandy loam soil."
            },
            {
                title: "Planting Materials",
                description: "Use healthy cassava stems from mature plants (8-12 months old). Cut stems into 25cm stakes with 5-7 nodes each."
            },
            {
                title: "Planting",
                description: "Plant stakes at 45° angle, leaving 2-3 nodes above ground. Space 1m between rows and 1m within rows. Best planted at the start of rainy season (April-May)."
            },
            {
                title: "Fertilizer Application",
                description: "Apply NPK 15:15:15 at 400kg per hectare at planting. Top dress with urea at 2-3 months after planting."
            },
            {
                title: "Weed Control",
                description: "Keep field weed-free for first 3-4 months. Weed at 4 and 8 weeks after planting. Use herbicides like Primextra if needed."
            },
            {
                title: "Harvesting",
                description: "Harvest 9-12 months after planting when leaves begin to yellow. Use cutlass or mechanical harvester for larger farms."
            }
        ],
        image: "https://images.unsplash.com/photo-1589926288299-4c2e6fd2cfb6?w=400"
    },
    {
        id: 2,
        crop: "Yam",
        icon: "🌱",
        steps: [
            {
                title: "Seed Selection",
                description: "Use healthy yam sets or small whole tubers (200-300g). Select disease-free planting materials from reputable sources."
            },
            {
                title: "Land Preparation",
                description: "Create mounds or ridges 1m apart. Yam prefers loose, well-drained soil. Add well-decomposed manure to mounds."
            },
            {
                title: "Planting",
                description: "Plant at the beginning of rainy season (March-April). Place seed yam on mound and cover with 5-10cm soil."
            },
            {
                title: "Staking",
                description: "Provide stakes 2-3m tall for yam vines to climb. Stake within 4-6 weeks after planting."
            },
            {
                title: "Maintenance",
                description: "Mulch around plants to retain moisture. Weed regularly. Apply fertilizer 6-8 weeks after planting."
            },
            {
                title: "Harvesting",
                description: "Harvest 7-9 months after planting when leaves turn yellow. Carefully dig around mounds to avoid damaging tubers."
            }
        ],
        image: "https://images.unsplash.com/photo-1593113598335-9b5c2c6b8b6b?w=400"
    },
    {
        id: 3,
        crop: "Maize",
        icon: "🌽",
        steps: [
            {
                title: "Land Preparation",
                description: "Plow to 20-25cm depth. Harrow to create fine seedbed. Create ridges 75cm apart for better drainage."
            },
            {
                title: "Planting",
                description: "Plant 2-3 seeds per hole at 3-5cm depth. Space 75cm between rows and 25cm within rows. Plant with first rains (March-April or August-September)."
            },
            {
                title: "Fertilizer Application",
                description: "Apply NPK 15:15:15 at planting (200kg/hectare). Top dress with urea at 4-6 weeks after planting."
            },
            {
                title: "Weed Control",
                description: "Keep weed-free for first 6 weeks. Use pre-emergence herbicides like Atrazine. Hand weed as needed."
            },
            {
                title: "Pest Management",
                description: "Watch for stem borers and fall armyworm. Use recommended pesticides or natural control methods."
            },
            {
                title: "Harvesting",
                description: "Harvest when cobs are dry and husks turn brown (3-4 months after planting). Dry to 14% moisture before storage."
            }
        ],
        image: "https://images.unsplash.com/photo-1563513492-16f4d80c3c1c?w=400"
    },
    {
        id: 4,
        crop: "Rice",
        icon: "🍚",
        steps: [
            {
                title: "Nursery Preparation",
                description: "Prepare seedbed 500m² per hectare of main field. Sow pre-germinated seeds 2-3 weeks before transplanting."
            },
            {
                title: "Land Preparation",
                description: "For lowland rice, puddle soil to 15-20cm depth. Level field for even water distribution. Construct bunds to retain water."
            },
            {
                title: "Transplanting",
                description: "Transplant 21-25 day old seedlings. Plant 2-3 seedlings per hill, spaced 20cm x 20cm. Transplant during cool hours."
            },
            {
                title: "Water Management",
                description: "Maintain 5-7cm water depth during vegetative stage. Drain field 2 weeks before harvest."
            },
            {
                title: "Fertilizer Application",
                description: "Apply NPK at transplanting. Top dress with urea at tillering and panicle initiation stages."
            },
            {
                title: "Harvesting",
                description: "Harvest when 80-85% of grains are straw-colored (4-5 months after planting). Thresh and dry to 14% moisture."
            }
        ],
        image: "https://images.unsplash.com/photo-1589926288299-4c2e6fd2cfb6?w=400"
    },
    {
        id: 5,
        crop: "Tomatoes",
        icon: "🍅",
        steps: [
            {
                title: "Nursery Preparation",
                description: "Prepare seedbed with fine soil and well-rotted manure. Sow seeds in rows 10cm apart. Cover with light soil and mulch."
            },
            {
                title: "Transplanting",
                description: "Transplant 4-6 week old seedlings when they have 4-6 leaves. Space 60cm between rows and 45cm within rows."
            },
            {
                title: "Staking",
                description: "Install stakes or trellises within 2 weeks of transplanting. Train plants and tie loosely as they grow."
            },
            {
                title: "Water Management",
                description: "Water regularly but avoid wetting leaves. Use drip irrigation if possible. Mulch to conserve moisture."
            },
            {
                title: "Pest and Disease Control",
                description: "Watch for tomato leaf miner, whiteflies, and blight. Practice crop rotation and use recommended pesticides."
            },
            {
                title: "Harvesting",
                description: "Start harvesting 60-80 days after transplanting. Pick at breaker stage for longer shelf life."
            }
        ],
        image: "https://images.unsplash.com/photo-1593113598335-9b5c2c6b8b6b?w=400"
    }
];

// Initialize guides page
document.addEventListener('DOMContentLoaded', function() {
    displayGuides(guidesData);
    initGuideAccordions();
    initGuideSearch();
});

// Display guides
function displayGuides(guides) {
    const container = document.getElementById('guides-container');
    if (!container) return;
    
    container.innerHTML = guides.map(guide => `
        <div class="guide-section" data-id="${guide.id}">
            <div class="guide-header">
                <h2>${guide.icon} ${guide.crop} Growing Guide</h2>
                <span class="arrow">▶</span>
            </div>
            <div class="guide-content">
                <div class="guide-body">
                    <img src="${guide.image}" alt="${guide.crop}" style="width: 100%; max-height: 300px; object-fit: cover; border-radius: 12px; margin-bottom: 20px;">
                    ${guide.steps.map((step, index) => `
                        <div class="guide-step">
                            <div class="step-number">${index + 1}</div>
                            <div>
                                <h3>${step.title}</h3>
                                <p>${step.description}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `).join('');
    
    initGuideAccordions();
}

// Initialize accordion functionality
function initGuideAccordions() {
    const headers = document.querySelectorAll('.guide-header');
    
    headers.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const arrow = this.querySelector('.arrow');
            
            // Close all other guides
            if (!this.classList.contains('active')) {
                document.querySelectorAll('.guide-header').forEach(h => {
                    if (h !== this) {
                        h.classList.remove('active');
                        h.nextElementSibling.classList.remove('show');
                    }
                });
            }
            
            // Toggle current guide
            this.classList.toggle('active');
            content.classList.toggle('show');
            
            // Update arrow
            if (arrow) {
                arrow.style.transform = this.classList.contains('active') ? 'rotate(90deg)' : 'rotate(0)';
            }
        });
    });
}

// Initialize search functionality
function initGuideSearch() {
    const searchInput = document.getElementById('guide-search');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            
            const filtered = guidesData.filter(guide => 
                guide.crop.toLowerCase().includes(query) ||
                guide.steps.some(step => 
                    step.title.toLowerCase().includes(query) ||
                    step.description.toLowerCase().includes(query)
                )
            );
            
            displayGuides(filtered);
        });
    }
}