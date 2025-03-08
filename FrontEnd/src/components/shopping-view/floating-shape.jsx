// import { motion } from "framer-motion";

// const FloatingShape = ({ color, size, top, left, delay }) => {
// 	return (
// 		<motion.div
// 			className={`absolute rounded-full ${color} ${size} opacity-20 blur-xl`}
// 			style={{ top, left }}
// 			animate={{
// 				y: ["0%", "100%", "0%"],
// 				x: ["0%", "100%", "0%"],
// 				rotate: [0, 360],
// 			}}
// 			transition={{
// 				duration: 20,
// 				ease: "linear",
// 				repeat: Infinity,
// 				delay,
// 			}}
// 			aria-hidden='true'
// 		/>
// 	);
// };
// export default FloatingShape;


// import { motion } from "framer-motion";

// const FloatingShape = ({ color, size, top, left, delay }) => {
// 	return (
// 		<motion.div
// 			className={`absolute rounded-full ${color} ${size} opacity-30 blur-lg`}
// 			style={{ top, left }}
// 			animate={{
// 				y: ["0%", "100%", "0%"],
// 				x: ["0%", "100%", "0%"],
// 				rotate: [0, 360],
// 			}}
// 			transition={{
// 				duration: 20,
// 				ease: "linear",
// 				repeat: Infinity,
// 				delay,
// 			}}
// 			aria-hidden='true'
// 		/>
// 	);
// };
// export default FloatingShape;

import { motion } from "framer-motion";

const FloatingShape = ({ color, size, top, left, delay }) => {
  return (
    <motion.div
      className={`absolute rounded-full ${color} ${size} opacity-50 blur-xl`} // Increased opacity
      style={{ top, left }}
      animate={{
        y: ["0%", "100%", "0%"],
        x: ["0%", "100%", "0%"],
        rotate: [0, 360],
      }}
      transition={{
        duration: 20,
        ease: "linear",
        repeat: Infinity,
        delay,
      }}
      aria-hidden='true'
    />
  );
};

export default FloatingShape;
