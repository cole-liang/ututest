const functions = require("firebase-functions");
const app = require("express")();
const cors = require("cors");

// Required for getting rid of No 'Access-Control-Allow-Origin' header problem
app.use(cors());

const { getAllCryptos } = require("./APIs/cryptos");

app.get("/cryptos", getAllCryptos);
exports.api = functions.https.onRequest(app);
