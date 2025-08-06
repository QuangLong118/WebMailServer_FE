import SearchEngine from "./SearchEngine";
import UserDropdown from "./UserDropdown";

export default function Navbar(){
    return (
        <div className="flex items-center justify-between py-[12px]">
            <SearchEngine/>
            <div>
                <div className="mx-[24px]">
                    <UserDropdown/>
                </div>
            </div>
        </div>
    )
}