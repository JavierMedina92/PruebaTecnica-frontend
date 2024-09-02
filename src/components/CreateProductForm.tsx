// src/components/CreateProductForm.tsx
import React, { useState } from 'react';
import axios from 'axios';
import './CreateProductForm.css';

interface CreateProductFormProps {
  onProductAdded: () => void;
}

const CreateProductForm: React.FC<CreateProductFormProps> = ({ onProductAdded }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:3000/products', { name, price });
      onProductAdded();
      setName('');
      setPrice(0);
    } catch (error) {
      console.error('Error creating product', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-product-form">
      <div className="form-group">
        <label htmlFor="name">Product Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Product Price</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
        />
      </div>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default CreateProductForm;
