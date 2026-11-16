// Show the glass header once the page is scrolled
const header = document.querySelector("header");

const updateHeader = () => {
  header.classList.toggle("scrolled", window.scrollY > 0);
};

window.addEventListener("scroll", updateHeader);
updateHeader(); // also check on page load (e.g. after a refresh mid-page)


let projects =[
  {id =1,
  title="Management Project",
  date="April 2026",
  Type ="University Project",
  group="3 persons",
  description="Analyze the needs of a furniture company. Specify requirements in the project management document.",
  context="",
  myRole="",
  technologies="",
  links="",
  }
  // add other project 
  // the main structur about project-card

]

let projects =document.querySelector(".projects-preview-grid");
let a =document.createElement("article");
a.appenchild(projects.title);
document.body.appendChild(a);


