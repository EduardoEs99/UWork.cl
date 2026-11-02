const form = document.querySelector("[data-contact-form]");
if (form) {
  const submit = form.querySelector("[data-contact-submit]");
  const label = form.querySelector("[data-contact-label]");
  const sendIcon = form.querySelector("[data-contact-send]");
  const spinner = form.querySelector("[data-contact-spinner]");
  const feedback = form.querySelector("[data-contact-feedback]");
  const status = form.querySelector("[data-contact-status]");
  let animationTimer;

  const clearContactForm = () => {
    form.reset();
    form.querySelectorAll("input").forEach((input) => {
      if (input.type === "checkbox" || input.type === "radio") {
        input.checked = false;
      } else {
        input.value = "";
      }
    });
    form.querySelectorAll("textarea").forEach((textarea) => {
      textarea.value = "";
    });
    form.querySelectorAll("select").forEach((select) => {
      select.selectedIndex = 0;
    });
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    window.clearTimeout(animationTimer);
    feedback.dataset.visible = "false";

    if (!new FormData(form).getAll("servicio").length) {
      form.dataset.state = "idle";
      status.textContent = "Selecciona al menos un servicio.";
      return;
    }

    submit.disabled = true;
    form.dataset.state = "sending";
    label.textContent = "Enviando";
    status.textContent = "";
    sendIcon.classList.add("hidden");
    spinner.classList.remove("hidden");

    animationTimer = window.setTimeout(() => {
      clearContactForm();
      form.dataset.state = "sent";
      label.textContent = "Enviar solicitud";
      sendIcon.classList.remove("hidden");
      spinner.classList.add("hidden");
      feedback.dataset.visible = "true";
      status.textContent = "Formulario enviado.";
      submit.disabled = false;
    }, 800);
  });
}
