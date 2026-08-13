document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#primary-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("open", !expanded);
    });
  }

  const form = document.querySelector("#contact-form");
  if (!form) return;

  const fields = [
    { id: "name", message: "Please enter your name." },
    { id: "email", message: "Please enter a valid email address." },
    { id: "message", message: "Please enter a message." }
  ];

  form.addEventListener("submit", event => {
    event.preventDefault();
    let valid = true;

    fields.forEach(({id, message}) => {
      const input = document.getElementById(id);
      const error = document.getElementById(`${id}-error`);
      if (!input.checkValidity()) {
        valid = false;
        error.textContent = message;
        input.setAttribute("aria-invalid", "true");
      } else {
        error.textContent = "";
        input.removeAttribute("aria-invalid");
      }
    });

    const status = document.getElementById("form-status");
    if (valid) {
      status.textContent = "Thanks! Your message has been validated. Connect this form to a backend or form service to receive submissions.";
      form.reset();
    } else {
      status.textContent = "Please correct the highlighted fields.";
      const firstInvalid = form.querySelector("[aria-invalid='true']");
      if (firstInvalid) firstInvalid.focus();
    }
  });
});
