import { create } from 'zustand';

// Type definitions for order items and state
export interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
}

export interface OrderItem {
  id: number;
  name: string;
  price: number;
}

interface OrderState {
  currentTable: string | null;
  setCurrentTable: (table: string | null) => void;
  orderItems: OrderItem[];
  addItem: (item: OrderItem) => void;
  clearOrder: () => void;
}

// Zustand store for managing the current table and its order
export const useOrderStore = create<OrderState>((set) => ({
  currentTable: null,
  setCurrentTable: (table) => set({ currentTable: table }),
  orderItems: [],
  addItem: (item) =>
    set((state) => ({ orderItems: [...state.orderItems, item] })),
  clearOrder: () => set({ orderItems: [] }),
}));