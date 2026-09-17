import { useMemo, useState } from 'react';
import { Avatar } from '@/components/avatar';
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

interface IData {
  id: number;
  expert_name: string;
  role: string;
  resolved_ticket: number;
  open_ticket: number;
  average_response: number;
  sla: number;
}

const data: IData[] = [
  {
    id: 1,
    expert_name: 'علی زمانی',
    role: 'کارشناس فرانت-اند',
    open_ticket: 5,
    resolved_ticket: 5,
    average_response: 20,
    sla: 95,
  },
];

const Teams = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'updated_at', desc: true },
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
        size: 48,
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
          <div className="flex flex-col gap-2">
            <span className="leading-none font-medium text-sm text-mono hover:text-primary">
              {row.original.expert_name}
            </span>
            <span className="text-sm text-secondary-foreground font-normal leading-3">
              {row.original.role}
            </span>
          </div>
        ),
        enableSorting: true,
        size: 150,
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
        cell: ({ row }) => row.original.average_response,
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
        cell: ({ row }) => row.original.sla,
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

export { Teams };
