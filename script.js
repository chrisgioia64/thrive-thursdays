// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const headerOffset = 80; // Account for fixed header
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event bubbling
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    }
    
    // Media modal functionality
    const mediaItems = document.querySelectorAll('.media-item');
    const mediaModal = document.getElementById('media-modal');
    const modalContent = document.getElementById('modal-content');
    const closeModal = document.getElementById('close-modal');
    
    mediaItems.forEach(item => {
        item.addEventListener('click', function() {
            const mediaType = this.getAttribute('data-type');
            const mediaSrc = this.getAttribute('data-src');
            const mediaTitle = this.querySelector('p').textContent;
            
            // Clear previous content
            modalContent.innerHTML = '';
            
            if (mediaType === 'video') {
                // Check if it's a YouTube/Vimeo URL or local file
                if (mediaSrc.includes('youtube.com') || mediaSrc.includes('youtu.be')) {
                    // Extract YouTube video ID
                    let videoId = '';
                    if (mediaSrc.includes('youtube.com/watch?v=')) {
                        videoId = mediaSrc.split('v=')[1].split('&')[0];
                    } else if (mediaSrc.includes('youtu.be/')) {
                        videoId = mediaSrc.split('youtu.be/')[1].split('?')[0];
                    }
                    
                    if (videoId) {
                        const iframe = document.createElement('iframe');
                        iframe.src = `https://www.youtube.com/embed/${videoId}`;
                        iframe.className = 'w-full h-96';
                        iframe.setAttribute('frameborder', '0');
                        iframe.setAttribute('allowfullscreen', '');
                        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
                        modalContent.appendChild(iframe);
                    }
                } else if (mediaSrc.includes('vimeo.com')) {
                    // Extract Vimeo video ID
                    const videoId = mediaSrc.split('vimeo.com/')[1].split('?')[0];
                    if (videoId) {
                        const iframe = document.createElement('iframe');
                        iframe.src = `https://player.vimeo.com/video/${videoId}`;
                        iframe.className = 'w-full h-96';
                        iframe.setAttribute('frameborder', '0');
                        iframe.setAttribute('allowfullscreen', '');
                        iframe.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture');
                        modalContent.appendChild(iframe);
                    }
                } else {
                    // Local video file
                    const video = document.createElement('video');
                    video.src = mediaSrc;
                    video.controls = true;
                    video.className = 'w-full';
                    video.setAttribute('controls', '');
                    modalContent.appendChild(video);
                }
            } else if (mediaType === 'image') {
                const img = document.createElement('img');
                img.src = mediaSrc;
                img.alt = mediaTitle;
                img.className = 'w-full h-auto';
                modalContent.appendChild(img);
            }
            
            // Show modal
            mediaModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });
    
    // Close modal functionality
    function closeMediaModal() {
        mediaModal.classList.add('hidden');
        document.body.style.overflow = ''; // Restore scrolling
        modalContent.innerHTML = ''; // Clear content
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', closeMediaModal);
    }
    
    // Close modal when clicking outside
    if (mediaModal) {
        mediaModal.addEventListener('click', function(e) {
            if (e.target === mediaModal) {
                closeMediaModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !mediaModal.classList.contains('hidden')) {
            closeMediaModal();
        }
    });
    
    // Newsletter form handling
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterMessage = document.getElementById('newsletter-message');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = document.getElementById('newsletter-email');
            const email = emailInput.value.trim();
            
            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!emailRegex.test(email)) {
                newsletterMessage.textContent = 'Please enter a valid email address.';
                newsletterMessage.classList.remove('hidden', 'text-green-400');
                newsletterMessage.classList.add('text-red-400');
                return;
            }
            
            // Simulate form submission (replace with actual API call)
            newsletterMessage.textContent = 'Thank you for subscribing! We\'ll keep you updated.';
            newsletterMessage.classList.remove('hidden', 'text-red-400');
            newsletterMessage.classList.add('text-green-400');
            
            // Reset form
            emailInput.value = '';
            
            // Hide message after 5 seconds
            setTimeout(() => {
                newsletterMessage.classList.add('hidden');
            }, 5000);
        });
    }
    
    // Scroll animations (fade in on scroll)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections for fade-in animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

