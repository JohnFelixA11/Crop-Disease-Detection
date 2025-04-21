import React, { useEffect, useState } from 'react';
import './App.css';
import { fetchLastFiveFromFirestore } from './firebase/firestoreService';
import DataTable from './components/DataTable';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const firestoreData = await fetchLastFiveFromFirestore();

      const filledData = firestoreData.map(item => ({
        image: item.image || process.env.PUBLIC_URL + '/assets/3.jpg',
        time: item.time || new Date().toLocaleString(),
        severity: item.severity || '70%',
        classification: item.classification || 'Apple___Apple_scab'
      }));

      setData(filledData);
    };

    // Initial load
    loadData();

    // Set interval to fetch every 10 seconds
    const intervalId = setInterval(() => {
      loadData();
    }, 10000); // 10,000 ms = 10 seconds

    // Cleanup on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="App">
      <h1>Crop Disease Detection Dashboard</h1>
      <DataTable data={data} />
    </div>
  );
}

export default App;
