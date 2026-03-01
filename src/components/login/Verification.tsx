'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function VerifyEmail() {
  const params = useSearchParams();
  const token = params.get('token');
  const [status, setStatus] = useState('Verifying...');

  useEffect(() => {
    if (token) {
      fetch(`http://localhost:8080/api/verify-email?token=${token}`)
        .then(res => res.json())
        .then(data => setStatus(data.message))
        .catch(() => setStatus('Verification failed'));
    }
  }, [token]);

  return <div>{status}</div>;
}