import { Link, useNavigate } from "react-router-dom";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components";
import userImage from "../../assets/images/user.png";
import useAuthStore from "@/store/useAuthStore";

const UserDropdownMenu = () => {
    const user = useAuthStore((state) => state.user);
    const signOut = useAuthStore((state) => state.signOut);
    const navigate = useNavigate();

    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <button className="inline-flex items-center justify-center" aria-label="منوی حساب کاربری">
                <img className="size-8 rounded-full border border-border" src={userImage} width="32" height="32" alt="تصویر کاربر" />
            </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64" side="bottom" align="start">
            <div className="flex items-center justify-end gap-2 px-2.5 py-2">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-primary bg-primary/10 text-sm font-bold text-primary">{user?.name?.slice(0, 1) ?? "ک"}</div>
                <div className="flex min-w-0 flex-col gap-1 text-right">
                    <span className="truncate text-sm font-semibold text-foreground">{user?.name ?? "کاربر"}</span>
                    <span className="truncate text-xs font-medium text-secondary-foreground">{user?.email ?? ""}</span>
                </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Link className="flex items-center gap-2" to="/settings/basics">تنظیمات</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => { signOut(); navigate("/signin", { replace: true }); }}>
                <span className="flex w-full items-center gap-2">خروج از حساب</span>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>;
};

export default UserDropdownMenu;
