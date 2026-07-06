
var projectsList = '';

const listMobile = document.getElementById('listMobile')
const listDesktop = document.getElementById('listDesktop')

const mediaQuery = window.matchMedia('(max-width: 768px)');

const mobileToggle = document.getElementById('mobileToggle');
const desktopToggle = document.getElementById('desktopToggle');



function loadProject() {
  fetch('fatecPortasFechadas.json')
    .then(response => {
      if (!response.ok) {
        console.log('Erro ao carregar o arquivo json');
      }
      return response.json();
    })  
    .then(data => {
        const titleElement = document.getElementById('projectTitle');
        const descriptionElement = document.getElementById('projectDescription');
        const carouselElement = document.querySelector('.glide__slides');
        const bulletsElement = document.querySelector('.glide__bullets');
        const technologiesElement = document.getElementById('projectTechnologies');  

        // Sobre o projeto
        titleElement.textContent = data.title;
        descriptionElement.textContent = data.description;

        //Carrosel de imagens
        data.projectImages.forEach( img => {
            const slide = document.createElement('li');
            bullets = document.createElement('button');
            bullets.classList.add('glide__bullet');
            bullets.setAttribute('data-glide-dir', `=${data.projectImages.indexOf(img)}`);
            
            slide.classList.add('glide__slide');
            slide.innerHTML = `
                <img src="../../img/fatecPortasFechadas/${img}" alt="Imagem do projeto"/>
            `;
            carouselElement.appendChild(slide);
            bulletsElement.appendChild(bullets);
        });

        new Glide('.glide', { 
            type: 'carousel', 
            animationDuration: 800,
            gap: 20,
            peek: { before: 100, after: 100 },
            
            breakpoints: {
                1200: {
                    peek: { before: 100, after: 100 }
                },
                768: {
                    peek: { before: 40, after: 40 }
                }
            }
        }).mount();

        // Sobre o projeto 2
        const descriptionElement2 = document.createElement('p');
        descriptionElement2.id = 'projectDescription2';
        descriptionElement2.textContent = data.description2;
        document.getElementById('about').appendChild(descriptionElement2);

        const linkElement = document.createElement('p');
        url = data.link;
        linkElement.innerHTML = `
        <div style="margin-top:1rem;">
            <p>
                Demonstração: 
            </p>
            <div style="width:100%; display:flex; flex-direction:column; align-items:center; margin-top: 1rem">
                <iframe style="border:2px solid #00ff880d; padding: 5px" width="560" height="315" src="https://www.youtube.com/embed/DpDRj33jf7Q?si=Ij6eXE9bbOTUG2FH" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
        </div>`
        document.getElementById('about').appendChild(linkElement);
        
        // Tecnologias utilizadas
        data.technologies.forEach(tech => {
            const techElement = document.createElement('div');
            techElement.classList.add('technologyCard');
            techElement.innerHTML = `
                <p class="technologyName">${tech.name}</p>
                <p class="technologyDescription">${tech.description}</p>
            `;
            technologiesElement.appendChild(techElement);
        });
      
    })
    .catch(error => console.error('Erro:', error));
}

//Lista de projetos
function setProjectsList(){
    listDesktop.innerHTML = `
        ${projectsList}
    `
    listMobile.innerHTML = `
        <li><a href="../../index.html">Início</a></li>
        ${projectsList}
    `
}

function loadProjectsList() {
  fetch('../../projects.json')
    .then(response => {
      if (!response.ok) {
        console.log('Erro ao carregar o arquivo json');
      }
      return response.json();
    })  
    .then(data => {
        data.forEach(project => {
        const projectsTab = `
            <li><a href="../../projects/${project.link}/">${project.title}</a></li>
        `
            projectsList += projectsTab;
        });
        setProjectsList();
        checkResolution(mediaQuery);
    }).catch(error => console.error('Erro:', error));
}

//Menu
function checkResolution(e) {
    if (e.matches) {
        // Mobile
        desktopToggle.classList.remove('show');
        listMobile.innerHTML = `
            <li><a href="../../index.html">Início</a></li>
            ${projectsList}
        `
    } else {
        mobileToggle.classList.remove('open');// Desktop
        listMobile.innerHTML = `
            <li><a href="../../index.html">Início</a></li>
            <li><span onclick="menuDesktopToggle()">Projetos</span></li>
        `
    }
}

// Hamburguer
if (mobileToggle && listMobile) {
    mobileToggle.addEventListener('click', () => {
        listMobile.classList.toggle('open');
        mobileToggle.classList.toggle('open');
    });

    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            listMobile.classList.remove('open');
            mobileToggle.classList.remove('open');
        });
    });
}
//Menu
function menuDesktopToggle(){
    desktopToggle.classList.toggle('show');
}

function getYear() {
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.textContent = currentYear;
    }
}

// ------- //
checkResolution(mediaQuery);

mediaQuery.addEventListener('change', checkResolution);

window.addEventListener('DOMContentLoaded', () => {
    loadProject();
    loadProjectsList();
    getYear();
});