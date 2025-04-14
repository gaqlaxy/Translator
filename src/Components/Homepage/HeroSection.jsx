// import React, { useEffect, useRef } from "react";
// import { gsap } from "gsap";

// function HeroSection() {
//   const heroRef = useRef(null);
//   const headlineRef = useRef(null);
//   const subheadingRef = useRef(null);
//   const buttonRef = useRef(null);

//   useEffect(() => {
//     // Timeline for a smoother, staggered animation
//     const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

//     // Animate the entire section from top
//     tl
//       // Stagger individual elements for a dynamic entry
//       .from(headlineRef.current, { opacity: 1, y: 20 }, "-=0.5")
//       .from(subheadingRef.current, { opacity: 1, y: 20 }, "-=0.5")
//       .from(buttonRef.current, { opacity: 1, scale: 0.8 }, "-=0.5");
//   }, []);
//   return (
//     <div className="">
//       {/* <section
//         ref={heroRef}
//         className="flex flex-col justify-center items-center text-center bg-gradient-to-r from-indigo-500 to-purple-500 h-screen px-4"
//       >
//         <h1
//           ref={headlineRef}
//           className="text-5xl md:text-7xl font-bold text-white mb-6"
//         >
//           Welcome to Hindimebolo
//         </h1>
//         <p ref={subheadingRef} className="text-xl text-white mb-8">
//           Learn Hindi in a fun and interactive way.
//         </p>
//         <button
//           ref={buttonRef}
//           className="bg-white text-indigo-500 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition duration-300"
//         >
//           Get Started
//         </button>
//       </section> */}
//       <section
//         ref={heroRef}
//         className="flex flex-col justify-center items-center text-center bg-gradient-to-r from-indigo-500 to-purple-500 h-screen px-4"
//       >
//         <h1
//           ref={headlineRef}
//           className="text-5xl md:text-7xl font-bold text-white mb-6"
//         >
//           Welcome to Hindimebolo
//         </h1>
//         <p ref={subheadingRef} className="text-xl text-white mb-8">
//           Learn Hindi in a fun and interactive way.
//         </p>
//         <button
//           ref={buttonRef}
//           className="bg-white text-indigo-500 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition duration-300"
//         >
//           Get Started
//         </button>
//       </section>
//     </div>
//   );
// }

// export default HeroSection;

import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";

const HeroSection = () => {
  // Create a ref for the component container.
  const comp = useRef();

  // useLayoutEffect ensures that the animations run after DOM mutations are complete.
  useLayoutEffect(() => {
    // gsap.context makes it easy to scope animations to this component.
    const ctx = gsap.context(() => {
      // Animating elements by selecting them with CSS classes.
      gsap.from(".hero-title", { opacity: 0, y: 20, duration: 1 });
      gsap.from(".hero-subtitle", {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.2,
      });
      gsap.from(".hero-button", {
        opacity: 1,
        scale: 0.8,
        duration: 1,
        delay: 0.2,
      });
    }, comp);

    // Cleanup function to revert the animations when the component unmounts.
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={comp}
      className="flex flex-col justify-center items-center text-center bg-gradient-to-r from-indigo-500 to-purple-500 h-screen px-4"
    >
      <h1 className="hero-title text-5xl md:text-7xl font-bold text-white mb-6">
        Welcome to Hindimebolo
      </h1>
      <p className="hero-subtitle text-xl text-white mb-8">
        Learn Hindi in a fun and interactive way.
      </p>
      <button className="hero-button bg-white text-indigo-500 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition duration-300">
        Get Started
      </button>
    </section>
  );
};

export default HeroSection;
