import React, { Component } from "react";
import CurrencyTable from "../currencyTable/currencyTable.component";
import "./dashboard.style.scss";

const Dashboard = () => {
  return (
    <main>
      <CurrencyTable></CurrencyTable>
    </main>
  );
};

export default Dashboard;
