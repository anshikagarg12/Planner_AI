import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SavedPlansPage from "./pages/SavedPlansPage";

function App() {
  return (
    <Router>
      <div className="bg-gray-50 min-h-screen text-gray-800">

        {/* NAVBAR */}
        <nav className="bg-purple-700 text-white px-8 py-4 shadow-md flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-wide">Planner_AI</h1>

          <div className="space-x-6 text-lg">
            <Link to="/" className="hover:text-gray-200 transition">Home</Link>
            <Link to="/saved" className="hover:text-gray-200 transition">Saved Plans</Link>
          </div>
        </nav>

        {/* PAGE CONTENT */}
        <div className="p-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/saved" element={<SavedPlansPage />} />
          </Routes>
        </div>

      </div>
    </Router>
  );
}

export default App;
