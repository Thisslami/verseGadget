// import { Outlet } from "react-router-dom";





// function AuthLayout() {
//   return (
//     <div className="flex min-h-screen w-full bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200">
//       <div className="hidden lg:flex items-center justify-center bg-black w-1/2 px-12 py-8">
//         <div className="max-w-md space-y-6 text-center text-white">
//           <h1 className="text-4xl font-extrabold tracking-tight">
//             Geelaw Technologies
//           </h1>
//           <p className="text-lg">Your go-to store for amazing gadgets!</p>
//         </div>
//       </div>
//       <div className="flex flex-1 items-center justify-center bg-white px-4 py-12 sm:px-6 lg:px-8">
//         <Outlet />
//       </div>
//     </div>
//   );
// }


// export default AuthLayout;

import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

function AuthLayout() {
  return (
    <motion.div
      className="flex min-h-screen w-full bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Left panel with sliding animation */}
      <motion.div
        className="hidden lg:flex items-center justify-center bg-black w-1/2 px-12 py-8"
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 10 }}
      >
        {/* Card container for text */}
        <motion.div
          className="max-w-md p-6 bg-gray-800 text-white rounded-2xl shadow-lg space-y-6 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl font-extrabold tracking-tight">
            Geelaw Technologies
          </h1>
          <p className="text-lg">Your go-to store for amazing gadgets!</p>
        </motion.div>
      </motion.div>

      {/* Right panel */}
      <motion.div
        className="flex flex-1 items-center justify-center bg-white px-4 py-12 sm:px-6 lg:px-8"
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

