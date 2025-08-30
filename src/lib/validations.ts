// src/lib/validations.ts
import { z } from 'zod';

// Preprocessed schema to handle empty strings and convert them to defaults
export const productFormSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  sku: z.preprocess((val) => val === '' ? '' : val, z.string()),
  price: z.preprocess((val) => {
    if (val === '' || val === null || val === undefined) return 0;
    return typeof val === 'string' ? parseFloat(val) : val;
  }, z.number().min(0, 'Price must be positive')),
  currency: z.preprocess((val) => val === '' ? 'USD' : val, z.string()),
  description: z.preprocess((val) => val === '' ? '' : val, z.string()),
});

// Use z.infer to ensure type consistency
export type ProductFormValues = z.infer<typeof productFormSchema>;