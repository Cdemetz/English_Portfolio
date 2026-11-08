// Show the glass header once the page is scrolled
const header = document.querySelector("header");

const updateHeader = () => {
  header.classList.toggle("scrolled", window.scrollY > 0);
};

window.addEventListener("scroll", updateHeader);
updateHeader(); // also check on page load (e.g. after a refresh mid-page)

