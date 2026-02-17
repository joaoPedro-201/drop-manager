import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import api from './services/api';
import { Sidebar } from './components/Sidebar';
import { StatsCard } from './components/StatsCard';
import { PackagePlus, Trash2, DollarSign, Menu, Boxes } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  finalPriceBrl: number;
  costPriceUsd: number;
}

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [shipping, setShipping] = useState('');
  const [tax, setTax] = useState('60');
  const [margin, setMargin] = useState('30');
  const [exchange, setExchange] = useState('6.00');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const fetchProducts = () => {
    api.get('/products')
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Erro ao buscar:", error));
  };

  useEffect(() => { fetchProducts(); }, []);

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
      await api.post('/products', payload);
      alert('Produto salvo!');
      fetchProducts();
      setName(''); setCost(''); setShipping('');
    } catch (error) {
      alert('Erro ao salvar');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Deletar produto?")) {
      try { await api.delete(`/products/${id}`); fetchProducts(); } 
      catch { alert("Erro ao deletar"); }
    }
  };

  const totalItems = products.length;
  const totalValue = products.reduce((acc, p) => acc + Number(p.finalPriceBrl), 0);

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100 overflow-hidden font-sans">
      
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="h-16 lg:hidden flex items-center px-4 border-b border-zinc-800 bg-zinc-900">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-zinc-400">
            <Menu />
          </button>
          <span className="ml-4 font-bold">Dashboard</span>
        </header>

        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          
          {/* STATS AREA */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <StatsCard title="Produtos Ativos" value={totalItems} icon={Boxes} color="blue" />
            <StatsCard title="Valor Total (BRL)" value={`R$ ${totalValue.toFixed(2)}`} icon={DollarSign} color="emerald" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* FORMULÁRIO */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-xl sticky top-4">
                <div className="flex items-center gap-2 mb-6 border-b border-zinc-800 pb-4">
                  <PackagePlus className="text-emerald-500" />
                  <h2 className="text-lg font-bold text-white">Novo Produto</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1 uppercase">Nome</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Ex: Fone Bluetooth" className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 focus:border-emerald-500 focus:outline-none transition-all" required />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1">Custo (USD)</label>
                      <input type="number" step="0.01" value={cost} onChange={e => setCost(e.target.value)} required className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-2 focus:border-emerald-500 focus:outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1">Frete (USD)</label>
                      <input type="number" step="0.01" value={shipping} onChange={e => setShipping(e.target.value)} required className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-2 focus:border-emerald-500 focus:outline-none transition-all" />
                    </div>
                  </div>

                  {/* Resto dos inputs mantidos iguais... */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1">Taxa (%)</label>
                      <input type="number" value={tax} onChange={e => setTax(e.target.value)} className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-2 focus:border-emerald-500 focus:outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1">Margem (%)</label>
                      <input type="number" value={margin} onChange={e => setMargin(e.target.value)} className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-2 focus:border-emerald-500 focus:outline-none transition-all" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1">Dólar Hoje (R$)</label>
                    <input type="number" step="0.01" value={exchange} onChange={e => setExchange(e.target.value)} className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-2 focus:border-emerald-500 focus:outline-none transition-all" />
                  </div>

                  <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-lg shadow-lg shadow-emerald-900/20 transition-all flex items-center justify-center gap-2 mt-4">
                    <DollarSign size={18} />
                    Salvar
                  </button>
                </form>
              </div>
            </div>

            {/* LISTA DE PRODUTOS */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products.map((product) => (
                  <div key={product.id} className="group bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded-xl p-5 transition-all relative">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg text-zinc-100">{product.name}</h3>
                        <p className="text-xs text-zinc-500 mt-1">Custo: USD {Number(product.costPriceUsd).toFixed(2)}</p>
                      </div>
                      <button onClick={() => handleDelete(product.id)} className="text-zinc-600 hover:text-red-400 p-2"><Trash2 size={18} /></button>
                    </div>
                    <div className="mt-6 pt-4 border-t border-zinc-800 flex items-end justify-between">
                      <span className="text-2xl font-bold text-emerald-400">R$ {Number(product.finalPriceBrl).toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}