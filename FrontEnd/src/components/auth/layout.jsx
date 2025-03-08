

// import { Outlet } from "react-router-dom";
// import { motion } from "framer-motion";

// function AuthLayout() {
//   return (
//     <motion.div
//       className="flex min-h-screen w-full bg-gray-100"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.8 }}
//     >
//       {/* Left panel with sliding animation */}
//       <motion.div
//         className="hidden lg:flex items-center justify-center bg-black w-1/2 px-12 py-8"
//         initial={{ x: "-100%" }}
//         animate={{ x: 0 }}
//         transition={{ type: "spring", stiffness: 80, damping: 10 }}
//       >
//         {/* Card container for text */}
//         <motion.div
//           className="max-w-md p-6 bg-gray-800 text-white rounded-2xl shadow-lg space-y-6 text-center"
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//         >
//           <h1 className="text-4xl font-extrabold tracking-tight">
//             Gadget Grid
//           </h1>
//           <p className="text-lg">Your go-to store for amazing gadgets!</p>
//         </motion.div>
//       </motion.div>

//       {/* Right panel */}
//       <motion.div
//         className="flex flex-1 items-center justify-center bg-white px-4 py-12 sm:px-6 lg:px-8"
//         initial={{ x: "100%" }}
//         animate={{ x: 0 }}
//         transition={{ type: "spring", stiffness: 80, damping: 10 }}
//       >
//         <Outlet />
//       </motion.div>
//     </motion.div>
//   );
// }

// export default AuthLayout;


// import { Outlet } from "react-router-dom";
// import { motion } from "framer-motion";
// import FloatingShape from "../../components/shopping-view/floating-shape"; // Import the FloatingShape component

// function AuthLayout() {
//   return (
//     <motion.div
//       className="min-h-screen bg-gradient-to-br from-orange-200 via-rose-300 to-pink-400 flex items-center justify-center relative overflow-hidden"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.8 }}
//     >
//       {/* Floating Shapes */}
//       <FloatingShape color='bg-orange-300' size='w-64 h-64' top='-5%' left='10%' delay={0} />
//       <FloatingShape color='bg-rose-400' size='w-48 h-48' top='70%' left='80%' delay={5} />
//       <FloatingShape color='bg-pink-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />

//       {/* Left Panel with Website Name and Description */}
//       <motion.div
//         className="hidden lg:flex items-center justify-center w-1/2 px-12 py-8"
//         initial={{ x: "-100%" }}
//         animate={{ x: 0 }}
//         transition={{ type: "spring", stiffness: 80, damping: 10 }}
//       >
//         {/* Card container for text */}
//         <motion.div
//           className="max-w-md p-6 bg-rose-500 text-white rounded-2xl shadow-lg space-y-6 text-center"
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//         >
//           <h1 className="text-4xl font-extrabold tracking-tight">
//             Gadget Grid
//           </h1>
//           <p className="text-lg">Your go-to store for amazing gadgets!</p>
//         </motion.div>
//       </motion.div>

//       {/* Right Panel for Content (Login, Register, etc.) */}
//       <motion.div
//         className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8"
//         initial={{ x: "100%" }}
//         animate={{ x: 0 }}
//         transition={{ type: "spring", stiffness: 80, damping: 10 }}
//       >
//         <Outlet />
//       </motion.div>
//     </motion.div>
//   );
// }

// export default AuthLayout;


import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import FloatingShape from "../../components/shopping-view/floating-shape"; // Import the FloatingShape component

function AuthLayout() {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-[#FFE5D4] via-[#FFC4A3] to-[#FFA88C] flex items-center justify-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Floating Shapes */}
      <FloatingShape color='bg-[#FF8C6B]' size='w-64 h-64' top='-5%' left='10%' delay={0} />
      <FloatingShape color='bg-[#FF6B4A]' size='w-48 h-48' top='70%' left='80%' delay={5} />
      <FloatingShape color='bg-[#FFA88C]' size='w-32 h-32' top='40%' left='-10%' delay={2} />

      {/* Left Panel with Website Name and Description */}
      <motion.div
        className="hidden lg:flex items-center justify-center w-1/2 px-12 py-8"
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 10 }}
      >
        {/* Card container for text */}
        <motion.div
          className="max-w-md p-6 bg-[#2C2C2C] text-white rounded-2xl shadow-lg space-y-6 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl font-extrabold tracking-tight">
            Gadget Grid
          </h1>
          <p className="text-lg">Your go-to store for amazing gadgets!</p>
        </motion.div>
      </motion.div>

      {/* Right Panel for Content (Login, Register, etc.) */}
      <motion.div
        className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 10 }}
      >
        <Outlet />
      </motion.div>
    </motion.div>
  );
}

export default AuthLayout;