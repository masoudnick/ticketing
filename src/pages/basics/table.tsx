import React, { useState, useMemo, memo } from "react";
import { useQuery } from '@tanstack/react-query'
import { DataGridPagination } from "@/components/dataGrid/pagination";
import { ScrollArea, ScrollBar } from "@/components/scrollArea";
import { DataGridColumnHeader } from "@/components/dataGrid/columnHeader";
import { DataGridTable, DataGridTableRowSelectAll, DataGridTableRowSelect } from "@/components/dataGrid/table";
import { DataGridColumnVisibility } from "@/components/dataGrid/columnVisibility";
import { Card, CardHeader, CardTitle, CardFooter, CardHeading, CardTable, DataGrid, CardToolbar } from "@/components";
import { Button } from "@/components/button";
import { basicInfoService } from '@/services';
import type { BasicInfoProps } from '@/types';
import { Delete02Icon, Edit03Icon } from '@hugeicons/core-free-icons';
import type { ColumnDef, PaginationState, RowSelectionState, SortingState, } from '@tanstack/react-table';
import {
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    type Row,
    useReactTable,
} from '@tanstack/react-table';

import { HugeiconsIcon } from "@hugeicons/react";





export const BasicsTable = memo((
    { setModalInfo }: {
        setModalInfo: React.Dispatch<React.SetStateAction<{
            isOpen: boolean;
            recordID?: number | null;
        }>>
    }) => {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const {
        data: basicInfoData = [],
        isLoading,
    } = useQuery({
        queryKey: ["basicInfoDataTable"],
        queryFn: () => basicInfoService.read(),
    });

    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [sorting, setSorting] = useState<SortingState>([
        { id: 'created_at', desc: true },
    ]);
    // const [searchQuery, setSearchQuery] = useState('');

    function ActionsCell({ row }: { row: Row<BasicInfoProps> }) {
        return (
            <div className="flex gap-x-1">
                <Button variant="primaryLight" size="icon" onClick={()=> setModalInfo({isOpen: true, recordID: Number(row.id)})}>
                    <HugeiconsIcon icon={Edit03Icon} />
                </Button>
                <Button variant="dangerLight" size="icon">
                    <HugeiconsIcon icon={Delete02Icon} />
                </Button>
            </div>
        );
    }

    const filteredData = useMemo(() => {
        return basicInfoData
    }, [basicInfoData]);

    const columns = useMemo<ColumnDef<BasicInfoProps>[]>(
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
                id: 'شناسه',
                accessorFn: (row) => row.id,
                header: ({ column }) => (
                    <DataGridColumnHeader title="شناسه" column={column} />
                ),
                cell: (info) => info.getValue(),
                enableSorting: true,
                size: 80,
            },
            {
                id: 'عنوان',
                accessorFn: (row) => row.name,
                header: ({ column }) => (
                    <DataGridColumnHeader title="عنوان" column={column} />
                ),
                cell: (info) => info.getValue(),
                enableSorting: true,
            },
            {
                id: 'دسته بندی',
                accessorFn: (row) => row.category_name,
                header: ({ column }) => (
                    <DataGridColumnHeader title="دسته بندی" column={column} />
                ),
                cell: (info) => info.getValue(),
                enableSorting: true,
            },
            {
                id: 'ایجاد شده توسط',
                accessorFn: (row) => row.created_by,
                header: ({ column }) => (
                    <DataGridColumnHeader title="ایجاد شده توسط" column={column} />
                ),
                cell: (info) => info.getValue(),
                enableSorting: true,
            },
            {
                id: 'تاریخ و زمان ایجاد',
                accessorFn: (row) => row.created_at,
                header: ({ column }) => (
                    <DataGridColumnHeader title="تاریخ و زمان ایجاد" column={column} />
                ),
                cell: (info) => info.getValue(),
                enableSorting: true,
            },
            {
                id: 'بروزرسانی شده توسط',
                accessorFn: (row) => row.updated_by,
                header: ({ column }) => (
                    <DataGridColumnHeader title="بروزرسانی شده توسط" column={column} />
                ),
                cell: (info) => info.getValue(),
                enableSorting: true,
            },
            {
                id: 'تاریخ و زمان بروزرسانی',
                accessorFn: (row) => row.updated_at,
                header: ({ column }) => (
                    <DataGridColumnHeader title="تاریخ و زمان بروزرسانی" column={column} />
                ),
                cell: (info) => info.getValue(),
                enableSorting: true,
                size: 180,
            },
            {
                id: 'actions',
                header: '',
                cell: ({ row }) => <ActionsCell row={row} />,
                enableSorting: false,
                size: 100,
            },
        ],
        [],
    );

    const table = useReactTable({
        columns,
        data: filteredData,
        pageCount: Math.ceil((filteredData?.length || 0) / pagination.pageSize),
        getRowId: (row: BasicInfoProps) => String(row.id),
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
    return <>
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
                <CardHeader>
                    <CardHeading>
                        <div className="flex items-center gap-2.5">
                            <CardTitle>تست</CardTitle>
                            <div className="relative">

                            </div>
                        </div>
                    </CardHeading>
                    <CardToolbar>
                        <Button onClick={() => setModalInfo({ isOpen: true })}>جدید</Button>
                        <DataGridColumnVisibility
                            table={table}
                            trigger={
                                <Button variant="outline">

                                    ستون ها
                                </Button>
                            }
                        />
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
    </>
})