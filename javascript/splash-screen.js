const splashScreen = document.querySelector(".splash-screen");
const authorName = document.querySelectorAll(".name");

window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    authorName.forEach((logoName, idx) => {
      setTimeout(() => {
        logoName.classList.add("show");
      }, (idx + 1) * 400);
    });

    setTimeout(() => {
      authorName.forEach((logoName, idx) => {
        setTimeout(() => {
          logoName.classList.remove("show");
          logoName.classList.add("fade");
        }, (idx + 1) * 50);
      });
    }, 2000);

    setTimeout(() => {
      splashScreen.style.top = "-100vh";
    }, 2300);
  });
});
