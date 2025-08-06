/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { MdInbox } from "react-icons/md";
import MenuItem from "./MenuItem";
import { IoMdSend } from "react-icons/io";

export default function Sidebar(){
    return (
        <div className="bg-blue-50 w-full min-h-screen">    
                <div className="flex items-center justify-center py-[12px] gap-[12px] ">
                    <Link href="/home/inbox" className="cursor-pointer">
                        <img className="w-[48px]" src="/logowwf.png" alt=""></img>
                    </Link>
                    <Link href="/home/inbox" className="cursor-pointer">
                        <p className="text-[28px]">LMail</p>
                    </Link>
                </div>
            <MenuItem link="/home/inbox" icon={<MdInbox/>} title="Inbox" />
            <MenuItem link="/home/sent" icon={<IoMdSend/>} title="Sent" />

        </div>
    )
}