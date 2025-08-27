// src/types/index.ts
export type Order = {
  id: string;
  customer: string;
  product: string;
  date: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
};