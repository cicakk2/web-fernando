document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // --- 3D Cube Image Model ---
    const cubeImages = {
        dark: {
            front: 'https://cdn.rafled.com/anime-icons/images/QsYuJLD9pgb2JrP2E7AJrGdrw3AItM1p.jpg',
            back: '',
            right: '',
            left: '',
            top: '',
            bottom: ''
        },
        light: {
            front: 'https://i.pinimg.com/736x/de/95/08/de9508d04f3aec849b76f4036509885c.jpg',
            back: '',
            right: '',
            left: '',
            top: '',
            bottom: ''
        }
    };

    // --- PERUBAHAN DI SINI: Ambil elemen gambar kubus ---
    const imgFront = document.getElementById('cube-img-front');
    const imgBack = document.getElementById('cube-img-back');
    const imgRight = document.getElementById('cube-img-right');
    const imgLeft = document.getElementById('cube-img-left');
    const imgTop = document.getElementById('cube-img-top');
    const imgBottom = document.getElementById('cube-img-bottom');
    
    // Theme Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const iconSun = document.getElementById('theme-icon-sun');
    const iconMoon = document.getElementById('theme-icon-moon');

    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            iconSun.style.display = 'none';
            iconMoon.style.display = 'block';

            // Set gambar dark mode
            imgFront.src = cubeImages.dark.front;
            imgBack.src = cubeImages.dark.back;
            imgRight.src = cubeImages.dark.right;
            imgLeft.src = cubeImages.dark.left;
            imgTop.src = cubeImages.dark.top;
            imgBottom.src = cubeImages.dark.bottom;
            
        } else { // 'light'
            body.classList.remove('dark-mode');
            iconSun.style.display = 'block';
            iconMoon.style.display = 'none';

            // Set gambar light mode
            imgFront.src = cubeImages.light.front;
            imgBack.src = cubeImages.light.back;
            imgRight.src = cubeImages.light.right;
            imgLeft.src = cubeImages.light.left;
            imgTop.src = cubeImages.light.top;
            imgBottom.src = cubeImages.light.bottom;
        }
    }

    // Default dark, panggil applyTheme untuk set gambar awal
    const currentTheme = 'dark'; 
    applyTheme(currentTheme);

    themeToggleBtn.addEventListener('click', () => {
        let newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
        applyTheme(newTheme);
    });

    // Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const mobileNav = document.getElementById('mobile-nav');

    function changePage(targetId) {
        pages.forEach(page => page.classList.remove('active'));
        const targetPage = document.getElementById(targetId);
        if (targetPage) targetPage.classList.add('active');

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.navLink === targetId) {
                link.classList.add('active');
            }
        });

        if (mobileNav.classList.contains('open')) {
            mobileNav.classList.remove('open');
            menuIconOpen.style.display = 'block';
            menuIconClose.style.display = 'none';
        }
        
        window.scrollTo(0, 0);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.dataset.navLink;
            changePage(targetId);
            history.pushState(null, '', `#${targetId}`);
        });
    });

    const initialHash = window.location.hash.substring(1);
    if (initialHash && document.getElementById(initialHash)) {
        changePage(initialHash);
    } else {
        changePage('home');
        history.pushState(null, '', `#home`);
    }
    
    window.addEventListener('popstate', () => {
        const hash = window.location.hash.substring(1) || 'home';
        changePage(hash);
    });

    // Mobile Menu
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const menuIconOpen = document.getElementById('menu-icon-open');
    const menuIconClose = document.getElementById('menu-icon-close');

    mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('open');
        const isOpen = mobileNav.classList.contains('open');
        menuIconOpen.style.display = isOpen ? 'none' : 'block';
        menuIconClose.style.display = isOpen ? 'block' : 'none';
    });

    // 3D Cube Interaction
    const cubeWrapper = document.getElementById('cube-wrapper');
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;
    let rotationX = -20;
    let rotationY = 20;
    let velocityX = 0;
    let velocityY = 0;

    function updateCubeRotation() {
        cubeWrapper.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
    }

    // Mouse Events
    cubeWrapper.addEventListener('mousedown', (e) => {
        isDragging = true;
        previousMouseX = e.clientX;
        previousMouseY = e.clientY;
        velocityX = 0;
        velocityY = 0;
        cubeWrapper.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const deltaX = e.clientX - previousMouseX;
        const deltaY = e.clientY - previousMouseY;

        velocityX = deltaX * 0.5;
        velocityY = deltaY * 0.5;

        rotationY += deltaX * 0.5;
        rotationX -= deltaY * 0.5;

        updateCubeRotation();

        previousMouseX = e.clientX;
        previousMouseY = e.clientY;
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        cubeWrapper.style.cursor = 'grab';
    });

    // Touch Events for Mobile
    cubeWrapper.addEventListener('touchstart', (e) => {
        isDragging = true;
        const touch = e.touches[0];
        previousMouseX = touch.clientX;
        previousMouseY = touch.clientY;
        velocityX = 0;
        velocityY = 0;
    });

    document.addEventListener('touchmove', (e) => {
        if (!isDragging) return;

        const touch = e.touches[0];
        const deltaX = touch.clientX - previousMouseX;
        const deltaY = touch.clientY - previousMouseY;

        velocityX = deltaX * 0.5;
        velocityY = deltaY * 0.5;

        rotationY += deltaX * 0.5;
        rotationX -= deltaY * 0.5;

        updateCubeRotation();

        previousMouseX = touch.clientX;
        previousMouseY = touch.clientY;
    });

    document.addEventListener('touchend', () => {
        isDragging = false;
    });

    // Inertia animation
    function animateInertia() {
        if (!isDragging && (Math.abs(velocityX) > 0.1 || Math.abs(velocityY) > 0.1)) {
            rotationY += velocityX;
            rotationX += velocityY;

            velocityX *= 0.95;
            velocityY *= 0.95;

            updateCubeRotation();
        }
        requestAnimationFrame(animateInertia);
    }
    animateInertia();

    // Auto-rotate when idle
    let idleTimer;
    let isIdle = false;

    function resetIdleTimer() {
        clearTimeout(idleTimer);
        isIdle = false;
        idleTimer = setTimeout(() => {
            isIdle = true;
        }, 3000);
    }

    document.addEventListener('mousemove', resetIdleTimer);
    document.addEventListener('touchstart', resetIdleTimer);

    function autoRotate() {
        if (isIdle && !isDragging) {
            rotationY += 0.3;
            updateCubeRotation();
        }
        requestAnimationFrame(autoRotate);
    }
    autoRotate();
    resetIdleTimer();

    // Initial rotation
    updateCubeRotation();

    // Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => observer.observe(el));
});