import Header from "./header";
import Sidebar from "./sidebar";
import Main from "./main";
import { Outlet, useMatches } from "react-router-dom";
import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ShieldCheckIcon } from "@hugeicons/core-free-icons";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const matches = useMatches();
  const currentRoute = matches[matches.length - 1];
  const title = (currentRoute.handle as { title?: string })?.title;
  return (
    <div className="flex h-screen overflow-hidden font-vazir">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <section className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <Main title={title ?? ""}>
          <Outlet />
        </Main>
      </section>
    </div>
  );
};

const AuthLayout = () => {
  return (
    <div className="relative grid min-h-screen overflow-x-hidden bg-white font-vazir lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)]">
      <section className="order-2 flex min-h-[75vh] items-center justify-center px-5 py-10 sm:px-10 lg:order-1 lg:min-h-screen lg:px-14 xl:px-20">
        <Outlet />
      </section>
      <aside className="relative order-1 flex min-h-[240px] flex-col justify-between overflow-hidden bg-slate-950 px-6 py-7 text-white sm:min-h-[280px] sm:px-10 lg:order-2 lg:m-4 lg:min-h-[calc(100vh-2rem)] lg:rounded-[2rem] lg:px-12 lg:py-11 xl:px-16">
        <div className="absolute -left-24 -top-24 size-80 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-16 size-72 rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="relative z-10 flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-white/10 text-cyan-200 ring-1 ring-white/15">
            <HugeiconsIcon icon={ShieldCheckIcon} size={23} />
          </span>
          <span className="text-lg font-extrabold tracking-tight">
            سامانه تیکتینگ هلپینو
          </span>
        </div>
        <div className="relative z-10 my-8 max-w-xl lg:my-0">
          <h2 className="text-2xl font-extrabold leading-relaxed sm:text-3xl lg:text-4xl lg:leading-[1.7]">
          مدیریت هوشمند،
            <br className="hidden lg:block" />پشتیبانی بی‌وقفه 
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
            درخواست‌ های پشتیبانی مشتریان خود را در زمان کمتر و با کارایی بالاتر
            مدیریت کنید.
          </p>
          <div className="mt-7 hidden grid-cols-2 gap-3 sm:grid">
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm">
              <span className="text-xl font-bold text-white">یکپارچه</span>
              <p className="mt-1 text-xs text-slate-300">
                مدیریت درخواست‌ های مشتریان
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm">
              <span className="text-xl font-bold text-white">هوشمند</span>
              <p className="mt-1 text-xs leading-5 text-slate-300">
                ارجاع سریع تیکت‌ ها به واحدهای پشتیبانی
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm">
              <span className="text-xl font-bold text-white">لحظه‌ای</span>
              <p className="mt-1 text-xs leading-5 text-slate-300">
                مشاهده و پیگیری وضعیت درخواست‌ ها
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm">
              <span className="text-xl font-bold text-white">تحلیلی</span>
              <p className="mt-1 text-xs leading-5 text-slate-300">
                گزارش عملکرد و میزان رضایت مشتریان
              </p>
            </div>
          </div>
        </div>
        <div className="relative z-10 hidden items-center justify-between text-xs text-slate-400 lg:flex"></div>
      </aside>
    </div>
  );
};

export { MainLayout, AuthLayout };
