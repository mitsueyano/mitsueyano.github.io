function loadProjects() {
  const timeline = document.querySelector('.timeline');
  if (!timeline) return;
  timeline.innerHTML = '';

  fetch('./projects.json')
    .then(response => {
      if (!response.ok) {
        console.log('Erro ao carregar o arquivo json');
      }
      return response.json();
    })  
    .then(data => {
      data.forEach(project => {

        const item = document.createElement('div');
        item.classList.add('item');

        item.innerHTML = `
          <span class="year">${project.year}</span>
          <div class="card" onclick="window.location.href = './projects/${project.link}'")>
            <h3>${project.title}</h3>
            <p class="inst">${project.institution}</p>
            <p>${project.description}</p>
            <img src="./img/${project.image}" alt="Projeto ${project.title}" />
            <a href="./projects/${project.link}/">Ver detalhes</a>
          </div>
        `;
        
        timeline.appendChild(item);
      });
    })
    .catch(error => console.error('Erro:', error));
}

function getYear() {
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;
  }
}

// Menu mobile
const menuToggle = document.querySelector('.menuToggle');
const navUl = document.querySelector('nav ul');

if (menuToggle && navUl) {
    menuToggle.addEventListener('click', () => {
        navUl.classList.toggle('open');
        menuToggle.classList.toggle('open');
    });

    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            navUl.classList.remove('open');
            menuToggle.classList.remove('open');
        });
    });
}

window.addEventListener('DOMContentLoaded', () => {
  loadProjects();
  getYear();
});

