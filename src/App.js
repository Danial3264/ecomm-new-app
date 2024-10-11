import * as React from "react";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import Shop from "./pages/Shop";
import Thanks from "./pages/Thanks";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/Thanks" element={<Thanks />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
