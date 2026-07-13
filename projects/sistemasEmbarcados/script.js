const listMobile = document.getElementById('listMobile');
const mobileToggle = document.getElementById('mobileToggle');

// Quando os vídeos estão visíveis na tela
const videoObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const video = entry.target;
    
    if (entry.isIntersecting) {
      // Visível
      video.play().catch(error => {
        console.log(error);
      });
    } else {
      // Sai da tela
      video.pause();
    }
  });
}, {
  threshold: 1 // Vídeo inteiro visível para iniciar
});

async function loadProjects() {
  const projectsHeader = document.querySelector("#projects");
  const section = projectsHeader.closest("section");

  try {
    const res = await fetch("./sistemasEmbarcados.json");
    const projects = await res.json();

    projects.forEach((project) => {
      section.appendChild(createCard(project));
    });
  } catch (err) {
    console.error("Erro ao carregar os projetos:", err);
  }
}

function createCard(project) {
  const card = document.createElement("div");
  card.classList.add("card");

  // Título
  const title = document.createElement("h3");
  title.classList.add("projectTitle");
  title.textContent = project.title;
  card.appendChild(title);

  // Descrição
  const description = document.createElement("p");
  description.textContent = project.description;
  card.appendChild(description);

  const hasFiles = project.projectFiles && project.projectFiles.length > 0; // Se tem mídia

  if (hasFiles) {
    // Projeto COM mídia
    const filesDiv = document.createElement("div");
    filesDiv.classList.add("files");

    project.projectFiles.forEach((file) => {
      const el = createMediaElement(file.name);
      if (el) filesDiv.appendChild(el);
    });

    card.appendChild(filesDiv);

    if (project.link) {
      const linkP = document.createElement("p");
      linkP.classList.add("link");
      linkP.innerHTML = `Confira a simulação no <a href="https://www.tinkercad.com/things/${project.link}" target="_blank" rel="noopener">Tinkercad</a>`;
      card.appendChild(linkP);
    }
  } else if (project.link) {
    // Projeto SEM mídia

    // Versão desktop (iframe)
    const simulationDiv = document.createElement("div");
    simulationDiv.classList.add("simulation", "simulation-desktop");

    const iframe = document.createElement("iframe");
    iframe.width = "450";
    iframe.height = "280";
    iframe.src = `https://www.tinkercad.com/embed/${project.link}`;
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("marginwidth", "0");
    iframe.setAttribute("marginheight", "0");
    iframe.setAttribute("scrolling", "no");

    simulationDiv.appendChild(iframe);

    const legend = document.createElement("p");
    legend.textContent = "Simulação do projeto";
    simulationDiv.appendChild(legend);

    card.appendChild(simulationDiv);

    // Versão mobile (foto do circuito)
    if (project.iframepic) {
      const mobileDiv = document.createElement("div");
      mobileDiv.classList.add("simulation-mobile");

      const img = document.createElement("img");
      img.src = "../../img/sistemasEmbarcados/" + project.iframepic;
      img.alt = "Foto do circuito do projeto";
      mobileDiv.appendChild(img);

      card.appendChild(mobileDiv);
    }

    // Link do Tinkercad (projetos)
    const linkP = document.createElement("p");
    linkP.classList.add("link", "simulation-mobile");
    linkP.innerHTML = `Confira a simulação no <a href="https://www.tinkercad.com/things/${project.link}" target="_blank" rel="noopener">Tinkercad</a>`;
    card.appendChild(linkP);
  }

  return card;
}

// Cria a mídia de acordo com a extensão do arquivo (".mp4", ".jpg", ".png"...)
function createMediaElement(fileName) {
  const ext = fileName.split(".").pop().toLowerCase();
  const path = "../../img/sistemasEmbarcados/" + fileName;

  const videoExts = ["mp4", "webm", "ogg"];
  const imageExts = ["jpg", "jpeg", "png", "gif", "webp"];

  if (videoExts.includes(ext)) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("media-item", "video-wrapper");

    const video = document.createElement("video");
    video.muted = true;
    video.controls = true;
    video.loop = true;

    const source = document.createElement("source");
    source.src = path;
    source.type = `video/${ext}`;
    video.appendChild(source);

    const badge = document.createElement("span");
    badge.classList.add("video-badge");
    badge.innerHTML = `<i class="fa-solid fa-play"></i> Vídeo`;

    wrapper.appendChild(video);
    wrapper.appendChild(badge);

    videoObserver.observe(video);

    return wrapper;
  }

  if (imageExts.includes(ext)) {
    const img = document.createElement("img");
    img.src = path;
    img.alt = "Imagem do projeto";
    return img;
  }

  return null;
}

function setProjectsList() {
    listDesktop.innerHTML = `
        ${projectsList}
    `;
    listMobile.innerHTML = `
        <li><a href="../../index.html">Início</a></li>
        ${projectsList}
    `;
}

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
        listMobile.innerHTML = `
            <li><a href="../../index.html">Início</a></li>
            <li><span onclick="menuDesktopToggle()">Projetos</span></li>
        `;
    }
}

// Hambúrguer
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

// ------- //
checkResolution(mediaQuery);

mediaQuery.addEventListener('change', checkResolution);

window.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    loadProjectsList();
    getYear();
});