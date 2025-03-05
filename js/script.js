// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add this JavaScript for the modal functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get the modal
    const modal = document.getElementById('certModal');
    const modalImg = document.getElementById('certModalImg');
    const captionText = document.getElementById('certCaption');
    const closeBtn = document.getElementsByClassName('modal-close')[0];

    // Get all certificate items
    const certItems = document.querySelectorAll('.accred-item');

    // Add click event to all certificate items
    certItems.forEach(item => {
        item.addEventListener('click', function() {
            modal.style.display = "block";
            modalImg.src = this.querySelector('img').src;
            captionText.innerHTML = this.querySelector('p').innerHTML;
        });
    });

    // Close button functionality
    closeBtn.addEventListener('click', function() {
        modal.style.display = "none";
    });

    // Click outside to close
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Close on escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === "Escape") {
            modal.style.display = "none";
        }
    });

    // Add active class to current nav item
    const currentLocation = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-links a');
    
    navItems.forEach(item => {
        if (currentLocation.includes('catalogue.html') && item.href.includes('#portfolio')) {
            item.classList.add('active');
        }
    });
});

// Image loading optimization
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.accred-item img');
    
    // Create image loading observer
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // Load the image
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
                // Stop observing the image
                observer.unobserve(img);
            }
        });
    });

    // Observe each image
    images.forEach(img => {
        imageObserver.observe(img);
    });
});

// Function to preload critical images
function preloadCriticalImages() {
    const criticalImages = document.querySelectorAll('.accred-item img[data-critical="true"]');
    criticalImages.forEach(img => {
        if (img.dataset.src) {
            const preloadLink = document.createElement('link');
            preloadLink.rel = 'preload';
            preloadLink.as = 'image';
            preloadLink.href = img.dataset.src;
            document.head.appendChild(preloadLink);
        }
    });
}

// Call preload function
preloadCriticalImages();

// Add this to your existing script.js
document.addEventListener('DOMContentLoaded', function() {
    let clickCount = 0;
    let lastClickTime = 0;
    const clickTimeout = 3000; // 3 seconds timeout between clicks
    const requiredClicks = 5;
    const copyrightTrigger = document.getElementById('copyright-trigger');
    const adminAccess = document.getElementById('admin-access');

    copyrightTrigger.addEventListener('click', function(e) {
        const currentTime = new Date().getTime();

        // Reset count if too much time has passed
        if (currentTime - lastClickTime > clickTimeout) {
            clickCount = 0;
        }

        clickCount++;
        lastClickTime = currentTime;

        // Check if we've reached the required number of clicks
        if (clickCount === requiredClicks) {
            // Show admin button with animation
            adminAccess.style.display = 'block';
            setTimeout(() => {
                adminAccess.classList.add('show');
            }, 10);

            // Store in session storage that admin button has been revealed
            sessionStorage.setItem('adminRevealed', 'true');

            // Reset count
            clickCount = 0;

            // Optional: Add a subtle feedback animation to the copyright text
        }
    });

    // Check if admin button should be shown (persists during session)
    if (sessionStorage.getItem('adminRevealed') === 'true') {
        adminAccess.style.display = 'block';
        adminAccess.classList.add('show');
    }

    // Optional: Hide admin button when clicking elsewhere
    document.addEventListener('click', function(e) {
        if (!e.target.closest('#copyright-trigger') && 
            !e.target.closest('#admin-access') && 
            clickCount > 0) {
            clickCount = 0;
        }
    });
});