import React, { Component } from "react";
import _ from "lodash";
import "./table-body.style.scss";

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  render() {
    const { data, columns } = this.props;
    return (
      <React.Fragment>
        {data.map((item) => (
          <tr key={item.Currency + item.Date}>
            {columns.map((column) => (
              <td key={column.path || column.key}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </React.Fragment>
    );
  }
}

export default TableBody;
