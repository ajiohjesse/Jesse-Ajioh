const navbar = document.querySelector(".nav");
const navHeight = navbar.getBoundingClientRect().height;
const links = document.querySelectorAll(".link");
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

//..........................
///functions
//..........................

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

const footerYear = document.querySelector(".footer-year");
const year = new Date().getFullYear();

footerYear.textContent = year;

//dynamic content for html tutorials

const grid = document.querySelector(".grid");
const errorMsg = document.querySelector(".error-msg");

window.addEventListener("DOMContentLoaded", () => {
  grid.innerHTML = `<img src="../images/Spin.gif" alt="Loading" class="loading-icon">`;
  const ourRequest = new XMLHttpRequest();
  ourRequest.open("get", "https://api.npoint.io/1725149f9cbb72fcee9c");

  ourRequest.onload = function () {
    errorMsg.classList.add("hide");
    const ourData = JSON.parse(ourRequest.responseText);
    const HTMLString = renderHTML(ourData);
    grid.innerHTML = HTMLString;
  };

  ourRequest.onerror = function () {
    errorMsg.classList.remove("hide");
    grid.innerHTML = "";
  };

  ourRequest.send();
});

function renderHTML(data) {
  return data
    .map((item) => {
      return `<article>
      <img
        src="${item.imgUrl}"
        alt="Html Tutorial"
      />
      <div class="text">
        <h3>${item.title}</h3>
        <p><span class="bold-text">Type: </span>${item.type}</p>
        <p>
          ${item.details}
        </p>
        <a href="${item.link}" target="_blank"><button class="card-btn">Get material</button></a>
      </div>
    </article>`;
    })
    .join("");
}
