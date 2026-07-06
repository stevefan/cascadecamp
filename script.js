const yearEl = document.querySelector("#year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const attendeeRoster = document.querySelector("[data-attendees]");
if (attendeeRoster) {
  const grid = attendeeRoster.querySelector("[data-attendee-grid]");
  const overflow = attendeeRoster.querySelector("[data-attendee-overflow]");
  const popover = attendeeRoster.querySelector("[data-attendee-popover]");
  const trigger = attendeeRoster.querySelector(".attendee-overflow-trigger");
  const mobileVisibleCount = Number(attendeeRoster.dataset.visibleCount || 8);
  const desktopVisibleCount = Number(
    attendeeRoster.dataset.visibleCountDesktop || mobileVisibleCount
  );
  const desktopRosterQuery = window.matchMedia("(min-width: 900px)");
  const badges = Array.from(grid.querySelectorAll(".person-badge"));
  const isPinned = (badge) => (
    badge.dataset.pinned === "true" || badge.dataset.badge === "Organizer"
  );
  const pinnedBadges = badges.filter(isPinned);
  const rotatingBadges = badges.filter((badge) => !isPinned(badge));

  const shuffle = (items) => {
    for (let index = items.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [items[index], items[swapIndex]] = [items[swapIndex], items[index]];
    }
    return items;
  };

  const blurbedBadges = rotatingBadges.filter((badge) => badge.querySelector("em"));
  const simpleBadges = rotatingBadges.filter((badge) => !badge.querySelector("em"));
  const weightedBadges = [
    ...shuffle(blurbedBadges),
    ...shuffle(simpleBadges),
  ];

  const setExpanded = (isExpanded) => {
    if (!overflow || !trigger) {
      return;
    }
    trigger.setAttribute("aria-expanded", String(isExpanded));
    overflow.classList.toggle("is-open", isExpanded);
  };

  const renderRoster = () => {
    const visibleCount = desktopRosterQuery.matches
      ? desktopVisibleCount
      : mobileVisibleCount;
    const visibleRotatingCount = Math.max(0, visibleCount - pinnedBadges.length);
    const visibleBadges = [
      ...pinnedBadges,
      ...weightedBadges.slice(0, visibleRotatingCount),
    ];
    const overflowBadges = weightedBadges.slice(visibleRotatingCount);

    grid.replaceChildren(...visibleBadges);

    if (!overflow || !popover || !trigger) {
      return;
    }

    setExpanded(false);
    if (overflowBadges.length > 0) {
      popover.replaceChildren(...overflowBadges.map((badge) => badge.cloneNode(true)));
      trigger.textContent = `and ${overflowBadges.length} other${overflowBadges.length === 1 ? "" : "s"}!`;
      overflow.hidden = false;
    } else {
      popover.replaceChildren();
      overflow.hidden = true;
    }
  };

  renderRoster();

  if (overflow && popover && trigger) {
    trigger.addEventListener("click", (event) => {
      event.stopPropagation();
      setExpanded(trigger.getAttribute("aria-expanded") !== "true");
    });

    overflow.addEventListener("mouseenter", () => setExpanded(true));
    overflow.addEventListener("mouseleave", () => setExpanded(false));
    overflow.addEventListener("focusin", () => setExpanded(true));
    overflow.addEventListener("focusout", (event) => {
      if (!overflow.contains(event.relatedTarget)) {
        setExpanded(false);
      }
    });
    document.addEventListener("click", (event) => {
      if (!overflow.contains(event.target)) {
        setExpanded(false);
      }
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        setExpanded(false);
      }
    });
  }

  desktopRosterQuery.addEventListener("change", renderRoster);
}
