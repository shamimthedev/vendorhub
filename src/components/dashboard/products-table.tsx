// src/components/dashboard/products-table.tsx
'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  CellContext,
} from '@tanstack/react-table';
import { Edit, Trash2 } from 'lucide-react';
import { deleteProduct } from '@/src/lib/sanity.queries';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/src/components/ui/table';
import { SanityProduct } from '@/src/types';
import { Button } from '../ui/button';
import ProductFormDialog from './product-form-dialog';

interface ProductsTableProps {
  products: SanityProduct[];
}

interface TableActionsProps {
  product: SanityProduct;
  onDelete: (id: string) => void;
}

function TableActions({ product, onDelete }: TableActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    onDelete(product._id);
  };

  return (
    <div className="flex space-x-2">
      <ProductFormDialog 
        product={product} 
        trigger={
          <Button variant="ghost" size="icon">
            <Edit className="h-4 w-4" />
          </Button>
        } 
      />
      <Button
        variant="ghost"
        size="icon"
        onClick={handleDelete}
        disabled={isDeleting}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default function ProductsTable({ products }: ProductsTableProps) {
  const queryClient = useQueryClient();

  // Define the delete mutation with explicit typing
  const deleteProductMutation = useMutation<void, Error, string>({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  // Create a wrapper function that matches the expected signature
  const handleDeleteProduct = (id: string): void => {
    deleteProductMutation.mutate(id);
  };

  const columns: ColumnDef<SanityProduct>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'sku',
      header: 'SKU',
    },
    {
      accessorKey: 'price',
      header: 'Price',
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue('price'));
        const formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(amount);
        return formatted;
      },
    },
    {
      accessorKey: '_createdAt',
      header: 'Date Added',
      cell: ({ row }) => {
        const date = new Date(row.getValue('_createdAt'));
        return date.toLocaleDateString();
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: (cellContext: CellContext<SanityProduct, unknown>) => {
        const product = cellContext.row.original;
        return (
          <TableActions 
            product={product} 
            onDelete={handleDeleteProduct}
          />
        );
      },
    },
  ];

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
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
                          header.column.columnDef.header,
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
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No products found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}