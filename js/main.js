// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Account for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add scroll event listener for header effects
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
    
    // Add click tracking for analytics (if needed)
    const trackableElements = document.querySelectorAll('a[href^="http"], .btn');
    
    trackableElements.forEach(element => {
        element.addEventListener('click', function() {
            // Analytics tracking would go here
            console.log('Tracking:', this.href || this.textContent);
        });
    });
});

// Utility functions for common operations
const BookUtils = {
    // Function to highlight active navigation item based on scroll position
    updateActiveNav: function() {
        const sections = document.querySelectorAll('.section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.id;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    },
    
    // Function to load more content dynamically (if needed)
    loadMoreContent: function(containerId, contentUrl) {
        const container = document.getElementById(containerId);
        
        if (container) {
            fetch(contentUrl)
                .then(response => response.text())
                .then(html => {
                    container.innerHTML += html;
                })
                .catch(error => {
                    console.error('Error loading more content:', error);
                });
        }
    }
};

// Initialize scroll event for active nav highlighting
window.addEventListener('scroll', BookUtils.updateActiveNav);