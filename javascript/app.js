const navbar = document.querySelector(".nav");
const navHeight = navbar.getBoundingClientRect().height;
const links = document.querySelectorAll(".link");
const linksContainer = document.querySelector(".links-container");

const contactBtn = document.querySelector(".btn");

const linksElement = document.querySelector(".links");
const menuBars = document.getElementById("menu-bars");
const menuClose = document.getElementById("menu-close");

const home = document.getElementById("home");
const resources = document.getElementById("resources");
const about = document.getElementById("about");
const contact = document.getElementById("contact");

let link1 = links[0];
let link2 = links[1];
let link3 = links[2];
let btnLink = links[3];

//........................
//Smooth Scrolling Jquery
//........................

$(links).on("click", function (e) {
  e.preventDefault();

  let destination = $(this.hash);
  // Get the position of the destination
  // using the coordinates returned by
  // offset() method
  let scrollPosition = destination.offset().top;

  // Specify animation duration
  let animationDuration = 500;

  // Animate the html/body with
  // the scrollTop() method
  $("html, body").animate(
    {
      scrollTop: scrollPosition - navHeight,
    },
    animationDuration
  );
});

//.................................
// Vanilla JS
//.................................

menuBars.addEventListener("click", () => {
  openMenu();
});
menuClose.addEventListener("click", () => {
  closeMenu();
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    closeMenu();
  });
});

window.addEventListener("scroll", () => {
  closeMenu();
});

const resourcesPosition = resources.getBoundingClientRect().top - navHeight;
const aboutPosition = about.getBoundingClientRect().top - navHeight;
const contactPosition = contact.getBoundingClientRect().top - navHeight;

window.addEventListener("scroll", () => {
  const scrollHeight = scrollY;
  if (scrollHeight > navHeight) {
    navbar.classList.add("fix-nav");
  } else {
    navbar.classList.remove("fix-nav");
  }

  if (scrollHeight < resourcesPosition + 100) {
    removeActive();
    addActive(link1);
  }

  if (scrollHeight >= resourcesPosition - 100) {
    removeActive();
    addActive(link2);
  }
  if (scrollHeight >= aboutPosition - 100) {
    removeActive();
    addActive(link3);
  }
  if (scrollHeight >= contactPosition -100) {
    removeActive();
    contactBtn.classList.add("active-btn");
  } else {
    contactBtn.classList.remove("active-btn");
  }
});

//..........................
///functions
//..........................

//toggle active on nav links

function removeActive() {
  links.forEach((link) => {
    link.classList.remove("active");
  });
}

function addActive(link) {
  link.classList.add("active");
}

//toggle mobile menu

function openMenu() {
  menuBars.classList.add("hide");
  menuClose.classList.remove("hide");
  linksElement.classList.add("show-links");
}

function closeMenu() {
  menuBars.classList.remove("hide");
  menuClose.classList.add("hide");
  linksElement.classList.remove("show-links");
}


const footerYear = document.querySelector(".footer-year")
const year = new Date().getFullYear()

footerYear.textContent = year