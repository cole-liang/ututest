import React from "react";
import TableHeader from "../table-header/table-header.component";
import TableBody from "../table-body/table-body.component";
import "./table.style.scss";

const Table = ({ data, columns, onSort, sortColumn }) => {
  return (
    <table className="table">
      <TableHeader
        columns={columns}
        onSort={onSort}
        sortColumn={sortColumn}
      ></TableHeader>
      <TableBody data={data} columns={columns}></TableBody>
    </table>
  );
};

export default Table;
