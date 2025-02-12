// import CommonForm from "@/components/common/form";
// import { Link } from "react-router-dom";
// import { useState } from "react";
// import { loginFormControls } from "@/config";
// import { useToast } from "@/components/ui/use-toast";
// import { useDispatch } from "react-redux";
// import { loginUser } from "@/store/auth-slice";



// function AuthLogin() {
//   const initialState = {
//     email: "",
//     password: "",
//   };

//   const [formData, setFormData] = useState(initialState);
//   const dispatch = useDispatch();
//   const { toast } = useToast();

//   function onSubmit(event) {
//   event.preventDefault();

//   dispatch(loginUser(formData)).then((data) => {


//     if (data?.payload?.success) {
//       toast({
//         title: data?.payload?.message || "Login successful!",
//       });
//       setFormData(initialState); // Clear form on success
//     } else {
//       toast({
//         title: data?.payload?.message || "Login failed. Please try again.",
//         variant: "destructive",
//       });
//     }
//   });
// }


//   return (
//     <div className="mx-auto w-full max-w-md space-y-6">
//       <div className="text-center">
//         <h1 className="text-3xl font-bold tracking-tight text-foreground">
//           Sign in to your account
//         </h1>
//         <p className="mt-2">
//           Don't have an account?
//           <Link
//             className="font-medium ml-2 text-primary hover:underline"
//             to="/auth/register"
//           >
//             Register
//           </Link>
//         </p>
//       </div>
//       <CommonForm
//         formControls={loginFormControls}
//         buttonText="Sign in"
//         formData={formData}
//         setFormData={setFormData}
//         onSubmit={onSubmit}
//       />
//     </div>
//   );
// }

// export default AuthLogin;


// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Mail, Lock, Loader } from "lucide-react";
// import { Link } from "react-router-dom";
// import CommonForm from "@/components/common/form";
// import { useToast } from "@/components/ui/use-toast";
// import { useDispatch } from "react-redux";
// import { loginUser } from "@/store/auth-slice";
// import { loginFormControls } from "@/config";

// function AuthLogin() {

  
//   const initialState = {
//     email: "",
//     password: "",
//   };

//   const [formData, setFormData] = useState(initialState);
//   const dispatch = useDispatch();
//   const { toast } = useToast();
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   function onSubmit(event) {
//     event.preventDefault();
//     setIsLoading(true);
//     dispatch(loginUser(formData))
//     .then((data) => {
//       setIsLoading(false);
//       if (data?.payload?.success) {
//         toast({ title: data?.payload?.message || "Login successful!" });
  
//         // Ensure Redux updates before redirecting
//         dispatch(checkAuth());  
  
//         setFormData(initialState); // Clear form on success
//       } else {
//         toast({
//           title: data?.payload?.message || "Login failed. Please try again.",
//           variant: "destructive",
//         });
//       }
//     })
//     .catch((err) => {
//       setIsLoading(false);
//       setError("An error occurred. Please try again.");
//     });
  
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden mx-auto"
//     >
//       <div className="p-8">
//         <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-black to-emerald-500 text-transparent bg-clip-text">
//           Welcome Back
//         </h2>

//         <CommonForm
//           formControls={loginFormControls}
//           buttonText={isLoading ? <Loader className="w-6 h-6 animate-spin mx-auto" /> : "Login"}
//           formData={formData}
//           setFormData={setFormData}
//           onSubmit={onSubmit}
//         />

//         {error && <p className="text-red-500 font-semibold mb-2">{error}</p>}

        

//         <div className="flex items-center justify-between mt-6">
//           <Link
//             to="/auth/forgot-password"
//             className="text-sm text-white hover:underline"
//           >
//             Forgot password?
//           </Link>
//           <p className="text-sm text-white">
//             Don't have an account?{" "}
//             <Link
//               to="/auth/register"
//               className="text-white hover:underline"
//             >
//               Register
//             </Link>
//           </p>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// export default AuthLogin;

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/store/auth-slice";
import { loginFormControls } from "@/config";

function AuthLogin() {
  const initialState = { email: "", password: "" };
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get authentication state from Redux
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    dispatch(loginUser(formData))
      .then((data) => {
        setIsLoading(false);
        if (data?.payload?.success) {
          toast({ title: data?.payload?.message || "Login successful!" });
          setFormData(initialState); // Clear form on success
        } else {
          toast({
            title: data?.payload?.message || "Login failed. Please try again.",
            variant: "destructive",
          });
        }
      })
      .catch(() => {
        setIsLoading(false);
        setError("An error occurred. Please try again.");
      });
  }

  // Redirect when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(user?.role === "admin" ? "/admin/dashboard" : "/shop/home");
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden mx-auto"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-black to-emerald-500 text-transparent bg-clip-text">
          Welcome Back
        </h2>

        <CommonForm
          formControls={loginFormControls}
          buttonText={isLoading ? <Loader className="w-6 h-6 animate-spin mx-auto" /> : "Login"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />

        {error && <p className="text-red-500 font-semibold mb-2">{error}</p>}

        <div className="flex items-center justify-between mt-6">
          <Link to="/auth/forgot-password" className="text-sm text-white hover:underline">
            Forgot password?
          </Link>
          <p className="text-sm text-white">
            Don't have an account?{" "}
            <Link to="/auth/register" className="text-white hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default AuthLogin;

