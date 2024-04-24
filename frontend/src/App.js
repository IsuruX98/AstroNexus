import React from "react";
import Layout from "./layout/Layout";
import { AuthProvider } from "./context/authContext";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Layout />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
