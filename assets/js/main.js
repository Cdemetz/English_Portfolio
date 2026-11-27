// Tells the CSS that JavaScript works (used by the "reveal" animations:
// without JavaScript, nothing is hidden)
document.documentElement.classList.add("js");

// Show the glass header once the page is scrolled
const header = document.querySelector("header");

const updateHeader = () => {
  header.classList.toggle("scrolled", window.scrollY > 0);
};

window.addEventListener("scroll", updateHeader);
updateHeader(); // also check on page load (e.g. after a refresh mid-page)


// ---------------------------------------------------------------
// MOBILE MENU (small screens): the button opens and closes the links
// ---------------------------------------------------------------
const menuButton = document.querySelector(".menu-button");

const setMenu = (open) => {
  header.classList.toggle("nav-open", open);
  menuButton.setAttribute("aria-expanded", open); // tells screen readers if it is open
  menuButton.setAttribute("aria-label", open ? "Close the menu" : "Open the menu");
};

if (menuButton) {
  menuButton.addEventListener("click", () => {
    setMenu(!header.classList.contains("nav-open"));
  });

  // The Escape key closes the menu and gives the focus back to the button
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && header.classList.contains("nav-open")) {
      setMenu(false);
      menuButton.focus();
    }
  });
}


// ---------------------------------------------------------------
// REVEAL ON SCROLL: elements with the class "reveal" fade in when
// they enter the screen. IntersectionObserver warns us when an
// element becomes visible, without checking on every scroll.
// ---------------------------------------------------------------
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target); // only once
      }
    });
  }, { threshold: 0.12 }); // 12% of the element visible

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible")); // old browsers
}


// ---------------------------------------------------------------
// CONTACT FORM
// The form is sent to Web3Forms in the background (fetch), so the
// visitor stays on the page and sees the result above the form.
// Without JavaScript, the form still works: the browser opens the
// Web3Forms confirmation page instead.
// ---------------------------------------------------------------
const contactForm = document.querySelector(".contact-form");
const formStatus = document.querySelector(".form-status");

const FORM_MESSAGES = {
  sending: { text: "Sending your message...", type: "is-success" },
  sent: { text: "Thank you! Your message has been sent. I will get back to you soon.", type: "is-success" },
  error: { text: "Sorry, the message could not be sent. Please email me directly.", type: "is-error" },
};

function showFormStatus(status) {
  const message = FORM_MESSAGES[status];
  formStatus.textContent = message.text; // textContent: never interpreted as HTML
  formStatus.classList.remove("is-success", "is-error");
  formStatus.classList.add(message.type);
  formStatus.hidden = false;
}

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // stay on the page
    const button = contactForm.querySelector("button[type='submit']");
    button.disabled = true; // no double sending
    showFormStatus("sending");

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(contactForm),
      });
      const result = await response.json();

      if (result.success) {
        showFormStatus("sent");
        contactForm.reset();
      } else {
        showFormStatus("error");
      }
    } catch {
      showFormStatus("error"); // no internet connection or service down
    }

    button.disabled = false;
  });
}

// ---------------------------------------------------------------
// TECHNOLOGIES
// One single list, used by the project cards AND later by the
// filters. Each project refers to a key (TECH.sql) instead of an
// index (technologies[1]): easier to read, and no wrong index.
// ---------------------------------------------------------------
const TECH = {
  csharp: "C# / .NET",
  wpf: "WPF",
  html: "HTML",
  css: "CSS",
  js: "JavaScript",
  php: "PHP",
  laravel: "Laravel",
  sql: "SQL",
  postgres: "PostgreSQL",
  merise: "Merise",
  uml: "UML",
  powerAmc: "PowerAMC",
  visualParadigm: "Visual Paradigm",
  powerBi: "Power BI",
  msProject: "MS Project",
  azureDevOps: "Azure DevOps",
  figma: "Figma",
  ssh: "SSH",
  gdpr: "GDPR",
};

// ---------------------------------------------------------------
// TECHNOLOGY CATEGORIES (used by the Work page filter)
// The cards and the pop-up show the precise technologies; the filter
// only offers these few categories so the visitor is not lost.
// A project belongs to a category if it uses at least one of its tools.
// ---------------------------------------------------------------
const CATEGORIES = [
  { name: "Web development", technologies: [TECH.html, TECH.css, TECH.js, TECH.php, TECH.laravel, TECH.ssh] },
  { name: "Software development", technologies: [TECH.csharp, TECH.wpf] },
  { name: "Data & databases", technologies: [TECH.sql, TECH.postgres, TECH.powerBi, TECH.gdpr] },
  { name: "System design", technologies: [TECH.uml, TECH.merise, TECH.powerAmc, TECH.visualParadigm] },
  { name: "UI / UX design", technologies: [TECH.figma] },
  { name: "Project management", technologies: [TECH.msProject, TECH.azureDevOps] },
];


// Folders of the project media (relative paths: the site lives in a sub-folder)
const IMG = "assets/img/projects/";
const DOC = "assets/pdf/projects/";


// ---------------------------------------------------------------
// PROJECTS (best project first)
// images: the first one is the cover of the cards and tiles;
// the pop-up shows all of them in a carousel.
// links: buttons at the bottom of the pop-up (the first one is the main button).
// ---------------------------------------------------------------
const projects = [
  {
    id: 1,
    images: [
      {
        src: IMG + "sae301-client-website.webp",
        alt: "Home page of the client's current online store",
        caption: "The client's current website: the starting point of our redesign.",
      },
    ],
    date: "Oct 2026 – Feb 2027",
    time: "5 months",
    title: "E-Commerce Website for a Smartphone Retailer",
    description: "A five-month team project to design, develop and deploy a complete e-commerce website, from UML modeling to GDPR compliance.",
    technologies: [TECH.uml, TECH.sql, TECH.postgres, TECH.powerAmc, TECH.laravel, TECH.html, TECH.css, TECH.js, TECH.csharp, TECH.wpf, TECH.powerBi, TECH.ssh, TECH.gdpr, TECH.azureDevOps],
    type: "University project – SAÉ 3.01",
    group: "Team of 5",

    // pop-up
    context: "SAÉ 3.01 is the largest project of the second year of my degree. In a team of five, we are rebuilding the e-commerce website of a smartphone retailer from scratch, showcasing a selection of its computers, smartphones and accessories, in conditions close to a real professional project. It brings together every subject of the course: development, databases, networks, law and communication.",
    objectives: "Rebuild the online store for new and refurbished computers and smartphones and their accessories: a product configurator with compatibility rules between options, the cart and checkout, the customer account, device trade-in and financing. To get there: model the system with UML, build a GDPR-compliant PostgreSQL database, develop the website with Laravel and deploy it on a server, integrate a chatbot and external APIs, secure passwords following the recommendations of the French cybersecurity agency (ANSSI), and write all the legal and user documentation.",
    myRole: "Co-project manager, alongside a teammate. I assign roles and tasks, set deadlines and track the progress of new features.",
    tasks: [
      "Designed the UML diagrams and the conceptual data model (MCD)",
      "Wrote the privacy policy and the record of processing activities (GDPR)",
      "Assigned roles and tasks, and followed up with each team member",
    ],
    keyFeatures: [
      "Product catalog of computers, smartphones and accessories",
      "Record of processing activities and data protection policy",
      "Cookie and user consent management",
      "Chatbot integrated into the website",
      "More features to come: the project is still in progress",
    ],
    organization: "Scrum approach with one-week development sprints, planned and tracked in Azure DevOps and led by two co-project managers. Each sprint ends with a review with the client, sometimes held in English.",
    challenge: "Sharing roles and tasks fairly within a team of five and meeting every deadline. The design phase was also complex, as GDPR and legal requirements had to be considered before any development could start.",
    learned: "How to combine many technologies and tools in a complex, real-world project. I also learned that communication is essential to a team's success, and that listening to others helps me understand their difficulties and needs.",
    result: "In progress – delivery planned for February 2027.",
    links: [],
  },

  {
    id: 2,
    images: [
      {
        src: IMG + "sae201-product-catalog.webp",
        alt: "Product catalog screen of the sales application, with edit and delete buttons on each product",
        caption: "Product catalog, manager view: every product can be edited or deleted.",
      },
      {
        src: IMG + "sae201-class-diagram.webp",
        alt: "UML class diagram of the sales application",
        caption: "Class diagram: one class per business object, all sharing a generic ICrud<T> interface.",
      },
    ],
    date: "April – May 2026",
    time: "2 months",
    title: "Sales Tablet Application",
    description: "A WPF tablet application that lets sales staff create quotes, manage customers and browse the product catalog.",
    technologies: [TECH.csharp, TECH.wpf, TECH.postgres, TECH.figma],
    type: "University project – SAÉ 2.01",
    group: "Team of 3",

    // pop-up
    context: "As part of the redesign of a furniture company's information system, our team developed the sales and administration module of the new solution. The application was designed for tablets and connected to a database designed beforehand.",
    objectives: "Develop a desktop application in WPF and work with datasets to query the company's PostgreSQL database.",
    myRole: "Informal team leader. Tasks were shared equally and each member worked autonomously; I was in charge of the entire user interface.",
    tasks: [
      "Designed the mockup of the application in Figma",
      "Developed the entire user interface in WPF",
      "Integrated the database data into the application",
    ],
    keyFeatures: [
      "Secure login with two roles: sales representative and manager",
      "Quote creation and list of quotes",
      "Customer creation and list of customers",
      "Product catalog with a shopping cart",
      "Data grids with filters by date and customer name",
      "Admin panel to add, edit or delete product categories, quote statuses and customers",
      "Quotes and contracts generated as PDF files",
      "Object-oriented architecture: a generic ICrud<T> interface (create, read, update, delete) shared by every business class",
    ],
    organization: "Collaborative team work with a fixed deadline and tasks shared equally.",
    challenge: "Connecting the PostgreSQL database to the WPF project and displaying the data correctly in the interface.",
    learned: "How to connect a database to an application, and why designing a mockup first makes development much easier.",
    result: "Completed.",
    links: [
      { label: "Figma prototype", url: "https://www.figma.com/design/dQeNbHXME8EoEmnjIhlRFs/Sans-titre?node-id=3-36" },
      { label: "Class diagram (PDF)", url: DOC + "sae201-class-diagram.pdf" },
    ],
  },

  {
    id: 3,
    images: [
      {
        src: IMG + "sae204-dashboard-performance.webp",
        alt: "Power BI dashboard page with the number of orders, new customers per month and orders by status",
        caption: "Company performance: orders, new customers and order status, filtered by year.",
      },
      {
        src: IMG + "sae204-dashboard-analytics.webp",
        alt: "Power BI dashboard page with the revenue per year and the order lines per category",
        caption: "Analytics: revenue per year, average prices and order lines per product category.",
      },
      {
        src: IMG + "sae204-dashboard-geography.webp",
        alt: "Power BI dashboard page with the revenue and the number of customers per town",
        caption: "Geography: revenue and registered customers per town and postcode.",
      },
    ],
    date: "April – May 2026",
    time: "2 months",
    title: "Database Design & Power BI Dashboard",
    description: "A new customer and order database for a furniture company, analyzed through an interactive Power BI dashboard.",
    technologies: [TECH.sql, TECH.postgres, TECH.merise, TECH.powerAmc, TECH.powerBi],
    type: "University project – SAÉ 2.04",
    group: "Team of 3",

    // pop-up
    context: "For the same furniture company as in SAÉ 2.05, our team designed the new database for customers and orders, then turned its data into a dashboard to support business decisions.",
    objectives: "Design the data model, write the SQL script, fill the database with consistent and compliant data, then explore and present the results in a dashboard.",
    myRole: "Team member in a group of three, with tasks shared equally.",
    tasks: [
      "Designed the conceptual data model (MCD)",
      "Wrote the SQL script: tables, constraints, checks, inserts and updates",
      "Generated a large, realistic dataset with GenerateData",
      "Analyzed the data and built the Power BI dashboard",
    ],
    keyFeatures: [
      "Relational database for customers and orders",
      "Data integrity rules (constraints and checks)",
      "Three-page dashboard: company performance, analytics and geography, with a filter by year",
      "Oral presentation of the dashboard, entirely in English",
    ],
    organization: "Collaborative team work with a fixed deadline, without a specific method.",
    challenge: "Generating a large volume of data that remained consistent with all the constraints of the SQL script.",
    learned: "How to create and administer a database, and how data can support a company's analysis and decisions.",
    result: "Our teacher now uses our Power BI presentation as an example for other students.",
    links: [],
  },

  {
    id: 4,
    images: [
      {
        src: IMG + "portfolio-home.webp",
        alt: "Home page of this portfolio website",
        caption: "The home page of this website, coded by hand without any framework.",
      },
      {
        src: IMG + "portfolio-work.webp",
        alt: "Work page of this portfolio, with the projects orbiting around the technology filter",
        caption: "The Work page: the projects orbit around the chosen technology.",
      },
    ],
    date: "November 2026",
    time: "1 month",
    title: "Personal Portfolio Website",
    description: "This website: a hand-coded portfolio in HTML, CSS and vanilla JavaScript, built to present my work to international recruiters.",
    technologies: [TECH.html, TECH.css, TECH.js, TECH.figma],
    type: "University project – English module",
    group: "Solo project",

    // pop-up
    context: "Created for my professional English module, this portfolio presents my projects, skills and experience to recruiters abroad. The goal is to stand out and make them want to work with me.",
    objectives: "Build a website with HTML, CSS and JavaScript only, with no framework and no CMS, and learn how to code a website from scratch.",
    myRole: "Sole designer and developer.",
    tasks: [
      "Researched design trends and created mockups and prototypes in Figma",
      "Wrote the HTML structure and developed the design in CSS",
      "Added JavaScript features to automate repetitive tasks",
      "Bought a domain name and optimized the website for search engines (SEO)",
    ],
    keyFeatures: [
      "Project cards generated automatically with JavaScript",
      "Technology filter: the matching projects orbit around the chosen category",
      "Pop-up window with the details of each project and an image carousel",
      "Contact form",
    ],
    organization: "Weekly Scrum sprints tracked on a Miro board, with the code versioned on GitHub.",
    challenge: "Finding design inspiration and building a clear, concise structure for visitors. I solved it with a research phase on Awwwards, Pinterest and other web design sites, followed by mockups in Figma.",
    learned: "Many CSS and JavaScript techniques, and how to make my portfolio stand out from other students' work.",
    result: "Online at clement-demetz.com.",
    links: [
      { label: "Live website", url: "https://clement-demetz.com" },
      { label: "GitHub repository", url: "https://github.com/Cdemetz/English_Portfolio" },
    ],
  },

  {
    id: 5,
    images: [
      {
        src: IMG + "sae205-mockup-catalog.webp",
        alt: "Figma mockup of the tablet application: product search with filters by range and color",
        caption: "Figma mockup: product search for franchisees, with filters by range and color.",
      },
      {
        src: IMG + "sae205-mockup-new-customer.webp",
        alt: "Figma mockup of the tablet application: form to create a new customer",
        caption: "Figma mockup: creating a customer record before a new order.",
      },
      {
        src: IMG + "sae205-activity-diagram.webp",
        alt: "UML activity diagram of the order process, from the franchisee to the factories",
        caption: "UML activity diagram: an order's journey from the store to the factories and back.",
      },
      {
        src: IMG + "sae205-use-case-diagram.webp",
        alt: "UML use case diagram of the factory management part",
        caption: "UML use case diagram of the factory management part.",
      },
      {
        src: IMG + "sae205-deployment-diagram.webp",
        alt: "UML deployment diagram of the company's current IT infrastructure",
        caption: "UML deployment diagram of the current IT infrastructure, analyzed to find its limits.",
      },
    ],
    date: "April – May 2026",
    time: "2 months",
    title: "Project Management & Requirements Analysis",
    description: "Analysis of a furniture company's needs, leading to a requirements specification and a complete project management plan.",
    technologies: [TECH.uml, TECH.visualParadigm, TECH.msProject, TECH.figma],
    type: "University project – SAÉ 2.05",
    group: "Team of 3",

    // pop-up
    context: "Our team studied how a furniture company with about 300 franchised stores and several factories currently works: its structure, its activity, and the roles of the project owner (MOA) and the project contractor (MOE). The aim was to prepare a new version of its information system.",
    objectives: "Understand the existing system, identify the expected improvements, and propose the changes required for a new version of the company's information system.",
    myRole: "Team leader. I assigned roles and goals, adapted each person's tasks to their strengths, and made sure we met every deadline.",
    tasks: [
      "Built the project schedule in MS Project",
      "Designed a Figma mockup of the company's new solution",
      "Modeled the organization with UML activity, use case and deployment diagrams",
    ],
    keyFeatures: [
      "Requirements specification",
      "Analysis of the current IT system and its limits",
      "Use case descriptions with sequence diagrams",
      "Non-functional requirements and proposed solution (Laravel and PostgreSQL)",
      "Project management file",
      "Project schedule in MS Project",
      "UML diagrams and Figma mockup",
    ],
    organization: "Autonomous team work with a fixed deadline; I naturally took the lead to guide the project.",
    challenge: "Defining the company's new needs and the changes required to meet them.",
    learned: "How to lead a project from the analysis phase: understanding a client's needs, planning the work and organizing a team.",
    result: "Completed.",
    links: [
      { label: "Figma mockup", url: "https://www.figma.com/design/Smz3RSJhZGaudyz9FvI1Be/Sans-titre?node-id=0-1&t=BrLQy0Te1uNKiJDW-1" },
      { label: "Requirements specification (PDF, in French)", url: DOC + "sae205-requirements-specification.pdf" },
    ],
  },
];


// Create an element, give it a class and a text (both optional),
// add it inside its parent and return it so we can fill it too
const addElement = (parent, tag, className, text) => {
  const element = document.createElement(tag);
  if (className)
    element.classList.add(className);
  if (text)
    element.textContent = text;
  parent.appendChild(element);
  return element;
};


// Maximum number of technology tags shown on a home page card
const MAX_CARD_TAGS = 3;

// Build one card per project inside the grid (only on pages that have it)
const grid = document.querySelector(".projects-preview-grid");

if (grid) {
  projects.forEach((project) => {
    const card = addElement(grid, "article", "project-card");

    // Cover image: the first image of the project (if it has one)
    const mediaBox = addElement(card, "div", "project-media");
    if (project.images.length > 0) {
      const image = addElement(mediaBox, "img");
      image.src = project.images[0].src;
      image.alt = project.images[0].alt;
      image.loading = "lazy"; // downloaded only when the card gets close to the screen
    }

        // Date and duration
    const meta = addElement(card, "div", "project-meta");
    addElement(meta, "span", "project-date", project.date);
    addElement(meta, "span", "project-time", project.time);


    // Main text
    const copy = addElement(card, "div", "project-copy");
    addElement(copy, "h3", "project-title", project.title);
    addElement(copy, "p", "project-description", project.description);

    // Only the first 3 technologies on the card (the full list stays in
    // the data for the filter and the pop-up), then "…" if there are more
    const techList = addElement(copy, "ul", "project-tags");
    project.technologies.slice(0, MAX_CARD_TAGS).forEach((tech) => {
      addElement(techList, "li", "project-tag", tech);
    });

    const hiddenCount = project.technologies.length - MAX_CARD_TAGS;
    if (hiddenCount > 0) {
      const more = addElement(techList, "li", "project-tag");
      more.classList.add("project-tag-more");
      more.title = project.technologies.slice(MAX_CARD_TAGS).join(", "); // full list on hover
      addElement(more, "span", "", "…").setAttribute("aria-hidden", "true");
      addElement(more, "span", "visually-hidden", "and " + hiddenCount + " more");
    }

    addElement(copy, "span", "project-type", project.type);
    addElement(copy, "span", "project-group", project.group);
    // Link to this project on the Work page: the #project-1 part will
    // be used later to open the right pop-up when the page loads
    const link = addElement(copy, "a", "project-link", "View details");
    link.href = "work.html#project-" + project.id;
    link.setAttribute("aria-label", "View details of " + project.title);
    const arrow = addElement(link, "span", "project-link-arrow", "→");
    arrow.setAttribute("aria-hidden", "true"); // decorative: not read aloud
  });

  // Last item at the end of the horizontal scroll: link to all projects
  const viewAll = addElement(grid, "a", "projects-view-all");
  viewAll.href = "work.html";
  const viewAllIcon = addElement(viewAll, "span", "projects-view-all-icon", "→");
  viewAllIcon.setAttribute("aria-hidden", "true");
  addElement(viewAll, "span", "projects-view-all-text", "View all my projects");
}

// ---------------------------------------------------------------
// HORIZONTAL SCROLL OF THE PROJECT CARDS (home page only)
// The section is pinned on screen (CSS sticky) and the vertical
// scroll inside it moves the cards to the left.
// ---------------------------------------------------------------
const section = document.querySelector(".projects-preview");

// Number of pixels the cards must travel until the last one is visible
let distance = 0;

// Same breakpoint as the CSS: on phones and tablets the cards are swiped
// natively (CSS scroll snap), so this pinned effect is switched off.
const smallScreen = window.matchMedia("(max-width: 768px)");

// Last known screen width: on phones, the address bar that hides/shows
// fires "resize" (height only) while scrolling. Ignoring it avoids jumps.
let lastWidth = window.innerWidth;

// Move the cards according to how far we have scrolled inside the section
const moveCards = () => {
  if (smallScreen.matches) return; // native swipe on small screens

  // top of the section relative to the top of the screen:
  // 0 when it reaches the top, then -100, -200... as we keep scrolling
  const scrolled = -section.getBoundingClientRect().top;

  // never before the first card (0), never after the last one (distance)
  const progress = Math.min(Math.max(scrolled, 0), distance);

  grid.style.transform = `translateX(-${progress}px)`;
};

// Measure the cards and give the section the height needed to scroll through them
const setupHorizontalScroll = () => {
  lastWidth = window.innerWidth;

  // Small screen: normal section height, no transform (the CSS handles the swipe)
  if (smallScreen.matches) {
    section.style.height = "";
    grid.style.transform = "";
    return;
  }

  // full width of the row of cards - visible width
  // (scrollWidth forgets the right padding, so we add it back:
  // the last card then stops with the same gap as the first one)
  const paddingRight = parseFloat(getComputedStyle(grid).paddingRight);
  distance = Math.max(grid.scrollWidth + paddingRight - grid.clientWidth, 0);

  // one screen to stay pinned + the distance to travel
  section.style.height = window.innerHeight + distance + "px";

  moveCards();
};

if (section && grid) {
  setupHorizontalScroll();
  window.addEventListener("load", setupHorizontalScroll);   // fonts and images change the widths
  // new screen width = new distance (a height-only change is the mobile address bar: ignored)
  window.addEventListener("resize", () => {
    const touchScreen = window.matchMedia("(pointer: coarse)").matches;
    if (!touchScreen || window.innerWidth !== lastWidth) setupHorizontalScroll();
  });
  smallScreen.addEventListener("change", setupHorizontalScroll); // e.g. a tablet turned sideways
  window.addEventListener("scroll", moveCards, { passive: true });
}


// ---------------------------------------------------------------
// WORK PAGE: TECHNOLOGY FILTER IN ORBIT
// The chosen category sits in the center (drop-down list) and the
// matching projects orbit around it. The slow rotation is a CSS
// animation; JS only decides which projects are shown and where.
// ---------------------------------------------------------------
const orbitList = document.querySelector(".orbit-projects");
const techFilter = document.querySelector("#tech-filter");
const orbitCount = document.querySelector(".orbit-count");

// Does this project use at least one tool of this category?
const isInCategory = (project, categoryName) => {
  const category = CATEGORIES.find((item) => item.name === categoryName);
  return project.technologies.some((tech) => category.technologies.includes(tech));
};

if (orbitList && techFilter) {
  // 1. Fill the drop-down list with the categories that have at least one project
  CATEGORIES
    .filter((category) => projects.some((project) => isInCategory(project, category.name)))
    .forEach((category) => {
      const option = addElement(techFilter, "option", "", category.name);
      option.value = category.name;
    });

  // 2. Create one tile per project, once. We keep each tile with its
  //    project so the filter can show or hide it later.
  const orbitItems = projects.map((project) => {
    const item = addElement(orbitList, "li", "orbit-item");
    const tile = addElement(item, "a", "orbit-tile");
    tile.href = "#project-" + project.id; // opens the pop-up (see below)

    const media = addElement(tile, "div", "orbit-tile-media");
    if (project.images.length > 0) {
      const image = addElement(media, "img");
      image.src = project.images[0].src;
      image.alt = ""; // the title just below already describes the link
    }
    addElement(tile, "span", "orbit-tile-date", project.date);
    addElement(tile, "span", "orbit-tile-title", project.title);
    addElement(tile, "span", "orbit-tile-type", project.type);

    const more = addElement(tile, "span", "orbit-tile-more", "View details ");
    addElement(more, "span", "orbit-tile-arrow", "→").setAttribute("aria-hidden", "true");

    return { project, item };
  });

  // 3. Show the projects of the chosen category, evenly spread on the circle
  const updateOrbit = () => {
    const choice = techFilter.value;
    const visibleItems = orbitItems.filter(({ project }) =>
      choice === "all" || isInCategory(project, choice)
    );

    // hide everything, then show and place the matching projects
    orbitItems.forEach(({ item }) => item.classList.add("is-hidden"));

    visibleItems.forEach(({ item }, index) => {
      // e.g. 4 projects → 0°, 90°, 180°, 270° (minus 90° to start at the top)
      const angle = (360 / visibleItems.length) * index - 90;
      item.style.setProperty("--angle", angle + "deg");
      item.classList.remove("is-hidden");
    });

    const total = visibleItems.length;
    orbitCount.textContent = total + (total > 1 ? " projects" : " project");
  };

  techFilter.addEventListener("change", updateOrbit);
  updateOrbit(); // first display: "All"
}


// ---------------------------------------------------------------
// WORK PAGE: PROJECT POP-UP
// Native <dialog> element: showModal() darkens the page, keeps the
// keyboard inside the pop-up and closes it with the Escape key.
// A link to "#project-3" (home cards, orbit tiles) opens project 3.
// ---------------------------------------------------------------
const dialog = document.querySelector(".project-dialog");
const dialogBody = document.querySelector(".dialog-body");
const dialogClose = document.querySelector(".dialog-close");

// A titled paragraph, only added if the text is not empty
const addBlock = (parent, heading, text) => {
  if (!text) return;
  const block = addElement(parent, "div", "dialog-block");
  addElement(block, "h3", "dialog-heading", heading);
  addElement(block, "p", "dialog-text", text);
};

// A titled bullet list, only added if the list is not empty
const addListBlock = (parent, heading, items) => {
  if (!items || items.length === 0) return;
  const block = addElement(parent, "div", "dialog-block");
  addElement(block, "h3", "dialog-heading", heading);
  const list = addElement(block, "ul", "dialog-list");
  items.forEach((text) => addElement(list, "li", "", text));
};

// Image carousel at the top of the pop-up.
// All the images sit side by side in a "track"; showing image n means
// sliding the track n widths to the left. With one image, no buttons.
const addCarousel = (parent, project) => {
  const images = project.images;
  if (images.length === 0) return;

  const carousel = addElement(parent, "section", "carousel");
  carousel.setAttribute("aria-label", "Images of " + project.title);

  const viewport = addElement(carousel, "div", "carousel-viewport");
  const track = addElement(viewport, "div", "carousel-track");
  const slides = images.map((item) => {
    const slide = addElement(track, "div", "carousel-slide");
    const image = addElement(slide, "img");
    image.src = item.src;
    image.alt = item.alt;
    return slide;
  });

  // Bar under the image: caption, "2 / 4", link to the full-size image
  const bar = addElement(carousel, "div", "carousel-bar");
  const caption = addElement(bar, "p", "carousel-caption");
  caption.setAttribute("aria-live", "polite"); // read aloud when the image changes
  const counter = addElement(bar, "span", "carousel-counter");
  const fullSize = addElement(bar, "a", "carousel-full-size", "Full size ");
  fullSize.target = "_blank";
  fullSize.rel = "noopener";
  addElement(fullSize, "span", "", "↗").setAttribute("aria-hidden", "true");
  addElement(fullSize, "span", "visually-hidden", "(opens the image in a new tab)");

  let current = 0;
  const dots = [];

  const showImage = (index) => {
    // loop: after the last image comes the first one, and the other way
    current = (index + images.length) % images.length;
    track.style.transform = `translateX(-${current * 100}%)`;

    // hidden images are skipped by screen readers
    slides.forEach((slide, i) => slide.setAttribute("aria-hidden", i !== current));
    dots.forEach((dot, i) => dot.setAttribute("aria-current", i === current));

    caption.textContent = images[current].caption;
    counter.textContent = images.length > 1 ? current + 1 + " / " + images.length : "";
    fullSize.href = images[current].src;
  };

  if (images.length > 1) {
    // Previous / next arrows on both sides of the image
    const previous = addElement(viewport, "button", "carousel-arrow");
    previous.classList.add("carousel-arrow-previous");
    previous.type = "button";
    previous.setAttribute("aria-label", "Previous image");
    addElement(previous, "span", "", "←").setAttribute("aria-hidden", "true");
    previous.addEventListener("click", () => showImage(current - 1));

    const next = addElement(viewport, "button", "carousel-arrow");
    next.classList.add("carousel-arrow-next");
    next.type = "button";
    next.setAttribute("aria-label", "Next image");
    addElement(next, "span", "", "→").setAttribute("aria-hidden", "true");
    next.addEventListener("click", () => showImage(current + 1));

    // One dot per image, to jump straight to it
    const dotList = addElement(viewport, "div", "carousel-dots");
    images.forEach((item, index) => {
      const dot = addElement(dotList, "button", "carousel-dot");
      dot.type = "button";
      dot.setAttribute("aria-label", "Show image " + (index + 1) + " of " + images.length);
      dot.addEventListener("click", () => showImage(index));
      dots.push(dot);
    });

    // Left and right arrow keys work while the focus is in the carousel
    carousel.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") showImage(current - 1);
      if (event.key === "ArrowRight") showImage(current + 1);
    });
  }

  showImage(0);
};

// Fill the pop-up with one project, then open it
const openProject = (project) => {
  dialogBody.innerHTML = ""; // remove the previous project

  // Screenshots, mockups and diagrams
  addCarousel(dialogBody, project);

  // Summary: type of work, title, dates, description, all technologies
  const intro = addElement(dialogBody, "div", "dialog-intro");
  addElement(intro, "p", "dialog-eyebrow", project.type + " · " + project.group);
  const title = addElement(intro, "h2", "dialog-title", project.title);
  title.id = "dialog-title"; // the <dialog> is labeled by this title
  addElement(intro, "p", "dialog-dates", project.date + " · " + project.time);
  addElement(intro, "p", "dialog-description", project.description);
  const tags = addElement(intro, "ul", "project-tags");
  project.technologies.forEach((tech) => addElement(tags, "li", "project-tag", tech));

  // Details: the story on the left, the key facts on the right
  const columns = addElement(dialogBody, "div", "dialog-columns");

  const story = addElement(columns, "div", "dialog-main");
  addBlock(story, "Context", project.context);
  addBlock(story, "Objectives", project.objectives);
  addBlock(story, "My role", project.myRole);
  addListBlock(story, "What I did", project.tasks);
  addBlock(story, "Challenge", project.challenge);
  addBlock(story, "What I learned", project.learned);

  const facts = addElement(columns, "div", "dialog-aside");
  addListBlock(facts, "Key features", project.keyFeatures);
  addBlock(facts, "Organization", project.organization);
  addBlock(facts, "Result", project.result);

  // External links: a bar of buttons stuck to the bottom of the pop-up,
  // always visible while reading. The first link is the main button.
  if (project.links.length > 0) {
    const actions = addElement(dialogBody, "div", "dialog-actions");
    project.links.forEach((link, index) => {
      const button = addElement(actions, "a", "dialog-button", link.label);
      if (index === 0) button.classList.add("dialog-button-primary");
      button.href = link.url;
      button.target = "_blank";
      button.rel = "noopener";
      addElement(button, "span", "dialog-button-icon", "↗").setAttribute("aria-hidden", "true");
      addElement(button, "span", "visually-hidden", "(opens in a new tab)");
    });
  }

  dialog.showModal();
  dialogBody.scrollTop = 0; // always start at the top of the pop-up
};

// Read "#project-3" in the address bar and open project 3
const openFromHash = () => {
  const id = Number(window.location.hash.replace("#project-", ""));
  const project = projects.find((item) => item.id === id);
  if (project) openProject(project);
};

if (dialog) {
  dialogClose.addEventListener("click", () => dialog.close());

  // a click on the dark background (outside the white box) closes the pop-up
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  // once closed (button, Escape or background), remove "#project-3" from
  // the address, so clicking the same tile again opens it again
  dialog.addEventListener("close", () => {
    history.replaceState(null, "", window.location.pathname + window.location.search);
  });

  window.addEventListener("hashchange", openFromHash); // click on a tile
  openFromHash(); // arrival from a home page card (work.html#project-3)
}


// ---------------------------------------------------------------
// INTERESTS PAGE: PHOTO CAROUSEL (coverflow, infinite loop)
// The strip of photos is a real horizontal scroll (CSS scroll snap):
// swiping works natively on phones. This script:
//  - copies all the photos once before and once after the real ones,
//    so the last photo is already visible on the left of the first one;
//  - when the scroll stops on a copy, jumps without animation to the
//    real photo that looks exactly the same: the loop never ends;
//  - marks the photo in the center (.is-active), updates the counter
//    "06/15" and the progress bar, and adds arrows, keys and clicks.
// ---------------------------------------------------------------
const coverflow = document.querySelector(".coverflow");

if (coverflow) {
  const track = coverflow.querySelector(".coverflow-track");
  const realSlides = [...track.querySelectorAll(".coverflow-slide")];
  const total = realSlides.length;
  const previousButton = coverflow.querySelector(".coverflow-previous");
  const nextButton = coverflow.querySelector(".coverflow-next");
  const progress = coverflow.querySelector(".coverflow-progress");
  const status = coverflow.querySelector(".coverflow-status");
  const counter = document.querySelector(".gallery-current");
  const counterTotal = document.querySelector(".gallery-total");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 1. Copies: [copies of 1..15] [real 1..15] [copies of 1..15]
  const makeCopy = (slide) => {
    const copy = slide.cloneNode(true);
    copy.classList.add("is-copy");
    copy.setAttribute("aria-hidden", "true"); // screen readers only read the real photos
    return copy;
  };
  realSlides.forEach((slide) => track.append(makeCopy(slide))); // copies after
  [...realSlides].reverse().forEach((slide) => track.prepend(makeCopy(slide))); // copies before
  const slides = [...track.querySelectorAll(".coverflow-slide")]; // 3 × total

  let activeIndex = -1; // position in "slides" (0 to 3 × total − 1)
  const twoDigits = (number) => String(number).padStart(2, "0"); // 6 → "06"

  // Horizontal position that puts a photo in the center of the strip
  const centerOf = (slide) => slide.offsetLeft + slide.offsetWidth / 2 - track.clientWidth / 2;

  // The photo whose center is the closest to the center of the strip
  const findCenteredSlide = () => {
    let closest = 0;
    let smallestDistance = Infinity;
    slides.forEach((slide, index) => {
      const distance = Math.abs(centerOf(slide) - track.scrollLeft);
      if (distance < smallestDistance) {
        smallestDistance = distance;
        closest = index;
      }
    });
    return closest;
  };

  // Mark the active photo and update everything that depends on it
  const setActive = (index) => {
    if (index === activeIndex) return; // nothing changed
    activeIndex = index;
    const realIndex = index % total; // the same number for a photo and its copies

    slides.forEach((slide, i) => {
      slide.classList.toggle("is-active", i === index);
      slide.classList.toggle("is-before", i < index); // left of the center
      slide.classList.toggle("is-after", i > index); // right of the center
    });

    counter.textContent = twoDigits(realIndex + 1);
    progress.firstElementChild.style.transform = `translateX(${realIndex * 100}%)`;
    const caption = slides[index].querySelector("figcaption").textContent;
    status.textContent = `Photo ${realIndex + 1} of ${total}: ${caption}`;
  };

  // Scroll the strip so that a photo stops in the center
  const goTo = (index, smooth = true) => {
    const target = slides[Math.max(0, Math.min(index, slides.length - 1))];
    track.scrollTo({ left: centerOf(target), behavior: smooth && !reduceMotion ? "smooth" : "auto" });
  };

  // 2. When the scroll stops on a copy: jump to the real photo, without animation.
  //    The jump is exactly one set of photos wide, so nothing moves on screen.
  const loopBack = () => {
    let jump = 0;
    if (activeIndex < total) jump = total; // on a copy before → real photo
    else if (activeIndex >= total * 2) jump = -total; // on a copy after → real photo
    if (jump === 0) return;

    coverflow.classList.add("no-transition"); // the scale effect must not play during the jump
    const setWidth = slides[total].offsetLeft - slides[0].offsetLeft;
    track.scrollLeft += jump > 0 ? setWidth : -setWidth;
    setActive(activeIndex + jump);
    void coverflow.offsetWidth; // apply the styles now, before transitions come back
    coverflow.classList.remove("no-transition");
  };

  // While scrolling: find the centered photo. When the scroll stops: loop back.
  let stopTimer;
  track.addEventListener("scroll", () => {
    setActive(findCenteredSlide());
    clearTimeout(stopTimer);
    stopTimer = setTimeout(loopBack, 150); // no scroll for 150 ms = the scroll has stopped
  }, { passive: true });

  previousButton.addEventListener("click", () => goTo(activeIndex - 1));
  nextButton.addEventListener("click", () => goTo(activeIndex + 1));

  // Click on a side photo (real or copy): bring it to the center
  slides.forEach((slide, index) => {
    slide.addEventListener("click", () => {
      if (index !== activeIndex) goTo(index);
    });
  });

  // Keyboard: left and right arrows when the strip has the focus
  track.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault(); // otherwise the browser scrolls by a few pixels only
      goTo(activeIndex + (event.key === "ArrowRight" ? 1 : -1));
    }
  });

  // Start: show the controls, then center the first REAL photo (index = total)
  counterTotal.textContent = "/" + twoDigits(total);
  progress.style.setProperty("--total", total);
  previousButton.hidden = false;
  nextButton.hidden = false;
  coverflow.classList.add("is-ready", "no-transition");
  track.scrollLeft = centerOf(slides[total]);
  setActive(total);
  void coverflow.offsetWidth;
  coverflow.classList.remove("no-transition");

  // A new screen size changes the widths: center the active photo again
  window.addEventListener("resize", () => goTo(activeIndex, false));
}
