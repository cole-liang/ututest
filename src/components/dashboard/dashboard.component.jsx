import React, { Component } from "react";
import CurrencyTable from "../currencyTable/currencyTable.component";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { SingleDatePicker } from "react-dates";
import moment from "moment";

import "./dashboard.style.scss";
import "../../sass/base/_utilities.scss";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datepickerFocused: false,

      today: "2019-11-22",
    };
  }

  handleDate = (date) => this.setState({ today: date.format("YYYY-MM-DD") });

  render() {
    const { today, datepickerFocused } = this.state;

    return (
      <main className="container u-child-center">
        <div className="content">
          <div className="content__date">
            <span className="content__date-text">Current Date: </span>
            <SingleDatePicker
              date={moment(today, "YYYY-MM-DD")}
              onDateChange={(date) => this.handleDate(date)}
              focused={datepickerFocused}
              onFocusChange={({ focused }) =>
                this.setState({ datepickerFocused: focused })
              }
              numberOfMonths={1}
              isOutsideRange={() => false}
              id="datepicker"
            />
          </div>

          <CurrencyTable key={today} today={today}></CurrencyTable>
        </div>
      </main>
    );
  }
}

export default Dashboard;
