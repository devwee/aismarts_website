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
    // STACKED SCROLLING CARDS
    // ------------------------------
    if (window.innerWidth > 768) {
        const section = document.querySelector('.stacked-cards-section');
        const container = document.querySelector('.stacked-cards-container');
        const cards = Array.from(document.querySelectorAll('.stack-card'));
        const pinnedTabsContainer = document.querySelector('.pinned-tabs');

        if (section && container && cards.length && pinnedTabsContainer) {
            const cardCount = cards.length;

            // Build pinned tabs from each card's .stack-card-tab content
            pinnedTabsContainer.innerHTML = '';
            cards.forEach(card => {
                const tabContent = card.querySelector('.stack-card-tab');
                if (!tabContent) return;

                const pinnedTab = document.createElement('div');
                pinnedTab.className = 'pinned-tab';
                pinnedTab.dataset.cardId = card.dataset.cardId || '';

                // Copy inner HTML but adjust class names
                let html = tabContent.innerHTML;
                html = html.replace(/tab-icon/g, 'pinned-tab-icon');
                html = html.replace(/tab-title/g, 'pinned-tab-title');
                pinnedTab.innerHTML = html;

                pinnedTabsContainer.appendChild(pinnedTab);
            });

            const pinnedTabs = Array.from(
                pinnedTabsContainer.querySelectorAll('.pinned-tab')
            );

            function updateStackedCards() {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const viewportHeight = window.innerHeight;

                // how far we've scrolled inside this section
                const scrollY = window.scrollY;
                const distanceIntoSection = scrollY - sectionTop;
                const totalScrollable = sectionHeight - viewportHeight;

                if (totalScrollable <= 0) return;

                let progress = distanceIntoSection / totalScrollable;
                progress = Math.max(0, Math.min(1, progress));

                // map 0–1 progress to card indices
                const activeIndex = Math.round(progress * (cardCount - 1));

                cards.forEach((card, index) => {
                    card.classList.remove('past', 'active', 'upcoming');

                    if (index < activeIndex) {
                        card.classList.add('past');
                    } else if (index === activeIndex) {
                        card.classList.add('active');
                    } else {
                        card.classList.add('upcoming');
                    }
                });

                // show pinned tabs for past cards only
                pinnedTabs.forEach((tab, index) => {
                    if (index < activeIndex) {
                        tab.classList.add('visible');
                        tab.style.transitionDelay = `${index * 0.06}s`;
                    } else {
                        tab.classList.remove('visible');
                        tab.style.transitionDelay = '0s';
                    }
                });
            }

            // initial state
            updateStackedCards();

            let ticking = false;
            window.addEventListener(
                'scroll',
                () => {
                    if (!ticking) {
                        window.requestAnimationFrame(() => {
                            updateStackedCards();
                            ticking = false;
                        });
                        ticking = true;
                    }
                },
                { passive: true }
            );

            window.addEventListener('resize', () => {
                if (window.innerWidth > 768) {
                    updateStackedCards();
                }
            });
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


}

// Run once for normal static pages
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSiteScripts);
} else {
    initSiteScripts();
}

// Expose so we can call it again after loading header/footer via JS
window.initSiteScripts = initSiteScripts;
