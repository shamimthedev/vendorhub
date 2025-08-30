// src/app/(dashboard)/products/page.tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import ProductFormDialog from '@/src/components/dashboard/product-form-dialog';
import { getProducts } from '@/src/lib/sanity.queries';
import ProductsTable from '@/src/components/dashboard/products-table';

export default function ProductsPage() {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  if (isLoading) {
    return <div className="p-6">Loading products...</div>;
  }

  if (error) {
    return <div className="p-6">Error loading products: {error.message}</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Products</h2>
        <ProductFormDialog />
      </div>

      {/* Products Table */}
      <div>
        <ProductsTable products={products || []} />
      </div>
    </div>
  );
}