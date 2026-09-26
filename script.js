const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");
document.getElementById("year").textContent = new Date().getFullYear();

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  status.textContent = "Sending…";
  const button = form.querySelector("button");
  button.disabled = true;
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(Object.fromEntries(new FormData(form)))
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Unable to send message.");
    status.textContent = "Message sent. Thanks — I’ll get back to you.";
    form.reset();
  } catch (error) {
    status.textContent = error.message + " You can also email me directly.";
  } finally {
    button.disabled = false;
  }
});

/* Navigation menu + theme preference */
const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");
const themeToggle = document.getElementById("themeToggle");

function setTheme(light) {
  document.body.classList.toggle("light", light);
  localStorage.setItem("portfolioTheme", light ? "light" : "dark");
  if (themeToggle) {
    themeToggle.textContent = light ? "☾" : "☼";
    themeToggle.setAttribute("aria-label", light ? "Switch to dark mode" : "Switch to light mode");
    themeToggle.title = light ? "Switch to dark mode" : "Switch to light mode";
  }
}
setTheme(localStorage.getItem("portfolioTheme") === "light");

menuToggle?.addEventListener("click", () => {
  const open = mobileNav?.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(!!open));
});
mobileNav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mobileNav.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded", "false");
}));
themeToggle?.addEventListener("click", () => setTheme(!document.body.classList.contains("light")));
