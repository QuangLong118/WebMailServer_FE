import Link from "next/link";

interface MenuItemProps {
  link: string;
  icon: React.ReactNode;
  title: string;
}

export default function MenuItem({ link, icon, title }: MenuItemProps) {
  return (
    <Link href={link}>
      <div className="grid grid-cols-4 p-2 hover:bg-gray-200 rounded cursor-pointer">
        <div className="col-span-1 flex items-center justify-center">
          {icon}
        </div>
        <div className="col-span-3 flex items-center">
          <p>{title}</p>
        </div>
      </div>
    </Link>
  );
}
