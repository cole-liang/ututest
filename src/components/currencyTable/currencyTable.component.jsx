import React, { Component } from "react";
import Table from "../common/table/table.component";
import data from "../../resources/data.json";
import "./currencyTable.style.scss";

class CurrencyTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: data,
      sortColumn: { path: "mktcap", order: "asc" },
      columns: [
        { path: "#", label: "#" },
        { path: "Currency", label: "Coin" },
        { path: "price", label: "Price" },
        { path: "24h", label: "24h" },
        { path: "7d", label: "7d" },
        { path: "Volume", label: "24h Volume" },
        { path: "Market Cap", label: "Mkt Cap" },
      ],
    };
  }

  componentDidMount() {}

  handleSort = (sortColumn) => {
    this.setState({ sortColumn: sortColumn });
  };

  render() {
    const { data, columns, sortColumn } = this.state;

    return (
      <div>
        <Table
          columns={columns}
          data={data}
          sortColumn={sortColumn}
          onSort={this.handleSort}
        ></Table>
      </div>
    );
  }
}

export default CurrencyTable;
