import React from "react";
import styles from "../admin/admin.module.css";
const Table = ({ data,handleDelete }) => {
  if (!data || data.length === 0) {
    return <p>No data available.</p>;
  }

  const fixedData = data.map((item) => {
      return {...item, chance:item.chance * 100}
  })

  const columns = [
    {
        text:"Название",
        key:"name"
    },
    {
        text:"Шанс",
        key:"chance"
    }
  ];



  return (
    <table>
      <thead>
        <tr>
            <th style={{ textAlign: "left" }} >Название</th>
            <th style={{ textAlign: "left" }} >Шанс</th>
            <th style={{ textAlign: "left" }} ></th>
        </tr>
      </thead>
      <tbody>
        {fixedData.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, colIndex) => (
              <td key={colIndex}> {column.key === "chance" ? `${row[column.key]}%` : row[column.key]}</td>
            ))}
            {columns && (
              <td>
                <button className={styles.deleteButton} onClick={() => handleDelete(row.id)}>Delete</button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
