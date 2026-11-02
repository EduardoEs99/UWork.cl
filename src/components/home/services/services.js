const root = document.querySelector("[data-service-tabs]");
if (root) {
  const tabs = [...root.querySelectorAll('[role="tab"]')];
  const panels = [...root.querySelectorAll('[role="tabpanel"]')];
  const select = (selected) => {
    for (const tab of tabs) {
      const active = tab === selected;
      tab.setAttribute("aria-selected", String(active));
      tab.dataset.state = active ? "active" : "inactive";
      tab.tabIndex = active ? 0 : -1;
    }
    for (const panel of panels)
      panel.hidden = panel.id !== selected.getAttribute("aria-controls");
  };
  const selectFromHash = () => {
    const hash = window.location.hash;
    const panelId =
      hash === "#personas"
        ? "panel-personas"
        : hash === "#company-needs" || hash === "#empresas"
          ? "panel-puntuales"
          : undefined;
    const tab = tabs.find(
      (item) => item.getAttribute("aria-controls") === panelId,
    );
    if (tab) select(tab);
  };
  window.addEventListener("hashchange", selectFromHash);
  selectFromHash();
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => select(tab));
    tab.addEventListener("keydown", (event) => {
      let next = index;
      if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
      else if (event.key === "ArrowLeft")
        next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = tabs.length - 1;
      else return;
      event.preventDefault();
      select(tabs[next]);
      tabs[next].focus();
    });
  });
}
