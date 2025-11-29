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

        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        });

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
    // STACKED SCROLLING CARDS
    // ------------------------------
    // Only run on desktop/tablet
    if (window.innerWidth > 768) {
        const section = document.querySelector('.stacked-cards-section');
        const container = document.querySelector('.stacked-cards-container');
        const cards = document.querySelectorAll('.stack-card');
        const pinnedTabsContainer = document.querySelector('.pinned-tabs');

        if (section && container && cards.length) {
            const cardCount = cards.length;
            let ticking = false;

            // ====================================
            // Create pinned tabs for each card
            // ====================================
            cards.forEach((card) => {
                const tabContent = card.querySelector('.stack-card-tab');
                if (tabContent) {
                    const pinnedTab = document.createElement('div');
                    pinnedTab.className = 'pinned-tab';
                    pinnedTab.innerHTML = tabContent.innerHTML;
                    pinnedTab.dataset.cardId = card.dataset.cardId;

                    // Replace generic class names with specific ones
                    pinnedTab.innerHTML = pinnedTab.innerHTML
                        .replace('tab-icon', 'pinned-tab-icon')
                        .replace('tab-title', 'pinned-tab-title');

                    pinnedTabsContainer.appendChild(pinnedTab);
                }
            });

            const pinnedTabs = document.querySelectorAll('.pinned-tab');

            // ====================================
            // Calculate scroll progress and update cards
            // ====================================
            function updateCards() {
                // Get section's position relative to viewport
                const sectionRect = section.getBoundingClientRect();
                const sectionTop = sectionRect.top;
                const sectionHeight = container.offsetHeight;

                // Calculate how far we've scrolled through the section (0 to 1)
                // When section top hits top of viewport, progress starts
                const scrollProgress = -sectionTop / (sectionHeight - window.innerHeight);
                const clampedProgress = Math.max(0, Math.min(1, scrollProgress));

                // Determine which card should be active based on scroll progress
                // Divide progress into equal segments for each card
                const progressPerCard = 1 / cardCount;
                const activeIndex = Math.min(
                    cardCount - 1,
                    Math.floor(clampedProgress / progressPerCard)
                );

                // Calculate progress within current card (0 to 1)
                const cardProgress = (clampedProgress % progressPerCard) / progressPerCard;

                // Update cards based on their position relative to active card
                cards.forEach((card, index) => {
                    const cardElement = card;

                    if (index < activeIndex) {
                        // Past cards - already scrolled past
                        cardElement.classList.remove('upcoming', 'active');
                        cardElement.classList.add('past');

                    } else if (index === activeIndex) {
                        // Current active card
                        cardElement.classList.remove('upcoming', 'past');
                        cardElement.classList.add('active');

                        // Smooth transition animation based on cardProgress
                        const inner = card.querySelector('.stack-card-inner');
                        if (inner) {
                            // Optional: Add subtle scale/transform during transition
                            const scale = 1 - (cardProgress * 0.02); // Subtle scale down
                            inner.style.transform = `translateY(0) scale(${scale})`;
                            inner.style.opacity = 1;
                        }

                    } else if (index === activeIndex + 1) {
                        // Next card - animating into view
                        cardElement.classList.remove('past', 'active');
                        cardElement.classList.add('upcoming');

                        const inner = card.querySelector('.stack-card-inner');
                        if (inner) {
                            // Animate from bottom as user scrolls
                            const translateY = 100 - (cardProgress * 100); // 100% to 0%
                            const scale = 0.9 + (cardProgress * 0.1); // 0.9 to 1
                            const opacity = cardProgress; // 0 to 1

                            inner.style.transform = `translateY(${translateY}%) scale(${scale})`;
                            inner.style.opacity = opacity;
                        }

                    } else {
                        // Cards further ahead - stay hidden below
                        cardElement.classList.remove('past', 'active');
                        cardElement.classList.add('upcoming');
                    }
                });

                // Update pinned tabs visibility
                pinnedTabs.forEach((tab, index) => {
                    if (index < activeIndex) {
                        // Show tabs for past cards
                        tab.classList.add('visible');
                        // Stagger animation delay
                        tab.style.transitionDelay = `${index * 0.1}s`;
                    } else {
                        // Hide tabs for current and future cards
                        tab.classList.remove('visible');
                    }
                });
            }

            // ====================================
            // Scroll event handler with RAF optimization
            // ====================================
            function onScroll() {
                if (!ticking) {
                    window.requestAnimationFrame(() => {
                        updateCards();
                        ticking = false;
                    });
                    ticking = true;
                }
            }

            // ====================================
            // Initialize
            // ====================================
            // Set initial state
            updateCards();

            // Listen to scroll events
            window.addEventListener('scroll', onScroll, { passive: true });

            // Re-calculate on resize
            window.addEventListener('resize', () => {
                if (window.innerWidth > 768) {
                    updateCards();
                }
            });
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
