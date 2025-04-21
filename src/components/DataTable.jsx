import React from 'react';
import './DataTable.css';

const DataTable = ({ data }) => {
  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Image</th>
          <th>Time Taken</th>
          <th>Severity</th>
          <th>Classification</th>
        </tr>
      </thead>
      <tbody>
        {data.map((entry, index) => (
          <tr key={index}>
            <td>
            <img
                  src={`data:image/jpeg;base64,${entry.image}`}
                  alt="Uploaded"
                  className="table-img"
                />
            </td>
            <td>{entry.time?.toDate ? entry.time.toDate().toLocaleString() : entry.time}</td>
            <td>{entry.severity}</td>
            <td>{entry.classification}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
