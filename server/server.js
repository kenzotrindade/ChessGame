const express = require("express");
const app = express();

// Partie gestion des autorisation de connexion au serveur
app.use(express.static("public"));
app.listen(3000);
