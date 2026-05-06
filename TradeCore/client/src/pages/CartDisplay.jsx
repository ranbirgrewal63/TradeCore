import React from "react";
import api from "../api";
import { useCart } from "./CartContext";

function CartDisplay() {
  const { state, dispatch } = useCart();

  // 💰 TOTAL
  const total = state.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const checkout = async () => {
    try {
      const { data } = await api.post(
        "/api/payment/create-checkout-session",
        {
          cartItems: state.items,
        }
      );

      window.location.href = data.url;
    } catch (err) {
      console.log(err);
      alert("Checkout failed");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🛒 Cart</h2>

      {state.items.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {state.items.map((item) => (
            <div
              key={item._id}
              style={{
                border: "1px solid #ccc",
                margin: 10,
                padding: 10,
                borderRadius: 8,
              }}
            >
              <h3>{item.name}</h3>
              <p>${item.price}</p>
              <p>Qty: {item.quantity}</p>

              <button
                onClick={() =>
                  dispatch({ type: "ADD_ITEM", payload: item })
                }
              >
                +
              </button>

              <button
                onClick={() =>
                  dispatch({
                    type: "DECREASE_ITEM",
                    payload: item,
                  })
                }
              >
                -
              </button>

              <button
                onClick={() =>
                  dispatch({
                    type: "REMOVE_ITEM",
                    payload: item,
                  })
                }
                style={{ marginLeft: 10 }}
              >
                Remove
              </button>
            </div>
          ))}

          {/* 💰 TOTAL */}
          <h3>💰 Total: ${total.toFixed(2)}</h3>

          {/* 💳 CHECKOUT */}
          <button
            onClick={checkout}
            style={{
              marginTop: 10,
              padding: "10px 15px",
              background: "black",
              color: "white",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              marginRight: 10,
            }}
          >
            Checkout 💳
          </button>

          {/* 🗑 CLEAR CART */}
          <button
            onClick={() => {
              if (window.confirm("Clear entire cart?")) {
                dispatch({ type: "CLEAR_CART" });
              }
            }}
            style={{
              marginTop: 10,
              padding: "10px 15px",
              background: "red",
              color: "white",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            Clear Cart 🗑
          </button>
        </>
      )}
    </div>
  );
}

export default CartDisplay;