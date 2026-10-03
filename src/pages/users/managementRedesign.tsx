import { useMemo, useState, type Dispatch, type FormEvent, type ReactNode, type SetStateAction } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { ColumnDef, PaginationState, RowSelectionState, SortingState } from '@tanstack/react-table';
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/alert';
import { Avatar, AvatarFallback } from '@/components/avatar';
import { Button } from '@/components/button';
import { Card, CardContent, CardFooter, CardHeader, CardHeading, CardTable, CardTitle, CardToolbar } from '@/components/card';
import { DataGrid } from '@/components/dataGrid';
import { DataGridColumnHeader } from '@/components/dataGrid/columnHeader';
import { DataGridColumnVisibility } from '@/components/dataGrid/columnVisibility';
import { DataGridPagination } from '@/components/dataGrid/pagination';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/dialog';
import { Input } from '@/components/input';
import { ScrollArea, ScrollBar } from '@/components/scrollArea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/select';
import {
  Activity,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Eye,
  Mail,
  Pencil,
  Plus,
  Search,
  ShieldCheck,
  TicketCheck,
  Trash2,
  UsersRound,
  X,
} from 'lucide-react';
import { userDepartments, userRoles } from './userManagement.data';
import { userService } from '@/services';
import type { ManagedUser, UserFormValues, UserStatus } from '@/types/user';

const emptyForm: UserFormValues = {
  name: '',
  email: '',
  mobile: '',
  role: userRoles[2],
  department: userDepartments[0],
  status: 'active',
};

const formFromUser = (user: ManagedUser | null): UserFormValues => user ? {
  name: user.name,
  email: user.email,
  mobile: user.mobile,
  role: user.role,
  department: user.department,
  status: user.status,
} : emptyForm;

const statusCopy: Record<UserStatus, { label: string; className: string }> = {
  active: { label: 'فعال', className: 'bg-emerald-50 text-emerald-700 ring-emerald-600/15' },
  inactive: { label: 'غیرفعال', className: 'bg-slate-100 text-slate-600 ring-slate-500/15' },
};

const faNumber = new Intl.NumberFormat('fa-IR');


function StatusBadge({ status }: { status: UserStatus }) {
  const copy = statusCopy[status];
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${copy.className}`}><span className="size-1.5 rounded-full bg-current" />{copy.label}</span>;
}

function PerformanceBar({ value }: { value: number }) {
  const color = value >= 90 ? 'bg-emerald-500' : value >= 75 ? 'bg-amber-500' : 'bg-rose-500';
  return (
    <div className="flex min-w-28 items-center gap-2">
      <div className="h-1.5 grow overflow-hidden rounded-full bg-muted"><div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} /></div>
      <span className="w-8 text-left text-xs font-medium">٪{faNumber.format(value)}</span>
    </div>
  );
}


function UserDetailsDialog({ user, open, onOpenChange }: { user: ManagedUser | null; open: boolean; onOpenChange: (value: boolean) => void }) {
  if (!user) return null;
  const performance = user.performance;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="xl" className="max-h-[92vh] overflow-y-auto p-6 sm:p-8">
        <DialogHeader className="mb-6 border-b border-border pb-5">
          <div className="flex items-start justify-between gap-4 pl-8">
            <div className="flex items-center gap-3">
              <Avatar className="size-12"><AvatarFallback className="bg-primary/10 text-base font-bold text-primary">{user.initials}</AvatarFallback></Avatar>
              <div><DialogTitle>{user.name}</DialogTitle><DialogDescription className="mt-1">{user.role} · {user.department}</DialogDescription></div>
            </div>
            <StatusBadge status={user.status} />
          </div>
        </DialogHeader>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <DetailMetric label="تیکت واگذار شده" value={faNumber.format(performance.assigned)} />
          <DetailMetric label="تیکت حل‌شده" value={faNumber.format(performance.resolved)} tone="success" />
          <DetailMetric label="تیکت باز" value={faNumber.format(performance.open)} tone="warning" />
          <DetailMetric label="میانگین پاسخ" value={`${faNumber.format(performance.averageResponseMinutes)} دقیقه`} />
        </div>
        <div className="mt-6 rounded-xl border border-border p-4">
          <div className="flex items-center justify-between gap-3"><div><p className="font-semibold">پایبندی به SLA</p><p className="mt-1 text-xs text-muted-foreground">درصد تیکت‌هایی که در بازه توافق‌شده پاسخ گرفته‌اند</p></div><span className="text-lg font-bold text-emerald-600">٪{faNumber.format(performance.sla)}</span></div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-emerald-500" style={{ width: `${performance.sla}%` }} /></div>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2"><InfoRow icon={<Mail />} label="ایمیل سازمانی" value={user.email} /><InfoRow icon={<Clock3 />} label="آخرین فعالیت" value={performance.lastActivity} /><InfoRow icon={<ShieldCheck />} label="عضویت از" value={user.joinedAt} /><InfoRow icon={<Activity />} label="شناسه کاربر" value={user.id} /></div>
      </DialogContent>
    </Dialog>
  );
}

function DetailMetric({ label, value, tone = 'primary' }: { label: string; value: string; tone?: 'primary' | 'success' | 'warning' }) {
  const colors = { primary: 'text-primary', success: 'text-emerald-600', warning: 'text-amber-600' };
  return <div className="rounded-xl bg-muted/60 p-4"><p className="text-xs text-muted-foreground">{label}</p><p className={`mt-2 text-xl font-bold ${colors[tone]}`}>{value}</p></div>;
}

function InfoRow({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return <div className="flex items-center gap-3 rounded-lg border border-border p-3"><span className="text-muted-foreground">{icon}</span><div className="min-w-0"><p className="text-xs text-muted-foreground">{label}</p><p className="mt-0.5 truncate text-sm font-medium" dir={label === 'ایمیل سازمانی' ? 'ltr' : undefined}>{value}</p></div></div>;
}

function UsersDataGrid({
  users,
  filteredUsers,
  isLoading,
  isError,
  query,
  statusFilter,
  onQueryChange,
  onStatusFilterChange,
  onDetails,
  onEdit,
  setPendingDelete,
}: {
  users: ManagedUser[];
  filteredUsers: ManagedUser[];
  isLoading: boolean;
  isError: boolean;
  query: string;
  statusFilter: 'all' | UserStatus;
  onQueryChange: (value: string) => void;
  onStatusFilterChange: (value: 'all' | UserStatus) => void;
  onDetails: (user: ManagedUser) => void;
  onEdit: (user: ManagedUser) => void;
  setPendingDelete: Dispatch<SetStateAction<ManagedUser | null>>;
}) {
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [sorting, setSorting] = useState<SortingState>([{ id: 'sla', desc: true }]);



  // TanStack Table intentionally returns a mutable table API for the DataGrid provider.
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: filteredUsers,
    columns,
    pageCount: Math.ceil(filteredUsers.length / pagination.pageSize),
    getRowId: (user) => user.id,
    state: { pagination, rowSelection, sorting },
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    enableRowSelection: true,
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return <DataGrid table={table} recordCount={filteredUsers.length} isLoading={isLoading} emptyMessage={isError ? 'دریافت فهرست کاربران ناموفق بود. مطمئن شوید json-server در حال اجرا است.' : 'کاربری با این مشخصات پیدا نشد.'} tableLayout={{ columnsPinnable: true, columnsMovable: true, columnsVisibility: true, columnsResizable: true, cellBorder: true }}>
    <Card>
      <CardHeader className="gap-4 py-4">
        <CardHeading><CardTitle>فهرست کاربران</CardTitle><p className="mt-1 text-sm text-muted-foreground">{faNumber.format(filteredUsers.length)} کاربر از {faNumber.format(users.length)} کاربر نمایش داده می‌شود</p></CardHeading>
        <CardToolbar className="w-full flex-col sm:w-auto sm:flex-row">
          <div className="relative w-full sm:w-auto"><Search className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="جست‌وجوی نام، نقش یا ایمیل" className="w-full pr-9 sm:w-64" />{query && <Button variant="ghost" mode="icon" size="sm" className="absolute left-1 top-1/2 -translate-y-1/2" onClick={() => onQueryChange('')}><X /></Button>}</div>
          <Select value={statusFilter} onValueChange={(value) => onStatusFilterChange(value as 'all' | UserStatus)}><SelectTrigger className="w-full sm:w-36"><SelectValue placeholder="وضعیت" /></SelectTrigger><SelectContent><SelectItem value="all">همه وضعیت‌ها</SelectItem><SelectItem value="active">فعال</SelectItem><SelectItem value="inactive">غیرفعال</SelectItem></SelectContent></Select>
        </CardToolbar>
      </CardHeader>
      <CardTable><ScrollArea><DataGridTable /><ScrollBar orientation="horizontal" /></ScrollArea></CardTable>
      <CardFooter><DataGridPagination /></CardFooter>
    </Card>
  </DataGrid>;
}

const UsersManagementRedesign = () => {
  const queryClient = useQueryClient();
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | UserStatus>('all');
  const [formUser, setFormUser] = useState<ManagedUser | null>(null);
  const [detailUser, setDetailUser] = useState<ManagedUser | null>(null);
  const [pendingDelete, setPendingDelete] = useState<ManagedUser | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);

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



  const openCreate = () => { setFormUser(null); setFormOpen(true); };
  const openEdit = (user: ManagedUser) => { setFormUser(user); setFormOpen(true); };
  const openDetails = (user: ManagedUser) => { setDetailUser(user); setDetailOpen(true); };

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
    <section className="space-y-5 lg:space-y-7.5">
    

      <UsersDataGrid users={users} filteredUsers={filteredUsers} isLoading={isLoading} isError={isError} query={query} statusFilter={statusFilter} onQueryChange={setQuery} onStatusFilterChange={setStatusFilter} onDetails={openDetails} onEdit={openEdit} setPendingDelete={setPendingDelete} />

      <UserFormDialog key={formOpen ? formUser?.id ?? 'new' : 'closed'} user={formUser} open={formOpen} onOpenChange={setFormOpen} onSave={saveUser} />
      <UserDetailsDialog user={detailUser} open={detailOpen} onOpenChange={setDetailOpen} />
      <AlertDialog open={Boolean(pendingDelete)} onOpenChange={(open) => !open && setPendingDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>حذف کاربر</AlertDialogTitle>
            <AlertDialogDescription>آیا از حذف «{pendingDelete?.name}» مطمئن هستید؟ این عمل قابل بازگشت نیست.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteUserMutation.isPending}>انصراف</AlertDialogCancel>
            <AlertDialogAction variant="danger" disabled={deleteUserMutation.isPending} onClick={() => pendingDelete && deleteUserMutation.mutate(pendingDelete.id)}>{deleteUserMutation.isPending ? 'در حال حذف...' : 'حذف کاربر'}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

export default UsersManagementRedesign;
