// import React, { useState } from "react";
// import { auth, db } from "../firebase";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";

// const Signup = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [age, setAge] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();

//     // Basic validation
//     if (!name || !age || !email || !password) {
//       setError("All fields are required");
//       return;
//     }
//     if (isNaN(age)) {
//       setError("Age must be a number");
//       return;
//     }

//     try {
//       // Create user in Firebase Auth
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const user = userCredential.user;

//       // Save additional details to Firestore
//       await setDoc(doc(db, "users", user.uid), {
//         name,
//         age: parseInt(age),
//         email,
//         createdAt: new Date(),
//       });

//       navigate("/"); // Redirect to home
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
//       {error && <p className="text-red-500 mb-4">{error}</p>}
//       <form onSubmit={handleSignup}>
//         <input
//           type="text"
//           placeholder="Full Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="w-full p-3 mb-4 border rounded"
//         />
//         <input
//           type="number"
//           placeholder="Age"
//           value={age}
//           onChange={(e) => setAge(e.target.value)}
//           className="w-full p-3 mb-4 border rounded"
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full p-3 mb-4 border rounded"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full p-3 mb-4 border rounded"
//         />
//         <button
//           type="submit"
//           className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600"
//         >
//           Create Account
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Signup;

import React, { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [street, setStreet] = useState(""); // New
  const [city, setCity] = useState(""); // New
  const [state, setState] = useState(""); // New
  const [country, setCountry] = useState(""); // New
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Validation
    if (!name || !age || !email || !password || !street || !city || !country) {
      setError("All fields are required");
      return;
    }

    try {
      // Create user in Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Save to Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        age: parseInt(age),
        email,
        street,
        city,
        state,
        country,
        createdAt: new Date(),
      });

      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
        />
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
        {/* Address Fields */}
        <input
          type="text"
          placeholder="Street Address"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
        />
        <div className="flex space-x-4 mb-4">
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-1/2 p-3 border rounded"
          />
          <input
            type="text"
            placeholder="State/Province"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-1/2 p-3 border rounded"
          />
        </div>
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Signup;
