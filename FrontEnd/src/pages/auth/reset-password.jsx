// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Lock } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import Input from "../../components/common/input";
// import { useToast } from "@/components/ui/use-toast"; // Import useToast
// import { resetPassword } from "../../store/auth-slice/index";

// const ResetPasswordPage = () => {
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { token } = useParams();
//   const { toast } = useToast(); // Use the toast hook

//   const { isLoading, error, message } = useSelector((state) => state.auth);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       toast({
//         title: "Error",
//         description: "Passwords do not match",
//         variant: "destructive",
//       });
//       return;
//     }

//     try {
//       await dispatch(resetPassword({ token, formData: { password } })).unwrap();

//       toast({
//         title: "Success",
//         description: "Password reset successfully, redirecting to login...",
//       });

//       setTimeout(() => {
//         navigate("/auth/login");
//       }, 2000);
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: error || "Error resetting password",
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
//     >
//       <div className="p-8">
//         <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
//           Reset Password
//         </h2>
//         {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
//         {message && <p className="text-green-500 text-sm mb-4">{message}</p>}

//         <form onSubmit={handleSubmit}>
//           <Input
//             icon={Lock}
//             type="password"
//             placeholder="New Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           <Input
//             icon={Lock}
//             type="password"
//             placeholder="Confirm New Password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />

//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
//             type="submit"
//             disabled={isLoading}
//           >
//             {isLoading ? "Resetting..." : "Set New Password"}
//           </motion.button>
//         </form>
//       </div>
//     </motion.div>
//   );
// };

// export default ResetPasswordPage;

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import CommonForm from "../../components/common/Form";
import { resetPassword } from "../../store/auth-slice/index";

const ResetPasswordPage = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const { toast } = useToast();

  const { isLoading, error, message } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    try {
      await dispatch(
        resetPassword({ token, formData: { password: formData.password } })
      ).unwrap();

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

  const formControls = [
    {
      name: "password",
      label: "New Password",
      type: showPassword ? "text" : "password",
      placeholder: "Enter new password",
      componentType: "input",
      icon: showPassword ? EyeOff : Eye,
      toggleVisibility: () => setShowPassword((prev) => !prev),
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: showConfirmPassword ? "text" : "password",
      placeholder: "Confirm new password",
      componentType: "input",
      icon: showConfirmPassword ? EyeOff : Eye,
      toggleVisibility: () => setShowConfirmPassword((prev) => !prev),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-700 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-black to-indigo-500 text-transparent bg-clip-text">
          Reset Password
        </h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {message && <p className="text-green-500 text-sm mb-4">{message}</p>}

        <CommonForm
          formControls={formControls}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          buttonText={isLoading ? "Resetting..." : "Set New Password"}
          isBtnDisabled={isLoading}
        />
      </div>
    </motion.div>
  );
};

export default ResetPasswordPage;
