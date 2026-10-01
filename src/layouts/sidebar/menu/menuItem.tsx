import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import type { MenuItemProps } from "@/types";
import { HugeiconsIcon } from "@hugeicons/react";

const MenuItem = ({ item }: { item: MenuItemProps }) => {
    const location = useLocation();

    const [open, setOpen] = useState<boolean>(!!location.pathname.includes(item.href));
    const hasChildren = !!item.children?.length;

    return (
        <li className="mb-2 from-violet-500/12 to-violet-500/4">
            {hasChildren ?
                (<button onClick={() => setOpen(!open)} className="flex px-2 py-2 items-center w-full rounded-lg cursor-pointer gap-x-2">
                    {item.icon && <HugeiconsIcon icon={item.icon} size={20} />}
                    <span className="text-start grow">{item.label}</span>
                    <svg className={clsx("w-2.5 h-2.5 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 transition-transform duration-300", open && "rotate-180")} viewBox="0 0 12 12">
                        <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                    </svg>
                </button>) : (
                    <Link to={item.href} className={clsx("flex items-center py-2 rounded-lg gap-x-2", item.icon  ? 'px-2' : 'px-3.5', location.pathname.includes(item.href) && 'relative text-primary before:absolute before:start-[-1px] before:size-[6px] before:rounded-full before:bg-primary')}>
                        {item.icon && <HugeiconsIcon icon={item.icon} size={20} />}
                        {item.label}
                    </Link>
            )}
            {hasChildren && (
                <div
                    className={clsx('overflow-hidden transition-all duration-300 ease-in-out', open ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0")}>
                    <ul className="pr-4 space-y-1 relative before:absolute before:start-[17px] before:top-0 before:bottom-0 before:border-s before:border-gray-200/70 dark:before:border-gray-700/60 before:h-full">
                        {item.children!.map((child: MenuItemProps, index: number) => (
                            <MenuItem key={index} item={child} />
                        ))}
                    </ul>
                </div>
            )}
        </li>
    )
}


export default MenuItem;