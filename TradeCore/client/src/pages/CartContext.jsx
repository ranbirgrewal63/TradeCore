import React, { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const initialState = {
  items: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const exist = state.items.find(
        (i) => i._id === action.payload._id
      );

      if (exist) {
        return {
          items: state.items.map((i) =>
            i._id === exist._id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }

      return {
        items: [
          ...state.items,
          { ...action.payload, quantity: 1 },
        ],
      };
    }

    case "DECREASE_ITEM":
      return {
        items: state.items
          .map((i) =>
            i._id === action.payload._id
              ? { ...i, quantity: i.quantity - 1 }
              : i
          )
          .filter((i) => i.quantity > 0),
      };

    case "REMOVE_ITEM":
      return {
        items: state.items.filter(
          (i) => i._id !== action.payload._id
        ),
      };

    case "CLEAR_CART":
      return { items: [] };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);