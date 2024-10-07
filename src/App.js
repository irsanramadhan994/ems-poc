// src/App.js
import React, { Suspense } from "react";

import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AppRoutes from "./routes";

const App = () => {
  return (
    <Suspense fallback={"....Loading"}>
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
