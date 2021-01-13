// import json data to the firebase
const firebase = require("firebase/app");
require("firebase/firestore");

const records = require("../../src/resources/data.json");
const config = require("../util/config");

firebase.initializeApp(config);

firestore = firebase.firestore();

records.forEach(function (obj) {
  firestore
    .collection("cryptos")
    .add({
      Currency: obj.Currency,
      Date: obj.Date,
      Open: obj.Open,
      High: obj.High,
      Low: obj.Low,
      Close: obj.Close,
      Volume: obj.Volume,
      "Market Cap": obj["Market Cap"],
    })
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
});
