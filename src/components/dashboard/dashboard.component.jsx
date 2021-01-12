import React, { Component } from "react";
import CurrencyTable from "../currencyTable/currencyTable.component";
import "./dashboard.style.scss";
import moment from "moment";

const Dashboard = () => {
  let date = "Nov 06, 2019";
  let momentObj = moment(date, "MMM DD, YYYY");
  let date2 = momentObj.format("YYYY-MM-DD");

  return (
    <main>
      <h1>{date}</h1>
      <h2>{date2}</h2>
      <CurrencyTable></CurrencyTable>
    </main>
  );
};

export default Dashboard;
