import './App.css';
import CreateProductForm from './components/CreateProductForm';
import ProductList from './components/ProductList';

const App: React.FC = () => {
  return (
    <div>
      <h1>Catalogo de Productos</h1>
      <CreateProductForm />
      <ProductList/>
    </div>
  );
};

export default App;
