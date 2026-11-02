const form = document.querySelector("[data-login-form]");

if (form) {
  const status = form.querySelector("[data-login-status]");
  const submit = form.querySelector("[data-login-submit]");
  const password = form.querySelector("[data-login-password]");
  const passwordToggle = form.querySelector("[data-password-toggle]");
  const showIcon = passwordToggle.querySelector("[data-password-show]");
  const hideIcon = passwordToggle.querySelector("[data-password-hide]");
  let animationTimer;

  passwordToggle.addEventListener("click", () => {
    const visible = password.type === "password";
    password.type = visible ? "text" : "password";
    passwordToggle.setAttribute("aria-pressed", String(visible));
    passwordToggle.setAttribute(
      "aria-label",
      visible ? "Ocultar contraseña" : "Mostrar contraseña",
    );
    showIcon.classList.toggle("hidden", visible);
    hideIcon.classList.toggle("hidden", !visible);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    window.clearTimeout(animationTimer);
    form.dataset.state = "idle";
    submit.disabled = true;
    status.textContent = "";

    window.requestAnimationFrame(() => {
      form.dataset.state = "sending";
    });

    animationTimer = window.setTimeout(() => {
      form.dataset.state = "sent";
      status.textContent = "Inicio de sesión exitoso";
      submit.disabled = false;
    }, 900);
  });
}
