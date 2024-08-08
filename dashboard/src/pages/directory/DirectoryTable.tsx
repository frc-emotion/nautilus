import {
    ColumnDef,
    SortingState,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { UserNoPassword } from "@/context/auth";
import { Loader2, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { Dialog, DialogDescription } from "@radix-ui/react-dialog";
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/context/auth";

// NOTE: This table does not currently allow you to delete the user that is currently logged in.

export default function DirectoryTable() {
    const [data, setData] = useState<UserNoPassword[]>([]);
    const { user: currentUser } = useAuth(); // temporary

    useEffect(() => {
        async function fetchUsers() {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/users`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            const data = await response.json();
            if (response.ok) {
                setData(data.users);
            } else {
                // TODO: Handle error
                console.error(data.message);
            }
        }

        fetchUsers();
    }, []);

    async function handleUserDelete(id: string) {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/users/${id}`,
            {
                method: "DELETE",
                credentials: "include",
            }
        );

        if (response.ok) {
            console.log("User deleted");
            setData((prevData) => prevData.filter((user) => user.id !== id));
        } else {
            console.error("Failed to delete user");
        }
    }

    const columns: ColumnDef<UserNoPassword>[] = [
        {
            accessorKey: "firstname",
            header: "First Name",
        },
        {
            accessorKey: "lastname",
            header: "Last Name",
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "phone",
            header: "Phone",
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const user = row.original;
                const [editUserOpen, setEditUserOpen] = useState(false);
                const [confirmDeleteOpen, setConfirmDeleteOpen] =
                    useState(false);
                const [deleteBusy, setDeleteBusy] = useState(false);

                return (
                    <>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem
                                    onClick={() =>
                                        navigator.clipboard.writeText(user.id)
                                    }
                                >
                                    Copy User ID
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <Link to={`/user/${user.id}`}>
                                    <DropdownMenuItem>
                                        View Profile
                                    </DropdownMenuItem>
                                </Link>

                                <DropdownMenuItem
                                    onClick={() => {
                                        setEditUserOpen(true);
                                    }}
                                >
                                    Edit User
                                </DropdownMenuItem>

                                {currentUser?.id === user.id ? null : (
                                    <>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            className="font-bold text-red-600"
                                            onClick={() => {
                                                setConfirmDeleteOpen(true);
                                            }}
                                        >
                                            Delete
                                        </DropdownMenuItem>
                                    </>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Dialog
                            open={editUserOpen}
                            onOpenChange={setEditUserOpen}
                        >
                            <DialogContent>meow</DialogContent>
                        </Dialog>
                        <Dialog
                            open={confirmDeleteOpen}
                            onOpenChange={setConfirmDeleteOpen}
                        >
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Are you sure?</DialogTitle>
                                    <DialogDescription>
                                        This action cannot be reversed.
                                        Continuing will permanently delete the
                                        user and all of their associated
                                        personal data from the server. Content
                                        generated by the user will not be
                                        affected.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="flex justify-end space-x-2">
                                    <Button
                                        variant="outline"
                                        onClick={() =>
                                            setConfirmDeleteOpen(false)
                                        }
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        disabled={deleteBusy}
                                        onClick={async () => {
                                            setDeleteBusy(true);
                                            await handleUserDelete(user.id);
                                            // row.
                                            setDeleteBusy(false);
                                            setConfirmDeleteOpen(false);
                                        }}
                                    >
                                        {deleteBusy ? (
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        ) : null}
                                        Delete
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </>
                );
            },
        },
    ];

    return <DTable data={data} columns={columns} className="w-full" />;
}

interface DirectoryTableProps<TData, TValue> {
    data: TData[];
    columns: ColumnDef<TData, TValue>[];
    className?: string;
}

function DTable<TData, TValue>({
    data,
    columns,
    className,
}: DirectoryTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),

        state: {
            sorting,
        },
    });

    return (
        <div className={className}>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}
