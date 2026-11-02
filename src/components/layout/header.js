const siteHeader = document.querySelector(".site-header");
if (siteHeader) {
  let headerFrame = 0;
  const updateHeader = () => {
    headerFrame = 0;
    siteHeader.dataset.scrolled = String(window.scrollY > 10);
  };
  window.addEventListener(
    "scroll",
    () => {
      if (!headerFrame) headerFrame = requestAnimationFrame(updateHeader);
    },
    { passive: true },
  );
  updateHeader();
}

const sectionLinks = [
  ...document.querySelectorAll('header .nav-link[href^="#"]'),
];
const sections = [...new Set(sectionLinks.map((link) => link.hash))]
  .map((hash) => ({
    hash,
    element: document.getElementById(hash.slice(1))?.closest("section"),
  }))
  .filter((entry) => !!entry.element);
const markSection = (hash) => {
  for (const link of sectionLinks) {
    if (link.hash === hash) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  }
};
if (sectionLinks.length) {
  const updateSection = () => {
    const header = document.querySelector("header");
    const line = (header?.getBoundingClientRect().bottom ?? 80) + 160;
    const current = sections.find(({ element }) => {
      const bounds = element.getBoundingClientRect();
      return bounds.top <= line && bounds.bottom > line;
    });
    markSection(current?.hash);
  };
  const selectHash = () => {
    const selected = sections.find(({ hash }) => hash === window.location.hash);
    if (selected) markSection(selected.hash);
    else updateSection();
  };
  // Wait until smooth scrolling settles before following the viewport.
  let scrollTimer;
  window.addEventListener(
    "scroll",
    () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(updateSection, 140);
    },
    { passive: true },
  );
  window.addEventListener("hashchange", selectHash);
  window.addEventListener("resize", updateSection);
  for (const link of sectionLinks)
    link.addEventListener("click", () => markSection(link.hash));
  selectHash();
}
const toggle = document.querySelector("[data-menu-toggle]");
const menu = document.querySelector("#mobile-navigation");
if (toggle && menu) {
  const setOpen = (open) => {
    menu.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    toggle.querySelector("[data-menu-open]").hidden = open;
    toggle.querySelector("[data-menu-close]").hidden = !open;
  };
  toggle.addEventListener("click", () => setOpen(menu.hasAttribute("hidden")));
  menu.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a"))
      setOpen(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !menu.hidden) {
      setOpen(false);
      toggle.focus();
    }
  });
  matchMedia("(min-width: 1024px)").addEventListener("change", () =>
    setOpen(false),
  );
}
