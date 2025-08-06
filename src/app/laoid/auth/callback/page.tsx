'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LaoIdCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const code = searchParams.get('authorization_code');
    if (code) {
      console.log('Received code:', code);

      // Gửi code đến API backend
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/loginLaoId`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })
        .then(async (res) => {
          if (!res.ok) {
            throw new Error('Failed to exchange code');
          }
          const data = await res.json();
          console.log('Login success:', data);
          
          localStorage.setItem('accessToken',data.access_token)

          console.log('access_token',localStorage.getItem('accessToken'))

          window.close();
        })
        .catch((err) => {
          console.error('Error exchanging code:', err);
        });
    }
  }, [searchParams, router]);

  return (
    <div className="p-4">
      <p>Đang xử lý đăng nhập SSO...</p>
    </div>
  );
}
