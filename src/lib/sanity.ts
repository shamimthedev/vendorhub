// src/lib/sanity.ts
import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03', // Use a current date
  token: process.env.SANITY_API_READ_TOKEN, // Optional, for write operations
  useCdn: false, // Set to false if statically generating pages, true for app-like behavior
});