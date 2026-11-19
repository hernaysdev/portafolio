(() => {
  "use strict";

  const EN = {
    "nav.about": "About",
    "nav.exp": "Experience",
    "nav.projects": "Projects",
    "nav.skills": "Tech stack",
    "nav.contact": "Contact",
    "hero.hello": "Hi, I'm",
    "hero.tagline": "I build microservices, BFFs and web applications for banking and financial retail, and in my spare time I ship my own products: from a booking app to a multiplayer game on Steam.",
    "hero.cv": "Download CV (ES)",
    "hero.contact": "Let's talk",
    "about.title": "About me",
    "about.p1": "I'm a Systems Engineer with 6+ years of experience as a Full-Stack Developer. I've worked for clients such as Falabella Financiero, Banco Estado and Movistar, mostly on the backend — microservices, Backend-for-Frontend, integrations and CI/CD pipelines — while still building frontends with Angular.",
    "about.p2": "I like taking things all the way to production. That's why, besides my job, I run my own products online, with their own servers, deployments and real users.",
    "about.p3": "I lived in the United States for a year (2024–2025), improving my English and working in multicultural environments.",
    "about.years": "years of experience",
    "about.clients": "corporate clients (banking, retail, telco)",
    "about.products": "own products in production",
    "exp.title": "Experience",
    "exp.f.fecha": "Feb 2026 — Present",
    "exp.f.cliente": "Client: Falabella Financiero — CMR Mexico & Peru",
    "exp.f.1": "Digital onboarding for the CMR credit card in Mexico: microservices and BFFs for customer sign-up, evaluation, login and external authentication.",
    "exp.f.2": "Biometric identity validation against Mexico's INE: ingress and orchestration services, plus stubs and mocks for end-to-end testing.",
    "exp.f.3": "Bill payments and phone top-ups with GraphQL BFFs, savings accounts, transfers and a payment-method picker.",
    "exp.f.5": "Infrastructure as code with Terraform: RabbitMQ queues, the Kong gateway and Vault secrets. GitLab CI and Jenkins pipelines with Docker, AWS ECR, SonarQube and Trivy, and monitoring with Datadog.",
    "exp.us.titulo": "International experience · United States",
    "exp.us.1": "A year abroad focused on improving my English and communicating in multicultural environments. Meanwhile, I built and maintained DubeNails and ASR Performance.",
    "exp.be.fecha": "Jul 2022 — Jul 2024",
    "exp.be.cliente": "Client: Banco Estado",
    "exp.be.1": "<b>Vale Vista</b>: deposits, voucher management and micro-frontend implementation.",
    "exp.be.2": "<b>Mutual Funds</b>: end-to-end flows across frontend and backend.",
    "exp.be.3": "<b>Foreign Trade</b>: query modules and API development.",
    "exp.be.4": "<b>Business Payment Button</b>: AWS service integration and transactional processes.",
    "exp.mx.fecha": "Feb 2021 — Jun 2022",
    "exp.mx.1": "New Angular features for public institutions, frontend and backend, integrating REST services built with Node.js and MongoDB, following Scrum.",
    "exp.mv.fecha": "Jan 2020 — Feb 2021",
    "exp.mv.titulo": "Programmer Analyst · <span class=\"acento\">Tarvos Limitada</span>",
    "exp.mv.cliente": "Client: Accenture Chile — Movistar",
    "exp.mv.1": "Maintenance and new features for Movistar's offer landing pages, improving performance and usability.",
    "exp.m58.fecha": "Nov 2019 — Jun 2020",
    "exp.m58.1": "Sales and logistics web app: Angular frontend and a Node.js API with Express and MySQL.",
    "proj.title": "Own projects",
    "proj.lead": "Products I designed, built and run in production myself, end to end.",
    "proj.aurok": "Multiplayer action game (PvP arena and co-op adventures) released on Steam, Google Play and the App Store. It runs on authoritative dedicated servers in two regions (US and Chile), with its own backend for accounts, store and real payments, a desktop launcher with automatic patching, and a website.",
    "proj.dube": "Installable web app (PWA) for a nail salon: bookings in the salon's time zone, an admin calendar, automatic reminders, push notifications, a service catalog and gift cards.",
    "proj.tools": "Free online document tools: PDF and Word editor, digital signatures, OCR, merge, split and compress PDFs, and image conversion.",
    "proj.asr": "Website for a performance car shop in Virginia, USA: dyno tuning, engine builds, fabrication and diagnostics.",
    "proj.ver": "Visit site →",
    "skills.title": "Tech stack",
    "skills.micro": "Microservices",
    "skills.data": "Data & messaging",
    "skills.quality": "Quality & observability",
    "skills.other": "Other",
    "edu.title": "Education",
    "edu.1": "<b>Systems Engineer</b> — Universidad Dr. José Gregorio Hernández, Venezuela (2021)",
    "edu.cert": "Courses",
    "edu.2": "Node: zero to expert · Advanced Angular · JavaScript Master · Modern JavaScript · CSS Master",
    "contact.title": "Contact",
    "contact.lead": "Have a project, a job opening, or just want to say hi? Drop me a line and I'll get back to you.",
    "contact.place": "La Serena, Chile",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.msg": "Message",
    "contact.send": "Send message",
  };

  const MENSAJES = {
    es: {
      sending: "Enviando…",
      ok: "¡Gracias! Tu mensaje llegó, te respondo pronto.",
      missing: "Completa nombre, un correo válido y el mensaje.",
      error: "No se pudo enviar. Inténtalo de nuevo o escríbeme a hernays12@gmail.com.",
    },
    en: {
      sending: "Sending…",
      ok: "Thanks! Your message arrived, I'll reply soon.",
      missing: "Please fill in your name, a valid email and the message.",
      error: "Couldn't send it. Try again or email me at hernays12@gmail.com.",
    },
  };

  const CLAVE_IDIOMA = "idioma";
  const nodos = document.querySelectorAll("[data-i18n]");
  const ES = {};
  nodos.forEach((n) => { ES[n.dataset.i18n] = n.innerHTML; });

  let idioma = "es";

  const leerIdioma = () => {
    try {
      const guardado = localStorage.getItem(CLAVE_IDIOMA);
      if (guardado === "es" || guardado === "en") return guardado;
    } catch (_) { /* almacenamiento bloqueado */ }
    return (navigator.language || "es").toLowerCase().startsWith("es") ? "es" : "en";
  };

  const aplicarIdioma = (nuevo) => {
    idioma = nuevo;
    const dic = nuevo === "en" ? EN : ES;
    nodos.forEach((n) => {
      const texto = dic[n.dataset.i18n];
      if (texto !== undefined) n.innerHTML = texto;
    });
    document.documentElement.lang = nuevo;
    document.getElementById("btnIdioma").textContent = nuevo === "en" ? "ES" : "EN";
    try { localStorage.setItem(CLAVE_IDIOMA, nuevo); } catch (_) { /* sin almacenamiento */ }
  };

  document.getElementById("btnIdioma").addEventListener("click", () => {
    aplicarIdioma(idioma === "es" ? "en" : "es");
  });
  aplicarIdioma(leerIdioma());

  // Menú móvil
  const nav = document.getElementById("nav");
  const btnMenu = document.getElementById("btnMenu");
  btnMenu.addEventListener("click", () => {
    const abierto = nav.classList.toggle("nav--abierto");
    btnMenu.setAttribute("aria-expanded", String(abierto));
  });
  document.getElementById("navLinks").addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      nav.classList.remove("nav--abierto");
      btnMenu.setAttribute("aria-expanded", "false");
    }
  });

  window.addEventListener("scroll", () => {
    nav.classList.toggle("nav--scroll", window.scrollY > 10);
  }, { passive: true });

  // Sección activa en la barra y aparición al hacer scroll
  if ("IntersectionObserver" in window) {
    const enlaces = document.querySelectorAll(".nav__links a");
    const obsSeccion = new IntersectionObserver((entradas) => {
      entradas.forEach((en) => {
        if (!en.isIntersecting) return;
        enlaces.forEach((a) => a.classList.toggle("activo", a.getAttribute("href") === "#" + en.target.id));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll("main section[id]").forEach((s) => obsSeccion.observe(s));

    const revelables = document.querySelectorAll(".linea__item, .tarjeta, .grupo, .datos li");
    const obsRevelar = new IntersectionObserver((entradas, obs) => {
      entradas.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("visible");
          obs.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    revelables.forEach((el) => { el.classList.add("revelar"); obsRevelar.observe(el); });
  }

  document.getElementById("anio").textContent = String(new Date().getFullYear());

  // Formulario de contacto
  const form = document.getElementById("formulario");
  const estado = document.getElementById("estado");
  const CORREO_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const mostrar = (clave, tipo) => {
    estado.textContent = MENSAJES[idioma][clave];
    estado.className = "form__estado" + (tipo ? " " + tipo : "");
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const datos = Object.fromEntries(new FormData(form));
    const nombre = (datos.nombre || "").trim();
    const correo = (datos.correo || "").trim();
    const mensaje = (datos.mensaje || "").trim();
    if (!nombre || !CORREO_VALIDO.test(correo) || !mensaje) {
      mostrar("missing", "error");
      return;
    }
    const boton = form.querySelector("button");
    boton.disabled = true;
    mostrar("sending");
    try {
      const resp = await fetch("/correo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, correo, mensaje, sitio: datos.sitio || "" }),
      });
      if (!resp.ok) throw new Error(String(resp.status));
      form.reset();
      mostrar("ok", "ok");
    } catch (_) {
      mostrar("error", "error");
    } finally {
      boton.disabled = false;
    }
  });
})();
