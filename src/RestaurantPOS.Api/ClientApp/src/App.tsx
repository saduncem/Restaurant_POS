import React, { useState } from 'react';
import { TableLayout } from './components/TableLayout';
import { OrderScreen } from './components/OrderScreen';

// Root App component which switches between the table layout and order screen.
const App: React.FC = () => {
  const [showOrderScreen, setShowOrderScreen] = useState(false);

  return (
    <div className="min-h-screen flex items-start justify-center p-6">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl p-6">
        {showOrderScreen ? (
          <OrderScreen onBack={() => setShowOrderScreen(false)} />
        ) : (
          <TableLayout onSelect={() => setShowOrderScreen(true)} />
        )}
      </div>
    </div>
  );
};

export default App;