import { useMemo, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/avatar';
import type { ColumnDef, PaginationState, RowSelectionState, SortingState } from '@tanstack/react-table';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/button';
import {
  Card,
  CardFooter,
  CardHeader,
  CardTable,
  CardTitle,
  CardToolbar,
} from '@/components/card';
import { DataGrid } from '@/components/dataGrid';
import { DataGridColumnHeader } from '@/components/dataGrid/columnHeader';
import { DataGridPagination } from '@/components/dataGrid/pagination';
import { DataGridTable, DataGridTableRowSelectAll, DataGridTableRowSelect } from "@/components/dataGrid/table";
import { Input } from '@/components/input';
import { ScrollArea, ScrollBar } from '@/components/scrollArea';
import { Skeleton } from '@/components/skeleton';
import clsx from 'clsx';

interface IData {
  id: number;
  expert_name: string;
  role: string;
  avatar: string;
  resolved_ticket: number;
  open_ticket: number;
  average_response: number;
  sla: number;
}

const data: IData[] = [
  {
    id: 1,
    expert_name: 'علی زمانی',
    avatar: '/media/avatars/300_12.jpg',
    role: 'کارشناس فرانت-اند',
    open_ticket: 8,
    resolved_ticket: 250,
    average_response: 22,
    sla: 95,
  },
  {
    id: 2,
    expert_name: 'محمد ابراهیمی',
    avatar: '/media/avatars/300_21.jpg',
    role: 'کارشناس بک-اند',
    open_ticket: 7,
    resolved_ticket: 189,
    average_response: 28,
    sla: 85,
  },
  {
    id: 3,
    expert_name: 'امیر اسدی',
    avatar: '/media/avatars/300_22.jpg',
    role: 'کارشناس دواپس',
    open_ticket: 49,
    resolved_ticket: 187,
    average_response: 37,
    sla: 64,
  },
  {
    id: 4,
    expert_name: 'رضا امیدی',
    avatar: '/media/avatars/300_23.jpg',
    role: 'کارشناس وردپرس',
    open_ticket: 12,
    resolved_ticket: 145,
    average_response: 40,
    sla: 58,
  },
  {
    id: 5,
    expert_name: 'علی رضایی',
    avatar: '/media/avatars/300_15.jpg',
    role: 'کارشناس پایگاه داده',
    open_ticket: 13,
    resolved_ticket: 183,
    average_response: 26,
    sla: 78,
  },
];

const ExpertsPerformance = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'sla', desc: true },
  ]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = useMemo(() => {
    if (!searchQuery) return data;
    return data.filter(
      (item) =>
        item.expert_name.includes(searchQuery)
    );
  }, [searchQuery]);

  const columns = useMemo<ColumnDef<IData>[]>(
    () => [
      {
        accessorKey: 'id',
        accessorFn: (row) => row.id,
        header: () => <DataGridTableRowSelectAll />,
        cell: ({ row }) => <DataGridTableRowSelect row={row} />,
        enableSorting: false,
        enableHiding: false,
        enableResizing: false,
        size: 30,
        meta: {
          cellClassName: '',
        },
      },
      {
        id: 'expert_name',
        accessorFn: (row) => row.expert_name,
        header: ({ column }) => (
          <DataGridColumnHeader title="کارشناس" column={column} />
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Avatar className="size-8">
              <AvatarImage
                src={row.original.avatar}
                alt="image"
              />
              <AvatarFallback>CH</AvatarFallback>
            </Avatar>
            <div className='flex flex-col gap-y-2'>
              <span className="leading-none font-medium text-sm">
                {row.original.expert_name}
              </span>
              <span className="text-xs text-secondary-foreground font-normal leading-3">
                {row.original.role}
              </span>
            </div>
          </div>
        ),
        enableSorting: true,
        size: 120,
        meta: {
          skeleton: (
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-[125px]" />
              <Skeleton className="h-2.5 w-[90px]" />
            </div>
          ),
        },
      },
      {
        id: 'open_ticket',
        accessorFn: (row) => row.open_ticket,
        header: ({ column }) => (
          <DataGridColumnHeader title="تیکت باز" column={column} />
        ),
        cell: ({ row }) => row.original.open_ticket,
        enableSorting: true,
        size: 80,
        meta: {
          skeleton: (
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-[125px]" />
            </div>
          ),
        },
      },
      {
        id: 'resolved_ticket',
        accessorFn: (row) => row.resolved_ticket,
        header: ({ column }) => (
          <DataGridColumnHeader title="تیکت انجام شده" column={column} />
        ),
        cell: ({ row }) => row.original.resolved_ticket,
        enableSorting: true,
        size: 80,
        meta: {
          skeleton: (
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-[125px]" />
            </div>
          ),
        },
      },
        {
        id: 'average_response',
        accessorFn: (row) => row.average_response,
        header: ({ column }) => (
          <DataGridColumnHeader title="میانگین زمان پاسخ" column={column} />
        ),
        cell: ({ row }) => <span>{row.original.average_response} دقیقه</span>,
        enableSorting: true,
        size: 100,
        meta: {
          skeleton: (
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-[125px]" />
            </div>
          ),
        },
      },
      {
        id: 'sla',
        accessorFn: (row) => row.sla,
        header: ({ column }) => (
          <DataGridColumnHeader title="SLA" column={column} />
        ),
        cell: ({ row }) => <span className={clsx(row.original.sla >= 80 && 'text-green-600', row.original.sla > 60 && 80 > row.original.sla && 'text-orange-600', 60 > row.original.sla && 'text-red-600')}>%{row.original.sla}</span>,
        enableSorting: true,
        size: 80,
        meta: {
          skeleton: (
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-[125px]" />
            </div>
          ),
        },
      },
    ],
    [],
  );

  const table = useReactTable({
    columns,
    data: filteredData,
    pageCount: Math.ceil((filteredData?.length || 0) / pagination.pageSize),
    getRowId: (row: IData) => String(row.id),
    state: {
      pagination,
      sorting,
      rowSelection,
    },
    columnResizeMode: 'onChange',
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <DataGrid
      table={table}
      recordCount={filteredData?.length || 0}
      tableLayout={{
        columnsPinnable: true,
        columnsMovable: true,
        columnsVisibility: true,
        cellBorder: true,
      }}
    >
      <Card>
        <CardHeader className="py-3.5">
          <CardTitle>عملکرد کارشناسان</CardTitle>
          <CardToolbar className="relative">
            <Search className="size-4 text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2" />
            <Input
              type='text'
              placeholder="جستجو ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ps-9 w-40"
            />
            {searchQuery.length > 0 && (
              <Button
                mode="icon"
                variant="ghost"
                className="absolute end-1.5 top-1/2 -translate-y-1/2 h-6 w-6"
                onClick={() => setSearchQuery('')}
              >
                <X />
              </Button>
            )}
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
};

export { ExpertsPerformance };
