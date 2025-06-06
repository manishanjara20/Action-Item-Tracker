import React, { useState } from 'react';
import { PrimaryButton, TextField, DatePicker } from '@fluentui/react';

function App() {
  const [items, setItems] = useState([]);
  const [token, setToken] = useState('');

  const scan = async () => {
    const res = await fetch('/scan', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token }) });
    const data = await res.json();
    setItems(data);
  };

  return (
    <div>
      <h1>Action Item Tracker</h1>
      <TextField label="Teams Auth Token" value={token} onChange={(_,v)=>setToken(v)} />
      <PrimaryButton text="Scan Now" onClick={scan} />
      <table>
        <thead>
          <tr><th>From</th><th>Info</th><th>Deadline</th></tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx}><td>{item.from}</td><td>{item.info}</td><td>{item.deadline}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
