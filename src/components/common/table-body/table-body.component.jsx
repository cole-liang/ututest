import React, { Component } from "react";
import _ from "lodash";
import "./table-body.style.scss";

class TableBody extends Component {
  // value > 0 : green
  // value < 0 : red
  // value = 0 : normal
  addColorClass = (item, column) => {
    const value = _.get(item, column.path);
    if (value > 0) {
      return "table-body__green";
    } else if (value < 0) {
      return "table-body__red";
    }
    return "";
  };

  render() {
    const { data, columns } = this.props;
    return (
      <tbody className="table-body">
        {data.map((item) => (
          <tr key={item.Currency + item.id} className="table-body__row">
            {columns.map((column) => (
              <td
                key={column.path}
                className={
                  "table-body__content " +
                  (column.shouldColor ? this.addColorClass(item, column) : "")
                }
              >
                {column.unit && column.unit.pos === "front"
                  ? column.unit.unit
                  : ""}
                {_.get(item, column.path)}
                {column.unit && column.unit.pos === "end"
                  ? column.unit.unit
                  : ""}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
