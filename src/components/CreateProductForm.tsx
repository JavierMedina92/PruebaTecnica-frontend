// src/components/CreateProductForm.tsx
import React, { useState } from 'react';
import axios from 'axios';

const CreateProductForm: React.FC = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number | string>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:3000/products', { name, price });
      setName('');
      setPrice('');
      alert('Product created successfully!');
    } catch (error) {
      console.error('Error creating product', error);
      alert('Failed to create product');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Nombre de Producto:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="price">Precio:</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <button type="submit">Create Product</button>
    </form>
  );
};

export default CreateProductForm;
