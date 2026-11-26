import { Home01Icon, Settings01Icon, StickyNote01Icon, ChartIcon, PackageIcon, Archive02Icon, AccountSetting01Icon } from '@hugeicons/core-free-icons'
import type { MenuItemProps } from "@/types";

export const menuItems: MenuItemProps[] = [
  {
    label: "داشبورد",
    icon: Home01Icon,
    type: "parent"
  },
  {
    label: "مدیریت وظایف",
    icon: StickyNote01Icon,
    type: "parent",
    children: [
      { label: "کارتابل", type: "child",  href: "/tickets/cartabl" },
    ],
  },
  {
    label: "سوابق وظایف",
    icon: Archive02Icon,
    href: "/tickets/packages",
    type: "parent",
  },
  {
    label: "میزکار مدیر",
    icon: AccountSetting01Icon,
    href: "manager",
    type: "parent",
  },
  {
    label: "بسته‌های پشتیبانی",
    icon: PackageIcon,
    href: "/tickets/packages",
    type: "parent",
  },
  {
    label: "خلاصه عملکرد",
    icon: ChartIcon,
    href: "/performances",
    type: "parent",
  },
  {
    label: "تنظیمات",
    icon: Settings01Icon,
    type: "parent",
    children: [
      { label: "اطلاعات پایه", type: "child", href: "/settings/basics" },
      { label: "مدیریت کاربران", type: "child", href: "/settings/users" },
    ],
  },
];