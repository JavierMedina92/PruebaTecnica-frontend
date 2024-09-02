import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateProductForm from './components/CreateProductForm';
import ProductList from './components/ProductList';
import { Product } from './models/Product'; // Verifica que la ruta sea correcta

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>('http://localhost:3000/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductAdded = async () => {
    await fetchProducts(); // Refresca la lista de productos
  };

  return (
    <div>
      <h1>Catalogo de Productos</h1>
      <CreateProductForm onProductAdded={handleProductAdded} />
      <ProductList products={products} onProductEdited={fetchProducts} />
    </div>
  );
};

export default App;
