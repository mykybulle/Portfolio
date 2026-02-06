// === MATRIX BACKGROUND SCRIPT ===
(function initMatrix() {
  const canvas = document.getElementById("matrixCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const fontSize = 16;
  let columns = Math.floor(width / fontSize);
  let drops = Array.from({ length: columns }, () => Math.random() * -20);

  const chars = "01<>[]{}=/+*#@$&";

  // REGOLA LA VELOCITÀ QUI 👇
  const speed = 0.35; // più basso = più lento

  function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.09)";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "#4dffb5";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
      const text = chars.charAt(Math.floor(Math.random() * chars.length));
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      ctx.fillText(text, x, y);

      if (y > height && Math.random() > 0.975) {
        drops[i] = 0;
      }

      drops[i] += speed;
    }

    requestAnimationFrame(draw);
  }

  function onResize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    columns = Math.floor(width / fontSize);
    drops = Array.from({ length: columns }, () => Math.random() * -20);
  }

  window.addEventListener("resize", onResize);
  draw();
})();



// === FOOTER YEAR ===
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});



// === FORM HANDLER → INVIO AL BACKEND → BOT TELEGRAM ===
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector(".contact-submit");

    const name = document.getElementById("name")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const project = document.getElementById("project")?.value.trim();
    const message = document.getElementById("message")?.value.trim();

    if (!name || !email) {
      if (status) {
        status.innerHTML =
          '<span class="hero-status-dot"></span><span>Per favore compila nome ed email.</span>';
      }
      return;
    }

    try {
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Invio…";
      }

      if (status) {
        status.innerHTML =
          '<span class="hero-status-dot"></span><span>Invio in corso…</span>';
      }

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, project, message }),
      });

      if (!res.ok) throw new Error("Errore dal server");

      if (status) {
        status.innerHTML =
          '<span class="hero-status-dot"></span><span>Messaggio inviato ✔ Riceverò tutto su Telegram.</span>';
      }

      form.reset();
    } catch (err) {
      console.error(err);
      if (status) {
        status.innerHTML =
          '<span class="hero-status-dot"></span><span>Errore, riprova più tardi 😔</span>';
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Invia richiesta";
      }
    }
  });
});
