const track = document.querySelector("#como-funciona");
if (track) {
  const buttons = [...track.querySelectorAll("[data-process-step]")];
  const rows = [...track.querySelectorAll("[data-process-row]")];
  const timeline = track.querySelector(".process-timeline");
  const progress = track.querySelector("[data-process-progress]");
  const caption = track.querySelector("[data-process-caption]");
  const intro = track.querySelector(".process-intro");
  const scrollAnchor = () =>
    getComputedStyle(intro).position === "sticky"
      ? parseFloat(getComputedStyle(intro).top)
      : window.innerHeight * 0.35;
  let step = -1;
  let frame = 0;
  let listening = false;
  let centers = [];
  let tops = [];
  let animationReady = false;
  const select = (next, ready = animationReady) => {
    if (next === step && ready === animationReady) return;
    step = next;
    animationReady = ready;
    const distance = centers.at(-1) - centers[0];
    progress.style.height = `${distance ? ((centers[step] - centers[0]) / distance) * 100 : 0}%`;
    caption.textContent = `Paso ${step + 1} de ${rows.length}`;
    rows.forEach((row, index) => {
      row.dataset.complete = String(index <= step);
      row.dataset.active = String(animationReady && index === step);
    });
    buttons.forEach((button, index) => {
      button.dataset.complete = String(index <= step);
      if (index === step) button.setAttribute("aria-current", "step");
      else button.removeAttribute("aria-current");
    });
  };
  const measure = () => {
    tops = rows.map((row) => row.getBoundingClientRect().top + window.scrollY);
    centers = rows.map((row) => {
      const rect = row.getBoundingClientRect();
      return rect.top + window.scrollY + rect.height / 2;
    });
    const top = timeline.getBoundingClientRect().top + window.scrollY;
    timeline.style.setProperty("--process-line-top", `${centers[0] - top}px`);
    timeline.style.setProperty(
      "--process-line-height",
      `${centers.at(-1) - centers[0]}px`,
    );
    // Refresh the line after responsive text wrapping changes row heights.
    const current = Math.max(0, step);
    step = -1;
    select(current);
  };
  const update = () => {
    frame = 0;
    const anchor = window.scrollY + scrollAnchor() + rows[0].offsetHeight + 16;
    let next = 0;
    tops.forEach((top, index) => {
      if (top <= anchor + 1) {
        next = index;
      }
    });
    // The desktop inset leaves extra scroll after the introduction becomes sticky.
    select(next, window.scrollY + scrollAnchor() >= tops[0] - 1);
  };
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };
  const observer = new IntersectionObserver(
    ([entry]) => {
      measure();
      if (entry.isIntersecting && !listening) {
        window.addEventListener("scroll", schedule, { passive: true });
        listening = true;
      } else if (!entry.isIntersecting && listening) {
        window.removeEventListener("scroll", schedule);
        listening = false;
      }
      schedule();
    },
    { rootMargin: "100px" },
  );
  observer.observe(track);
  const resize = new ResizeObserver(() => {
    measure();
    schedule();
  });
  resize.observe(timeline);
  window.addEventListener(
    "resize",
    () => {
      measure();
      schedule();
    },
    { passive: true },
  );
  buttons.forEach((button, index) =>
    button.addEventListener("click", () => {
      measure();
      window.scrollTo({
        top: tops[index] - scrollAnchor() + 1,
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
    }),
  );
}
