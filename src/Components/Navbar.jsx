// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { auth } from "../firebase";
// import { signOut, onAuthStateChanged } from "firebase/auth";

// const Navbar = () => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Listen for auth state changes
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setCurrentUser(user);
//     });
//     return () => unsubscribe(); // Cleanup listener on unmount
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       navigate("/login");
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   return (
//     <nav className="bg-blue-600 p-4">
//       <div className="max-w-6xl mx-auto flex justify-between items-center">
//         {/* Logo/Brand */}
//         <Link to="/" className="text-white text-2xl font-bold">
//           Hindimebolo
//         </Link>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex space-x-6 items-center">
//           {currentUser ? (
//             <>
//               <Link to="/lessons" className="text-white hover:text-gray-200">
//                 Lessons
//               </Link>
//               <Link to="/dashboard" className="text-white hover:text-gray-200">
//                 Dashboard
//               </Link>
//               <button
//                 onClick={handleLogout}
//                 className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <Link to="/login" className="text-white hover:text-gray-200">
//                 Login
//               </Link>
//               <Link
//                 to="/signup"
//                 className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
//               >
//                 Sign Up
//               </Link>
//             </>
//           )}
//         </div>

//         {/* Mobile Menu (Hamburger) */}
//         <div className="md:hidden flex items-center">
//           <button
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             className="text-white focus:outline-none"
//           >
//             ☰
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu Dropdown */}
//       {mobileMenuOpen && (
//         <div className="md:hidden mt-4 bg-blue-500 p-4 space-y-4">
//           {currentUser ? (
//             <>
//               <Link
//                 to="/lessons"
//                 className="block text-white hover:text-gray-200"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 Lessons
//               </Link>
//               <Link
//                 to="/dashboard"
//                 className="block text-white hover:text-gray-200"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 Dashboard
//               </Link>
//               <button
//                 onClick={handleLogout}
//                 className="w-full bg-red-500 px-4 py-2 rounded hover:bg-red-600"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <Link
//                 to="/login"
//                 className="block text-white hover:text-gray-200"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 Login
//               </Link>
//               <Link
//                 to="/signup"
//                 className="block bg-green-500 px-4 py-2 rounded hover:bg-green-600"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 Sign Up
//               </Link>
//             </>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userDoc, setUserDoc] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, async (user) => {
  //     if (user) {
  //       setCurrentUser(user);
  //       // Fetch user details from Firestore
  //       const userRef = doc(db, "users", user.uid);
  //       const userSnapshot = await getDoc(userRef);
  //       setUserDoc(userSnapshot.data());
  //     } else {
  //       setCurrentUser(null);
  //       setUserDoc(null);
  //     }
  //   });
  //   return () => unsubscribe();
  // }, []);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        try {
          const userRef = doc(db, "users", user.uid);
          const userSnapshot = await getDoc(userRef);
          setUserDoc(userSnapshot.data());
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setCurrentUser(null);
        setUserDoc(null);
      }
      setLoading(false); // Mark loading as done
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="bg-blue-600 p-4">Loading...</div>;
  }
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo/Brand */}
        <Link to="/" className="text-white text-2xl font-bold">
          Hindimebolo
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          {currentUser ? (
            <>
              <Link to="/lessons" className="text-white hover:text-gray-200">
                Lessons
              </Link>
              <Link to="/dashboard" className="text-white hover:text-gray-200">
                Dashboard
              </Link>
              <Link to="/profile" className="text-white hover:text-gray-200">
                Profile
              </Link>
              <span className="text-white">
                Hello, {userDoc?.name || "User"}!
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-gray-200">
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu (Hamburger) */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white focus:outline-none"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 bg-blue-500 p-4 space-y-4">
          {currentUser ? (
            <>
              <Link
                to="/lessons"
                className="block text-white hover:text-gray-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Lessons
              </Link>
              <Link
                to="/dashboard"
                className="block text-white hover:text-gray-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block text-white hover:text-gray-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block bg-green-500 px-4 py-2 rounded hover:bg-green-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
