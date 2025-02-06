import { useState } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../components/common/input";
import { useToast } from "@/components/ui/use-toast"; // Import useToast
import { resetPassword } from "../../store/auth-slice/index";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const { toast } = useToast(); // Use the toast hook

  const { isLoading, error, message } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    try {
      await dispatch(resetPassword({ token, formData: { password } })).unwrap();

      toast({
        title: "Success",
        description: "Password reset successfully, redirecting to login...",
      });

      setTimeout(() => {
        navigate("/auth/login");
      }, 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: error || "Error resetting password",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Reset Password
        </h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {message && <p className="text-green-500 text-sm mb-4">{message}</p>}

        <form onSubmit={handleSubmit}>
          <Input
            icon={Lock}
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Input
            icon={Lock}
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Resetting..." : "Set New Password"}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default ResetPasswordPage;


// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams, useNavigate } from "react-router-dom";
// import { resetPassword } from "../../store/auth-slice/index";
// import { useToast } from "@/components/ui/use-toast";
// import { Input } from "@/components/ui/input"; // Use ShadCN Input component
// import { Button } from "@/components/ui/button"; // Use ShadCN Button component
// import { Lock } from "lucide-react"; // Lucide icon for lock
// import { motion } from "framer-motion";

// const ResetPasswordPage = () => {
//   const { token } = useParams(); // Get the reset token from URL
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const { isLoading, message, error } = useSelector((state) => state.auth);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       return toast({
//         title: "Error",
//         description: "Passwords do not match.",
//         variant: "destructive",
//       });
//     }

//     // Dispatch reset password action
//     try {
//       const result = await dispatch(resetPassword({ token, formData: { password } }));
//       if (result.payload.success) {
//         toast({
//           title: "Success",
//           description: result.payload.message,
//           variant: "success",
//         });
//         navigate("/login"); // Redirect to login after successful reset
//       } else {
//         toast({
//           title: "Error",
//           description: result.payload.message || error,
//           variant: "destructive",
//         });
//       }
//     } catch (err) {
//       toast({
//         title: "Error",
//         description: err.message,
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <motion.div
//       className="flex justify-center items-center min-h-screen bg-gray-100"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//     >
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
//         <h2 className="text-2xl font-semibold text-center mb-4">Reset Password</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="space-y-2">
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//               New Password
//             </label>
//             <Input
//               id="password"
//               type="password"
//               placeholder="Enter new password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full"
//             />
//           </div>
//           <div className="space-y-2">
//             <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
//               Confirm Password
//             </label>
//             <Input
//               id="confirmPassword"
//               type="password"
//               placeholder="Confirm new password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               className="w-full"
//             />
//           </div>
//           <Button
//             type="submit"
//             disabled={isLoading}
//             className="w-full flex items-center justify-center space-x-2"
//           >
//             <Lock size={20} />
//             <span>Reset Password</span>
//           </Button>
//         </form>
//         {message && (
//           <div className="text-green-600 text-sm text-center mt-4">
//             {message}
//           </div>
//         )}
//         {error && (
//           <div className="text-red-600 text-sm text-center mt-4">
//             {error}
//           </div>
//         )}
//       </div>
//     </motion.div>
//   );
// };

// export default ResetPasswordPage;
