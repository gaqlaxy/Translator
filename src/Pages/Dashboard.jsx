import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const Dashboard = () => {
  const [userDoc, setUserDoc] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userRef = doc(db, "users", auth.currentUser.uid);
      const userSnapshot = await getDoc(userRef);
      setUserDoc(userSnapshot.data());
    };
    fetchUserData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      {userDoc ? (
        <>
          <p className="mb-4">
            <strong>Name:</strong> {userDoc.name}
          </p>
          <p className="mb-4">
            <strong>Age:</strong> {userDoc.age}
          </p>
          <p className="mb-4">
            <strong>Email:</strong> {userDoc.email}
          </p>
          <p className="mb-4">
            <strong>Member Since:</strong>{" "}
            {new Date(userDoc.createdAt.seconds * 1000).toLocaleDateString()}
          </p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
