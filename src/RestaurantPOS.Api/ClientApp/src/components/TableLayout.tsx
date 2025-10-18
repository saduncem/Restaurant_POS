import React from 'react';
import { motion } from 'framer-motion';
import { Table2 } from 'lucide-react';
import { useOrderStore } from '../store/useOrderStore';

// Define a Table type for static mock data
interface Table {
  id: number;
  name: string;
  status: 'empty' | 'occupied' | 'split' | 'hold';
  guests: number;
}

// Static mock table data for demonstration.  In a real app this would be fetched from the API.
const tables: Table[] = [
  { id: 1, name: 'C1', status: 'empty', guests: 0 },
  { id: 2, name: 'C2', status: 'occupied', guests: 2 },
  { id: 3, name: 'C3', status: 'split', guests: 3 },
  { id: 4, name: 'C4', status: 'hold', guests: 2 },
  { id: 5, name: 'C5', status: 'empty', guests: 0 },
];

const statusClasses: Record<Table['status'], string> = {
  empty: 'bg-blue-100 border-blue-300 text-blue-700',
  occupied: 'bg-red-100 border-red-300 text-red-700',
  split: 'bg-yellow-100 border-yellow-300 text-yellow-700',
  hold: 'bg-green-100 border-green-300 text-green-700',
};

export const TableLayout: React.FC<{ onSelect: () => void }> = ({ onSelect }) => {
  const setCurrentTable = useOrderStore((state) => state.setCurrentTable);

  const handleSelect = (table: Table) => {
    setCurrentTable(table.name);
    onSelect();
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4 text-slate-700 flex items-center gap-2">
        <Table2 className="text-blue-500" /> Table Layout
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {tables.map((t) => (
          <motion.div
            key={t.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSelect(t)}
            className={`cursor-pointer border-2 rounded-xl p-6 text-center font-semibold transition ${statusClasses[t.status]}`}
          >
            <div className="text-3xl mb-1">{t.name}</div>
            <div className="text-sm opacity-70">
              {t.guests > 0 ? `${t.guests} Guests` : 'Empty'}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};