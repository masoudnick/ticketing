import { Link } from "react-router-dom";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components";
import userImage from "../../assets/images/user.png"



const UserDropdownMenu = () => {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="inline-flex justify-center items-center group">
                    <img className="size-8 rounded-full border border-border" src={userImage} width="32" height="32" alt="User" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-64" side="bottom" align="start">
                <div className="flex items-center justify-end px-2.5 py-1.5 gap-1.5">
                    <div className="flex items-center gap-2">
                        <img className="size-9 shrink-0 rounded-full border-1 border-primary" src={userImage} alt="مسعود نیک پرور" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-sm text-foreground font-semibold">مسعود نیک پرور</span>
                        <span className="text-xs text-secondary-foreground font-medium">mnick@gmail.com</span>
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link className="flex items-center gap-2" to="/settings">
                        تنظیمات
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link className="flex items-center gap-2" to="/signin">
                        خروج
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>

        </DropdownMenu>
    )
}


export default UserDropdownMenu;