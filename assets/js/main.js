document.documentElement.classList.add("js");

const navToggle = document.querySelector("[data-nav-toggle]");
const siteNav = document.querySelector("[data-site-nav]");

if (navToggle && siteNav) {
  function closeNav() {
    navToggle.setAttribute("aria-expanded", "false");
    siteNav.classList.remove("is-open");
  }

  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    siteNav.classList.toggle("is-open", !isOpen);
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      closeNav();
    }
  });

  document.addEventListener("click", (event) => {
    if (
      navToggle.getAttribute("aria-expanded") === "true" &&
      event.target instanceof Node &&
      !siteNav.contains(event.target) &&
      !navToggle.contains(event.target)
    ) {
      closeNav();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNav();
  });
}

const guideSearch = document.querySelector("[data-guide-search]");
const guideCards = Array.from(document.querySelectorAll("[data-guide-card]"));
const guideCount = document.querySelector("[data-guide-count]");
const emptyState = document.querySelector("[data-empty-state]");

function guideText(card) {
  return [card.dataset.title, card.dataset.tags, card.textContent].join(" ").toLowerCase();
}

function updateGuideFilter() {
  if (!guideSearch || guideCards.length === 0) return;

  const query = guideSearch.value.trim().toLowerCase();
  let visibleCount = 0;

  guideCards.forEach((card) => {
    const isVisible = guideText(card).includes(query);
    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  if (guideCount) {
    guideCount.textContent = query
      ? `${visibleCount} guide${visibleCount === 1 ? "" : "s"} match "${query}"`
      : "Showing all guides";
  }

  if (emptyState) emptyState.hidden = visibleCount !== 0;
}

if (guideSearch) {
  guideSearch.addEventListener("input", updateGuideFilter);
  updateGuideFilter();
}
