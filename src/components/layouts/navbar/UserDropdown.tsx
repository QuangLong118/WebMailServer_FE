/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client'

import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/core/useAuth';


const UserDropdown = () => {
    const { logout } = useAuth();
  

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (dropdownRef.current && !(dropdownRef.current as any).contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Nút chính: ảnh + mũi tên */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 cursor-pointer"
      >
        <img
          src="/avatarUser.png"
          alt="avatar"
          className="w-[36px] h-[36px] rounded-full"
        />
        <svg
          className="w-4 h-4 text-gray-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <ul className="py-1 text-sm text-gray-700">
            <li>
              <Link
                href={"/Profile/"+localStorage.getItem('documentId')}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Trang cá nhân
              </Link>
            </li>
            <li>
              <Link
                href="/Account/me"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Tài khoản
              </Link>
            </li>
            <li>
              <button
                onClick={()=>{logout()}}
                className="block px-4 py-2 hover:bg-gray-100 w-full cursor-pointer text-left"
              >
                Log out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
