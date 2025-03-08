import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail, checkAuth } from "../../store/auth-slice"; // Adjust the path if needed
import { useToast } from "@/components/ui/use-toast"; // Adjust the path if needed

const EmailVerificationPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, isLoading } = useSelector((state) => state.auth); // Adjust path if necessary
  const { toast } = useToast(); // Using the custom toast from use-toast

  const handleChange = (index, value) => {
    const newCode = [...code];

    // Handle pasted content
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);

      // Focus on the last non-empty input or the first empty one
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      // Move focus to the next input field if value is entered
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    
    try {
      await dispatch(verifyEmail({ code: verificationCode })).unwrap();
      toast({ description: "Email verified successfully, login to continue", variant: "success" });
      
      // Clear any potential lingering authentication state
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
      // Re-fetch auth state to ensure correct redirection
      await dispatch(checkAuth());
    
      navigate("/auth/login"); // Ensure the correct redirection
    } catch (error) {
      toast({
        description: error.message || "Verification failed",
        variant: "destructive",
      });
    }
  };
  

  // Auto submit when all fields are filled
  useEffect(() => {
    if (code.every((digit) => digit !== "") && !isLoading) {
      handleSubmit(new Event("submit"));
    }
  }, [code, isLoading]); // Added isLoading to prevent firing while loading
  

  return (
    <div className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-white to-white text-transparent bg-clip-text">
          Verify Your Email
        </h2>
        <p className="text-center text-gray-300 mb-6">
          Enter the 6-digit code sent to your email address.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="6"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-green-500 focus:outline-none"
              />
            ))}
          </div>
          {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
          <motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  type="submit"
  disabled={isLoading || code.some((digit) => !digit)}
  className="w-full bg-gradient-to-r from-[#FF9A8B] to-[#FF6A88] text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-[#FF8264] hover:to-[#FF4E57] focus:outline-none focus:ring-2 focus:ring-[#FF6A88] focus:ring-opacity-50 disabled:opacity-50"
>
  {isLoading ? "Verifying..." : "Verify Email"}
</motion.button>

        </form>
      </motion.div>
    </div>
  );
};
export default EmailVerificationPage;
