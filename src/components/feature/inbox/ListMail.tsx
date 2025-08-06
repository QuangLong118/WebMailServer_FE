/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import { useEffect, useState, useRef } from "react";
import MailItem from "@/components/feature/mail/MailItem";
import { getInbox, countInbox } from "@/services/EmailService"; 

interface AttachmentInterface{
    name:string
    mine:string
    size:number
    saved_path:string
}

// Interface bạn đã định nghĩa
interface MailData {
    to?:string
    from?:string
    date:string
    body:string
    subject:string
    attachments:AttachmentInterface[]
}

interface InboxInterface {
  status: string;
  count: number;
  data: MailData[];
}

export default function ListMail() {
  const [inbox, setInbox] = useState<InboxInterface | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const previousUnreadCount = useRef<number | null>(null);

  // Lấy mail
  useEffect(() => {
    const fetchInbox = async () => {
      setIsLoading(true);
      setError("");
      try {
        const data = await getInbox();
        setInbox(data);
      } catch (err: any) {
        setError(err.message || "Có lỗi xảy ra");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInbox();
  }, [refreshTrigger]); 

  // Kiểm tra định kì
  useEffect(() => {
    const performCheck = async () => {
      try {
        const newUnreadCount = await countInbox();

        if (previousUnreadCount.current !== null && newUnreadCount > previousUnreadCount.current) {
          setRefreshTrigger(prev => prev + 1);
        }
        previousUnreadCount.current = newUnreadCount;
      } catch (err) {
        console.error("Lỗi khi kiểm tra mail:", err);
      }
    };
    const intervalId = setInterval(performCheck, 5000); // Kiểm tra mỗi 20 giây
    return () => clearInterval(intervalId);
  }, []); 


  if (error) {
    return <p className="p-4 text-red-500">Lỗi lấy dữ liệu: {error}</p>;
  }

  if (isLoading) {
    return <p className="p-4 text-gray-500">Đang tải hòm thư...</p>;
  }

  if (!inbox || inbox.data.length === 0) {
    return <p className="p-4 text-gray-500">Không có mail nào trong hòm thư.</p>;
  }

  return (
    <div className="border-t border-gray-200">
      {inbox.data.map((mail: MailData, index: number) => (
        <MailItem key={index} mail={mail} type='inbox'/>
      ))}
    </div>
  );
}