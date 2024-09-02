// src/components/EditProductForm.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { Product } from '../models/Product';


interface EditProductFormProps {
  product: Product;
  onClose: () => void;
}

const EditProductForm: React.FC<EditProductFormProps> = ({ product, onClose }) => {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState<number | string>(product.price);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:3000/products/${product.id}`, { name, price });
      onClose(); // Close the form and refresh the list
      alert('Product updated successfully!');
    } catch (error) {
      console.error('Error updating product', error);
      alert('Failed to update product');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <button type="submit">Update Product</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default EditProductForm;
