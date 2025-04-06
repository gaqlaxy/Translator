// import React, { useState } from "react";
// import { auth } from "../firebase";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
// } from "firebase/auth";

// function Auth() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const signUp = async () => {
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//       alert("Account created!");
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   const signIn = async () => {
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       alert("Logged in!");
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         className="w-full p-3 mb-4 border rounded"
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         className="w-full p-3 mb-4 border rounded"
//       />
//       <button
//         onClick={signUp}
//         className="w-full bg-blue-500 text-white p-3 rounded mb-4"
//       >
//         Sign Up
//       </button>
//       <button
//         onClick={signIn}
//         className="w-full bg-green-500 text-white p-3 rounded"
//       >
//         Login
//       </button>
//     </div>
//   );
// }

// export default Auth;

import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // Redirect to home after login
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 mb-4 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 mb-4 border rounded"
      />
      <button
        onClick={handleLogin}
        className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
      >
        Login
      </button>
    </div>
  );
};

export default Login;
