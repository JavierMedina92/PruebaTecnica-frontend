import React from 'react';
import axios from 'axios';
import EditProductForm from './EditProductForm';
import './ProductList.css'; // Asegúrate de que este archivo exista
import { Product } from '../models/Product'; // Verifica que la ruta sea correcta

interface ProductListProps {
  products: Product[];
  onProductEdited: () => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onProductEdited }) => {
  const [editingProduct, setEditingProduct] = React.useState<Product | null>(null);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/products/${id}`);
      onProductEdited(); // Refresca la lista de productos después de eliminar
    } catch (error) {
      console.error('Error deleting product', error);
    }
  };

  const handleCloseEdit = () => {
    setEditingProduct(null);
    onProductEdited(); // Refresca la lista después de editar
  };

  return (
    <div className="product-list-container">
      {editingProduct && <EditProductForm product={editingProduct} onClose={handleCloseEdit} />}
      <table className="product-table">
        <thead>
          <tr>
            <th>Nombre de Producto</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>
                <button onClick={() => handleEdit(product)}>Edit</button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
