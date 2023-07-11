const nav_bar = document.querySelector(".Navigation-bar");
(function () {
  const html = `
        <div class="logo">
          <img class="logo-img" src="../Images/logo.png" alt="logo" />
          <p class="logo-text">Blood Oasis</p>
        </div>
        <a class="nav-link" href="../landing_page/index.html">Home</a>
        <a class="nav-link" href="../login_page/login.html">Login/SignUp</a>
        `;
  nav_bar.insertAdjacentHTML("afterbegin", html);
})();

const logo = document.querySelector(".logo-img");
const logoText = document.querySelector(".logo-text");

const redirectNavBar = function () {
  window.location.href =
    "http://localhost:5500/Frontend/landing_page/index.html";
};

logo.addEventListener("click", redirectNavBar);
logoText.addEventListener("click", redirectNavBar);
