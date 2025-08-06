'use client'

import { useState } from "react";
import { MdEdit } from "react-icons/md";
import ChatForm from "./ChatForm";

export default function Chat(){

    const [hidden, setHidden] = useState(true);

    if (hidden){   
        return(
            <div 
                className=" bg-blue-800 text-white flex gap-[8px] items-center px-[12px] py-[8px] rounded-full hover:bg-blue-600 cursor-pointer"
                onClick={() => setHidden(false)}
            >
                <MdEdit />
                <p>New Email</p>
            </div>
        ) 
    }
    else return (
            <div>
                <ChatForm onClose={() => setHidden(true)}/>
            </div>
        )
}