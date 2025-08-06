'use client'

import { useState } from "react";
import { GoSearch } from "react-icons/go";
import { useRouter } from "next/navigation";

export default function SearchEngine() {
  const router = useRouter();
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [selected, setSelected] = useState<'inbox' | 'sent'>('inbox');
  const [body, setBody] = useState('');
  const [subject, setSubject] = useState('');

  const handleSearch = () => {
    const query = new URLSearchParams({ subject, body }).toString();
    router.push(`http://localhost/home/${selected}/search?${query}`);
    setShowSearchBox(false)
  }

  return (
    <div className="relative w-full max-w-md">
      {/* Nút Tìm kiếm */}
      <button
        className="text-black text-[24px] p-3 rounded-full hover:bg-gray-300 cursor-pointer"
        onClick={() => setShowSearchBox(prev => !prev)}
      >
        <GoSearch />
      </button>

      {showSearchBox && (
        <div className="mt-4 p-4 bg-white border rounded-lg shadow space-y-4 absolute top-[32px] left-0 w-[500px]">
          {/* Nhập Subject */}
          <div>
            <label className="block mb-1 font-medium">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Nhập subject"
              className="w-full border px-4 py-2 rounded-lg bg-gray-100 focus:outline-none"
            />
          </div>

          {/* Nhập Body */}
          <div>
            <label className="block mb-1 font-medium">Body</label>
            <input
              type="text"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Nhập body"
              className="w-full border px-4 py-2 rounded-lg bg-gray-100 focus:outline-none"
            />
          </div>

          {/* Chọn Inbox / Sent */}
          <div className="flex gap-4">
            <button
              onClick={() => setSelected('inbox')}
              className={`px-6 py-2 rounded-lg text-white font-medium transition-all ${
                selected === 'inbox' ? 'bg-blue-600' : 'bg-gray-400 hover:bg-blue-500'
              }`}
            >
              Inbox
            </button>

            <button
              onClick={() => setSelected('sent')}
              className={`px-6 py-2 rounded-lg text-white font-medium transition-all ${
                selected === 'sent' ? 'bg-green-600' : 'bg-gray-400 hover:bg-green-500'
              }`}
            >
              Sent
            </button>
          </div>

          {/* Nút thực hiện tìm kiếm */}
          <div className="flex items-center justify-between">
            <div>
              <button
                className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 cursor-pointer"
                onClick={()=>{setShowSearchBox(false)}}
              >
                Hủy
              </button>
            </div>
            <div>
              <button
                className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 cursor-pointer"
                onClick={handleSearch}
              >
                Tìm ngay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
