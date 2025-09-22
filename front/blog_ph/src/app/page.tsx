'use client';

import { useEffect, useState } from 'react';
import api from '../lib/api';

export default function HomePage() {
  const [status, setStatus] = useState('');

  
  useEffect(() => {
    api.get(`/healthcheck`)
      .then((res) => {
        setStatus(res.data.status);
      })
      .catch((error) => {
        console.log("erro na api:", error);
      })
  }, []);

  return (
    <div>
      <h1>Status do Backend</h1>
      <p>API Status: {status || 'Carregando...'}</p>
    </div>
  );
}