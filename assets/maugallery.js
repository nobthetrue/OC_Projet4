// (function($) {
//   $.fn.mauGallery = function(options) {
//     var options = $.extend($.fn.mauGallery.defaults, options);
//     var tagsCollection = [];
//     return this.each(function() {
//       $.fn.mauGallery.methods.createRowWrapper($(this));
//       if (options.lightBox) {
//         $.fn.mauGallery.methods.createLightBox(
//           $(this),
//           options.lightboxId,
//           options.navigation
//         );
//       }
//       $.fn.mauGallery.listeners(options);

//       $(this)
//         .children(".gallery-item")
//         .each(function(index) {
//           $.fn.mauGallery.methods.responsiveImageItem($(this));
//           $.fn.mauGallery.methods.moveItemInRowWrapper($(this));
//           $.fn.mauGallery.methods.wrapItemInColumn($(this), options.columns);
//           var theTag = $(this).data("gallery-tag");
//           if (
//             options.showTags &&
//             theTag !== undefined &&
//             tagsCollection.indexOf(theTag) === -1
//           ) {
//             tagsCollection.push(theTag);
//           }
//         });

//       if (options.showTags) {
//         $.fn.mauGallery.methods.showItemTags(
//           $(this),
//           options.tagsPosition,
//           tagsCollection
//         );
//       }

//       $(this).fadeIn(500);
//     });
//   };
//   $.fn.mauGallery.defaults = {
//     columns: 3,
//     lightBox: true,
//     lightboxId: null,
//     showTags: true,
//     tagsPosition: "bottom",
//     navigation: true
//   };
//   $.fn.mauGallery.listeners = function(options) {
//     $(".gallery-item").on("click", function() {
//       if (options.lightBox && $(this).prop("tagName") === "IMG") {
//         $.fn.mauGallery.methods.openLightBox($(this), options.lightboxId);
//       } else {
//         return;
//       }
//     });

//     $(".gallery").on("click", ".nav-link", $.fn.mauGallery.methods.filterByTag);
//     $(".gallery").on("click", ".mg-prev", () =>
//       $.fn.mauGallery.methods.prevImage(options.lightboxId)
//     );
//     $(".gallery").on("click", ".mg-next", () =>
//       $.fn.mauGallery.methods.nextImage(options.lightboxId)
//     );
//   };
//   $.fn.mauGallery.methods = {
//     createRowWrapper(element) {
//       if (
//         !element
//           .children()
//           .first()
//           .hasClass("row")
//       ) {
//         element.append('<div class="gallery-items-row row"></div>');
//       }
//     },
//     wrapItemInColumn(element, columns) {
//       if (columns.constructor === Number) {
//         element.wrap(
//           `<div class='item-column mb-4 col-${Math.ceil(12 / columns)}'></div>`
//         );
//       } else if (columns.constructor === Object) {
//         var columnClasses = "";
//         if (columns.xs) {
//           columnClasses += ` col-${Math.ceil(12 / columns.xs)}`;
//         }
//         if (columns.sm) {
//           columnClasses += ` col-sm-${Math.ceil(12 / columns.sm)}`;
//         }
//         if (columns.md) {
//           columnClasses += ` col-md-${Math.ceil(12 / columns.md)}`;
//         }
//         if (columns.lg) {
//           columnClasses += ` col-lg-${Math.ceil(12 / columns.lg)}`;
//         }
//         if (columns.xl) {
//           columnClasses += ` col-xl-${Math.ceil(12 / columns.xl)}`;
//         }
//         element.wrap(`<div class='item-column mb-4${columnClasses}'></div>`);
//       } else {
//         console.error(
//           `Columns should be defined as numbers or objects. ${typeof columns} is not supported.`
//         );
//       }
//     },
//     moveItemInRowWrapper(element) {
//       element.appendTo(".gallery-items-row");
//     },
//     responsiveImageItem(element) {
//       if (element.prop("tagName") === "IMG") {
//         element.addClass("img-fluid");
//       }
//     },
//     openLightBox(element, lightboxId) {
//       $(`#${lightboxId}`)
//         .find(".lightboxImage")
//         .attr("src", element.attr("src"));
//       $(`#${lightboxId}`).modal("toggle");
//     },
//     prevImage() {
//       let activeImage = null;
//       $("img.gallery-item").each(function() {
//         if ($(this).attr("src") === $(".lightboxImage").attr("src")) {
//           activeImage = $(this);
//         }
//       });
//       let activeTag = $(".tags-bar span.active-tag").data("images-toggle");
//       let imagesCollection = [];
//       if (activeTag === "all") {
//         $(".item-column").each(function() {
//           if ($(this).children("img").length) {
//             imagesCollection.push($(this).children("img"));
//           }
//         });
//       } else {
//         $(".item-column").each(function() {
//           if (
//             $(this)
//               .children("img")
//               .data("gallery-tag") === activeTag
//           ) {
//             imagesCollection.push($(this).children("img"));
//           }
//         });
//       }
//       let index = 0,
//         next = null;

//       $(imagesCollection).each(function(i) {
//         if ($(activeImage).attr("src") === $(this).attr("src")) {
//           index = i ;
//         }
//       });
//       next =
//         imagesCollection[index] ||
//         imagesCollection[imagesCollection.length - 1];
//       $(".lightboxImage").attr("src", $(next).attr("src"));
//     },
//     nextImage() {
//       let activeImage = null;
//       $("img.gallery-item").each(function() {
//         if ($(this).attr("src") === $(".lightboxImage").attr("src")) {
//           activeImage = $(this);
//         }
//       });
//       let activeTag = $(".tags-bar span.active-tag").data("images-toggle");
//       let imagesCollection = [];
//       if (activeTag === "all") {
//         $(".item-column").each(function() {
//           if ($(this).children("img").length) {
//             imagesCollection.push($(this).children("img"));
//           }
//         });
//       } else {
//         $(".item-column").each(function() {
//           if (
//             $(this)
//               .children("img")
//               .data("gallery-tag") === activeTag
//           ) {
//             imagesCollection.push($(this).children("img"));
//           }
//         });
//       }
//       let index = 0,
//         next = null;

//       $(imagesCollection).each(function(i) {
//         if ($(activeImage).attr("src") === $(this).attr("src")) {
//           index = i;
//         }
//       });
//       next = imagesCollection[index] || imagesCollection[0];
//       $(".lightboxImage").attr("src", $(next).attr("src"));
//     },
//     createLightBox(gallery, lightboxId, navigation) {
//       gallery.append(`<div class="modal fade" id="${
//         lightboxId ? lightboxId : "galleryLightbox"
//       }" tabindex="-1" role="dialog" aria-hidden="true">
//                 <div class="modal-dialog" role="document">
//                     <div class="modal-content">
//                         <div class="modal-body">
//                             ${
//                               navigation
//                                 ? '<div class="mg-prev" style="cursor:pointer;position:absolute;top:50%;left:-15px;background:white;"><</div>'
//                                 : '<span style="display:none;" />'
//                             }
//                             <img class="lightboxImage img-fluid" alt="Contenu de l'image affichée dans la modale au clique"/>
//                             ${
//                               navigation
//                                 ? '<div class="mg-next" style="cursor:pointer;position:absolute;top:50%;right:-15px;background:white;}">></div>'
//                                 : '<span style="display:none;" />'
//                             }
//                         </div>
//                     </div>
//                 </div>
//             </div>`);
//     },
//     showItemTags(gallery, position, tags) {
//       var tagItems =
//         '<li class="nav-item"><span class="nav-link active active-tag"  data-images-toggle="all">Tous</span></li>';
//       $.each(tags, function(index, value) {
//         tagItems += `<li class="nav-item active">
//                 <span class="nav-link"  data-images-toggle="${value}">${value}</span></li>`;
//       });
//       var tagsRow = `<ul class="my-4 tags-bar nav nav-pills">${tagItems}</ul>`;

//       if (position === "bottom") {
//         gallery.append(tagsRow);
//       } else if (position === "top") {
//         gallery.prepend(tagsRow);
//       } else {
//         console.error(`Unknown tags position: ${position}`);
//       }
//     },
//     filterByTag() {
//       if ($(this).hasClass("active-tag")) {
//         return;
//       }
//       $(".active-tag").removeClass("active active-tag");
//       $(this).addClass("active-tag");

//       var tag = $(this).data("images-toggle");

//       $(".gallery-item").each(function() {
//         $(this)
//           .parents(".item-column")
//           .hide();
//         if (tag === "all") {
//           $(this)
//             .parents(".item-column")
//             .show(300);
//         } else if ($(this).data("gallery-tag") === tag) {
//           $(this)
//             .parents(".item-column")
//             .show(300);
//         }
//       });
//     }
//   };
// })(jQuery);
// function ajoutListenerBouton () {
//   const btnFiltre = document.querySelector(".btn-filtre")
//   btnFiltre.addEventListener("click", function (event) {
//   event.preventDefault()
//   btnFiltre.style.backgroundColor = "#c76716"
//   btnFiltre.style.color = "white"
// })
// }

// ajoutListenerBouton()

const buttons = document.querySelectorAll('.btn-filtre');
const galleryContainer = document.querySelector('.gallery'); // Sélection du conteneur des images
const images = document.querySelectorAll('.gallery-item');

let lastClickedButton = null; // Variable pour stocker le dernier bouton cliqué
let isFirstLoad = true; // Flag pour détecter le premier chargement

// Fonction pour gérer le clic sur un bouton de filtre
function handleButtonClick(button) {
    // Vérifie si le bouton cliqué est différent du dernier bouton cliqué
    if (lastClickedButton === button) {
        return; // Ne fait rien si c'est le même bouton
    }

    // Réinitialise l'apparence des boutons
    buttons.forEach(btn => {
        btn.style.backgroundColor = '';
        btn.style.color = '';
    });

    // Met à jour le style du bouton cliqué
    button.style.backgroundColor = '#c76716';
    button.style.color = 'white';

    const category = button.innerText;

    // Appliquer l'animation seulement après le premier clic
    if (!isFirstLoad) {
        galleryContainer.classList.remove('scale-up'); // Supprime la classe pour réinitialiser
        void galleryContainer.offsetWidth; // Force le reflow pour redémarrer l'animation
        galleryContainer.classList.add('scale-up'); // Ajoute la classe pour démarrer l'animation
    }

    // Masquer ou afficher les images selon la catégorie
    images.forEach(image => {
        image.closest('.conteneur-image').style.display = (category === "Tous" || image.getAttribute('data-gallery-tag') === category) ? 'block' : 'none';
    });

    // Met à jour le dernier bouton cliqué
    lastClickedButton = button;
    isFirstLoad = false; // Désactive le flag après le premier clic
}

// Écouteurs d'événements pour les boutons
buttons.forEach(button => {
    button.addEventListener('click', () => handleButtonClick(button));
});

// Activation par défaut du bouton "Tous" sans animation
const defaultButton = Array.from(buttons).find(btn => btn.innerText === "Tous");
handleButtonClick(defaultButton);

// Code pour la modale
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const closeBtn = document.getElementsByClassName('close')[0];
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;

// Fonction pour ouvrir la modale avec animation de chute de l'image
function openModal(index) {
    modal.style.display = 'flex';
    currentIndex = index;
    modalImg.src = images[currentIndex].src;
    modalImg.style.opacity = '0'; // Rendre l'image invisible au début
    modalImg.style.animation = 'none'; // Supprime l'animation précédente

    // Reflow pour redémarrer l'animation
    void modalImg.offsetWidth;

    modalImg.style.animation = 'drop-in 0.5s forwards'; // Lance l'animation de tombée
    modalImg.style.opacity = '1'; // Rendre l'image visible à la fin de l'animation
}

// Fonction pour passer à l'image suivante
function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    modalImg.src = images[currentIndex].src;
}

// Fonction pour revenir à l'image précédente
function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    modalImg.src = images[currentIndex].src;
}

// Ajoute des événements de clic sur chaque image pour ouvrir la modale
images.forEach((image, index) => {
    image.addEventListener('click', () => openModal(index));
});

nextBtn.onclick = showNext;
prevBtn.onclick = showPrev;

// Fonction pour fermer la modale avec animation de montée
closeBtn.onclick = function() {
    modalImg.style.animation = 'drop-out 0.5s forwards'; // Lance l'animation de remontée
    modalImg.style.opacity = '0'; // Rendre l'image invisible à la fin de l'animation

    // Ferme la modale après l'animation
    setTimeout(() => {
        modal.style.display = 'none';
    }, 500); // Temps correspondant à la durée de l'animation
};

// Fermeture de la modale en cliquant à l'extérieur
window.onclick = function(event) {
    if (event.target === modal) {
        closeBtn.onclick(); // Appel de la fonction de fermeture
    }
};
