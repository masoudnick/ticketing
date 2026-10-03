import React, { useState, useMemo, memo } from "react";
import { DataGridPagination } from "@/components/dataGrid/pagination";
import { ScrollArea, ScrollBar } from "@/components/scrollArea";
import { DataGridColumnHeader } from "@/components/dataGrid/columnHeader";
import { Input } from '@/components/input';
import {
  DataGridTable,
  DataGridTableRowSelectAll,
  DataGridTableRowSelect,
} from "@/components/dataGrid/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/select';
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  CardHeading,
  CardTable,
  DataGrid,
  CardToolbar,
} from "@/components";
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
import { Button } from "@/components/button";
import { Avatar, AvatarFallback } from '@/components/avatar';
import type { BasicInfoProps } from "@/types";
import type { ManagedUser, UserFormValues, UserStatus } from '@/types/user';
import type {
  ColumnDef,
  PaginationState,
  RowSelectionState,
  SortingState,
} from "@tanstack/react-table";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type Row,
  useReactTable,
} from "@tanstack/react-table";


function ActionsCell({ row }: { row: Row<BasicInfoProps> }) {
  return <div id={row.id}></div>;
}
function PerformanceBar({ value }: { value: number }) {
  const color = value >= 90 ? 'bg-emerald-500' : value >= 75 ? 'bg-amber-500' : 'bg-rose-500';
  return (
    <div className="flex min-w-28 items-center gap-2">
      <div className="h-1.5 grow overflow-hidden rounded-full bg-muted"><div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} /></div>
      <span className="w-8 text-left text-xs font-medium">٪{value}</span>
    </div>
  );
}
const emptyForm: UserFormValues = {
  name: '',
  email: '',
  mobile: '',
  role: '',
  department: '',
  status: 'active',
};



const statusCopy: Record<UserStatus, { label: string; className: string }> = {
  active: { label: 'فعال', className: 'bg-emerald-50 text-emerald-700 ring-emerald-600/15' },
  inactive: { label: 'غیرفعال', className: 'bg-slate-100 text-slate-600 ring-slate-500/15' },
};

function StatusBadge({ status }: { status: UserStatus }) {
  const copy = statusCopy[status];
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${copy.className}`}><span className="size-1.5 rounded-full bg-current" />{copy.label}</span>;
}

export const PageTable = memo(
  ({
    setSettingsModalOpen,
  }: {
    setSettingsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | UserStatus>('all');




 
    const [pagination, setPagination] = useState<PaginationState>({
      pageIndex: 0,
      pageSize: 10,
    });
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [sorting, setSorting] = useState<SortingState>([
      { id: "sla", desc: true },
    ]);

    const openCreate = () => { setFormUser(null); setFormOpen(true); };
  const openEdit = (user: ManagedUser) => { setFormUser(user); setFormOpen(true); };
  const openDetails = (user: ManagedUser) => { setDetailUser(user); setDetailOpen(true); };

    const filteredUsers = useMemo(
      () =>
        users.filter((user) => {
          const normalized = query.trim();
          const matchesQuery =
            !normalized ||
            [user.name, user.email, user.role, user.department].some((value) =>
              value.includes(normalized)
            );
          return (
            matchesQuery &&
            (statusFilter === "all" || user.status === statusFilter)
          );
        }),
      [query, statusFilter, users]
    );

    const columns = useMemo<ColumnDef<ManagedUser>[]>(
      () => [
        {
          id: "select",
          header: () => <DataGridTableRowSelectAll />,
          cell: ({ row }) => <DataGridTableRowSelect row={row} />,
          enableSorting: false,
          enableHiding: false,
          enableResizing: false,
          size: 52,
        },
        {
          id: "user",
          accessorFn: (user) => user.name,
          header: ({ column }) => (
            <DataGridColumnHeader title="کاربر" column={column} />
          ),
          cell: ({ row }) => (
            <div className="flex items-center gap-3">
              <Avatar className="size-9">
                <AvatarFallback className="bg-primary/10 font-semibold text-primary">
                  {row.original.initials}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="truncate font-medium">{row.original.name}</p>
                <p
                  className="mt-0.5 truncate text-xs text-muted-foreground"
                  dir="ltr"
                >
                  {row.original.email}
                </p>
              </div>
            </div>
          ),
          size: 230,
        },
        {
          id: "role",
          accessorFn: (user) => user.role,
          header: ({ column }) => (
            <DataGridColumnHeader title="واحد و نقش" column={column} />
          ),
          cell: ({ row }) => (
            <div>
              <p className="font-medium">{row.original.role}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {row.original.department}
              </p>
            </div>
          ),
          size: 190,
        },
        {
          id: "status",
          accessorFn: (user) => user.status,
          header: ({ column }) => (
            <DataGridColumnHeader title="وضعیت" column={column} />
          ),
          cell: ({ row }) => <StatusBadge status={row.original.status} />,
          size: 110,
        },
        {
          id: "tickets",
          accessorFn: (user) => user.performance.resolved,
          header: ({ column }) => (
            <DataGridColumnHeader title="تیکت‌ها" column={column} />
          ),
          cell: ({ row }) => (
            <div>
              <span className="font-medium">
                {row.original.performance.resolved}
              </span>
              <span className="text-muted-foreground">
                {" "}
                / {row.original.performance.assigned}
              </span>
              <p className="mt-0.5 text-xs text-amber-600">
                {row.original.performance.open} باز
              </p>
            </div>
          ),
          size: 125,
        },
        {
          id: "responseTime",
          accessorFn: (user) => user.performance.averageResponseMinutes,
          header: ({ column }) => (
            <DataGridColumnHeader title="میانگین پاسخ" column={column} />
          ),
          cell: ({ row }) =>
            row.original.performance.averageResponseMinutes
              ? `${
                  row.original.performance.averageResponseMinutes
                } دقیقه`
              : "—",
          size: 130,
        },
        {
          id: "sla",
          accessorFn: (user) => user.performance.sla,
          header: ({ column }) => (
            <DataGridColumnHeader title="SLA" column={column} />
          ),
          cell: ({ row }) => (
            <PerformanceBar value={row.original.performance.sla} />
          ),
          size: 150,
        },
        {
          id: "lastActivity",
          accessorFn: (user) => user.performance.lastActivity,
          header: ({ column }) => (
            <DataGridColumnHeader title="آخرین فعالیت" column={column} />
          ),
          cell: ({ row }) => (
            <span className="text-muted-foreground">
              {row.original.performance.lastActivity}
            </span>
          ),
          size: 125,
        },
        {
          id: "actions",
          header: () => <span className="sr-only">عملیات</span>,
          cell: ({ row }) => (
            <div className="flex items-center justify-end gap-1">
              <Button
                variant="ghost"
                mode="icon"
                size="sm"
                aria-label={`مشاهده ${row.original.name}`}
                title="مشاهده جزئیات"
                onClick={() => openDetails(row.original)}
              >
                <Eye />
              </Button>
              <Button
                variant="primaryLight"
                mode="icon"
                size="sm"
                aria-label={`ویرایش ${row.original.name}`}
                title="ویرایش کاربر"
                onClick={() => openEdit(row.original)}
              >
                <Pencil />
              </Button>
              <Button
                variant="dangerLight"
                mode="icon"
                size="sm"
                aria-label={`حذف ${row.original.name}`}
                title="حذف کاربر"
                onClick={() => setPendingDelete(row.original)}
              >
                <Trash2 />
              </Button>
            </div>
          ),
          enableSorting: false,
          enableHiding: false,
          size: 130,
        },
      ],
      [openDetails, openEdit, setPendingDelete]
    );

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
      columnResizeMode: "onChange",
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
    });
    return (
      <DataGrid
        table={table}
        recordCount={filteredUsers.length}
        isLoading={isLoading}
        emptyMessage={
          isError
            ? "دریافت فهرست کاربران ناموفق بود. مطمئن شوید json-server در حال اجرا است."
            : "کاربری با این مشخصات پیدا نشد."
        }
        tableLayout={{
          columnsPinnable: true,
          columnsMovable: true,
          columnsVisibility: true,
          columnsResizable: true,
          cellBorder: true,
        }}
      >
        <Card>
          <CardHeader className="gap-4 py-4">
            <CardHeading>
              <CardTitle>فهرست کاربران</CardTitle>
            </CardHeading>
            <CardToolbar className="w-full flex-col sm:w-auto sm:flex-row">
              <div className="relative w-full sm:w-auto">
                <Search className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="جست‌وجوی نام، نقش یا ایمیل"
                  className="w-full pr-9 sm:w-64"
                />
                {query && (
                  <Button
                    variant="ghost"
                    mode="icon"
                    size="sm"
                    className="absolute left-1 top-1/2 -translate-y-1/2"
                    onClick={() => setQuery("")}
                  >
                    <X />
                  </Button>
                )}
              </div>
              <Select
                value={statusFilter}
                onValueChange={(value) =>
                  setStatusFilter(value as "all" | UserStatus)
                }
              >
                <SelectTrigger className="w-full sm:w-36">
                  <SelectValue placeholder="وضعیت" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">همه وضعیت‌ها</SelectItem>
                  <SelectItem value="active">فعال</SelectItem>
                  <SelectItem value="inactive">غیرفعال</SelectItem>
                </SelectContent>
              </Select>
            </CardToolbar>
          </CardHeader>
          <CardTable>
            <ScrollArea>
              <DataGridTable />
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </CardTable>
          <CardFooter>
            <DataGridPagination />
          </CardFooter>
        </Card>
      </DataGrid>
    );
  }
);
