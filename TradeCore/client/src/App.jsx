import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CartDisplay from "./pages/CartDisplay";
import Success from "./pages/Success";
function App() {
  return (
    <div>
      {/* NAVBAR */}
      <div style={{ padding: 10, borderBottom: "1px solid #ccc" }}>
        <Link to="/">Home</Link> |{" "}
        <Link to="/cart">Cart</Link>
      </div>

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartDisplay />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </div>
  );
}

export default App;