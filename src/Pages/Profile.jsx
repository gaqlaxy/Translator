// import React, { useEffect, useState } from "react";
// import { auth, db } from "../firebase";
// import { doc, getDoc, updateDoc } from "firebase/firestore";
// import {
//   updatePassword,
//   reauthenticateWithCredential,
//   EmailAuthProvider,
// } from "firebase/auth";

// const Profile = () => {
//   const [userDoc, setUserDoc] = useState(null);
//   const [name, setName] = useState("");
//   const [age, setAge] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // FORCHANGING PASSWORD

//   // const [newPassword, setNewPassword] = useState("");
//   // const [confirmPassword, setConfirmPassword] = useState("");

//   // const handleChangePassword = async () => {
//   //   if (newPassword !== confirmPassword) {
//   //     setError("Passwords do not match");
//   //     return;
//   //   }

//   //   try {
//   //     // Reauthenticate user (required for security)
//   //     const credential = EmailAuthProvider.credential(
//   //       auth.currentUser.email,
//   //       window.prompt("Enter your current password:")
//   //     );
//   //     await reauthenticateWithCredential(auth.currentUser, credential);

//   //     // Update password
//   //     await updatePassword(auth.currentUser, newPassword);
//   //     alert("Password updated!");
//   //   } catch (err) {
//   //     setError(err.message);
//   //   }
//   // };

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const userRef = doc(db, "users", auth.currentUser.uid);
//         const userSnapshot = await getDoc(userRef);

//         if (!userSnapshot.exists()) {
//           throw new Error("User data not found");
//         }

//         setUserDoc(userSnapshot.data());
//         setName(userSnapshot.data().name);
//         setAge(userSnapshot.data().age.toString());
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleUpdate = async () => {
//     try {
//       setLoading(true);
//       const userRef = doc(db, "users", auth.currentUser.uid);

//       await updateDoc(userRef, {
//         name,
//         age: parseInt(age),
//       });

//       alert("Profile updated successfully!");
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <div className="text-center mt-10">Loading...</div>;
//   if (error)
//     return <div className="text-red-500 text-center mt-10">{error}</div>;

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
//       <input
//         type="text"
//         placeholder="Full Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         className="w-full p-3 mb-4 border rounded"
//       />
//       <input
//         type="number"
//         placeholder="Age"
//         value={age}
//         onChange={(e) => setAge(e.target.value)}
//         className="w-full p-3 mb-4 border rounded"
//       />
//       <button
//         onClick={handleUpdate}
//         disabled={loading}
//         className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 disabled:opacity-50"
//       >
//         {loading ? "Saving..." : "Save Changes"}
//       </button>

//       {/* FOR CHANGING PASSWORD  */}
//       {/* <input
//         type="password"
//         placeholder="New Password"
//         value={newPassword}
//         onChange={(e) => setNewPassword(e.target.value)}
//         className="w-full p-3 mb-4 border rounded"
//       />
//       <input
//         type="password"
//         placeholder="Confirm New Password"
//         value={confirmPassword}
//         onChange={(e) => setConfirmPassword(e.target.value)}
//         className="w-full p-3 mb-4 border rounded"
//       />
//       <button
//         onClick={handleChangePassword}
//         className="w-full bg-purple-500 text-white p-3 rounded hover:bg-purple-600"
//       >
//         Change Password
//       </button> */}
//     </div>
//   );
// };

// export default Profile;

import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const Profile = () => {
  const [userDoc, setUserDoc] = useState(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [street, setStreet] = useState(""); // New
  const [city, setCity] = useState(""); // New
  const [state, setState] = useState(""); // New
  const [country, setCountry] = useState(""); // New
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userSnapshot = await getDoc(userRef);

        if (!userSnapshot.exists()) {
          throw new Error("User data not found");
        }

        setUserDoc(userSnapshot.data());
        setName(userSnapshot.data().name);
        setAge(userSnapshot.data().age.toString());
        setStreet(userSnapshot.data().street || ""); // Handle missing data
        setCity(userSnapshot.data().city || "");
        setState(userSnapshot.data().state || "");
        setCountry(userSnapshot.data().country || "");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const userRef = doc(db, "users", auth.currentUser.uid);

      await updateDoc(userRef, {
        name,
        age: parseInt(age),
        street,
        city,
        state,
        country,
      });

      alert("Profile updated successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return <div className="text-red-500 text-center mt-10">{error}</div>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
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
        onClick={handleUpdate}
        disabled={loading}
        className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
};

export default Profile;
