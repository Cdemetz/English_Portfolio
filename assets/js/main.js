// Show the glass header once the page is scrolled
const header = document.querySelector("header");

const updateHeader = () => {
  header.classList.toggle("scrolled", window.scrollY > 0);
};

window.addEventListener("scroll", updateHeader);
updateHeader(); // also check on page load (e.g. after a refresh mid-page)

let technologies = ['C#.NET', 'SQL', 'HTML', 'CSS', 'PHP', 'JS', 'WPF', 'UML'];

let links = [];

let medias = [];


let projects = [
  {
    id: 1,
    media: "", // e.g. "assets/img/projects/management-project.webp"
    date: "April 2026",
    time: "3 mounths",
    title: "Management Project",
    description: "Analyze the needs of a furniture company. Specify requirements in the project management document.",
    technologies: [technologies[1], technologies[7]], // references to the technologies array
    type: "University Project",
    group: "3 persons",

    //pop-up
    context: "",
    myRole: "",
    links: "",
  }
  // add other project
  // the main structur about project-card

]


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


// Build one card per project inside the grid (only on pages that have it)
const grid = document.querySelector(".projects-preview-grid");

if (grid) {
  projects.forEach((project) => {
    const card = addElement(grid, "article", "project-card");

    // Image (only if the project has one)
    const mediaBox = addElement(card, "div", "project-media");
    if (project.media) {
      const image = addElement(mediaBox, "img");
      image.src = project.media;
      image.alt = "Screenshot of " + project.title;
    }

        // Date and duration
    const meta = addElement(card, "div", "project-meta");
    addElement(meta, "span", "project-date", project.date);
    addElement(meta, "span", "project-time", project.time);


    // Main text
    const copy = addElement(card, "div", "project-copy");
    addElement(copy, "h3", "project-title", project.title);
    addElement(copy, "p", "project-description", project.description);

    // One tag per technology
    const techList = addElement(copy, "ul", "project-tags");
    project.technologies.forEach((tech) => {
      addElement(techList, "li", "project-tag", tech);
    });

    addElement(copy, "span", "project-type", project.type);
    addElement(copy, "span", "project-group", project.group);
    addElement(copy, "button", "project-button", "View details");

  });
}
