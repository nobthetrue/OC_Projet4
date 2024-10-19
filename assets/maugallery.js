const buttons = document.querySelectorAll('.btn-filtre');
const galleryContainer = document.querySelector('.gallery');
const images = document.querySelectorAll('.gallery-item');

let lastClickedButton = null;
let isFirstLoad = true;

function handleButtonClick(button) {
    if (lastClickedButton === button) {
        return;
    }

    buttons.forEach(btn => {
        btn.style.backgroundColor = '';
        btn.style.color = '';
    });

    button.style.backgroundColor = '#c76716';
    button.style.color = 'white';

    const category = button.innerText;

    if (!isFirstLoad) {
        galleryContainer.classList.remove('scale-up');
        void galleryContainer.offsetWidth;
        galleryContainer.classList.add('scale-up');
    }

    images.forEach(image => {
        image.closest('.conteneur-image').style.display = (category === "Tous" || image.getAttribute('data-gallery-tag') === category) ? 'block' : 'none';
    });

    lastClickedButton = button;
    isFirstLoad = false;
}

buttons.forEach(button => {
    button.addEventListener('click', () => handleButtonClick(button));
});

const defaultButton = Array.from(buttons).find(btn => btn.innerText === "Tous");
handleButtonClick(defaultButton);

const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const closeBtn = document.getElementsByClassName('close')[0];
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;

function openModal(index) {
    modal.style.display = 'flex';
    currentIndex = index;
    modalImg.src = images[currentIndex].src;
    modalImg.style.opacity = '0';
    modalImg.style.animation = 'none';

    void modalImg.offsetWidth;

    modalImg.style.animation = 'drop-in 0.5s forwards';
    modalImg.style.opacity = '1';
}

function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    modalImg.src = images[currentIndex].src;
}

function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    modalImg.src = images[currentIndex].src;
}

images.forEach((image, index) => {
    image.addEventListener('click', () => openModal(index));
});

nextBtn.onclick = showNext;
prevBtn.onclick = showPrev;

closeBtn.onclick = function() {
    modalImg.style.animation = 'drop-out 0.5s forwards';
    modalImg.style.opacity = '0';

    setTimeout(() => {
        modal.style.display = 'none';
    }, 500);
};

window.onclick = function(event) {
    if (event.target === modal) {
        closeBtn.onclick();
    }
};
