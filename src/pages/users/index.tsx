import { useState } from "react";
import { Button } from "@/components/button";
import UsersManagementRedesign from "./managementRedesign";
import { AccountSetting01Icon, PlusIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Header from "./header";
import type { ManagedUser } from "@/types/user";
/*
import { useState } from "react";
import { PageTable } from "./table";
import { PageModal } from "./modal";

const Users = () => {
    const [settingsModalOpen, setSettingsModalOpen] = useState(false);
    const handleSettingsModalClose = () => {
        setSettingsModalOpen(false);
    };
    return <section>
        <PageTable setSettingsModalOpen={setSettingsModalOpen} />
        <PageModal open={settingsModalOpen} onOpenChange={handleSettingsModalClose} />
    </section>
}
*/

const Users = () => {
  const [formUser, setFormUser] = useState<ManagedUser | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  const openCreate = () => {
    setFormUser(null);
    setFormOpen(true);
  };

  return (
    <>
      <Header setFormUser={setFormUser} setFormOpen={setFormOpen} />
      <UsersManagementRedesign />
    </>
  );
};

export default Users;
