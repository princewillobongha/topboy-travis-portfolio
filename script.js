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
