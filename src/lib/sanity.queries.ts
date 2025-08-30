// src/lib/sanity.queries.ts
import { SanityProduct, SanityProductDocument, ProductMutationData } from '../types';
import { client } from './sanity';

// Helper function to transform Sanity document to SanityProduct
function transformSanityProduct(doc: SanityProductDocument): SanityProduct {
  return {
    _id: doc._id,
    _createdAt: doc._createdAt,
    name: doc.name,
    sku: doc.sku || '',
    price: doc.price,
    currency: doc.currency || 'USD',
    description: doc.description || '',
    images: doc.images?.map(image => {
      const imageId = image.asset._ref.replace('image-', '').split('-')[0];
      return `https://cdn.sanity.io/images/your-project-id/production/${imageId}.jpg`;
    }),
  };
}

// GROQ Query: Fetch all products
export async function getProducts(): Promise<SanityProduct[]> {
  const query = `*[_type == "product"] | order(_createdAt desc) {
    _id,
    _createdAt,
    name,
    sku,
    price,
    currency,
    description,
    images
  }`;
  
  const products: SanityProductDocument[] = await client.fetch(query);
  return products.map(transformSanityProduct);
}

// Mutation: Create a new product
export async function createProduct(productData: ProductMutationData): Promise<SanityProduct> {
  const product: Omit<SanityProductDocument, '_id' | '_createdAt' | '_updatedAt' | '_rev'> = {
    _type: 'product',
    name: productData.name,
    sku: productData.sku,
    price: productData.price,
    currency: productData.currency,
    description: productData.description,
  };

  const result: SanityProductDocument = await client.create(product);
  return transformSanityProduct(result);
}

// Mutation: Update an existing product
export async function updateProduct(id: string, productData: ProductMutationData): Promise<SanityProduct> {
  const result: SanityProductDocument = await client
    .patch(id)
    .set({
      name: productData.name,
      sku: productData.sku,
      price: productData.price,
      currency: productData.currency,
      description: productData.description,
    })
    .commit();

  return transformSanityProduct(result);
}

// Mutation: Delete a product by its ID
export async function deleteProduct(id: string): Promise<void> {
  await client.delete(id);
}