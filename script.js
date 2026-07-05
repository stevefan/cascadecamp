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
  const visibleCount = Number(attendeeRoster.dataset.visibleCount || 8);
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

  const visibleRotatingCount = Math.max(0, visibleCount - pinnedBadges.length);
  const visibleBadges = [
    ...pinnedBadges,
    ...weightedBadges.slice(0, visibleRotatingCount),
  ];
  const overflowBadges = weightedBadges.slice(visibleRotatingCount);

  grid.replaceChildren(...visibleBadges);

  if (overflow && popover && trigger && overflowBadges.length > 0) {
    popover.replaceChildren(...overflowBadges.map((badge) => badge.cloneNode(true)));
    overflow.hidden = false;

    const setExpanded = (isExpanded) => {
      trigger.setAttribute("aria-expanded", String(isExpanded));
    };

    overflow.addEventListener("mouseenter", () => setExpanded(true));
    overflow.addEventListener("mouseleave", () => setExpanded(false));
    overflow.addEventListener("focusin", () => setExpanded(true));
    overflow.addEventListener("focusout", (event) => {
      if (!overflow.contains(event.relatedTarget)) {
        setExpanded(false);
      }
    });
  }
}
