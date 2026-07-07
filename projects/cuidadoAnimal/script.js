const navBar = document.getElementById('navbar')

function loadProject() {
  fetch('./cuidadoAnimal.json')
    .then(response => {
      if (!response.ok) {
        console.log('Erro ao carregar o arquivo json');
      }
      return response.json();
    })  
    .then(data => {
        const descriptionElement = document.getElementById('projectDescription');
        const descriptionElement2 = document.getElementById('projectDescription2');
        descriptionElement.textContent = data.description;
        descriptionElement2.textContent = data.description2;

        //Imagens
        const imagesElement = document.getElementById("imgsElement")
        
        data.projectImages.forEach( img => {
            const image = document.createElement('img');
            image.src = `../../img/cuidadoAnimal/${img}`;
            image.alt = "Imagem do projeto";
            imagesElement.appendChild(image);
        });
        
        // Tecnologias utilizadas
        const projectTechnologies = document.getElementById("projectTechnologies");
        projectTechnologies.innerHTML = '<div class="tech-grid-container"></div>';
        const gridContainer = projectTechnologies.querySelector(".tech-grid-container");

        data.technologies.forEach((tech) => {
            const item = document.createElement('div');
            item.classList.add('tech-grid-item');

            item.innerHTML = `
                <div class="tech-media-wrapper">
                    <i class="${tech.img}"></i>
                </div>
                <div class="tech-grid-info">
                    <h3 class="tech-grid-name">${tech.name}</h3>
                    <p class="tech-grid-desc">${tech.description}</p>
                </div>
            `;

            gridContainer.appendChild(item);
        });
    })}

const mobileToggle = document.getElementById('mobileToggle');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navBar.classList.toggle('menu-open');
    });
}

//Menu
function checkResolution(e) {
    if (e.matches) {
        // Mobile
        desktopToggle.classList.remove('show');
        listMobile.innerHTML = `
            <li><a href="../../index.html">Início</a></li>
            ${projectsList}
        `;
    } else {
        // Desktop
        mobileToggle.classList.remove('open');
        listMobile.classList.remove('open');
        listMobile.innerHTML = `
            <li><a href="../../index.html">Início</a></li>
            <li><span onclick="menuDesktopToggle()">Projetos</span></li>
        `;
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