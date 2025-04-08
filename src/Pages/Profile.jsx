import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const Profile = () => {
  const [userDoc, setUserDoc] = useState(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const userRef = doc(db, "users", auth.currentUser.uid);
      const userSnapshot = await getDoc(userRef);
      setUserDoc(userSnapshot.data());
      setName(userSnapshot.data().name);
      setAge(userSnapshot.data().age.toString());
    };
    fetchUserData();
  }, []);

  const handleUpdate = async () => {
    try {
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, {
        name,
        age: parseInt(age),
      });
      alert("Profile updated!");
    } catch (error) {
      alert(error.message);
    }
  };

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
      <button
        onClick={handleUpdate}
        className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
      >
        Save Changes
      </button>
    </div>
  );
};

export default Profile;
