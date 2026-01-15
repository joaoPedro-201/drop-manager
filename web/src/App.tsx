import { useEffect, useState } from 'react';
import './App.css';

// definindo a "cara" do dado 
interface Product {
  id: string;
  name: string;
  finalPriceBrl: number;
  costPriceUsd: number;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  // useEffect: "Assim que a tela carregar, faça isso..."
  useEffect(() => {
    fetch('http://localhost:3000/products') // Bate na API
      .then((response) => response.json())  // Transforma a resposta em JSON
      .then((data) => setProducts(data))    // Guarda os dados no estado
      .catch((error) => console.error('Erro ao buscar produtos:', error));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>📦 DropManager</h1>
      <p>Gerenciamento de Produtos Importados</p>

      {/* 3. A Lista de Produtos */}
      <div style={{ marginTop: '20px' }}>
        {products.length === 0 ? (
          <p>Carregando produtos...</p>
        ) : (
          products.map((product) => (
            <div 
              key={product.id} 
              style={{ 
                border: '1px solid #444', 
                padding: '15px', 
                marginBottom: '10px', 
                borderRadius: '8px',
                backgroundColor: '#2a2a2a',
                color: 'white'
              }}
            >
              <h3>{product.name}</h3>
              <p>Preço Final Sugerido: 
                <strong style={{ color: '#4caf50', marginLeft: '5px' }}>
                  R$ {Number(product.finalPriceBrl).toFixed(2)}
                </strong>
              </p>
              <small style={{ color: '#aaa' }}>
                Custo USD: ${product.costPriceUsd}
              </small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;