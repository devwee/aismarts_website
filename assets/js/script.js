// ====================================
// INITIALISE ALL SITE SCRIPTS
// ====================================

function initSiteScripts() {
    // ------------------------------
    // MOBILE NAVIGATION TOGGLE
    // ------------------------------
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');

    if (hamburger && navbar) {
        // Avoid duplicating listeners if initSiteScripts is called again
        if (!hamburger.dataset.bound) {
            hamburger.addEventListener('click', function() {
                navbar.classList.toggle('active');

                // Animate hamburger icon
                const spans = hamburger.querySelectorAll('span');
                if (navbar.classList.contains('active')) {
                    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                    spans[1].style.opacity = '0';
                    spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            });

            // Close menu when clicking outside
            document.addEventListener('click', function(event) {
                if (!hamburger.contains(event.target) && !navbar.contains(event.target)) {
                    navbar.classList.remove('active');
                    const spans = hamburger.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            });

            // Close menu when clicking on a nav link
            const navItems = navbar.querySelectorAll('a');
            navItems.forEach(item => {
                item.addEventListener('click', function() {
                    navbar.classList.remove('active');
                    const spans = hamburger.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                });
            });

            hamburger.dataset.bound = 'true';
        }
    }

    // ------------------------------
    // HEADER SCROLL EFFECT
    // ------------------------------
    const header = document.querySelector('.header');
    if (header && !header.dataset.bound) {
        let lastScroll = 0;

        function updateHeaderScrollState() {
            if (window.innerWidth <= 910) {
                header.classList.remove('scrolled');
                return;
            }

            const currentScroll = window.pageYOffset;
            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            lastScroll = currentScroll;
        }

        window.addEventListener('scroll', updateHeaderScrollState);
        window.addEventListener('resize', updateHeaderScrollState);

        // Initial state on load
        updateHeaderScrollState();

        header.dataset.bound = 'true';
    }

    // ------------------------------
    // FADE-IN ON SCROLL
    // ------------------------------
    const fadeElements = document.querySelectorAll('.section, .card');
    if (fadeElements.length) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        fadeElements.forEach(element => {
            element.classList.add('fade-in');
            observer.observe(element);
        });
    }


    // ------------------------------
    // PRODUCT STACK CAROUSEL NAVIGATION
    // ------------------------------
    const section = document.querySelector('.product-stack');
    if (section && window.innerWidth > 910) {
        const cards = Array.from(section.querySelectorAll('.product-card'));
        const prevBtn = section.querySelector('.stack-nav-btn--prev');
        const nextBtn = section.querySelector('.stack-nav-btn--next');

        if (cards.length && prevBtn && nextBtn) {
            let currentIndex = 0;

            function updateProductStack() {
                // Update card states
                cards.forEach((card, i) => {
                    card.classList.remove('is-active', 'is-past', 'is-future');
                    if (i < currentIndex) {
                        card.classList.add('is-past');
                    } else if (i === currentIndex) {
                        card.classList.add('is-active');
                    } else {
                        card.classList.add('is-future');
                    }
                });

                // Update button states
                prevBtn.disabled = currentIndex === 0;
                nextBtn.disabled = currentIndex === cards.length - 1;
            }

            // Navigation button click handlers
            prevBtn.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateProductStack();
                }
            });

            nextBtn.addEventListener('click', () => {
                if (currentIndex < cards.length - 1) {
                    currentIndex++;
                    updateProductStack();
                }
            });

            // Keyboard navigation
            section.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                    if (currentIndex > 0) {
                        currentIndex--;
                        updateProductStack();
                    }
                } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                    if (currentIndex < cards.length - 1) {
                        currentIndex++;
                        updateProductStack();
                    }
                }
            });

            // Initial state
            updateProductStack();
        }
    }


    // ------------------------------
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ------------------------------
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        if (!link.dataset.bound) {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId !== '#' && targetId !== '') {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        e.preventDefault();
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
            link.dataset.bound = 'true';
        }
    });

    // ------------------------------
    // ANIMATED VALUATION CARDS
    // ------------------------------
    const valuationCards = document.querySelectorAll('.valuation-card');
    valuationCards.forEach(card => {
        if (!card.dataset.animated) {
            new AnimatedValuationCard(card);
            card.dataset.animated = 'true';
        }
    });

    // ------------------------------
    // HERO MINI CARDS ANIMATION
    // ------------------------------
    const reduceMotion = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!reduceMotion) {
        // Relationships card animation
        const relCard = document.getElementById('rel-card');
        if (relCard && !relCard.dataset.animating) {
            relCard.dataset.animating = 'true';

            const scoreEl = relCard.querySelector('[data-rel-score]');
            const barEl = relCard.querySelector('[data-rel-bar]');
            const bubbleEl = relCard.querySelector('[data-rel-bubble]');

            if (scoreEl && barEl && bubbleEl) {
                const messages = [
                    "Decision tools in development",
                    "AI research in progress",
                    "Building intelligent systems",
                    "Exploring new possibilities",
                    "Innovation underway"
                ];

                let currentScore = 82;

                function tickRelationship() {
                    const delta = (Math.random() - 0.5) * 14; // ±7%
                    currentScore = Math.max(40, Math.min(98, currentScore + delta));
                    const rounded = Math.round(currentScore);

                    scoreEl.textContent = `${rounded}%`;
                    barEl.style.width = `${Math.max(30, Math.min(95, 40 + (rounded - 40) * 0.9))}%`;

                    const msg = messages[Math.floor(Math.random() * messages.length)];
                    bubbleEl.classList.remove('visible');

                    setTimeout(() => {
                        bubbleEl.textContent = msg;
                        bubbleEl.classList.add('visible');
                    }, 100);

                    setTimeout(tickRelationship, 2400);
                }

                // Initial state
                bubbleEl.classList.add('visible');
                tickRelationship();
            }
        }

        // Journal card animation
        const journalCard = document.getElementById('journal-card');
        if (journalCard && !journalCard.dataset.animating) {
            journalCard.dataset.animating = 'true';

            const moods = [
                { label: "Research", text: "Exploring AI for complex decisions." },
                { label: "Design", text: "Prototyping intelligent tools." },
                { label: "Development", text: "Building the future of decision AI." },
                { label: "Testing", text: "Validating new approaches." }
            ];

            const moodEl = journalCard.querySelector('[data-journal-mood]');
            const noteEl = journalCard.querySelector('[data-journal-text]');
            const dots = Array.from(journalCard.querySelectorAll('[data-j-dot]'));

            if (moodEl && noteEl && dots.length) {
                let idx = 0;

                function tickJournal() {
                    const mood = moods[idx % moods.length];
                    const dotIndex = idx % dots.length;

                    moodEl.textContent = mood.label;
                    noteEl.textContent = mood.text;

                    dots.forEach((dot, i) => {
                        dot.classList.toggle('is-active', i === dotIndex);
                    });

                    idx++;
                    setTimeout(tickJournal, 2800);
                }

                tickJournal();
            }
        }
    }

}

// Run once for normal static pages
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSiteScripts);
} else {
    initSiteScripts();
}

// Expose so we can call it again after loading header/footer via JS
window.initSiteScripts = initSiteScripts;

// ====================================
// ANIMATED VALUATION CARD CLASS
// ====================================

class AnimatedValuationCard {
    constructor(cardElement) {
        this.card = cardElement;
        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Base values (configurable)
        this.baseValues = {
            min: 2500,
            avg: 5000,
            max: 8500
        };

        // Current values
        this.currentValues = { ...this.baseValues };

        // Target values
        this.targetValues = { ...this.baseValues };

        // Animation settings
        this.animationDuration = 1200; // ms
        this.updateInterval = 1800; // ms between new targets
        this.variationPercent = 0.15; // 15% variation

        // DOM elements
        this.elements = {
            min: this.card.querySelector('[data-value-type="min"]'),
            avg: this.card.querySelector('[data-value-type="avg"]'),
            max: this.card.querySelector('[data-value-type="max"]'),
            lineMin: this.card.querySelector('.graph-point-min'),
            lineAvg: this.card.querySelector('.graph-point-avg'),
            lineMax: this.card.querySelector('.graph-point-max'),
            polyline: this.card.querySelector('.graph-line'),
            polygon: this.card.querySelector('.graph-fill'),
            plateState: this.card.querySelector('.plate-state'),
            plateNumber: this.card.querySelector('.plate-number')
        };

        // Plate data
        this.states = ['NSW', 'VIC', 'QLD', 'SA', 'WA', 'TAS', 'ACT', 'NT'];
        this.platePatterns = [
            // Numeric plates (4-6 characters)
            { type: 'numeric', examples: ['8888', '7777', '1234', '9999', '0001', '0007', '3650', '1111', '2222', '5678'] },
            // Alphanumeric plates (4-6 characters)
            { type: 'alpha', examples: ['ACE1', 'KING', 'VIP88', 'BOSS', 'GOLD1', 'PRO1', 'ELITE', 'WIN1', 'FAST', 'STAR'] }
        ];

        // Check if all required elements exist
        if (!this.elements.min || !this.elements.avg || !this.elements.max) {
            return; // Card doesn't have the required structure
        }

        // Parse initial values from the DOM
        this.parseInitialValues();

        // Graph settings
        this.graphHeight = 60;
        this.graphPadding = 10;

        this.init();
    }

    parseInitialValues() {
        // Extract numeric values from the displayed amounts
        const minText = this.elements.min.textContent.replace(/[$,]/g, '');
        const avgText = this.elements.avg.textContent.replace(/[$,]/g, '');
        const maxText = this.elements.max.textContent.replace(/[$,]/g, '');

        if (minText && !isNaN(minText)) this.baseValues.min = parseInt(minText);
        if (avgText && !isNaN(avgText)) this.baseValues.avg = parseInt(avgText);
        if (maxText && !isNaN(maxText)) this.baseValues.max = parseInt(maxText);

        // Update current values to match base
        this.currentValues = { ...this.baseValues };
        this.targetValues = { ...this.baseValues };
    }

    init() {
        if (this.prefersReducedMotion) {
            return;
        }

        // Initial graph update
        this.updateGraph();

        this.startAnimation();
    }

    startAnimation() {
        // Set initial targets
        this.generateNewTargets();

        // Start the animation loop
        setInterval(() => {
            this.generateNewTargets();
            this.animateToTargets();
        }, this.updateInterval);

        // Initial animation
        this.animateToTargets();

        // Start plate rotation (fast dynamic changes)
        if (this.elements.plateState && this.elements.plateNumber) {
            setInterval(() => {
                this.updatePlate();
            }, 1200); // Change plate every 1.2 seconds
        }
    }

    updatePlate() {
        // Randomly select final values
        const finalState = this.states[Math.floor(Math.random() * this.states.length)];
        const patternType = this.platePatterns[Math.floor(Math.random() * this.platePatterns.length)];
        const finalPlate = patternType.examples[Math.floor(Math.random() * patternType.examples.length)];

        // Slot machine animation for state
        if (this.elements.plateState) {
            this.slotMachineAnimation(this.elements.plateState, finalState, this.states, 400);
        }

        // Slot machine animation for plate number
        if (this.elements.plateNumber) {
            const allPlates = [...this.platePatterns[0].examples, ...this.platePatterns[1].examples];
            this.slotMachineAnimation(this.elements.plateNumber, finalPlate, allPlates, 500);
        }
    }

    slotMachineAnimation(element, finalValue, possibleValues, duration) {
        let elapsed = 0;
        const startTime = Date.now();
        let currentDelay = 30; // Start fast

        const tick = () => {
            elapsed = Date.now() - startTime;

            if (elapsed >= duration) {
                // Animation complete - set final value
                element.textContent = finalValue;
                element.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    element.style.transform = 'scale(1)';
                }, 100);
                return;
            }

            // Show random value
            const randomValue = possibleValues[Math.floor(Math.random() * possibleValues.length)];
            element.textContent = randomValue;

            // Calculate next delay (slow down over time)
            const progress = elapsed / duration;
            currentDelay = 30 + (progress * 120); // Gradually slow from 30ms to 150ms

            setTimeout(tick, currentDelay);
        };

        tick();
    }

    generateNewTargets() {
        // Generate random variations for each value
        Object.keys(this.baseValues).forEach(key => {
            const base = this.baseValues[key];
            const variation = base * this.variationPercent;
            const randomOffset = (Math.random() - 0.5) * 2 * variation;
            this.targetValues[key] = Math.round(base + randomOffset);
        });

        // Ensure min < avg < max
        this.targetValues.min = Math.min(this.targetValues.min, this.targetValues.avg - 200);
        this.targetValues.max = Math.max(this.targetValues.max, this.targetValues.avg + 200);
    }

    animateToTargets() {
        const startValues = { ...this.currentValues };
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / this.animationDuration, 1);

            // Easing function: easeInOutQuad
            const eased = progress < 0.5
                ? 2 * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;

            // Update current values
            Object.keys(this.currentValues).forEach(key => {
                this.currentValues[key] = Math.round(
                    startValues[key] + (this.targetValues[key] - startValues[key]) * eased
                );
            });

            // Update DOM
            this.updateDisplay();

            // Continue animation
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    updateDisplay() {
        // Update text values
        this.elements.min.textContent = this.formatCurrency(this.currentValues.min);
        this.elements.avg.textContent = this.formatCurrency(this.currentValues.avg);
        this.elements.max.textContent = this.formatCurrency(this.currentValues.max);

        // Update graph
        this.updateGraph();
    }

    updateGraph() {
        if (!this.elements.lineMin || !this.elements.polyline) {
            return; // Graph elements don't exist
        }

        // Calculate Y positions (inverted: higher value = lower Y)
        const minY = this.valueToY(this.currentValues.min);
        const avgY = this.valueToY(this.currentValues.avg);
        const maxY = this.valueToY(this.currentValues.max);

        // Update circle positions
        this.elements.lineMin.setAttribute('cy', minY);
        this.elements.lineAvg.setAttribute('cy', avgY);
        this.elements.lineMax.setAttribute('cy', maxY);

        // Update polyline
        const points = `0,${minY} 150,${avgY} 300,${maxY}`;
        this.elements.polyline.setAttribute('points', points);

        // Update fill polygon
        const fillPoints = `0,60 0,${minY} 150,${avgY} 300,${maxY} 300,60`;
        this.elements.polygon.setAttribute('points', fillPoints);
    }

    valueToY(value) {
        // Map value to Y coordinate (inverted)
        const minValue = this.baseValues.min * (1 - this.variationPercent);
        const maxValue = this.baseValues.max * (1 + this.variationPercent);
        const range = maxValue - minValue;
        const normalizedValue = (value - minValue) / range;

        // Invert and apply padding
        const y = this.graphHeight - this.graphPadding -
                  (normalizedValue * (this.graphHeight - 2 * this.graphPadding));

        return Math.max(this.graphPadding, Math.min(this.graphHeight - this.graphPadding, y));
    }

    formatCurrency(value) {
        return `$${value.toLocaleString('en-US')}`;
    }
}

// ============================================
// FUTURE PRODUCT CARDS ANIMATIONS
// ============================================

// Financial Card Animation
const financialCard = document.getElementById('financial-card');
if (financialCard && !financialCard.dataset.animated) {
    financialCard.dataset.animated = 'true';

    const roiEl = financialCard.querySelector('[data-financial-roi]');
    const riskEl = financialCard.querySelector('[data-financial-risk]');
    const lineEl = financialCard.querySelector('[data-financial-line]');
    const fillEl = financialCard.querySelector('[data-financial-fill]');

    const riskLevels = ['Low', 'Medium', 'High'];
    let currentROI = 24;

    function animateFinancial() {
        // Vary ROI between 15% and 35%
        const delta = (Math.random() - 0.5) * 8;
        currentROI = Math.max(15, Math.min(35, currentROI + delta));
        const rounded = Math.round(currentROI);

        roiEl.textContent = `+${rounded}%`;

        // Update risk based on ROI
        const riskIndex = rounded < 22 ? 0 : rounded < 28 ? 1 : 2;
        riskEl.textContent = riskLevels[riskIndex];

        // Animate graph line
        const baseY = 50;
        const points = [
            `0,${baseY}`,
            `50,${baseY - currentROI * 0.5}`,
            `100,${baseY - currentROI * 0.7}`,
            `150,${baseY - currentROI * 0.9}`,
            `200,${baseY - currentROI * 1.2}`
        ].join(' ');

        lineEl.setAttribute('points', points);
        fillEl.setAttribute('points', points + ' 200,60 0,60');

        setTimeout(animateFinancial, 2000);
    }

    animateFinancial();
}

// Relationship Card Animation
const relationshipCard = document.getElementById('relationship-card');
if (relationshipCard && !relationshipCard.dataset.animated) {
    relationshipCard.dataset.animated = 'true';

    const scoreEl = relationshipCard.querySelector('[data-relationship-score]');
    const qualityEl = relationshipCard.querySelector('[data-relationship-quality]');

    const qualities = ['Strong', 'Very Strong', 'Excellent'];
    let currentScore = 87;

    function animateRelationship() {
        // Vary score between 75% and 95%
        const delta = (Math.random() - 0.5) * 8;
        currentScore = Math.max(75, Math.min(95, currentScore + delta));
        const rounded = Math.round(currentScore);

        scoreEl.textContent = `${rounded}%`;

        // Update quality based on score
        const qualityIndex = rounded < 82 ? 0 : rounded < 90 ? 1 : 2;
        qualityEl.textContent = qualities[qualityIndex];

        setTimeout(animateRelationship, 2200);
    }

    animateRelationship();
}

// Journal Card Animation
const journalCard = document.getElementById('lifestyle-card');
if (journalCard && !journalCard.dataset.animated) {
    journalCard.dataset.animated = 'true';

    const moodEl = journalCard.querySelector('[data-journal-mood]');
    const countEl = journalCard.querySelector('[data-journal-count]');
    const trendLineEl = journalCard.querySelector('[data-journal-line]');
    const trendFillEl = journalCard.querySelector('[data-journal-fill]');
    const dotsEls = journalCard.querySelectorAll('.journal-dot');

    const moods = ['Positive', 'Improving', 'Steady', 'Reflective', 'Positive'];
    let moodIndex = 0;
    let currentCount = 5;

    // Mood trend patterns (y-coordinates for the 5 dots)
    const trendPatterns = [
        [60, 50, 45, 40, 35],  // Improving trend
        [55, 52, 48, 45, 40],  // Gradual improvement
        [50, 48, 50, 47, 45],  // Slight improvement
        [58, 55, 50, 48, 42],  // Strong improvement
    ];

    function animateJournal() {
        // Cycle through moods
        moodIndex = (moodIndex + 1) % moods.length;
        moodEl.textContent = moods[moodIndex];

        // Vary entry count between 3 and 7
        const delta = Math.random() > 0.5 ? 1 : -1;
        currentCount = Math.max(3, Math.min(7, currentCount + delta));
        countEl.textContent = currentCount;

        // Select a trend pattern based on mood
        const patternIndex = moodIndex % trendPatterns.length;
        const pattern = trendPatterns[patternIndex];

        // Update trend line points
        const linePoints = `10,${pattern[0]} 50,${pattern[1]} 90,${pattern[2]} 130,${pattern[3]} 170,${pattern[4]}`;
        const fillPoints = `10,${pattern[0]} 50,${pattern[1]} 90,${pattern[2]} 130,${pattern[3]} 170,${pattern[4]} 170,80 10,80`;

        trendLineEl.setAttribute('points', linePoints);
        trendFillEl.setAttribute('points', fillPoints);

        // Update dot positions to match trend line
        dotsEls.forEach((dot, index) => {
            if (index < pattern.length) {
                dot.setAttribute('cy', pattern[index]);
            }
        });

        setTimeout(animateJournal, 2600);
    }

    animateJournal();
}
