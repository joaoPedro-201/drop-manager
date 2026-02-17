import { LayoutDashboard, PackagePlus, Boxes, TrendingUp, Menu } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/50 z-20 lg:hidden" />
      )}

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30 w-64 bg-zinc-900 border-r border-zinc-800 transform transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 flex items-center gap-3 border-b border-zinc-800 h-20">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <Boxes size={20} className="text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">DropManager</h1>
        </div>

        <nav className="p-4 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-zinc-800 text-emerald-400 rounded-lg border border-zinc-700 transition-all">
            <LayoutDashboard size={20} />
            <span className="font-medium">Dashboard</span>
          </button>
          
          <button className="w-full flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 rounded-lg transition-all">
            <TrendingUp size={20} />
            <span>Relatórios</span>
          </button>
        </nav>
      </aside>
    </>
  );
}