# 🚀 Futuristic Developer Portfolio

Un portfolio personale moderno con estetica Cyberpunk/Terminale, animazioni fluide e integrazione backend per i contatti.

![Status](https://img.shields.io/badge/status-active-success.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18-green.svg)

## ✨ Caratteristiche

- **Design Immersivo**: Effetto Matrix background su Canvas e UI stile "Console/IDE".
- **Responsive**: Ottimizzato per Desktop, Tablet e Mobile.
- **Backend Node.js**: Server Express leggero per servire i file statici e gestire le API.
- **Telegram Integration**: Il form di contatto invia notifiche real-time direttamente al tuo Telegram tramite Bot API.
- **Clean Code**: Struttura HTML semantica e CSS moderno (CSS Variables, Flexbox/Grid).

## 🛠️ Stack Tecnologico

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js, Express
- **Utilities**: Dotenv (gestione variabili d'ambiente)

## 📦 Installazione

1. **Clona la repository**
   ```bash
   git clone https://github.com/tuo-username/portfolio-futuristico.git
   cd portfolio-futuristico
   ```

2. **Inizializza il progetto e installa le dipendenze**
   Poiché il progetto richiede un backend, assicurati di avere le dipendenze:
   ```bash
   npm init -y
   npm install express dotenv
   ```

3. **Configurazione Variabili d'Ambiente**
   Crea un file `.env` nella root del progetto e inserisci le tue credenziali Telegram:
   ```env
   PORT=3000
   TELEGRAM_BOT_TOKEN=il_tuo_token_bot
   TELEGRAM_CHAT_ID=il_tuo_chat_id
   ```
   > *Nota: Puoi ottenere il token creando un bot con @BotFather su Telegram e il Chat ID scrivendo al bot @userinfobot.*

## 🚀 Avvio

Per avviare il server in locale:

```bash
node server.js
```

Visita `http://localhost:3000` nel tuo browser.

## 🎨 Personalizzazione

- **Contenuti**: Modifica `index.html` per cambiare testi, progetti e skill.
- **Stili**: I colori principali sono definiti nelle variabili CSS in `style.css`.
- **Logica**: Modifica `script.js` per cambiare la velocità o i caratteri dell'effetto Matrix.

## 📄 Licenza

Distribuito sotto licenza MIT. Vedi `LICENSE` per maggiori informazioni.