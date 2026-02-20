const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
    container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
    container.classList.remove("active");
});

// Handle hash on page load
window.addEventListener("load", () => {
    const hash = window.location.hash;
    if (hash === "#carowner") {
        container.classList.add("active");
    } else if (hash === "#parents") {
        container.classList.remove("active");
    }
});