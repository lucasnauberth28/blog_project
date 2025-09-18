'use client';

import { useEffect, useState } from 'react';

export default function HomePage() {
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/healthcheck`)
      .then((res) => res.json())
      .then((data) => setStatus(data.status))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Status do Backend</h1>
      <p>API Status: {status || 'Carregando...'}</p>
    </div>
  );
}