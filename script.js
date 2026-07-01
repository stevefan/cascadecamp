const WAITLIST_ENDPOINT = "";
const CONTACT_EMAIL = "hello@cascade.camp";

const yearEl = document.querySelector("#year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const form = document.querySelector("#signup-form");
const statusEl = document.querySelector("#form-status");

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const email = String(formData.get("email") || "").trim();
  const note = String(formData.get("note") || "").trim();

  if (!email) {
    statusEl.textContent = "Add an email and we will get you on the list.";
    return;
  }

  if (WAITLIST_ENDPOINT) {
    try {
      const response = await fetch(WAITLIST_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, note }),
      });

      if (!response.ok) {
        throw new Error("Signup request failed");
      }

      form.reset();
      statusEl.textContent = "You are on the list. More soon.";
      return;
    } catch {
      statusEl.textContent = "That did not go through. Opening an email draft instead.";
    }
  } else {
    statusEl.textContent = "Opening an email draft so we can add you manually.";
  }

  const subject = encodeURIComponent("Cascade Camp interest list");
  const body = encodeURIComponent(
    `Please add me to the Cascade Camp interest list.\n\nEmail: ${email}\n\nNote:\n${note || "(none)"}`
  );
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
});
