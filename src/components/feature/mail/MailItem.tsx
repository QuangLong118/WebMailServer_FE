'use client'

import { formatDateToShortVN } from "@/lib/util/date";
import { useState } from "react";
import MailDetail from "./MailDetail";

interface AttachmentInterface{
    name:string
    mine:string
    size:number
    saved_path:string
}

interface MailItemProps {
    type:'sent'|'inbox'
    mail:{
        to?:string
        from?:string
        date:string
        body:string
        subject:string
        attachments:AttachmentInterface[]
    }
}

export default function MailItem({mail,type}:MailItemProps){

    const [detail,setDetail] = useState(false)

    return(
        <div>
            <div 
                className="grid grid-cols-12 gap-2 p-[8px] text-black border-b-1 border-gray-200 hover:bg-blue-50 cursor-pointer"
                onClick={()=>setDetail(true)}
            >
                <div className="col-span-2 overflow-hidden font-semibold">
                    {mail.from || mail.to}
                </div>
                <div className="col-span-9 overflow-hidden" >
                    <p>
                        <span className="font-bold">{mail.subject + ' - '}</span>
                        {mail.body}
                    </p>
                    {/* {mail.subject +" - "+mail.body} */}
                    <div className="flex gap-2 pt-2">
                        {mail.attachments.map((item, index) => (
                            <div
                                key={index}
                                className="inline-block bg-gray-100 px-3 py-1 border border-black rounded-full"
                            >
                                {item.name}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-span-1">
                    {formatDateToShortVN(mail.date)}
                </div>
            </div>
            {detail &&  <MailDetail type={type} mail={mail} onClose={()=>setDetail(false)}/>}
        </div>

    )
}