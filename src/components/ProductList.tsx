// src/components/ProductList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditProductForm from './EditProductForm';
import { Product } from '../models/Product';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get('http://localhost:3000/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    }
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error('Error deleting product', error);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => handleEdit(product)}>Edit</button>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {editingProduct && (
        <EditProductForm product={editingProduct} onClose={() => setEditingProduct(null)} />
      )}
    </div>
  );
};

export default ProductList;
