import { useState, useEffect } from "react";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
    TableHead,
    Pagination,
    PaginationPrevious,
    PaginationNext,
    PaginationContent,
    PaginationItem,
    PaginationEllipsis
} from "#/components";

interface AssetTableProps<T> {
    data: T[] | undefined;
    isLoading: boolean;
    columns: Array<{
        header: string;
        accessorKey: keyof T;
        cell?: (item: T) => React.ReactNode;
    }>;
    onRowClick?: (item: T) => void;
    pagination?: {
        pageIndex: number;
        pageSize: number;
        pageCount: number;
        onPageChange: (page: number) => void;
    };
}

export default function AssetTable<T extends { id: string }>({
    data,
    isLoading,
    columns,
    onRowClick,
    pagination
}: AssetTableProps<T>) {
    if (isLoading) {
        return <div className="py-8 text-center">加载中...</div>;
    }

    if (!data || data.length === 0) {
        return <div className="py-8 text-center">暂无数据</div>;
    }

    return (
        <div className="space-y-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        {columns.map((column) => (
                            <TableHead key={column.accessorKey as string}>{column.header}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((item) => (
                        <TableRow
                            key={item.id}
                            className={onRowClick ? "cursor-pointer hover:bg-muted/50" : ""}
                            onClick={() => onRowClick && onRowClick(item)}
                        >
                            {columns.map((column) => (
                                <TableCell key={`${item.id}-${column.accessorKey as string}`}>
                                    {column.cell ? column.cell(item) : String(item[column.accessorKey] || "")}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {pagination && (
                <div className="flex justify-end">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious href="#" />
                            </PaginationItem>

                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>

                            <PaginationItem>
                                <PaginationNext href="#" />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    );
}
