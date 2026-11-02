const form = document.querySelector("[data-contact-form]");
if (form)
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = form.querySelector('[role="status"]');
    if (status)
      status.textContent = new FormData(form).getAll("servicio").length
        ? "Demostración local: los datos son válidos. No se ha enviado ninguna solicitud."
        : "Selecciona al menos un servicio.";
  });
