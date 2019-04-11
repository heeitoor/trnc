import React, { useState, useEffect } from 'react';

export default function App() {
  const [list, setList] = useState([]);
  const go = async () => {
    const response = await fetch('https://api.github.com/users/heeitoor/repos');
    const result = await response.json();

    setList(result);
  };

  useEffect(() => {
    go();
  }, []);
  
  return (
    <>
      <ul>
        {list.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </>
  );
}
