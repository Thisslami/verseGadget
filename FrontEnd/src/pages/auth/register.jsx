// import CommonForm from "@/components/common/form"; // The form where the user types
// import { useToast } from "@/components/ui/use-toast"; // For showing messages
// import { registerFormControls } from "@/config"; // Fields to show in the form
// import { registerUser } from "@/store/auth-slice"; // Action to save the user info
// import { useState } from "react"; // To keep track of form data
// import { useDispatch } from "react-redux"; // To call actions
// import { Link, useNavigate } from "react-router-dom"; // For navigation

// // This is the initial empty info for the user
// const initialState = {
//   userName: "",
//   email: "",
//   password: "",
// };

// function AuthRegister() {
//   // State to hold form data
//   const [formData, setFormData] = useState(initialState);
//   const dispatch = useDispatch(); // Dispatch to save user data
//   const navigate = useNavigate(); // For redirecting after success
//   const { toast } = useToast(); // Toast for messages

//   // When the user submits the form
//   function onSubmit(event) {
//     event.preventDefault(); // Stop the page from reloading
//     dispatch(registerUser(formData)).then((data) => {
//       // If registration is successful
//       if (data?.payload?.success) {
//         toast({
//           title: data?.payload?.message, // Show success message
//         });
//         navigate("/auth/login");
//         setFormData(initialState);
//          // Go to login page
//       } else {
//         toast({
          
//           title: data?.payload?.message, // Show error message
//           variant: "destructive", // Make it look like an error (red)
//         });
//       }
//     });
//   }

//   console.log(formData);

//   return (
//     <div className="mx-auto w-full max-w-md space-y-6">
//       <div className="text-center">
//         <h1 className="text-3xl font-bold tracking-tight text-foreground">
//           Create new account
//         </h1>
//         <p className="mt-2">
//           Already have an account
//           <Link
//             className="font-medium ml-2 text-primary hover:underline"
//             to="/auth/login"
//           >
//             Login
//           </Link>
//         </p>
//       </div>
//       <CommonForm
//         formControls={registerFormControls} // The input fields
//         buttonText={"Sign Up"} // Button text
//         formData={formData} // The current data
//         setFormData={setFormData} // Update the data as the user types
//         onSubmit={onSubmit}
        
//       />
//     </div>
//   );
// }

// export default AuthRegister;

import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast"; // For showing messages
import { registerFormControls } from "@/config"; // Fields to show in the form
import { registerUser } from "@/store/auth-slice"; // Action to save the user info
import { useState } from "react"; // To keep track of form data
import { useDispatch } from "react-redux"; // To call actions
import { Link, useNavigate } from "react-router-dom"; // For navigation
import { Loader, Lock, Mail, User } from "lucide-react"; // Icons for the inputs
import PasswordStrengthMeter from "@/components/common/password-strength-meter"; // Password Strength Meter
import CommonForm from "@/components/common/form"; // The form where the user types

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({ title: data?.payload?.message });
        navigate("/auth/verify-email");
        setFormData(initialState);
      } else {
        toast({ title: data?.payload?.message, variant: "destructive" });
      }
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto w-full max-w-md space-y-6 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-black to-indigo-500 text-transparent bg-clip-text">
          Create Account
        </h2>

        <CommonForm
          formControls={registerFormControls}
          buttonText="Sign Up"
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />

        <PasswordStrengthMeter password={formData.password} />
      </div>
      <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
        <p className="text-sm text-white">
          Already have an account?{" "}
          <Link to={"/auth/login"} className="text-white hover:underline">
            Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
}


export default AuthRegister;
