document.addEventListener('DOMContentLoaded', function () {
    // ===== FOOTER YEAR =====
    var yearSpan = document.getElementById('year');
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  
    // ===== MOBILE MENU TOGGLE =====
    var menuButton = document.getElementById('mobile-menu-button');
    var mobileMenu = document.getElementById('mobile-menu');
  
    if (menuButton && mobileMenu) {
      menuButton.addEventListener('click', function () {
        var isHidden = mobileMenu.classList.contains('hidden');
        if (isHidden) {
          mobileMenu.classList.remove('hidden');
          mobileMenu.classList.add('block');
        } else {
          mobileMenu.classList.add('hidden');
          mobileMenu.classList.remove('block');
        }
      });
    }
  
    // ===== SMOOTH SCROLL FOR IN-PAGE LINKS & CLOSE MOBILE MENU =====
    var anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href').substring(1);
        var targetEl = document.getElementById(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
  
        // Close mobile menu after navigation
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
          mobileMenu.classList.remove('block');
        }
      });
    });
  
    // ===== SIMPLE SUBSCRIBE FORM BEHAVIOR (FRONT-END ONLY) =====
    var subscribeForm = document.getElementById('subscribe-form');
    var successMsg = document.getElementById('subscribe-success');
    var errorMsg = document.getElementById('subscribe-error');
    var emailInput = document.getElementById('email');
  
    if (subscribeForm && emailInput) {
      subscribeForm.addEventListener('submit', function (e) {
        e.preventDefault();
  
        var emailValue = emailInput.value.trim();
        var isValidEmail = !!emailValue && emailValue.includes('@');
  
        if (isValidEmail) {
          if (successMsg) successMsg.classList.remove('hidden');
          if (errorMsg) errorMsg.classList.add('hidden');
          emailInput.value = '';
        } else {
          if (errorMsg) errorMsg.classList.remove('hidden');
          if (successMsg) successMsg.classList.add('hidden');
        }
      });
    }
  });
  