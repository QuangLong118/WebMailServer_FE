'use client';

import { AuthLoading } from '@/components/ui/Loading';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const CLIENT_ID = '660dfa27-5a95-4c88-8a55-abe1310bf579';
const REDIRECT_URI = 'http://localhost/laoid/auth/callback';
const USE_CALLBACK_URI = true;
const API_ENDPOINT = 'https://demo-sso.tinasoft.io/api/v1/third-party/authorize-host';

declare global {
  interface Window {
    LaoIdSSO?: {
      isInitialize?: boolean;
      clientId?: string;
      redirectUri?: string;
      useCallbackUri?: boolean;
      apiEndpoint?: string;
      init?: (clientId: string, redirectUri: string, useCallbackUri: boolean) => void;
      openSSO?: () => void;
    };
  }
}

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        setIsAuthenticated(true)
        router.replace('/home/inbox');
    }

    else{setIsAuthenticated(false)}

    const handleStorage = (event: StorageEvent) => {
      if (event.key === 'accessToken' && event.newValue) {
        router.replace('/home/inbox');
      }
    };

    window.addEventListener('storage', handleStorage);

    return () => window.removeEventListener('storage', handleStorage);
  }, [router]);

  useEffect(() => {
    initializeSSO();
  }, []);  

  function initializeSSO(): void {
    if (window.LaoIdSSO && window.LaoIdSSO.isInitialize) {
      return;
    }

    window.LaoIdSSO = {
      isInitialize: true,
      clientId: CLIENT_ID,
      redirectUri: REDIRECT_URI,
      useCallbackUri: USE_CALLBACK_URI,
      apiEndpoint: API_ENDPOINT,
      init: (clientId: string, redirectUri: string, useCallbackUri: boolean) => {
        window.LaoIdSSO!.clientId = clientId;
        window.LaoIdSSO!.redirectUri = redirectUri;
        window.LaoIdSSO!.useCallbackUri = useCallbackUri;
      },
      openSSO: () => {
        const popupWidth = 455;
        const popupHeight = 810;

        const windowWidth =
          window.innerWidth || document.documentElement.clientWidth || screen.width;
        const windowHeight =
          window.innerHeight || document.documentElement.clientHeight || screen.height;

        const left = windowWidth / 2 - popupWidth / 2 + window.screenLeft;
        const top = windowHeight / 2 - popupHeight / 2 + window.screenTop;

        window.open(
          `https://demo-sso.tinasoft.io/login?client_id=${window.LaoIdSSO?.clientId}&redirect_uri=${window.LaoIdSSO?.redirectUri}&use_callback_uri=${window.LaoIdSSO?.useCallbackUri}`,
          'LaoID',
          `height=${popupHeight},width=${popupWidth},top=${top},left=${left},resizable=no,location=no,menubar=no`
        );
      },
    };

    verifyHost();
  }

  async function verifyHost(): Promise<void> {
    const response = await fetch(window.LaoIdSSO!.apiEndpoint!, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        clientId: window.LaoIdSSO!.clientId,
        host: window.location.host,
      }),
    });

    const responseData = await response.json();

    if (response.ok && responseData.success) {
      console.log('LaoID SSO verified successfully');
    } else {
      console.error('LaoID SSO verify failed', responseData);
    }
  }

  const handleLogin = async (): Promise<void> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await response.json();
    if(data.access_token){
        localStorage.setItem('accessToken',data?.access_token)
        router.replace('/home/inbox');
    }

    else {
        alert('Thông tin đăng nhập không chính xác')
    }
    
  };

   // Show beautiful loading while checking authentication
    if (isAuthenticated === null) {
      return <AuthLoading />;
    }

if(isAuthenticated === false){
  return (
    <>
      <div className="bg-white px-[30px] py-[36px] w-[480px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-center font-bold text-[32px] pb-[24px]">Login</h1>

        <p className="pb-[4px] font-bold">Username</p>
        <input
          className="border border-black w-full h-[40px] rounded-full mb-[15px] px-[24px]"
          placeholder="Type Email..."
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <p className="pb-[4px] font-bold">Password</p>
        <input
          className="border border-black w-full h-[40px] rounded-full mb-[15px] px-[24px]"
          placeholder="Type Password..."
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="cursor-pointer text-center w-full py-[8px] mt-[24px] bg-gray-700 text-white rounded-full mb-[4px] hover:bg-gray-900"
        >
          Login
        </button>

        <button
          onClick={() => window.LaoIdSSO?.openSSO?.()}
          className="cursor-pointer text-center w-full py-[8px] mt-[24px] bg-blue-800 text-white rounded-full mb-[4px] hover:bg-blue-900"
        >
          Login by LaoID
        </button>

        <div className="flex justify-between">
          <Link className="cursor-pointer text-[12px] pl-[12px]" href="">
            Forgot password
          </Link>
          <Link className="cursor-pointer text-[12px] pr-[12px]" href="">
            Sign up
          </Link>
        </div>
      </div>
    </>
  );
}
}
