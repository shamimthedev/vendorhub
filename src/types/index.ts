// src/types/index.ts
export type Order = {
  id: string;
  customer: string;
  product: string;
  date: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
};

// Raw Sanity document type (what the API returns)
export type SanityDocument<T = Record<string, unknown>> = {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  _type: string;
} & T;

// Product-specific Sanity document - make optional fields optional
export type SanityProductDocument = SanityDocument<{
  name: string;
  sku?: string;
  price: number;
  currency?: string;
  description?: string;
  images?: Array<{
    asset: {
      _ref: string;
      _type: 'reference';
    };
  }>;
}>;

// Our transformed product type for the frontend
export type SanityProduct = {
  _id: string;
  _createdAt: string;
  name: string;
  sku: string;
  price: number;
  currency: string;
  description: string;
  images?: string[];
};

// For mutations, match the form structure exactly
export type ProductMutationData = {
  name: string;
  sku: string;
  price: number;
  currency: string;
  description: string;
};