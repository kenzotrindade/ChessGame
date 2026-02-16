<div align="center">

# ♟️ ChessGame - Real-Time Multiplayer

![JavaScript](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Framework-Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Socket.io](https://img.shields.io/badge/RealTime-Socket.io-010101?style=for-the-badge&logo=socket.dot.io&logoColor=white)

<p>
  <strong>A real-time multiplayer Chess engine built with Node.js and WebSockets.</strong><br>
  Challenge your friends online with instant move synchronization and a clean web interface.
</p>

</div>

---

## 📋 About The Project

**ChessGame** is a web-based multiplayer application that brings the classic game of chess to the browser. Unlike local-only games, this project implements a full client-server architecture to enable competitive play over a network.

The backend handles active game sessions and relays player moves instantly using WebSockets, ensuring both boards remain perfectly in sync throughout the match.

---

## ⚙️ Key Features

* **🌐 Live Multiplayer:** Powered by **Socket.io** for bi-directional, low-latency communication between players.
* **🖥️ Dedicated Backend:** An **Express** server manages static file serving and handles socket connections.
* **🧠 Move Validation:** Client-side logic for piece selection, legal move highlighting, and board state management.
* **📂 Structured Architecture:** Clean separation between the `server/` logic and the `public/` frontend assets.

---

## 🛠️ Tech Stack

| Tool | Role |
| :--- | :--- |
| **Node.js** | Backend runtime environment. |
| **Express** | Web framework for routing and server management. |
| **Socket.io** | Real-time engine for WebSocket communication. |
| **JavaScript (ES6+)** | Core logic for both frontend and backend. |
| **CSS3 / HTML5** | Responsive game UI and board layout. |
| **Dotenv** | Secure environment variable management. |

---

## 🚀 Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kenzotrindade/ChessGame.git
2. **Install dependencies:**
   ```bash
   npm install
3. **Set up environment:**
   ```bash
   Create a .env file (if not already present) to configure your PORT.
4. **Launch the server:**
   ```bash
   npm start
   # or
   node server/index.js
  5. **Play:**
   ```bash
  Open your browser at http://localhost:3000.
