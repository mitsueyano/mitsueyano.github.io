const navBar = document.getElementById('navbar')

function loadProject() {
  fetch('./ecoframe.json')
    .then(response => {
      if (!response.ok) {
        console.log('Erro ao carregar o arquivo json');
      }
      return response.json();
    })  
    .then(data => {
        const descriptionElement = document.getElementById('projectDescription');
        const pdfLink = document.getElementById('pdfLink');
        const pdfViewerElement = document.getElementById('pdfViewer');

        const imagesElement = document.getElementById('projectImages');

        descriptionElement.textContent = data.description;
              
        
        if (data.link && data.link.trim() !== "") {
            pdfViewerElement.src = "../../docs/" + data.link;
            pdfLink.innerHTML = data.link;
        } else {
            pdfViewerElement.style.display = "none"; 
            pdfLink.innerHTML = "Documento indisponível";
        }
        if (data.linkCompleto && data.linkCompleto.trim() !== "") {
            pdfLink.href = "../../docs/" + data.linkCompleto;
        }


        pdfLink.href = "../../docs/" + data.linkCompleto;
        pdfLink.innerHTML = data.link

        // Imagens
        data.projectImages.forEach(img => {
            const imageElement = document.createElement('div');
            imageElement.classList.add('cardBrowser', 'wide');
            
            imageElement.innerHTML = `
                <div class="browser-bar">
                    <div class="dotBrowser"></div><div class="dotBrowser"></div><div class="dotBrowser"></div>
                    <div class="url"></div>
                </div>
                <div class="viewport">
                    <img src="../../img/ecoframe/${img.name}" alt="Imagem do projeto">
                </div>
                <div class="card-info">
                    <h3>${img.description}</h3>
                </div>
            `;

            const imagem = imageElement.querySelector('.viewport img');

            imagem.onload = function() {
                const proporcaoAlvo = 347 / 280; // Tamanho da imagem média
                const proporcaoImagem = imagem.naturalWidth / imagem.naturalHeight;

                if (proporcaoImagem < proporcaoAlvo) {
                    imagem.classList.add('preview_scroll');
                    imagem.parentNode.classList.add('scroll');

                    setTimeout(() => {
                        imagem.classList.remove('preview_scroll');
                    }, 3600);
                }
            };

            imagesElement.appendChild(imageElement);
        });

        // Tecnologias utilizadas
        const carouselTrack = document.querySelector(".carousel__track");
        const techName = document.querySelector(".techName");
        const techDescription = document.querySelector(".techDescription");
        const leftArrow = document.querySelector(".nav_arrow.left");
        const rightArrow = document.querySelector(".nav_arrow.right");
        const dotsContainer = document.querySelector(".dotsCarousel");

        data.technologies.forEach((tech) => {
            const card = document.createElement('div');
            const icon = document.createElement('i');
            const icon2 = document.createElement('i');

            card.classList.add('cardCarousel');
            if (typeof tech.img != "string"){
                card.classList.add ('doubleIcon')
                icon.classList.value = tech.img[0];
                icon2.classList.value = tech.img[1];
                card.appendChild(icon2);
            } else{
                icon.classList.value = tech.img;
            }

            card.appendChild(icon);
            carouselTrack.appendChild(card);

            const dot = document.createElement('span');
            dot.classList.add('dotCarousel');
            dotsContainer.appendChild(dot);
        });


        const cards = document.querySelectorAll(".cardCarousel");
        const dots = document.querySelectorAll(".dotCarousel");
        let currentIndex = 0;
        let isAnimating = false;

        function updateCarousel(newIndex) {
            if (isAnimating) return;
            isAnimating = true;
            currentIndex = (newIndex + cards.length) % cards.length;

            cards.forEach((card, i) => {
                const offset = (i - currentIndex + cards.length) % cards.length;
                card.classList.remove(
                    "center",
                    "left-1",
                    "left-2",
                    "right-1",
                    "right-2",
                    "hidden"
                );
                if (offset === 0) {
                    card.classList.add("center");
                } else if (offset === 1) {
                    card.classList.add("right-1");
                } else if (offset === 2) {
                    card.classList.add("right-2");
                } else if (offset === cards.length - 1) {
                    card.classList.add("left-1");
                } else if (offset === cards.length - 2) {
                    card.classList.add("left-2");
                } else {
                    card.classList.add("hidden");
                }
            });

            dots.forEach((dot, i) => {
                dot.classList.toggle("active", i === currentIndex);
            });

            techName.style.opacity = "0";
            techDescription.style.opacity = "0";
            setTimeout(() => {
                techName.textContent = data.technologies[currentIndex].name;
                techDescription.textContent = data.technologies[currentIndex].description;
                techName.style.opacity = "1";
                techDescription.style.opacity = "1";
            }, 300);

            setTimeout(() => {
                isAnimating = false;
            }, 800);
        }

        leftArrow.addEventListener("click", () => {
            updateCarousel(currentIndex - 1);
        });
        rightArrow.addEventListener("click", () => {
            updateCarousel(currentIndex + 1);
        });
        dots.forEach((dot, i) => {
            dot.addEventListener("click", () => {
                updateCarousel(i);
            });
        });
        cards.forEach((card, i) => {
            card.addEventListener("click", () => {
                updateCarousel(i);
            });
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "ArrowLeft") {
                updateCarousel(currentIndex - 1);
            } else if (e.key === "ArrowRight") {
                updateCarousel(currentIndex + 1);
            }
        });

        let touchStartX = 0;
        let touchEndX = 0;
        document.addEventListener("touchstart", (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        document.addEventListener("touchend", (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    updateCarousel(currentIndex + 1);
                } else {
                    updateCarousel(currentIndex - 1);
                }
            }
        }

        updateCarousel(0);

    })
    .catch(error => console.error('Erro:', error));
}

//Menu
function checkResolution(e) {
    if (e.matches) {
        // Mobile
        navBar.classList.toggle('mobile')
    } else {
       navBar.classList.remove('mobile');

    }
}

//Lista de projetos
function setProjectsList(){
    listMobile.innerHTML = `
        <li><a href="../../index.html">Início</a></li>
        <li><span onclick="menuDesktopToggle()">Projetos</span></li>
    `
    listDesktop.innerHTML = `
        ${projectsList}
    `
}

// ------- //
checkResolution(mediaQuery);

mediaQuery.addEventListener('change', checkResolution);

window.addEventListener('DOMContentLoaded', () => {
    checkResolution(mediaQuery);
    loadProject();
    loadProjectsList();
    getYear();
});