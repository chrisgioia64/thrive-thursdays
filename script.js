// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {

    async function submitEmail(userEmail) {
        const scriptURL = 'https://script.google.com/macros/s/AKfycbxxg-HJJvU52cfM4IMOXUDSM9o6Azqh7zc0xYEOAzJHrChhIMjnWDoXOKS8o5I-tzG9/exec';
        
        try {
          const response = await fetch(scriptURL, {
            method: 'POST',
            mode: 'no-cors', // Essential for Google Apps Script requests
            cache: 'no-cache',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: userEmail })
          });
      
          console.log("Email submitted successfully!");
          return { success: true };
          
        } catch (error) {
          console.error('Error!', error.message);
          return { success: false, error: error.message };
        }
      }

    // Email subscription form handling
    const emailSubscriptionForm = document.getElementById('email-subscription-form');
    const submitBtn = document.getElementById('submit-email-btn');
    const submitBtnText = document.getElementById('submit-btn-text');
    const submitBtnSpinner = document.getElementById('submit-btn-spinner');
    const messageDiv = document.getElementById('email-subscription-message');
    
    if (emailSubscriptionForm) {
        emailSubscriptionForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Prevent double submission
            if (submitBtn.disabled) {
                return;
            }
            
            const emailInput = document.getElementById('email-address');
            const email = emailInput.value.trim();
            
            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!emailRegex.test(email)) {
                messageDiv.textContent = 'Please enter a valid email address.';
                messageDiv.className = 'mt-4 text-center text-red-400';
                messageDiv.classList.remove('hidden');
                return;
            }
            
            // Show loading state - keep "Sign Up" text visible and show spinner
            submitBtn.disabled = true;
            submitBtnText.classList.remove('hidden');
            submitBtnSpinner.classList.remove('hidden');
            messageDiv.classList.add('hidden');
            
            // Submit email to Google Sheets
            const result = await submitEmail(email);
            
            // Hide loading state
            submitBtn.disabled = false;
            submitBtnText.classList.remove('hidden');
            submitBtnSpinner.classList.add('hidden');
            
            if (result.success) {
                // Show success message
                messageDiv.textContent = 'Thank you for subscribing! You\'ll receive updates about upcoming events.';
                messageDiv.className = 'mt-4 text-center text-green-400';
                messageDiv.classList.remove('hidden');
                
                // Reset form
                emailInput.value = '';
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    messageDiv.classList.add('hidden');
                }, 5000);
            } else {
                // Show error message
                messageDiv.textContent = 'Sorry, there was an error submitting your email. Please try again.';
                messageDiv.className = 'mt-4 text-center text-red-400';
                messageDiv.classList.remove('hidden');
            }
        });
    }

    // Handle Subscribe button click - scroll to newsletter and focus email input
    const subscribeButton = document.querySelector('a[href="#newsletter"]');
    if (subscribeButton) {
        subscribeButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            const newsletterSection = document.getElementById('newsletter');
            const emailInput = document.getElementById('email-address');
            
            if (newsletterSection && emailInput) {
                const headerOffset = 80; // Account for fixed header
                const elementPosition = newsletterSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Wait for scroll to complete, then focus and highlight the input
                setTimeout(() => {
                    emailInput.focus();
                    emailInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 600); // Wait for smooth scroll to complete
            }
        });
    }

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

