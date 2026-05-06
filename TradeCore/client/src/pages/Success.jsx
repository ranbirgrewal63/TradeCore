import React from "react";
import { Link } from "react-router-dom";

function Success() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "15px",
          textAlign: "center",
          maxWidth: "500px",
          width: "100%",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        }}
      >
        {/* Success Icon */}
        <div
          style={{
            fontSize: "80px",
            marginBottom: "20px",
          }}
        >
          🎉
        </div>

        {/* Heading */}
        <h1
          style={{
            fontSize: "36px",
            marginBottom: "15px",
            color: "#222",
          }}
        >
          Payment Successful!
        </h1>

        {/* Message */}
        <p
          style={{
            fontSize: "18px",
            color: "#555",
            marginBottom: "10px",
          }}
        >
          Thank you for shopping with TradeCore.
        </p>

        <p
          style={{
            fontSize: "16px",
            color: "#777",
            marginBottom: "30px",
          }}
        >
          Your order has been placed successfully.
        </p>

        {/* Continue Shopping Button */}
        <Link to="/">
          <button
            style={{
              padding: "12px 24px",
              fontSize: "16px",
              backgroundColor: "#000",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Success;