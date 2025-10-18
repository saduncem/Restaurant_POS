import React, { useState } from 'react';
import { TableLayout } from './components/TableLayout';
import { OrderScreen } from './components/OrderScreen';
import ModernRestaurantPOS from './components/ModernRestaurantPOS';

// Root App component which switches between the table layout and order screen.
const App: React.FC = () => {
  const [showOrderScreen, setShowOrderScreen] = useState(false);

  return (
    <div className="min-h-screen flex items-start justify-center p-6">
      
         <ModernRestaurantPOS />
      
    </div>
  );
};

export default App;