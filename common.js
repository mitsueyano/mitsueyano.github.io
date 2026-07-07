var projectsList = '';
const listDesktop = document.getElementById('listDesktop');
const desktopToggle = document.getElementById('desktopToggle');
const mediaQuery = window.matchMedia('(max-width: 768px)');

function menuDesktopToggle(){
    desktopToggle.classList.toggle('show');
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

function getYear() {
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;
  }
}