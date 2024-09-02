// src/components/CreateProductForm.tsx
import React, { useState } from 'react';
import axios from 'axios';
import './CreateProductForm.css';

interface CreateProductFormProps {
  onProductAdded: () => void;
}

const CreateProductForm: React.FC<CreateProductFormProps> = ({ onProductAdded }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState<string>(''); // Cambiado a string vacío

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:3000/products', { name, price: parseFloat(price) });
      // Confirmación de éxito
      const confirmed = window.confirm('Registro De Producto Exitoso');
      if (confirmed) {
        // Limpia el formulario si se acepta el mensaje
        setName('');
        setPrice(''); // Limpia el input de precio
        onProductAdded();
      }
    } catch (error) {
      console.error('Error creating product', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-product-form">
      <div className="form-group">
        <label htmlFor="name">Nombre de Producto</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Precio de Producto</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <button type="submit">Agregar Producto</button>
    </form>
  );
};

export default CreateProductForm;
