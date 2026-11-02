const form = document.querySelector("[data-register-form]");

if (form) {
  const submit = form.querySelector("[data-register-submit]");
  const label = form.querySelector("[data-register-label]");
  const spinner = form.querySelector("[data-register-spinner]");
  const check = form.querySelector("[data-register-check]");
  const status = form.querySelector("[data-register-status]");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    submit.disabled = true;
    label.textContent = "Creando perfil";
    status.textContent = "";
    check.classList.add("hidden");
    spinner.classList.remove("hidden");

    window.setTimeout(() => {
      spinner.classList.add("hidden");
      check.classList.remove("hidden");
      label.textContent = "Perfil creado";
      status.textContent = "Registro creado exitosamente";
    }, 900);
  });
}
