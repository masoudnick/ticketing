import { useState } from "react";
import { Button } from "@/components/button";
import UsersManagementRedesign from "./managementRedesign";
import { AccountSetting01Icon, PlusIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Header from "./header";
import MetricCards from "./metricCards";
import { PageTable } from "./table";
import { UserFormDialog } from "./userFormDialog";
import type { ManagedUser, UserFormValues } from "@/types/user";
import { userService } from '@/services';
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
  const [detailUser, setDetailUser] = useState<ManagedUser | null>(null);
  const [pendingDelete, setPendingDelete] = useState<ManagedUser | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  
  const queryClient = useQueryClient();

  const { data: users = [], isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: userService.read,
  });

  const createUserMutation = useMutation({
    mutationFn: userService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setFormOpen(false);
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: ({ id, values }: { id: string; values: Partial<ManagedUser> }) => userService.update(id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setFormOpen(false);
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: userService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setPendingDelete(null);
    },
  });

  const openDetails = (user: ManagedUser) => { setDetailUser(user); setDetailOpen(true); };
    const openEdit = (user: ManagedUser) => { setFormUser(user); setFormOpen(true); };

  const saveUser = (values: UserFormValues) => {
    const initials = values.name.split(' ').map((part) => part[0]).join('').slice(0, 2);
    if (formUser) {
      updateUserMutation.mutate({ id: formUser.id, values: { ...values, initials } });
    } else {
      const nextNumber = Math.max(1000, ...users.map((user) => Number(user.id.replace('USR-', '')) || 0)) + 1;
      createUserMutation.mutate({ id: `USR-${nextNumber}`, ...values, initials, joinedAt: 'امروز', performance: { assigned: 0, open: 0, resolved: 0, averageResponseMinutes: 0, sla: 100, lastActivity: 'هم‌اکنون' } });
    }
  };

  return (
    <>
      <Header setFormUser={setFormUser} setFormOpen={setFormOpen} />
      <MetricCards />
      <UserFormDialog key={formOpen ? formUser?.id ?? 'new' : 'closed'} user={formUser} open={formOpen} onOpenChange={setFormOpen} onSave={saveUser} />
      <PageTable users={users} setPendingDelete={setPendingDelete} openEdit={openEdit} openDetails={openDetails} isError={isError} isLoading={isLoading}  />
      {/* <UsersManagementRedesign /> */}
    </>
  );
};

export default Users;
