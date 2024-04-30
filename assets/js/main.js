/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if (this.scrollY >= 50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== SERVICES MODAL ===============*/
const modalViews = document.querySelectorAll('.services__modal'),
    modalBtns = document.querySelectorAll('.services__button'),
    modalClose = document.querySelectorAll('.services__modal-close')

let modal = function (modalClick) {
    modalViews[modalClick].classList.add('active-modal');
}

modalBtns.forEach((mb, i) => {
    mb.addEventListener('click', () => {
        modal(i);
    });
});

modalClose.forEach((mc) => {
    mc.addEventListener('click', () => {
        modalViews.forEach((mv) => {
            mv.classList.remove('active-modal');
        });
    });
});

/*=============== MIXITUP FILTER PORTFOLIO ===============*/
let mixerPortfolio = mixitup('.work__container', {
    selectors: {
        target: '.work__card'
    },
    animation: {
        duration: 300
    }
});

/* Link active work */
const linkWork = document.querySelectorAll('.work__item');

function activeWork() {
    linkWork.forEach(l => l.classList.remove('active-work'))
    this.classList.add('active-work')
}

linkWork.forEach(l => l.addEventListener('click', activeWork));

/*=============== SWIPER TESTIMONIAL ===============*/
let swiperTestimonial = new Swiper(".testimonial__container", {
    spaceBetween: 24,
    loop: true,
    grabCursor: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        576: {
            slidesPerView: 2
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 48,
        }
    }
});

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== LIGHT DARK THEME ===============*/
const themeButton = document.getElementById('theme-button')
const lightTheme = 'light-theme'
const iconTheme = 'bx-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the light-theme class
const getCurrentTheme = () => document.body.classList.contains(lightTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx bx-moon' : 'bx bx-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the light
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](lightTheme)
    themeButton.classList[selectedIcon === 'bx bx-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the light / icon theme
    document.body.classList.toggle(lightTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

// Get all view-details buttons
        const viewButtons = document.querySelectorAll('.view-details');

        // Get the popup modal and its content
        const popupModal = document.createElement('div');
        popupModal.classList.add('popup-modal');

        // Function to create the popup modal content
        function createPopupContent(title, description, image, link, preview) {
            const popupContent = document.createElement('div');
            popupContent.classList.add('popup-content');

            popupContent.innerHTML = `
                <span class="close-btn">&times;</span>
                <h3>${title}</h3>
                <img src="${image}" class="popup-image" alt="Project Image">
                <p>${description}</p>
                <a href="${preview}" class="work__button" target="_blank">Demo </a>
                <a href="${link}" class="work__button" target="_blank">Get Code <i class="ri-arrow-right-circle-line"></i></a>
            `;

            return popupContent;
        }

        // Function to open the popup modal
        function openPopup(title, description, image, link, preview) {
            const popupContent = createPopupContent(title, description, image, link, preview);
            popupModal.innerHTML = '';
            popupModal.appendChild(popupContent);
            document.body.appendChild(popupModal);
            popupModal.style.display = 'flex';

            // Add event listener to close button
            const closeButton = popupModal.querySelector('.close-btn');
            closeButton.addEventListener('click', closePopup);
        }

        // Function to close the popup modal
        function closePopup() {
            popupModal.style.display = 'none';
        }

        // Attach event listener to each view-details button
        viewButtons.forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault();
                const title = this.parentElement.querySelector('.work__title').textContent;
                const description = this.parentElement.querySelector('.work__description').textContent;
                const image = this.closest('.work__card').dataset.image;
                const link = this.closest('.work__card').dataset.link;
                const preview = this.closest('.work__card').dataset.preview;
                openPopup(title, description, image, link, preview);
            });
        });

        // Close modal when clicking outside the content area
        window.addEventListener('click', (e) => {
            if (e.target === popupModal) {
                popupModal.style.display = 'none';
            }
        });

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    /* reset: true, */
});

sr.reveal(`.home__data`);
sr.reveal(`.about__img`, { delay: 700 });
sr.reveal(`.about__box`, { delay: 900 });
sr.reveal(`.about__description`, { delay: 1000});
sr.reveal(`.skills__content`, { delay: 600});
sr.reveal(`.work__card`, { delay: 600});
sr.reveal(`.contact__card`, { delay: 600});
sr.reveal(`.contact__form-div`, { delay: 600});
sr.reveal(`.footer__list`, { delay: 600});
sr.reveal(`.footer__social`, { delay: 700, origin: 'bottom' });
sr.reveal(`.nav__menu`, { delay: 600, origin: 'bottom' });
sr.reveal(`.nav__item`, { delay: 700, origin: 'bottom' });
