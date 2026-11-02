const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.remove("opacity-0", "translate-y-5");
        observer.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.1 },
);
document.querySelectorAll("[data-reveal]").forEach((element) => {
  element.classList.add(
    "opacity-0",
    "translate-y-5",
    "transition",
    "duration-600",
    "motion-reduce:opacity-100",
    "motion-reduce:transform-none",
  );
  observer.observe(element);
});
document.addEventListener("click", (event) => {
  if (
    event.target instanceof Element &&
    event.target.closest("[data-inert-link]")
  )
    event.preventDefault();
});
const centerSections = [...document.querySelectorAll("[data-center-anchor]")];
if (centerSections.length) {
  const positionAnchors = () => {
    const headerBottom =
      document.querySelector("header")?.getBoundingClientRect().bottom ?? 80;
    const available = window.innerHeight - headerBottom;
    for (const section of centerSections) {
      const height = section.offsetHeight;
      const padding = parseFloat(getComputedStyle(section).paddingTop);
      const desiredTop =
        height < available - 32
          ? headerBottom + (available - height) / 2
          : headerBottom + 20 - padding;
      section.style.scrollMarginTop = desiredTop - 100 + "px";
    }
  };
  const sizing = new ResizeObserver(positionAnchors);
  centerSections.forEach((section) => sizing.observe(section));
  window.addEventListener("resize", positionAnchors);
  positionAnchors();
}
