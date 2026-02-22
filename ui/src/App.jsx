import { useState, useEffect } from 'react';

function App() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  // UPDATE THIS to your new Azure Backend URL
  // Example: 'https://deera-api-xyz.azurewebsites.net'
  const BACKEND_URL = 'https://deera-api-xyz-d5dfdsb3dha9cfgu.westindia-01.azurewebsites.net/weatherforecast';

  useEffect(() => {
    // Fetching from your new custom mock data API endpoint
    fetch(`${BACKEND_URL}/api/team`)
      .then(response => response.json())
      .then(data => {
        setTeam(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ color: '#0078D4', borderBottom: '2px solid #0078D4', paddingBottom: '10px' }}>
        Zenvixor Studios
      </h1>
      <h2>Team Directory</h2>

      {loading ? (
        <p style={{ color: '#666', fontStyle: 'italic' }}>
          Loading mock data from the C# backend...
        </p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {team.map((member) => (
            <li
              key={member.id}
              style={{
                backgroundColor: '#f9f9f9',
                margin: '10px 0',
                padding: '15px',
                borderRadius: '8px',
                border: '1px solid #e0e0e0',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}
            >
              <strong style={{ fontSize: '18px', display: 'block', color: '#333' }}>
                {member.name}
              </strong>
              <span style={{ color: '#555' }}>{member.role}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;