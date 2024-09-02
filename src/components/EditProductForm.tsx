import React, { useState } from 'react';
import axios from 'axios';
import './editProductForm.css'; // Asegúrate de que este sea el nombre correcto del archivo CSS
import { Product } from '../models/Product';

interface EditProductFormProps {
  product: Product; // Asegúrate de que `Product` esté importado
  onClose: () => void;
}

const EditProductForm: React.FC<EditProductFormProps> = ({ product, onClose }) => {
  const [name, setName] = useState<string>(product.name);
  const [price, setPrice] = useState<number>(product.price);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/products/${product.id}`, { name, price });
      onClose();
    } catch (error) {
      console.error('Error updating product', error);
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(parseFloat(e.target.value) || 0);
  };

  return (
    <div className="form-container">
      <form className="edit-product-form" onSubmit={handleSubmit}>
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
            onChange={handlePriceChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Save Changes</button>
        <button type="button" onClick={onClose} className="cancel-button">Cancel</button>
      </form>
    </div>
  );
};

export default EditProductForm;
