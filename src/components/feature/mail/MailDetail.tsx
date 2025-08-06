/* eslint-disable @typescript-eslint/no-unsafe-function-type */
'use client'
import { MdClose } from "react-icons/md"

interface AttachmentInterface{
    name:string
    mine:string
    size:number
    saved_path:string
}

interface MailDetailProps{
    onClose:Function,
    type:'sent'|'inbox',
    mail:{
        to?:string
        from?:string
        date:string
        body:string
        subject:string
        attachments:AttachmentInterface[]
    }
}

export default function MailDetail({type,mail,onClose}:MailDetailProps){
    const API_BASE_URL = 'http://backend:8000/api';
    async function downloadFile(filename: string) {
        try {
            const response = await fetch(`${API_BASE_URL}/download/${filename}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    // 'Authorization': `Bearer ${yourToken}`,
                }
            });

            if (!response.ok) {
                throw new Error('Tải file thất bại');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();

            // Cleanup
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Download error:', error);
            alert('Không thể tải file.');
        }
    }

    return(
        <div>
            <div 
                className="fixed z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen h-screen bg-black/50"
                onClick={() => onClose()}  
            ></div>
            <div className="fixed z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black w-[1000px] h-[800px] shadow-xl rounded-lg overflow-hidden">
                <div className="flex items-center justify-end border-b-1 borer-black">
                    <div
                        className="p-4 hover:bg-red-500 hover:text-white cursor-pointer"
                        onClick={() => onClose()}
                    >
                        <MdClose />
                    </div>
                </div>
                <div className="p-4 space-y-2 overflow-y-auto h-[calc(1000px-80px)]">
                    <div className="flex gap-2">
                        <p className="font-bold">From:</p>
                        {type === 'inbox' && mail.from ? <p>{mail.from}</p> : 'me'}
                    </div>
                    <div className="flex gap-2">
                        <p className="font-bold">To:</p>
                        {type === 'sent' && mail.to ? <p>{mail.to}</p> : 'me'}
                    </div>
                    <div className="flex gap-2">
                        <p className="font-bold">Subject:</p>
                        <p>{mail.subject}</p>
                    </div>
                    <div>
                        <p className="font-bold">Body:</p>
                        <p>{mail.body}</p>
                    </div>
                    <div className="space-y-1">
                        {mail.attachments.map((item, index) => (
                            <div
                                key={index}
                                className="inline-block bg-gray-100 px-3 py-1 border border-black rounded-full cursor-pointer hover:bg-gray-200"
                                onClick={() => downloadFile(item.saved_path)}
                            >
                                {item.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}