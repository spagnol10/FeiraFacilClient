// src/context/CartContext.tsx
import React, { createContext, useContext, useState } from "react";

interface CartContextData {
  total: number;
  setTotal: (value: number) => void;
}

const CartContext = createContext<CartContextData | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [total, setTotal] = useState(0);

  return (
    <CartContext.Provider value={{ total, setTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};


// import React, { createContext, useContext, useState } from "react";

// const CartContext = createContext({
//   total: 0,
//   setTotal: (value: number) => {},
// });

// export const CartProvider = ({ children }: { children: React.ReactNode }) => {
//   const [total, setTotal] = useState(0);

//   return (
//     <CartContext.Provider value={{ total, setTotal }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);

