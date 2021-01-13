import React, { Component } from "react";
import CurrencyTable from "../currencyTable/currencyTable.component";
import DatePicker from "react-datepicker";
import { format, parse, isValid } from "date-fns";

import "./dashboard.style.scss";
import "react-datepicker/dist/react-datepicker.css";
import "../../sass/base/_utilities.scss";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datepickerFocused: false,

      today: parse("2019-11-22", "yyyy-MM-dd", new Date()),
    };
  }

  handleDate = (today) => this.setState({ today });

  render() {
    const { today } = this.state;

    return (
      <main className="container u-child-center">
        <div className="content">
          <div className="content__date">
            <span className="content__date-text">Current Date:</span>
            <DatePicker
              dateFormat="yyyy-MM-dd"
              selected={today}
              onChange={(date) => this.handleDate(date)}
            />
          </div>

          <CurrencyTable
            key={today}
            today={format(today, "yyyy-MM-dd")}
          ></CurrencyTable>
        </div>
      </main>
    );
  }
}

export default Dashboard;
