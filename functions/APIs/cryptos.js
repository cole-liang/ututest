// Get all cryptos records
const { db } = require("../util/admin");

exports.getAllCryptos = (request, response) => {
  db.collection("cryptos")
    .orderBy("Currency", "asc")
    .get()
    .then((data) => {
      let cryptos = [];
      data.forEach((doc) => {
        cryptos.push({
          Currency: doc.data().Currency,
          Date: doc.data().Date,
          Open: doc.data().Open,
          High: doc.data().High,
          Low: doc.data().Low,
          Close: doc.data().Close,
          Volume: doc.data().Volume,
          "Market Cap": doc.data()["Market Cap"],
        });
      });
      return response.json(cryptos);
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};
