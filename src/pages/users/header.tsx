import React from "react";
import { Button } from "@/components/button";
import { AccountSetting01Icon, PlusIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { ManagedUser } from "@/types/user";


const Header = ({
    setFormUser,
    setFormOpen
}: {
    setFormUser: React.Dispatch<React.SetStateAction<ManagedUser | null>>;
    setFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const openCreate = () => {
    setFormUser(null);
    setFormOpen(prev=> !prev);
  };
  return (
    <section className="rounded-2xl mb-8 border border-primary/10 bg-linear-to-l from-primary/10 via-primary/5 to-transparent p-5 sm:p-6">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold inline-flex items-center gap-x-2">
            <HugeiconsIcon icon={AccountSetting01Icon} size={24} />
            مدیریت کاربران
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            دسترسی‌ها، مشخصات کاربران و کیفیت رسیدگی آن‌ها به تیکت‌ها را یک‌جا
            مدیریت کنید.
          </p>
        </div>
        <Button size="lg" onClick={openCreate}>
          <HugeiconsIcon icon={PlusIcon} size={20} />
          تعریف کاربر جدید
        </Button>
      </div>
    </section>
  );
};

export default Header;
