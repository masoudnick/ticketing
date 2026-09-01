import { type ReactNode, useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardFooter, CardContent, Badge, CardHeading, CardTable, DataGrid } from "@/components";
import { DataGridTable, DataGridTableRowSelectAll, DataGridTableRowSelect } from "@/components/dataGrid/table";
import { DataGridPagination } from "@/components/dataGrid/pagination";
import { ScrollArea, ScrollBar } from "@/components/scrollArea";
import { DataGridColumnHeader } from "@/components/dataGrid/columnHeader";
import type { ColumnDef, PaginationState, RowSelectionState, SortingState, } from '@tanstack/react-table';
import {
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    type Row,
    useReactTable,
} from '@tanstack/react-table';

import { Link } from "react-router-dom";


interface IMembersProps {
    title: string;
}

interface IMembersData {
    id: string;
    member: number;
    location: string;
    status: ReactNode;
    recentlyActivity: string;
}


const MembersData: IMembersData[] = [
    {
        id: '1',
        member: 126,
        location: "ایران",
        status: (<Badge variant="success">فعال</Badge>),
        recentlyActivity: 'اخیرا',
    },
    {
        id: '1',
        member: 126,
        location: "ایران",
        status: (<Badge variant="success">فعال</Badge>),
        recentlyActivity: 'اخیرا',
    },
    {
        id: '1',
        member: 126,
        location: "ایران",
        status: (<Badge variant="success">فعال</Badge>),
        recentlyActivity: 'اخیرا',
    },
    {
        id: '1',
        member: 126,
        location: "ایران",
        status: (<Badge variant="success">فعال</Badge>),
        recentlyActivity: 'اخیرا',
    },
    {
        id: '1',
        member: 126,
        location: "ایران",
        status: (<Badge variant="success">فعال</Badge>),
        recentlyActivity: 'اخیرا',
    },
    {
        id: '1',
        member: 126,
        location: "ایران",
        status: (<Badge variant="success">فعال</Badge>),
        recentlyActivity: 'اخیرا',
    },
    {
        id: '1',
        member: 126,
        location: "ایران",
        status: (<Badge variant="success">فعال</Badge>),
        recentlyActivity: 'اخیرا',
    },
    {
        id: '1',
        member: 126,
        location: "ایران",
        status: (<Badge variant="success">فعال</Badge>),
        recentlyActivity: 'اخیرا',
    }
];

function ActionsCell({ row }: { row: Row<IMembersData> }) {
    return (
        <div></div>
    );
}

const Dashboard = () => {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [sorting, setSorting] = useState<SortingState>([
        { id: 'recentlyActivity', desc: true },
    ]);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredData = useMemo(() => {
        return MembersData
    }, [searchQuery]);

    const columns = useMemo<ColumnDef<IMembersData>[]>(
        () => [
            {
                accessorKey: 'id',
                accessorFn: (row) => row.id,
                header: () => <DataGridTableRowSelectAll />,
                cell: ({ row }) => <DataGridTableRowSelect row={row} />,
                enableSorting: false,
                enableHiding: false,
                enableResizing: false,
                size: 51,
                meta: {
                    cellClassName: '',
                },
            },
            {
                id: 'member',
                accessorFn: (row) => row.member,
                header: ({ column }) => (
                    <DataGridColumnHeader title="اعضا" column={column} />
                ),
                cell: (info) => info.getValue(),
                enableSorting: true,
                size: 300,
                meta: {
                    cellClassName: '',
                },
            },
            {
                id: 'location',
                accessorFn: (row) => row.location,
                header: ({ column }) => (
                    <DataGridColumnHeader title="موقعیت" column={column} />
                ),
                cell: (info) => info.getValue(),
                enableSorting: true,
                size: 225,
                meta: {
                    cellClassName: '',
                },
            },
            {
                id: 'status',
                accessorFn: (row) => row.status,
                header: ({ column }) => (
                    <DataGridColumnHeader title="وضعیت" column={column} />
                ),
                cell: (info) => info.getValue(),
                enableSorting: true,
                size: 225,
                meta: {
                    cellClassName: '',
                },
            },
            {
                id: 'recentlyActivity',
                accessorFn: (row) => row.recentlyActivity,
                header: ({ column }) => (
                    <DataGridColumnHeader title="آخرین فعالیت" column={column} />
                ),
                cell: (info) => info.getValue(),
                enableSorting: true,
                size: 225,
                meta: {
                    cellClassName: '',
                },
            },
            {
                id: 'actions',
                header: '',
                cell: ({ row }) => <ActionsCell row={row} />,
                enableSorting: false,
                size: 60,
                meta: {
                    headerClassName: '',
                },
            },
        ],
        [],
    );

    const table = useReactTable({
        columns,
        data: filteredData,
        pageCount: Math.ceil((filteredData?.length || 0) / pagination.pageSize),
        getRowId: (row: IMembersData) => String(row.id),
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
        <div className="grid lg:col-span-2">

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
                    <CardHeader>
                        <CardHeading>
                            <div className="flex items-center gap-2.5">
                                <CardTitle>تست</CardTitle>
                                <div className="relative">

                                </div>
                            </div>
                        </CardHeading>
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
            <Card>
                <CardHeader className="py-3.5">
                    <CardTitle>Teams</CardTitle>
                </CardHeader>
                <CardContent className="grow lg:p-7.5 lg:pt-6 p-5">
                    <div className="flex items-center justify-between flex-wrap gap-5 mb-7.5">
                        <div className="flex flex-col gap-1">
                            <span className="text-xl font-semibold text-mono">
                                Team Meeting
                            </span>
                            <span className="text-sm font-semibold text-foreground">
                                09:00 - 09:30
                            </span>
                        </div>
                        <img
                            src=""
                            className="size-7"
                            alt="image"
                        />
                    </div>
                    <p className="text-sm font-normal text-foreground leading-5.5 mb-8">
                        Team meeting to discuss strategies, outline <br />
                        project milestones, define key goals, and <br />
                        establish clear timelines.
                    </p>
                    <div className="flex rounded-lg bg-accent/50 gap-10 p-5">
                        <div className="flex flex-col gap-5">
                            <div className="flex items-center gap-1.5 text-sm font-normal text-foreground">

                                Location
                            </div>
                            <div className="text-sm font-medium text-foreground pt-1.5">
                                Amsterdam
                            </div>
                        </div>
                        <div className="flex flex-col gap-5">
                            <div className="flex items-center gap-1.5 text-sm font-normal text-foreground">

                                Team
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="justify-center">

                    Join Meeting

                </CardFooter>
            </Card>
        </div>
    )
}

export default Dashboard;