import { useEffect, useRef } from "react";
import Menu from "./menu";
import clsx from "clsx";




const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const trigger = useRef<HTMLButtonElement>(null);
    const sidebar = useRef<HTMLDivElement>(null);


    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!sidebar.current || !trigger.current) return;
            if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
            setSidebarOpen(false);
        };
        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
    });

    return (
        <div className="min-w-fit">
            <div className={clsx("fixed inset-0 bg-gray-900/30 z-40 lg:hidden lg:z-auto transition-opacity duration-200", sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none")}></div>
            <div id="sidebar" className={clsx("flex flex-col border-e border-border absolute z-40 right-0 top-0 lg:static lg:right-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:w-64! shrink-0 bg-white dark:bg-gray-800 p-4 transition-all duration-200 ease-in-out", sidebarOpen ? "translate-x-0" : "translate-x-64") }>
                <div className="flex justify-between mb-4 pr-3 sm:px-2">
                    <button
                        ref={trigger}
                        className="lg:hidden text-gray-500 hover:text-gray-400"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        aria-controls="sidebar"
                        aria-expanded={sidebarOpen}
                    >
                        <span className="sr-only">Close sidebar</span>
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
                        </svg>
                    </button>
                </div>
                <Menu />
            </div>
        </div>
    )
}


export default Sidebar;