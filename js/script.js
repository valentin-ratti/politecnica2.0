// =============================
// FADE ANIMATION
// =============================
const faders = document.querySelectorAll('.fade');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.2 });

faders.forEach(el => observer.observe(el));


// =============================
// MOBILE MENU
// =============================
// ================= MENU RESPONSIVE LIMPIO =================
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.style.display =
        navMenu.style.display === "block" ? "none" : "block";
    });
  }
});


// =============================
// SCROLL SUAVE
// =============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});


// =============================
// HEADER SCROLL EFFECT
// =============================
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (!header) return;
  window.scrollY > 50
    ? header.classList.add("scrolled")
    : header.classList.remove("scrolled");
});


// =============================
// CHAT TOGGLE
// =============================
const chatButton = document.getElementById("chatButton");
const chatbot = document.getElementById("chatbot");

if (chatButton && chatbot) {
  chatButton.addEventListener("click", () => {
    chatbot.style.display =
      chatbot.style.display === "block" ? "none" : "block";
  });
}


// =============================
// CHATBOT SIMPLE IA
// =============================
const chatInput = document.getElementById("chatInput");
const chatBody = document.getElementById("chatBody");

if (chatInput) {
  chatInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      const text = chatInput.value.trim();
      if (!text) return;

      addMessage("usuario", text);
      respond(normalize(text));
      chatInput.value = "";
    }
  });
}

function addMessage(sender, text) {
  const div = document.createElement("div");
  div.textContent = text;
  div.classList.add(sender === "usuario" ? "usuario" : "asistente");
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function normalize(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function respond(text) {
  let response =
    "No estoy seguro, pero podés consultar por mail o por teléfono o escribir otra pregunta 😊";

  if (text.includes("hola") || text.includes("buenas")) {
    response = "¡Hola! 👋 ¿En qué puedo ayudarte?";
  } else if (text.includes("inscripcion")) {
    response =
      "📝 Las inscripciones se realizan según el calendario escolar. Te recomendamos consultar en secretaría o seguir nuestras redes para fechas actualizadas.";
  } else if (text.includes("direccion") || text.includes("ubicacion")) {
    response =
      "📍 Estamos en Bolívar 346, barrio de Montserrat - CABA, a pocas cuadras de Plaza de Mayo.";
  } else if (text.includes("especialidad")) {
    response =
      "⚙️ Tenemos 3 especialidades:\n• Automotores\n• Electromecánica\n• Electrónica";
  } else if (text.includes("horario") || text.includes("turno")) {
    response =
      "🕒 Turnos disponibles:\n• Mañana: 7:00 a 12:20\n• Tarde: 13:00 a 17:20\n• Vespertino: 17:45 a 21:35/22:10";
  }

  setTimeout(() => addMessage("asistente", response), 500);
}



// =============================
// GALERÍA MODAL SIMPLE
// =============================
function openModal(img) {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");
  if (!modal) return;
  modal.style.display = "flex";
  modalImg.src = img.src;
}

function closeModal() {
  const modal = document.getElementById("imageModal");
  if (modal) modal.style.display = "none";
}


// =============================
// NOVEDADES MODERNAS
// =============================
const novedades = [
  {
    titulo: "ExpoTécnica",
    texto: "Proyectos tecnológicos desarrollados por nuestros estudiantes.",
    video: ""
  },
  {
    titulo: "Feria de Ciencias",
    texto: "Participación en eventos científicos y tecnológicos.",
    video: ""
  },
  {
    titulo: "Desafío Eco",
    texto: "Competencia nacional de autos eléctricos.",
    video: ""
  }
];

const novedadesContainer = document.getElementById("novedadesContainer");

if (novedadesContainer) {
  novedades.forEach(noticia => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <h3>${noticia.titulo}</h3>
      <p>${noticia.texto}</p>
      ${noticia.video ? `<iframe src="${noticia.video}" allowfullscreen></iframe>` : ""}
    `;

    novedadesContainer.appendChild(card);
  });
}


// =============================
// MODAL ESPECIALIDADES
// =============================
const especialidades = {
  automotores: {
    titulo: "Técnico en Automotores",
    img: "img/automotores.jpg",
    descripcion: "Formación en mecánica automotriz y diagnóstico electrónico.",
    duracion: "6 años",
    horarios: "Teoria turno vespertino, taller a contra turno",
    competencias: [
      "Diagnóstico automotriz",
      "Electrónica vehicular",
      "Mantenimiento integral"
    ],
    salidas: ["Talleres", "Empresas automotrices"]
  },

  electromecanica: {
    titulo: "Técnico en Electromecánica",
    img: "img/electromecanica.jpg",
    descripcion: "Sistemas eléctricos, mecánicos y automatización industrial.",
    duracion: "6 años",
    horarios: "Teoria turno vespertino, taller a contra turno",
    competencias: [
      "Instalaciones eléctricas",
      "Automatización",
      "Mantenimiento industrial"
    ],
    salidas: ["Industrias", "Mantenimiento", "Empresas técnicas"]
  },

  electronica: {
    titulo: "Técnico Electrónico",
    img: "img/electronica.jpg",
    descripcion: "Circuitos electrónicos y programación digital.",
    duracion: "6 años",
    horarios: "Teoria turno vespertino, taller a contra turno",
    competencias: [
      "Microcontroladores",
      "Robótica",
      "IoT"
    ],
    salidas: ["Tecnología", "Telecomunicaciones", "Hardware"]
  }
};

function abrirModal(tipo) {
  const data = especialidades[tipo];
  if (!data) return;

  document.getElementById("modal-titulo").innerText = data.titulo;
  document.getElementById("modal-img").src = data.img;
  document.getElementById("modal-descripcion").innerText = data.descripcion;
  document.getElementById("modal-duracion").innerText = data.duracion;
  document.getElementById("modal-horarios").innerText = data.horarios;

  const lista = document.getElementById("modal-competencias");
  lista.innerHTML = "";
  data.competencias.forEach(c => {
    const li = document.createElement("li");
    li.textContent = c;
    lista.appendChild(li);
  });

  const chips = document.getElementById("modal-salidas");
  chips.innerHTML = "";
  data.salidas.forEach(s => {
    const span = document.createElement("span");
    span.textContent = s;
    chips.appendChild(span);
  });

  document.getElementById("modal-especialidad").style.display = "flex";
}

function cerrarModal() {
  document.getElementById("modal-especialidad").style.display = "none";
}

window.addEventListener("click", e => {
  const modal = document.getElementById("modal-especialidad");
  if (e.target === modal) modal.style.display = "none";
});

// =============================
// SALUDO AUTOMÁTICO DEL BOT
// =============================
window.addEventListener("load", () => {
  if (!chatBody) return;

  setTimeout(() => {
    addMessage(
      "asistente",
      "👋 Hola, soy el asistente virtual de la Politécnica Manuel Belgrano.\n\n¿En qué puedo ayudarte?\n\n• Inscripciones\n• Especialidades\n• Horarios\n• Ubicación"
    );
  }, 800);
});
//animacion texto redes

const socialWords = ["Instagram", "YouTube", "nuestras redes"];
let socialIndex = 0;

setInterval(() => {
  socialIndex = (socialIndex + 1) % socialWords.length;
  const el = document.getElementById("socialDynamic");
  if (el) el.textContent = socialWords[socialIndex];
}, 2500);

function toggleSocials() {
  const popup = document.getElementById("socialPopup");
  popup.classList.toggle("show");
  popup.style.display = popup.classList.contains("show") ? "flex" : "none";
}
/* institucional*/

