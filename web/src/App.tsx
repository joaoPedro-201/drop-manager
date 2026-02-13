import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import './App.css';
import api from './services/api'; 

interface Product {
  id: string;
  name: string;
  finalPriceBrl: number;
  costPriceUsd: number;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [shipping, setShipping] = useState('');
  const [tax, setTax] = useState('60');
  const [margin, setMargin] = useState('30');
  const [exchange, setExchange] = useState('6.00');

  const fetchProducts = () => {
    // Note que não usamos mais "fetch" e nem "localhost"
    api.get('/products')
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Erro ao buscar:", error));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const payload = {
      name,
      costPriceUsd: Number(cost),
      shippingCostUsd: Number(shipping),
      taxRate: Number(tax),
      desiredMargin: Number(margin),
      exchangeRate: Number(exchange)
    };

    try {
      // Usando api.post
      await api.post('/products', payload);
      
      alert('Produto cadastrado com sucesso!');
      fetchProducts();
      setName('');
      setCost('');
      setShipping('');
      
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert('Erro ao cadastrar. Verifique os dados.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Tem certeza que deseja excluir este produto?")) {
      return;
    }

    try {
      // Usando api.delete
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao excluir ou erro de conexão.");
    }
  };

  return (
    <div>
      <header className="app-header">
        <h1 className="app-title">
          <span>📦</span> DropManager
        </h1>
      </header>

      <div className="main-container">
        <div className="content-grid">
          
          <div className="card">
            <h2 style={{ marginTop: 0 }}>Novo Produto</h2>
            <form onSubmit={handleSubmit} className="form-grid">
              
              <div className="form-group">
                <label>Nome do Produto:</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Ex: Smartwatch X8" required />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div className="form-group">
                  <label>Custo (USD):</label>
                  <input type="number" step="0.01" value={cost} onChange={e => setCost(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Frete (USD):</label>
                  <input type="number" step="0.01" value={shipping} onChange={e => setShipping(e.target.value)} required />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div className="form-group">
                  <label>Taxa Imp. (%):</label>
                  <input type="number" value={tax} onChange={e => setTax(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Margem (%):</label>
                  <input type="number" value={margin} onChange={e => setMargin(e.target.value)} />
                </div>
              </div>

              <div className="form-group">
                <label>Cotação Dólar (R$):</label>
                <input type="number" step="0.01" value={exchange} onChange={e => setExchange(e.target.value)} />
              </div>

              <button type="submit" className="btn-success">
                CALCULAR E SALVAR
              </button>
            </form>
          </div>

          <div>
            <h2 style={{ marginTop: 0 }}>Lista de Produtos Cadastrados ({products.length})</h2>
            
            {products.length === 0 ? (
                <p style={{ color: '#aaa' }}>Nenhum produto cadastrado ainda.</p>
            ) : (
              <div style={{ display: 'grid', gap: '10px' }}>
                {products.map((product) => (
                  <div key={product.id} className="product-item">
                    <div>
                      <strong style={{ fontSize: '1.1em', display: 'block' }}>{product.name}</strong>
                      <small style={{ color: '#aaa' }}>Custo USD: ${product.costPriceUsd}</small>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{ color: '#4caf50', fontWeight: 'bold', fontSize: '1.2em' }}>
                        R$ {Number(product.finalPriceBrl).toFixed(2)}
                      </span>
                      
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="btn-delete"
                        title="Excluir Produto"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div> 
      </div> 
    </div>
  );
}

export default App;