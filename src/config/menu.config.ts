import { Home01Icon, Settings01Icon, StickyNote01Icon, ChartIcon, PackageIcon, Archive02Icon, AccountSetting01Icon } from '@hugeicons/core-free-icons'
import type { MenuItemProps } from "@/types";

export const menuItems: MenuItemProps[] = [
  {
    label: "داشبورد",
    icon: Home01Icon,
  },
  {
    label: "مدیریت وظایف",
    icon: StickyNote01Icon,
    children: [
      { label: "کارتابل", href: "/tickets/cartabl" },
    ],
  },
  {
    label: "سوابق وظایف",
    icon: Archive02Icon,
    href: "/tickets/packages"
  },
  {
    label: "میزکار مدیر",
    icon: AccountSetting01Icon,
    href: "/tickets/packages"
  },
  {
    label: "بسته‌های پشتیبانی",
    icon: PackageIcon,
    href: "/tickets/packages"
  },
  {
    label: "خلاصه عملکرد",
    icon: ChartIcon,
    href: "/tickets/packages"
  },
  {
    label: "تنظیمات",
    icon: Settings01Icon,
    children: [
      { label: "اطلاعات پایه", href: "/settings/basics" },
      { label: "مدیریت کاربران", href: "/settings/users" },
    ],
  },
];