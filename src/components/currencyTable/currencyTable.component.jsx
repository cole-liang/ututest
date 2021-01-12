import React, { Component } from "react";
import Table from "../common/table/table.component";
import data from "../../resources/data.json";
import moment from "moment";
import _ from "lodash";
import "./currencyTable.style.scss";
import global from "./../../global";

class CurrencyTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,

      today: "2019-11-22",

      // Initial sort setting
      // "path" is the attribute name in the json data file
      sortColumn: { path: "Market Cap", order: "desc" },

      // Define what should be displayed in the table
      // "path" is the attribute name in the json data file
      // "label" is the name for table header
      columns: [
        { path: "id", label: "#" },
        { path: "Currency", label: "Coin" },
        // Assume the price is the closing amount of the day
        { path: "Close", label: "Price" },
        { path: "24h", label: "24h" },
        { path: "7d", label: "7d" },
        { path: "Volume", label: "24h Volume" },
        { path: "Market Cap", label: "Mkt Cap" },
      ],
    };
  }

  generateDisplayResult = (processData, today) => {
    let result = [];

    // Order the data by Currency and then Date in descending order to gurantee
    // the record from 7 days ago will be the last one we need to process
    // for a specific Currency/Coin
    let orderedData = _.orderBy(processData, ["Currency"], ["asc"]);

    // Store the currency/coin processed last time
    let lastCoin = null;

    let todayObj = moment(today, "YYYY-MM-DD");

    // Must be moment(today, "YYYY-MM-DD") since substract() will change the
    // original object
    const before7dObj = moment(today, "YYYY-MM-DD").subtract(7, "days");
    const before1dObj = moment(today, "YYYY-MM-DD").subtract(1, "days");
    let recordToday = null;
    let change7d = null;
    let change24h = null;

    orderedData.forEach((item, index) => {
      let dateObj = moment(item.Date, "YYYY-MM-DD");

      // Result record should be added when going to a new currency
      if (lastCoin !== item.Currency) {
        if (lastCoin) {
          // Sometimes there is no record for a currency on a specific day,
          // put all numeric values to "N/A" for such currency. Otherwise,
          // just normally push the record to result.
          if (recordToday && recordToday.Currency === lastCoin) {
            result.push({
              ...recordToday,
              // Setting global.NA_VALUE to keep "N/A" value record the smallest
              // when ordering.
              "24h": change24h ? change24h : global.NA_VALUE,
              "7d": change7d ? change7d : global.NA_VALUE,
            });
          } else {
            result.push({
              Currency: lastCoin,
              Close: global.NA_VALUE,
              Volume: global.NA_VALUE,
              "Market Cap": global.NA_VALUE,
              "24h": global.NA_VALUE,
              "7d": global.NA_VALUE,
            });
          }
          change24h = null;
          change7d = null;
        }
        lastCoin = item.Currency;
      }

      // If current record is within 7 days from today, store today's record
      // and the calculated changed value when matches
      if (!dateObj.isAfter(todayObj) && !dateObj.isBefore(before7dObj)) {
        if (dateObj.isSame(todayObj)) {
          recordToday = item;
        } else if (dateObj.isSame(before1dObj)) {
          change24h = (item.Close - recordToday.Close) / item.Close;
          change24h = change24h.toFixed(2);
        } else if (dateObj.isSame(before7dObj)) {
          change7d = (item.Close - recordToday.Close) / item.Close;
          change7d = change7d.toFixed(2);
        }
      }

      // Result record should be added when it comes to the final record and
      // at the same time no record found in result array for that currency
      if (
        index === orderedData.length - 1 &&
        !result.find((item) => {
          return item.Currency === lastCoin;
        })
      ) {
        if (recordToday && recordToday.Currency === lastCoin) {
          result.push({
            ...recordToday,
            "24h": change24h ? change24h : global.NA_VALUE,
            "7d": change7d ? change7d : global.NA_VALUE,
          });
        } else {
          result.push({
            Currency: lastCoin,
            Close: global.NA_VALUE,
            Volume: global.NA_VALUE,
            "Market Cap": global.NA_VALUE,
            "24h": global.NA_VALUE,
            "7d": global.NA_VALUE,
          });
        }
      }
    });

    console.log(result);

    return result;
  };

  componentDidMount() {
    // parse and remove commas in the numbers of "Market Cap" and "Volume" for
    // ordering, also change the format of the "Date" for ordering date in
    // generateDisplayResult method
    let tmpData = data.map((item) => {
      let momentObj = moment(item.Date, "MMM DD, YYYY");
      const date = momentObj.format("YYYY-MM-DD");
      const closeInt =
        typeof item["Close"] === "string"
          ? parseInt(item["Close"].replace(/,/g, ""))
          : item["Close"];
      const mtkcapInt = parseInt(item["Market Cap"].replace(/,/g, ""));
      const volumeInt = parseInt(item["Volume"].replace(/,/g, ""));
      return {
        ...item,
        Close: closeInt,
        "Market Cap": mtkcapInt,
        Volume: volumeInt,
        Date: date,
      };
    });

    tmpData = this.generateDisplayResult(tmpData, this.state.today);

    // Sort with the initial value and add id to data. Has to add id in componentDidMount
    // so that id won't change when ordering with other attributes
    tmpData = _.orderBy(
      tmpData,
      this.state.sortColumn.path,
      this.state.sortColumn.order
    ).map((item, index) => {
      return { ...item, id: index + 1 };
    });

    this.setState({ data: tmpData });
  }

  handleSort = (sortColumn) => {
    this.setState({ sortColumn: sortColumn });
  };

  addCommaToNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  render() {
    const { data, columns, sortColumn } = this.state;

    // Sort when clicking table header, add back the commas for number display,
    // and change from global.NA_VALUE to "N/A"
    let sortedData = _.orderBy(data, sortColumn.path, sortColumn.order).map(
      (item) => {
        return {
          ...item,
          "24h":
            item["24h"] !== global.NA_VALUE
              ? this.addCommaToNumber(item["24h"])
              : "N/A",
          "7d":
            item["7d"] !== global.NA_VALUE
              ? this.addCommaToNumber(item["7d"])
              : "N/A",
          Close:
            item["Close"] !== global.NA_VALUE
              ? this.addCommaToNumber(item["Close"])
              : "N/A",
          "Market Cap":
            item["Market Cap"] !== global.NA_VALUE
              ? this.addCommaToNumber(item["Market Cap"])
              : "N/A",
          Volume:
            item["Volume"] !== global.NA_VALUE
              ? this.addCommaToNumber(item["Volume"])
              : "N/A",
        };
      }
    );

    return (
      <div>
        <Table
          columns={columns}
          data={sortedData}
          sortColumn={sortColumn}
          onSort={this.handleSort}
        ></Table>
      </div>
    );
  }
}

export default CurrencyTable;
