'use client'

// import ListMail from "@/components/feature/inbox/ListMail";
import ListMail from "@/components/feature/inbox/ListMail";

export default function Inbox() {

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Inbox</h1>
      <ListMail/>
    </div>
  );
}
