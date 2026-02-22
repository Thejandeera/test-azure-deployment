import { useState, useEffect } from 'react';

function App() {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetching directly from your live Azure API URL
    fetch('https://deera-api-xyz-d5dfdsb3dha9cfgu.westindia-01.azurewebsites.net/weatherforecast')
      .then(response => response.json())
      .then(data => {
        setForecast(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Zenvixor Weather Dashboard</h1>

      {loading ? (
        <p>Loading data from the C# backend...</p>
      ) : (
        <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th>Date</th>
              <th>Temp (C)</th>
              <th>Temp (F)</th>
              <th>Summary</th>
            </tr>
          </thead>
          <tbody>
            {forecast.map((day, index) => (
              <tr key={index}>
                <td>{day.date}</td>
                <td>{day.temperatureC}</td>
                <td>{day.temperatureF}</td>
                <td>{day.summary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;