// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    
    // Function to smooth scroll to a target section
    function smoothScrollToSection(targetId) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            smoothScrollToSection(targetId);
        });
    });
    
    // Smooth scroll for hero buttons
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                smoothScrollToSection(href);
            }
        });
    });
    
    // Navbar scroll effects
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        // Add/remove scrolled class based on scroll position
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link based on section in view
        updateActiveNavLink();
        
        // Animate elements as they come into view
        animateOnScroll();
        
        lastScrollY = currentScrollY;
    });
    
    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navHeight = navbar.offsetHeight;
        const scrollPos = window.scrollY + navHeight + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                // Add active class to current nav link
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }
    
    // Animate elements when they come into view
    function animateOnScroll() {
        const animateElements = document.querySelectorAll('.skill-category, .highlight-item, .timeline-item, .education-item, .contact-item');
        
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                if (!element.classList.contains('animated')) {
                    element.classList.add('animate-in');
                    element.classList.add('animated');
                }
            }
        });
    }
    
    // Fixed typing animation for hero title that preserves the full name
    function typeWriter(element, text, speed = 100) {
        element.style.visibility = 'visible';
        element.innerHTML = '';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        // Start typing after a brief delay
        setTimeout(type, 500);
    }
    
    // Initialize hero title - ensure it shows the full name initially
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const titleText = heroTitle.textContent;
        // Keep the original text visible initially, then start the typing effect
        heroTitle.style.visibility = 'visible';
        setTimeout(() => {
            typeWriter(heroTitle, titleText, 80);
        }, 1500);
    }
    
    // Add hover effects to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(10px) scale(1)';
        });
    });
    
    // Add click effects to skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('click', function() {
            this.style.animation = 'pulse 0.3s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 300);
        });
    });
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = hero.querySelector('.hero-content');
            if (parallax && scrolled < hero.offsetHeight) {
                parallax.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        });
    }
    
    // Add smooth reveal animation to sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
            }
        });
    }, observerOptions);
    
    // Observe all sections for reveal animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Add progressive loading effect to timeline items
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('timeline-reveal');
                }, index * 200);
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
    
    // Add stagger animation to skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(skillCategories).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.classList.add('skill-reveal');
                }, index * 150);
            }
        });
    }, { threshold: 0.3 });
    
    skillCategories.forEach(category => {
        skillObserver.observe(category);
    });
    
    // Handle contact links interactions
    const contactLinks = document.querySelectorAll('.social-link, .contact-item a');
    contactLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add pulse animation keyframe dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        
        .navbar.scrolled {
            background-color: rgba(255, 255, 255, 0.98);
            box-shadow: 0 2px 30px rgba(0, 0, 0, 0.15);
        }
        
        .nav-link.active {
            color: var(--portfolio-accent);
        }
        
        .nav-link.active::after {
            width: 100%;
        }
        
        .timeline-reveal {
            animation: slideInTimeline 0.6s ease-out;
        }
        
        .skill-reveal {
            animation: slideInSkill 0.6s ease-out;
        }
        
        .reveal {
            animation: fadeInSection 0.8s ease-out;
        }
        
        @keyframes slideInTimeline {
            from {
                opacity: 0;
                transform: translateX(-30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideInSkill {
            from {
                opacity: 0;
                transform: translateY(30px) scale(0.9);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        @keyframes fadeInSection {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Ensure hero title is always visible */
        .hero-title {
            visibility: visible !important;
        }
        
        /* Mobile menu styles (for future enhancement) */
        @media (max-width: 768px) {
            .nav-menu {
                position: fixed;
                left: -100%;
                top: 70px;
                flex-direction: column;
                background-color: rgba(255, 255, 255, 0.98);
                width: 100%;
                text-align: center;
                transition: 0.3s;
                box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
                backdrop-filter: blur(10px);
                padding: 2rem 0;
            }
            
            .nav-menu.active {
                left: 0;
            }
            
            .nav-menu li {
                margin: 1rem 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Ensure proper initialization
    setTimeout(() => {
        updateActiveNavLink();
        animateOnScroll();
    }, 100);
    
    console.log('Portfolio website initialized successfully!');
});