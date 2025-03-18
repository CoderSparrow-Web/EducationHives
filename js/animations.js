// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        mirror: false
    });
});

// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.classList.add('hide');
    }, 500);
});

// Floating Icons Animation
const floatingIcons = document.querySelectorAll('.floating-icon');
floatingIcons.forEach(icon => {
    const randomX = Math.random() * 10 - 5;
    const randomY = Math.random() * 10 - 5;
    
    icon.style.animation = `float 3s ease-in-out infinite, moveAround 15s ease-in-out infinite`;
    icon.style.transform = `translate(${randomX}px, ${randomY}px)`;
});

// Add moveAround keyframes dynamically
const style = document.createElement('style');
style.innerHTML = `
    @keyframes moveAround {
        0%, 100% { transform: translate(0, 0); }
        25% { transform: translate(10px, -10px); }
        50% { transform: translate(-5px, -5px); }
        75% { transform: translate(-10px, 10px); }
    }
`;
document.head.appendChild(style);

// Testimonial Slider
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentSlide = 0;

function showSlide(index) {
    testimonialSlides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    testimonialSlides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
        showSlide(currentSlide);
    });

    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % testimonialSlides.length;
        showSlide(currentSlide);
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });

    // Auto slide
    setInterval(() => {
        currentSlide = (currentSlide + 1) % testimonialSlides.length;
        showSlide(currentSlide);
    }, 5000);
}

// Typing Animation for Hero Section
const typingElement = document.querySelector('.hero-text h1 .highlight');
if (typingElement) {
    const text = typingElement.textContent;
    typingElement.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            typingElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    setTimeout(typeWriter, 1000);
}

// Scroll Reveal for Skills Progress Bars
const progressBars = document.querySelectorAll('.progress');
const skillsSection = document.querySelector('.skills');

if (skillsSection && progressBars.length) {
    const revealProgress = () => {
        const sectionPos = skillsSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.3;
        
        if (sectionPos < screenPos) {
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 300);
            });
            window.removeEventListener('scroll', revealProgress);
        }
    };
    
    window.addEventListener('scroll', revealProgress);
} 