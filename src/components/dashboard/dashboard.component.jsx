import React from "react";
import CurrencyTable from "../currencyTable/currencyTable.component";
import "./dashboard.style.scss";
import "../../sass/base/_utilities.scss";

const Dashboard = () => {
  return (
    <main className="u-child-center">
      <CurrencyTable></CurrencyTable>
    </main>
  );
};

export default Dashboard;
