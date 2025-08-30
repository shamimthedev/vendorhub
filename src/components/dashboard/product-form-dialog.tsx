// src/components/dashboard/product-form-dialog.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit } from 'lucide-react';
import { type SanityProduct, type ProductMutationData } from '@/src/types';
import { createProduct, updateProduct } from '@/src/lib/sanity.queries';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

// Simple form type without Zod
type ProductFormData = {
  name: string;
  sku: string;
  price: number;
  currency: string;
  description: string;
};

interface ProductFormDialogProps {
  product?: SanityProduct;
  trigger?: React.ReactNode;
}

export default function ProductFormDialog({ product, trigger }: ProductFormDialogProps) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const isEdit = !!product;

  const form = useForm<ProductFormData>({
    defaultValues: {
      name: product?.name || '',
      sku: product?.sku || '',
      price: product?.price || 0,
      currency: product?.currency || 'USD',
      description: product?.description || '',
    },
  });

  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setOpen(false);
      form.reset();
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: ProductMutationData) => updateProduct(product!._id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setOpen(false);
    },
  });

  const isLoading = createMutation.isPending || updateMutation.isPending;

  const validateAndSubmit = (formData: ProductFormData) => {
    // Manual validation
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Product name is required';
    }
    
    if (formData.price < 0) {
      errors.price = 'Price must be positive';
    }

    // Set errors if any
    if (Object.keys(errors).length > 0) {
      Object.entries(errors).forEach(([field, message]) => {
        form.setError(field as keyof ProductFormData, { message });
      });
      return;
    }

    // Clean and prepare data
    const mutationData: ProductMutationData = {
      name: formData.name.trim(),
      sku: formData.sku.trim(),
      price: formData.price,
      currency: formData.currency || 'USD',
      description: formData.description.trim(),
    };

    if (isEdit) {
      updateMutation.mutate(mutationData);
    } else {
      createMutation.mutate(mutationData);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size={isEdit ? "icon" : "default"} variant={isEdit ? "ghost" : "default"}>
            {isEdit ? <Edit className="h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
            {!isEdit && 'Add Product'}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Product' : 'Add New Product'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(validateAndSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sku"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SKU (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter SKU" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price ($)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.01" 
                      placeholder="0.00" 
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value === '' ? 0 : parseFloat(e.target.value);
                        field.onChange(isNaN(value) ? 0 : value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency</FormLabel>
                  <FormControl>
                    <Input placeholder="USD" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter product description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : (isEdit ? 'Update Product' : 'Add Product')}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}