/* eslint-disable @typescript-eslint/no-explicit-any */
import { sendMail } from "@/services/EmailService";
import { useState } from "react";

export default function ChatForm(props: any) {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [attachment, setAttachment] = useState<File | undefined>(undefined);

  const handleSendMail = async () => {
    try {
      const formData = new FormData();
      formData.append("to", to);
      formData.append("subject", subject);
      formData.append("body", body);
      if (attachment) {
        formData.append("attachment", attachment);
      }

      const result = await sendMail(formData);
      console.log("📤 Gửi thành công:", result);

      alert("Gửi mail thành công!");
      window.location.reload();
    } catch (err: any) {
      console.error("❌ Gửi mail thất bại:", err);
      alert("Gửi mail thất bại: " + (err.message || ""));
      window.location.reload();
    }
  };

  return (
    <div className="w-[600px] mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <input
        name="to"
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="To"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <input
        name="subject"
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <textarea
        name="body"
        className="w-full px-4 py-2 h-64 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

      {/* File Upload đẹp */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          File đính kèm
        </label>
        <label className="flex items-center px-4 py-2 bg-gray-100 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-200 transition">
          <svg
            className="w-5 h-5 text-gray-600 mr-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.586-6.586a4 4 0 10-5.656-5.656l-6.586 6.586"
            />
          </svg>
          {attachment ? (
            <span className="text-gray-700 truncate">
              {attachment.name} — <span className="underline text-blue-600">Đổi file</span>
            </span>
          ) : (
            <span className="text-gray-700">Chọn file</span>
          )}
          <input
            type="file"
            className="hidden"
            onChange={(e) => setAttachment(e.target.files?.[0] || undefined)}
          />
        </label>
      </div>

      <div className="flex items-center justify-end gap-2 mt-6">
        <button
          className="px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 cursor-pointer"
          onClick={() => props.onClose()}
        >
          Cancel
        </button>
        <button
          onClick={() => handleSendMail()}
          className="px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
        >
          Send
        </button>
      </div>
    </div>
  );
}
