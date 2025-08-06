'use client'

import MailItem from '@/components/feature/mail/MailItem';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { MailData, searchSentService } from '@/services/EmailService';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SearchSent(){
    const searchParams = useSearchParams();
    const subject = searchParams.get('subject') || '';
    const body = searchParams.get('body') || '';

    const [mails, setMails] = useState<MailData[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMails = async () => {
        try {
            const data = await searchSentService({ subject, body });
            setMails(data);
        } catch (err: any) {
            setError(err.message);
        }
        };
        fetchMails();
    }, [subject, body]);

    
    return (
    <div className="p-4">
        <p>Subject: {subject}</p>
        <p>Body: {body}</p>
        <h2 className="text-lg font-bold mb-4">Sent - Kết quả tìm kiếm</h2>
        {error && <p className="text-red-500">{error}</p>}
        {mails.map((mail, index) => (
            <MailItem key={index} mail={mail} type='inbox'/>
        ))}
    </div>
  );
}