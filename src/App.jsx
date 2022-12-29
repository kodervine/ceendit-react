import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InvoiceApp from "./pages/InvoiceApp";
import FormPreview from "./pages/FormPreview";

function App() {
  return (
    <Router>
      <InvoiceApp />
      <Routes>
        {/* <Route exact path="/" component={InvoiceApp} /> */}
        <Route path="/form-preview" component={FormPreview} />
      </Routes>
    </Router>
    // <div className="App">
    //
    // </div>
  );
}

export default App;
