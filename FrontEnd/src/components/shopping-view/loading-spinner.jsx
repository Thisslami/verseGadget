// import { motion } from "framer-motion";

// const LoadingSpinner = () => {
// 	return (
// 		<div className='min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden'>
// 			{/* Simple Loading Spinner */}
// 			<motion.div
// 				className='w-16 h-16 border-4 border-t-4 border-t-green-500 border-green-200 rounded-full'
// 				animate={{ rotate: 360 }}
// 				transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
// 			/>
// 		</div>
// 	);
// };

// export default LoadingSpinner;


// import { motion } from "framer-motion";

// const LoadingSpinner = () => {
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-200 via-rose-300 to-pink-400">
//       <motion.div
//         className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full"
//         animate={{ rotate: 360 }}
//         transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//       />
//     </div>
//   );
// };

// export default LoadingSpinner;

import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#FFE5D4] via-[#FFC4A3] to-[#FFA88C]">
      <motion.div
        className="w-16 h-16 border-4 bg-[#2C2C2C] border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default LoadingSpinner;
