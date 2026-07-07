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
            imagesElement.appendChild(image);
        });
    })}

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