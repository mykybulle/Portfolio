require("dotenv").config();
const express = require("express");
const path = require("path");

// se usi Node < 18, installa node-fetch:
// npm install node-fetch
// e decommenta la riga sotto:
// const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

if (!BOT_TOKEN || !CHAT_ID) {
  console.warn("⚠️  TELEGRAM_BOT_TOKEN o TELEGRAM_CHAT_ID mancanti in .env");
}

// middleware
app.use(express.json());
app.use(express.static(path.join(__dirname))); // serve index.html, css, js

// endpoint che riceve il form e manda a Telegram
app.post("/api/contact", async (req, res) => {
  const { name, email, project, message } = req.body || {};

  if (!name || !email) {
    return res
      .status(400)
      .json({ error: "Nome ed email sono obbligatori." });
  }

  const text = `
📩 *Nuovo contatto dal portfolio*

👤 Nome: ${name}
📧 Email: ${email}
💼 Progetto: ${project || "-"}

📝 Messaggio:
${message || "-"}
  `.trim();

  try {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // se vuoi usare Markdown, attenzione ai caratteri speciali
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: "Markdown",
      }),
    });

    if (!response.ok) {
      console.error("Telegram API error:", await response.text());
      return res
        .status(500)
        .json({ error: "Errore nell'invio del messaggio Telegram." });
    }

    res.json({ ok: true });
  } catch (err) {
    console.error("Errore invio Telegram:", err);
    res.status(500).json({ error: "Errore interno server." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server portfolio su http://localhost:${PORT}`);
});
