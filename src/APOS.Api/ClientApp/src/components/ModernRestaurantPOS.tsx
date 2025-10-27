import React, { useState } from 'react';
import { Clock, Trash2, Plus, Minus, Send, DollarSign, Users, Printer, ArrowLeftRight, Percent, TrendingUp, Settings, ChefHat, CreditCard, Banknote, Split, X } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
}

interface OrderItem extends MenuItem {
  quantity: number;
  discount?: number;
}

interface Table {
  id: string;
  number: number;
  guests: number;
  isOccupied: boolean;
}

type Screen = 'tables' | 'order' | 'payment' | 'kitchen' | 'reports' | 'settings';

const ModernRestaurantPOS = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [screen, setScreen] = useState<Screen>('tables');
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('APPETIZERS');
  const [guestCount, setGuestCount] = useState(2);
  const [globalDiscount, setGlobalDiscount] = useState(0);
  const [showTransfer, setShowTransfer] = useState(false);
  const [kitchenOrders, setKitchenOrders] = useState<any[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'split'>('cash');
  const [cashAmount, setCashAmount] = useState('');
  const [cardAmount, setCardAmount] = useState('');

  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const tables: Table[] = [
    { id: 'C1', number: 1, guests: 0, isOccupied: true },
    { id: 'C2', number: 2, guests: 0, isOccupied: false },
    { id: 'C3', number: 3, guests: 0, isOccupied: false },
    { id: 'C4', number: 4, guests: 0, isOccupied: false },
    { id: 'C5', number: 5, guests: 1, isOccupied: false },
    { id: 'C6', number: 6, guests: 1, isOccupied: false },
    { id: 'C7', number: 7, guests: 2, isOccupied: true },
    { id: 'C8', number: 8, guests: 1, isOccupied: false },
  ];

  const categories = [
    'APPETIZERS', 'MAIN COURSE', 'SANDWICHES', 'BAR SNACKS', 
    'DESSERTS', 'COFFEE', 'BEER', 'WINES', 'SPIRITS'
  ];

  const menuItems: MenuItem[] = [
    { id: '1', name: 'SOUP DU JOUR', price: 10.50, category: 'APPETIZERS' },
    { id: '2', name: 'HOUSE SALAD', price: 12.50, category: 'APPETIZERS' },
    { id: '3', name: 'CHICKEN CAESAR', price: 16.50, category: 'APPETIZERS' },
    { id: '4', name: 'CUP OF SOUP', price: 8.00, category: 'APPETIZERS' },
    { id: '5', name: 'SHRIMP COCKTAIL', price: 17.50, category: 'APPETIZERS' },
    { id: '6', name: 'DUCK CONFIT', price: 16.00, category: 'APPETIZERS' },
    { id: '7', name: 'SCOTCH EGGS', price: 15.00, category: 'APPETIZERS' },
    { id: '8', name: 'CAESAR SALAD', price: 13.50, category: 'APPETIZERS' },
    { id: '9', name: 'LOBSTER RAVIOLI', price: 28.00, category: 'MAIN COURSE' },
    { id: '10', name: 'PARTY PLATTER', price: 75.00, category: 'MAIN COURSE' },
    { id: '11', name: 'GRILLED STEAK', price: 35.00, category: 'MAIN COURSE' },
    { id: '12', name: 'SALMON FILLET', price: 29.00, category: 'MAIN COURSE' },
  ];

  const addToOrder = (item: MenuItem) => {
    const existing = orderItems.find(oi => oi.id === item.id);
    if (existing) {
      setOrderItems(orderItems.map(oi => 
        oi.id === item.id ? { ...oi, quantity: oi.quantity + 1 } : oi
      ));
    } else {
      setOrderItems([...orderItems, { ...item, quantity: 1, discount: 0 }]);
    }
  };

  const updateQuantity = (id: string, delta: number) => {
    setOrderItems(orderItems.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return newQty === 0 ? null : { ...item, quantity: newQty };
      }
      return item;
    }).filter(Boolean) as OrderItem[]);
  };

  const removeItem = (id: string) => {
    setOrderItems(orderItems.filter(item => item.id !== id));
  };

  const calculateSubtotal = () => {
    return orderItems.reduce((sum, item) => {
      const itemTotal = item.price * item.quantity;
      const itemDiscount = item.discount || 0;
      return sum + (itemTotal - (itemTotal * itemDiscount / 100));
    }, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    return subtotal - (subtotal * globalDiscount / 100);
  };

  const sendToKitchen = () => {
    if (orderItems.length === 0) return;
    
    const newOrder = {
      id: Date.now().toString(),
      table: selectedTable?.id,
      items: [...orderItems],
      time: new Date(),
      status: 'pending'
    };
    
    setKitchenOrders([...kitchenOrders, newOrder]);
    alert('✅ Order sent to kitchen!');
  };

  const filteredMenuItems = menuItems.filter(item => item.category === activeCategory);

  // TABLE SELECTION SCREEN
  if (screen === 'tables') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4 md:p-6 select-none">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-4 md:p-6 mb-4 md:mb-6 shadow-2xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm p-3 md:p-4 rounded-xl">
                <Clock className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <div>
                <p className="text-blue-100 text-xs md:text-sm font-medium">Current Time</p>
                <p className="text-2xl md:text-3xl font-bold">{currentTime.toLocaleTimeString()}</p>
              </div>
            </div>
            <div className="text-center">
              <p className="text-xl md:text-2xl font-bold">LANDMARK TAVERN</p>
              <p className="text-blue-100 text-xs md:text-sm">Table Management</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setScreen('kitchen')} 
                className="bg-white/20 hover:bg-white/30 active:scale-95 p-3 md:p-4 rounded-xl transition-all touch-manipulation"
              >
                <ChefHat className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <button 
                onClick={() => setScreen('reports')} 
                className="bg-white/20 hover:bg-white/30 active:scale-95 p-3 md:p-4 rounded-xl transition-all touch-manipulation"
              >
                <TrendingUp className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <button 
                onClick={() => setScreen('settings')} 
                className="bg-white/20 hover:bg-white/30 active:scale-95 p-3 md:p-4 rounded-xl transition-all touch-manipulation"
              >
                <Settings className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 md:p-8 shadow-2xl">
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Select Table</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 max-w-4xl mx-auto">
            {tables.map(table => (
              <button
                key={table.id}
                onClick={() => {
                  setSelectedTable(table);
                  setScreen('order');
                  setGuestCount(table.guests || 2);
                }}
                className={`aspect-square rounded-2xl transition-all duration-200 active:scale-95 touch-manipulation ${
                  table.isOccupied
                    ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/50'
                    : 'bg-gradient-to-br from-slate-600 to-slate-700'
                } flex flex-col items-center justify-center gap-2 p-4`}
              >
                <span className="text-2xl md:text-3xl font-bold">{table.id}</span>
                {table.isOccupied && (
                  <div className="flex items-center gap-1 text-xs md:text-sm bg-white/20 px-2 md:px-3 py-1 rounded-full">
                    <Users className="w-3 h-3 md:w-4 md:h-4" />
                    <span>{table.guests}</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // KITCHEN DISPLAY SCREEN
  if (screen === 'kitchen') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4 md:p-6 select-none">
        <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-2xl p-4 md:p-6 mb-4 md:mb-6 shadow-2xl">
          <div className="flex justify-between items-center">
            <h1 className="text-xl md:text-3xl font-bold flex items-center gap-2 md:gap-3">
              <ChefHat className="w-6 h-6 md:w-8 md:h-8" />
              Kitchen Display
            </h1>
            <button 
              onClick={() => setScreen('tables')} 
              className="bg-white/20 hover:bg-white/30 active:scale-95 px-4 md:px-6 py-2 md:py-3 rounded-xl font-semibold transition-all text-sm md:text-base touch-manipulation"
            >
              ← Back
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {kitchenOrders.length === 0 ? (
            <div className="col-span-full bg-slate-800/50 rounded-2xl p-8 md:p-12 text-center">
              <ChefHat className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 text-slate-600" />
              <p className="text-lg md:text-xl text-slate-400">No orders in kitchen</p>
            </div>
          ) : (
            kitchenOrders.map(order => (
              <div key={order.id} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-2xl">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-3 md:p-4 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg md:text-xl font-bold">Table {order.table}</span>
                    <span className="text-xs md:text-sm">{order.time.toLocaleTimeString()}</span>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  {order.items.map((item: OrderItem, idx: number) => (
                    <div key={idx} className="bg-slate-700/50 rounded-lg p-2 md:p-3">
                      <div className="flex justify-between">
                        <span className="font-semibold text-sm md:text-base">{item.name}</span>
                        <span className="text-orange-400 font-bold">x{item.quantity}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 active:scale-95 py-3 rounded-xl font-semibold transition-all touch-manipulation">
                  Mark as Ready
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  // REPORTS SCREEN
  if (screen === 'reports') {
    const todaySales = 2450.75;
    const todayOrders = 45;
    const averageCheck = todaySales / todayOrders;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4 md:p-6 select-none">
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-4 md:p-6 mb-4 md:mb-6 shadow-2xl">
          <div className="flex justify-between items-center">
            <h1 className="text-xl md:text-3xl font-bold flex items-center gap-2 md:gap-3">
              <TrendingUp className="w-6 h-6 md:w-8 md:h-8" />
              Sales Reports
            </h1>
            <button 
              onClick={() => setScreen('tables')} 
              className="bg-white/20 hover:bg-white/30 active:scale-95 px-4 md:px-6 py-2 md:py-3 rounded-xl font-semibold transition-all text-sm md:text-base touch-manipulation"
            >
              ← Back
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-4 md:p-6 shadow-2xl">
            <p className="text-emerald-100 text-xs md:text-sm mb-2">Today's Sales</p>
            <p className="text-3xl md:text-4xl font-bold">${todaySales.toFixed(2)}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-4 md:p-6 shadow-2xl">
            <p className="text-blue-100 text-xs md:text-sm mb-2">Total Orders</p>
            <p className="text-3xl md:text-4xl font-bold">{todayOrders}</p>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-4 md:p-6 shadow-2xl">
            <p className="text-orange-100 text-xs md:text-sm mb-2">Average Check</p>
            <p className="text-3xl md:text-4xl font-bold">${averageCheck.toFixed(2)}</p>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-2xl">
          <h2 className="text-lg md:text-xl font-bold mb-4">Top Selling Items</h2>
          <div className="space-y-3">
            {menuItems.slice(0, 5).map((item, idx) => (
              <div key={item.id} className="bg-slate-700/50 rounded-xl p-3 md:p-4 flex justify-between items-center">
                <div className="flex items-center gap-3 md:gap-4">
                  <span className="text-xl md:text-2xl font-bold text-slate-500">#{idx + 1}</span>
                  <span className="font-semibold text-sm md:text-base">{item.name}</span>
                </div>
                <span className="text-emerald-400 font-bold text-sm md:text-base">${item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // SETTINGS SCREEN
  if (screen === 'settings') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4 md:p-6 select-none">
        <div className="bg-gradient-to-r from-slate-600 to-slate-700 rounded-2xl p-4 md:p-6 mb-4 md:mb-6 shadow-2xl">
          <div className="flex justify-between items-center">
            <h1 className="text-xl md:text-3xl font-bold flex items-center gap-2 md:gap-3">
              <Settings className="w-6 h-6 md:w-8 md:h-8" />
              Settings
            </h1>
            <button 
              onClick={() => setScreen('tables')} 
              className="bg-white/20 hover:bg-white/30 active:scale-95 px-4 md:px-6 py-2 md:py-3 rounded-xl font-semibold transition-all text-sm md:text-base touch-manipulation"
            >
              ← Back
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-2xl">
            <h2 className="text-lg md:text-xl font-bold mb-4">Printer Settings</h2>
            <div className="space-y-3">
              <div className="bg-slate-700/50 rounded-xl p-3 md:p-4">
                <label className="block text-xs md:text-sm mb-2">Kitchen Printer</label>
                <select className="w-full bg-slate-600 rounded-lg px-3 md:px-4 py-2 md:py-3 text-sm md:text-base touch-manipulation">
                  <option>Printer 1</option>
                  <option>Printer 2</option>
                </select>
              </div>
              <div className="bg-slate-700/50 rounded-xl p-3 md:p-4">
                <label className="block text-xs md:text-sm mb-2">Receipt Printer</label>
                <select className="w-full bg-slate-600 rounded-lg px-3 md:px-4 py-2 md:py-3 text-sm md:text-base touch-manipulation">
                  <option>Printer 1</option>
                  <option>Printer 2</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-2xl">
            <h2 className="text-lg md:text-xl font-bold mb-4">Tax Settings</h2>
            <div className="space-y-3">
              <div className="bg-slate-700/50 rounded-xl p-3 md:p-4">
                <label className="block text-xs md:text-sm mb-2">Sales Tax (%)</label>
                <input 
                  type="number" 
                  defaultValue="8.5" 
                  className="w-full bg-slate-600 rounded-lg px-3 md:px-4 py-2 md:py-3 text-sm md:text-base touch-manipulation" 
                />
              </div>
              <div className="bg-slate-700/50 rounded-xl p-3 md:p-4">
                <label className="block text-xs md:text-sm mb-2">Service Charge (%)</label>
                <input 
                  type="number" 
                  defaultValue="15" 
                  className="w-full bg-slate-600 rounded-lg px-3 md:px-4 py-2 md:py-3 text-sm md:text-base touch-manipulation" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // PAYMENT SCREEN
  if (screen === 'payment') {
    const total = calculateTotal();
    const change = paymentMethod === 'cash' ? Math.max(0, parseFloat(cashAmount || '0') - total) : 0;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4 md:p-6 select-none">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-4 md:p-6 mb-4 md:mb-6 shadow-2xl">
            <div className="flex justify-between items-center">
              <h1 className="text-xl md:text-3xl font-bold">Payment</h1>
              <button 
                onClick={() => setScreen('order')} 
                className="bg-white/20 hover:bg-white/30 active:scale-95 px-4 md:px-6 py-2 md:py-3 rounded-xl font-semibold transition-all text-sm md:text-base touch-manipulation"
              >
                ← Back
              </button>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 mb-4 md:mb-6 shadow-2xl">
            <div className="text-center mb-6 md:mb-8">
              <p className="text-slate-400 text-sm md:text-lg mb-2">Total Amount</p>
              <p className="text-4xl md:text-6xl font-bold text-emerald-400">${total.toFixed(2)}</p>
            </div>

            <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
              <button
                onClick={() => setPaymentMethod('cash')}
                className={`p-4 md:p-6 rounded-2xl transition-all active:scale-95 touch-manipulation flex flex-col items-center gap-2 md:gap-3 ${
                  paymentMethod === 'cash'
                    ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/50'
                    : 'bg-slate-700/50'
                }`}
              >
                <Banknote className="w-8 h-8 md:w-12 md:h-12" />
                <span className="font-bold text-sm md:text-lg">Cash</span>
              </button>
              <button
                onClick={() => setPaymentMethod('card')}
                className={`p-4 md:p-6 rounded-2xl transition-all active:scale-95 touch-manipulation flex flex-col items-center gap-2 md:gap-3 ${
                  paymentMethod === 'card'
                    ? 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/50'
                    : 'bg-slate-700/50'
                }`}
              >
                <CreditCard className="w-8 h-8 md:w-12 md:h-12" />
                <span className="font-bold text-sm md:text-lg">Card</span>
              </button>
              <button
                onClick={() => setPaymentMethod('split')}
                className={`p-4 md:p-6 rounded-2xl transition-all active:scale-95 touch-manipulation flex flex-col items-center gap-2 md:gap-3 ${
                  paymentMethod === 'split'
                    ? 'bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-500/50'
                    : 'bg-slate-700/50'
                }`}
              >
                <Split className="w-8 h-8 md:w-12 md:h-12" />
                <span className="font-bold text-sm md:text-lg">Split</span>
              </button>
            </div>

            {paymentMethod === 'cash' && (
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-xs md:text-sm mb-2">Cash Received</label>
                  <input
                    type="number"
                    value={cashAmount}
                    onChange={(e) => setCashAmount(e.target.value)}
                    className="w-full bg-slate-700 rounded-xl px-4 md:px-6 py-3 md:py-4 text-xl md:text-2xl font-bold touch-manipulation"
                    placeholder="0.00"
                  />
                </div>
                {change > 0 && (
                  <div className="bg-emerald-500/20 border-2 border-emerald-500 rounded-xl p-4">
                    <p className="text-xs md:text-sm text-emerald-400 mb-1">Change</p>
                    <p className="text-2xl md:text-3xl font-bold text-emerald-400">${change.toFixed(2)}</p>
                  </div>
                )}
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="bg-blue-500/20 border-2 border-blue-500 rounded-xl p-6 mb-6 text-center">
                <CreditCard className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 text-blue-400" />
                <p className="text-lg md:text-xl font-bold">Insert or Tap Card</p>
              </div>
            )}

            {paymentMethod === 'split' && (
              <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6">
                <div>
                  <label className="block text-xs md:text-sm mb-2">Cash Amount</label>
                  <input
                    type="number"
                    value={cashAmount}
                    onChange={(e) => setCashAmount(e.target.value)}
                    className="w-full bg-slate-700 rounded-xl px-3 md:px-4 py-2 md:py-3 text-base md:text-lg font-bold touch-manipulation"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm mb-2">Card Amount</label>
                  <input
                    type="number"
                    value={cardAmount}
                    onChange={(e) => setCardAmount(e.target.value)}
                    className="w-full bg-slate-700 rounded-xl px-3 md:px-4 py-2 md:py-3 text-base md:text-lg font-bold touch-manipulation"
                    placeholder="0.00"
                  />
                </div>
              </div>
            )}

            <button
              onClick={() => {
                alert('✅ Payment completed successfully!');
                setOrderItems([]);
                setScreen('tables');
                setSelectedTable(null);
              }}
              className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 active:scale-95 py-3 md:py-4 rounded-xl font-bold text-lg md:text-xl transition-all touch-manipulation"
            >
              Complete Payment
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ORDER SCREEN
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-2 md:p-4 select-none">
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-2 md:gap-4 h-screen">
        {/* Left Panel - Order */}
        <div className="lg:col-span-4 bg-slate-800/50 backdrop-blur-sm rounded-2xl p-3 md:p-4 flex flex-col shadow-2xl">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-slate-400">Table</p>
              <p className="text-xl font-bold">{selectedTable ? selectedTable.id : '—'}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-sm text-slate-400">Guests</div>
              <div className="bg-white/10 px-3 py-1 rounded-lg">{guestCount}</div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 mb-3">
            {orderItems.length === 0 ? (
              <div className="text-center text-slate-400 py-8">
                <p className="mb-2">No items yet</p>
                <p className="text-xs">Select items from the right to add to the order</p>
              </div>
            ) : (
              orderItems.map(item => (
                <div key={item.id} className="bg-slate-700/40 rounded-xl p-3 flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-sm text-slate-400">${item.price.toFixed(2)}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity(item.id, -1)} className="p-2 bg-white/5 rounded-lg active:scale-95">
                      <Minus className="w-4 h-4" />
                    </button>
                    <div className="px-3 font-bold">{item.quantity}</div>
                    <button onClick={() => updateQuantity(item.id, 1)} className="p-2 bg-white/5 rounded-lg active:scale-95">
                      <Plus className="w-4 h-4" />
                    </button>
                    <button onClick={() => removeItem(item.id)} className="p-2 ml-2 bg-red-600/30 rounded-lg active:scale-95">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-400">Subtotal</div>
              <div className="font-bold">${calculateSubtotal().toFixed(2)}</div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                value={globalDiscount}
                onChange={(e) => setGlobalDiscount(parseFloat(e.target.value || '0'))}
                className="w-1/3 bg-slate-700 rounded-xl px-3 py-2 text-sm"
                placeholder="Discount %"
              />
              <div className="flex-1 text-right text-sm text-slate-400">Total</div>
              <div className="w-32 text-right font-bold">${calculateTotal().toFixed(2)}</div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button onClick={sendToKitchen} className="bg-gradient-to-r from-amber-500 to-amber-600 py-2 rounded-xl font-semibold">Send to Kitchen</button>
              <button onClick={() => setScreen('payment')} className="bg-gradient-to-r from-emerald-500 to-emerald-600 py-2 rounded-xl font-semibold">Payment</button>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => setShowTransfer(!showTransfer)} className="flex-1 bg-slate-700/40 py-2 rounded-xl">Transfer</button>
              <button onClick={() => { setOrderItems([]); }} className="w-12 bg-red-600/40 py-2 rounded-xl"><X className="w-4 h-4 mx-auto" /></button>
            </div>
          </div>
        </div>

        {/* Right Panel - Menu & Categories */}
        <div className="lg:col-span-8 flex flex-col gap-3">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-3 md:p-4 flex items-center gap-3">
            <div className="flex-1 overflow-x-auto">
              <div className="flex gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-2 rounded-full text-sm ${activeCategory === cat ? 'bg-gradient-to-br from-blue-500 to-blue-600' : 'bg-white/5'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => { navigator.clipboard?.writeText(JSON.stringify(orderItems, null, 2)); }} className="bg-white/5 p-2 rounded-lg"><Printer className="w-4 h-4" /></button>
              <button onClick={() => setOrderItems([])} className="bg-red-600/25 p-2 rounded-lg"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 overflow-auto">
            {filteredMenuItems.map(item => (
              <div key={item.id} className="bg-slate-800/40 rounded-2xl p-3 flex flex-col justify-between">
                <div>
                  <div className="font-semibold mb-1">{item.name}</div>
                  <div className="text-sm text-slate-400">${item.price.toFixed(2)}</div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <button onClick={() => addToOrder(item)} className="bg-gradient-to-br from-blue-500 to-blue-600 px-3 py-2 rounded-xl font-semibold flex items-center gap-2"><Plus className="w-4 h-4" /> Add</button>
                  <div className="text-xs text-slate-400">{item.category}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

};

export default ModernRestaurantPOS;