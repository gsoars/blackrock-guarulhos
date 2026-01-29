import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ProductPage from "./views/Product/Product";

import BootLoader from "./components/BootLoader";

export default function App() {
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    // Garante pelo menos 1 frame renderizado + um tempinho de “loading”
    const raf = requestAnimationFrame(() => {
      const t = window.setTimeout(() => setBooting(false), 450);
      return () => window.clearTimeout(t);
    });

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      <BootLoader visible={booting} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/produto/:family" element={<ProductPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
