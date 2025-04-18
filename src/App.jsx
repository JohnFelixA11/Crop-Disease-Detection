import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:5000/uploaddata');

    eventSource.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);
      setData((prev) => [parsedData, ...prev]);
    };

    return () => eventSource.close();
  }, []);

  return (
    <div className="App">
      <h1>Received Data</h1>
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
                <img src={entry.image} alt="uploaded" className="table-img" />
              </td>
              <td>{entry.time}</td>
              <td>{entry.severity}</td>
              <td>{entry.classification}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
