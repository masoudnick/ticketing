import { Home01Icon, Settings01Icon, StickyNote01Icon } from '@hugeicons/core-free-icons'
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
      { label: "بسته‌های پشتیبانی", href: "/tickets/packages" },
    ],
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