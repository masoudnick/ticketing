import Header from "./header";
import Sidebar from "./sidebar";
import Main from "./main";
import { Outlet, useMatches } from "react-router-dom";
import { useState } from 'react';


const MainLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const matches = useMatches();
    const currentRoute = matches[matches.length - 1];
    const title = (currentRoute.handle as {title ?: string})?.title;
    return (
        <div className='flex h-screen overflow-hidden font-vazir'>
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <section className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <Main title={title}>
                    <Outlet />
                </Main>
            </section>
        </div>
    )
}

const AuthLayout = () => {
    return (
        <div className="grid lg:grid-cols-2 h-screen">
            <div className="flex justify-center items-center p-8 lg:p-10 order-2 lg:order-1">
                <div className="max-w-[370px] w-full">
                    <Outlet />
                </div>
            </div>
            <div className="lg:rounded-xl border-gray-200 lg:border lg:border-border lg:m-5 order-1 lg:order-2 bg-top xxl:bg-center xl:bg-cover bg-no-repeat branded-bg">
                <div className="flex flex-col p-8 lg:p-16 gap-4">

                </div>
            </div>
            
        </div>
    )
}


export { MainLayout, AuthLayout }