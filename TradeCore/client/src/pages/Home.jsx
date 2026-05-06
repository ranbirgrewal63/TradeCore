import React, { useEffect, useState } from "react";
import api from "../api";
import { useCart } from "./CartContext";
import '../App.css';
function Home() {
  const [products, setProducts] = useState([]);
  const { state, dispatch } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get("/api/products");
        setProducts(data);
      } catch (err) {
        console.log("Error loading products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>🛍 Products</h2>

      {products.map((p) => {
        const stock = Number(p.countInStock ?? p.stock ?? 0);

        const cartItem = state.items.find(
          (i) => i._id === p._id
        );

        const cartQty = cartItem ? cartItem.quantity : 0;

        const isOut = stock <= 0;
        const maxed = cartQty >= stock && stock > 0;

        return (
          <div
            key={p._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              margin: 10,
              padding: 15,
              maxWidth: 320,
            }}
          >
            {/* NAME */}
            <h3>{p.name}</h3>

            {/* PRICE */}
            <p>💰 ${p.price}</p>

            {/* STOCK STATUS */}
            <p
              style={{
                color: isOut
                  ? "red"
                  : stock <= 3
                  ? "orange"
                  : "green",
                fontWeight: "bold",
              }}
            >
              {isOut
                ? "❌ Out of Stock"
                : stock <= 3
                ? `Only ${stock} left 🔥`
                : `In Stock (${stock})`}
            </p>

            {/* CART STATUS */}
            {cartQty > 0 && (
              <p style={{ fontSize: 12 }}>
                In Cart: {cartQty}
              </p>
            )}

            {/* BUTTON */}
            <button
              disabled={isOut || maxed}
              onClick={() => {
                if (!isOut && !maxed) {
                  dispatch({
                    type: "ADD_ITEM",
                    payload: p,
                  });
                }
              }}
              style={{
                marginTop: 10,
                padding: "10px 14px",
                width: "100%",
                backgroundColor:
                  isOut || maxed ? "#ccc" : "#000",
                color:
                  isOut || maxed ? "#777" : "#fff",
                border: "none",
                borderRadius: "6px",
                cursor:
                  isOut || maxed
                    ? "not-allowed"
                    : "pointer",
                fontWeight: "bold",
                opacity: isOut || maxed ? 0.5 : 1,
              }}
            >
              {isOut
                ? "Out of Stock"
                : maxed
                ? "Max Added"
                : "Add to Cart"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Home;