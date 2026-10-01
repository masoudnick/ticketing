import { useMemo, useState, useEffect } from 'react';
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
import { Link } from 'react-router-dom';

interface IData {
  id: number;
  ticket_id: string;
  title: string;
  tracker: string;
  priority: string;
  customer: string;
  created_at: string;
  sla: number;
}

const data: IData[] = [
  {
    id: 1,
    ticket_id: "705440",
    title: "مشکل ورود کاربر",
    priority: "بحرانی",
    customer: "شهرداری شیراز",
    tracker: 'محمد ابراهیمی',
    created_at: "1405/05/19 09:30:00",
    sla: 50,
  },
  {
    id: 2,
    ticket_id: "705470",
    title: "عدم امکان جستجوی پروژه از طریق فیلتر موضوع",
    priority: "بالا",
    customer: "شهرداری کاشان",
    tracker: 'علی زمانی',
    created_at: "1405/05/20 08:20:00",
    sla: 70,
  },
  {
    id: 3,
    ticket_id: "705480",
    title: "عدم امکان ارسال فرآیند قرارداد",
    priority: "متوسط",
    customer: "شرکت گاز اصفهان",
    tracker: 'رضا امیدی',
    created_at: "1405/05/21 08:40:00",
    sla: 80,
  },
    {
    id: 4,
    ticket_id: "705390",
    title: "اعمال نشدن امضا در فرآیند پروژه",
    priority: "بالا",
    customer: "شرکت آبفا تهران",
    tracker: 'علی رضایی',
    created_at: "1405/05/22 08:20:00",
    sla: 70,
  },
   {
    id: 5,
    ticket_id: "705890",
    title: "انجام نشدن ثبت امضا در پروژه 6407",
    priority: "بالا",
    customer: "شرکت آبفا اصفهان",
    tracker: 'محمد ابراهیمی',
    created_at: "1405/05/23 08:20:00",
    sla: 85,
  },
  
];

const ActionRequiredTickets = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'id', desc: true },
  ]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const filteredData = useMemo(() => {
    if (!searchQuery) return data;
    return data.filter(
      (item) =>
        item.title.includes(searchQuery) || item.ticket_id.includes(searchQuery)
    );
  }, [searchQuery]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

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
        id: 'sla',
        accessorFn: (row) => row.sla,
        header: ({ column }) => (
          <DataGridColumnHeader title="SLA" column={column} />
        ),
        cell: ({ row }) => {
          const sla = row.original.sla;
          let title;
          if (60 > sla) {
            title = 'نقض شده';
            return <span className='block w-4 h-4 rounded-full select-none bg-red-600' title={title}></span>
          }
          if (80 > sla && sla > 60) {
            title = `${sla} دقیقه`
            return <span className='block w-4 h-4 rounded-full select-none bg-orange-600' title={title}></span>
          }
          title = `${sla} دقیقه`
          return <span className='block w-4 h-4 rounded-full select-none bg-green-600' title={title}></span>
        },
        enableSorting: true,
        size: 40,
        meta: {
          skeleton: (
            <div className="px-4 py-2">
              <Skeleton className="h-4 w-full" />
            </div>
          ),
        },
      },
      {
        id: 'ticket_id',
        accessorFn: (row) => row.ticket_id,
        header: ({ column }) => (
          <DataGridColumnHeader title="شناسه پیگیری" column={column} />
        ),
        cell: ({ row }) => row.original.ticket_id,
        enableSorting: true,
        size: 70,
        meta: {
          skeleton: <div className='px-4 py-2'><Skeleton className="h-4 w-full" /> </div>,
        },
      },
      {
        id: 'title',
        accessorFn: (row) => row.title,
        header: ({ column }) => (
          <DataGridColumnHeader title="عنوان" column={column} />
        ),
        cell: ({ row }) => <Link className='hover:text-primary' to="">{row.original.title}</Link>,
        enableSorting: true,
        size: 180,
        meta: {
          skeleton: (
            <div className="px-4 py-2">
              <Skeleton className="h-4 w-full" />
            </div>
          ),
        },
      },
      {
        id: 'priority',
        accessorFn: (row) => row.priority,
        header: ({ column }) => (
          <DataGridColumnHeader title="اولویت" column={column} />
        ),
        cell: ({ row }) => row.original.priority,
        enableSorting: true,
        size: 80,
        meta: {
          skeleton: (
            <div className="px-4 py-2">
              <Skeleton className="h-4 w-full" />
            </div>
          ),
        },
      },
      {
        id: 'customer',
        accessorFn: (row) => row.customer,
        header: ({ column }) => (
          <DataGridColumnHeader title="مشتری" column={column} />
        ),
        cell: ({ row }) => row.original.customer,
        enableSorting: true,
        size: 80,
        meta: {
          skeleton: (
            <div className="px-4 py-2">
              <Skeleton className="h-4 w-full" />
            </div>
          ),
        },
      },
      {
        id: 'tracker',
        accessorFn: (row) => row.tracker,
        header: ({ column }) => (
          <DataGridColumnHeader title="پیگیری کننده" column={column} />
        ),
        cell: ({ row }) => row.original.tracker,
        enableSorting: true,
        size: 100,
        meta: {
          skeleton: (
            <div className="px-4 py-2">
              <Skeleton className="h-4 w-full" />
            </div>
          ),
        },
      },
      {
        id: 'created_at',
        accessorFn: (row) => row.created_at,
        header: ({ column }) => (
          <DataGridColumnHeader title="تاریخ ایجاد" column={column} />
        ),
        cell: ({ row }) => row.original.created_at,
        enableSorting: true,
        size: 100,
        meta: {
          skeleton: (
            <div className="px-4 py-2">
              <Skeleton className="h-4 w-full" />
            </div>
          ),
        },
      }
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
      isLoading={isLoading}
      tableLayout={{
        columnsPinnable: true,
        columnsMovable: true,
        columnsVisibility: true,
        cellBorder: true,
      }}
    >
      <Card>
        <CardHeader className="py-3.5">
          <CardTitle>تیکت های نیازمند اقدام</CardTitle>
          <CardToolbar className="relative">
            <Search className="size-4 text-muted-foreground absolute inset-s-3 top-1/2 -translate-y-1/2" />
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
                className="absolute inset-e-1.5 top-1/2 -translate-y-1/2 h-6 w-6"
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

export { ActionRequiredTickets };
