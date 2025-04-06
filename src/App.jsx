// import React from "react";
// import HomePage from "./Pages/HomePage";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./Components/Navbar";
// import Auth from "./utils/Auth";
// import Lessons from "./Pages/Lessons";
// import Dashboard from "./Pages/Dashboard";

// export default function App() {
//   return (
//     <>
//       <Router>
//         <Navbar />
//         <Routes>
//           <Route path="/login" element={<Auth />} />
//           <Route path="/" element={<HomePage />} />
//           <Route path="/lessons" element={<Lessons />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//         </Routes>
//       </Router>
//     </>
//   );
// }

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Login from "./utils/Login"; // Renamed from Auth.js
import Signup from "./utils/Signup";
import HomePage from "./Pages/HomePage";
import Lessons from "./Pages/Lessons";
import Dashboard from "./Pages/Dashboard";
import ProtectedRoute from "./utils/ProtectedRoute"; // Updated import path

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<HomePage />} />

        {/* Protected Routes */}
        <Route
          path="/lessons"
          element={
            <ProtectedRoute>
              <Lessons />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
