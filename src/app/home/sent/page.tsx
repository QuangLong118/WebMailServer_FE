'use client'

import ListMail from "@/components/feature/sent/ListMail";

export default function Inbox() {

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Sent</h1>
      <ListMail/>
    </div>
  );
}
