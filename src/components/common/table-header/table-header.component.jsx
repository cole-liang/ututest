import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import "./table-header.style.scss";

class TableHeader extends Component {
  raiseSort(path) {
    let column = { ...this.props.sortColumn };
    if (column.path === path)
      column.order = column.order === "asc" ? "desc" : "asc";
    else {
      column.path = path;
      column.order = "asc";
    }
    this.props.onSort(column);
  }

  renderSortIcon = (column) => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path || !column.path) return null;
    return sortColumn.order === "asc" ? (
      <FontAwesomeIcon icon={faSortUp} className="table-header__icon" />
    ) : (
      <FontAwesomeIcon icon={faSortDown} className="table-header__icon" />
    );
  };

  render() {
    const { columns } = this.props;

    return (
      <thead className="table-header">
        <tr>
          {columns.map((column) => (
            <th
              className="table-header__content"
              key={column.path}
              onClick={() => this.raiseSort(column.path)}
            >
              <span className="table-header__label">{column.label}</span>
              {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
