import React from 'react';
import { motion } from 'framer-motion';
import { ChefHat, Split as SplitIcon, CreditCard, ArrowLeft } from 'lucide-react';
import { useOrderStore, MenuItem } from '../store/useOrderStore';

// Static mock menu data.  Replace this with API data in a real application.
const menu: MenuItem[] = [
  { id: 1, name: 'Caesar Salad', price: 12, category: 'Appetizers' },
  { id: 2, name: 'Duck Confit', price: 16, category: 'Mains' },
  { id: 3, name: 'Soup du Jour', price: 8, category: 'Appetizers' },
  { id: 4, name: 'Steak', price: 22, category: 'Mains' },
  { id: 5, name: 'Lemon Tart', price: 9, category: 'Desserts' },
];

interface OrderScreenProps {
  onBack: () => void;
}

export const OrderScreen: React.FC<OrderScreenProps> = ({ onBack }) => {
  const { currentTable, orderItems, addItem } = useOrderStore();
  const total = orderItems.reduce((sum, i) => sum + i.price, 0);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition"
        >
          <ArrowLeft size={18} /> Back to Layout
        </button>
        <div className="text-lg font-semibold text-slate-700">
          Table {currentTable}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {/* Order summary */}
        <div className="col-span-1 bg-slate-50 rounded-xl p-4 border border-slate-200 shadow-inner">
          <h2 className="text-lg font-semibold mb-3 text-slate-700">🧾 Current Order</h2>
          <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
            {orderItems.length === 0 ? (
              <div className="text-slate-400 text-center text-sm mt-8">No items yet</div>
            ) : (
              orderItems.map((i, idx) => (
                <div
                  key={idx}
                  className="flex justify-between bg-white rounded-lg px-3 py-2 shadow-sm border border-slate-100"
                >
                  <span>{i.name}</span>
                  <span className="font-medium text-slate-600">${i.price.toFixed(2)}</span>
                </div>
              ))
            )}
          </div>
          <div className="border-t pt-3">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Tax (8%)</span>
              <span>${(total * 0.08).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-800 font-semibold text-lg mt-2">
              <span>Total</span>
              <span>${(total * 1.08).toFixed(2)}</span>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
              <ChefHat size={16} className="inline mr-1" /> Send
            </button>
            <button className="flex-1 bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600 transition">
              <SplitIcon size={16} className="inline mr-1" /> Split
            </button>
            <button className="flex-1 bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition">
              <CreditCard size={16} className="inline mr-1" /> Pay
            </button>
          </div>
        </div>
        {/* Menu grid */}
        <div className="col-span-2">
          <h2 className="text-lg font-semibold mb-3 text-slate-700">🍽 Menu</h2>
          <div className="flex gap-2 mb-3">
            {['Appetizers', 'Mains', 'Desserts'].map((cat) => (
              <button
                key={cat}
                className="px-3 py-1 bg-slate-100 hover:bg-blue-100 text-sm rounded-lg border border-slate-200"
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {menu.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => addItem({ id: item.id, name: item.name, price: item.price })}
                className="cursor-pointer bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <div className="font-medium text-slate-700">{item.name}</div>
                <div className="text-sm text-slate-500">${item.price.toFixed(2)}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};