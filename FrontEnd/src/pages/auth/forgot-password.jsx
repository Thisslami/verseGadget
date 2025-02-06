

// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { forgotPassword } from '../../store/auth-slice/index';
// import { useToast } from '@/components/ui/use-toast';
// import { Mail } from 'lucide-react'; // Importing LucideReact icons
// import { motion } from 'framer-motion'; // For animations

// const ForgotPasswordPage = () => {
//   const [email, setEmail] = useState('');
//   const [loading, setLoading] = useState(false);
//   const dispatch = useDispatch();
//   const { message, error } = useSelector((state) => state.auth);
//   const { toast } = useToast();

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!email) {
//       toast({
//         title: 'Error',
//         description: 'Email is required!',
//         variant: 'destructive',
//       });
//       return;
//     }

//     setLoading(true);

//     try {
//       // Dispatch the forgotPassword action
//       const response = await dispatch(forgotPassword({ email })).unwrap();

//       // If successful, show success toast
//       toast({
//         title: 'Success',
//         description: response.message,
//         variant: 'success',
//       });
//     } catch (err) {
//       // Show error toast if failed
//       toast({
//         title: 'Error',
//         description: error || 'Failed to send reset password email',
//         variant: 'destructive',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <motion.div
//       className="flex justify-center items-center min-h-screen bg-gray-50"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
//         <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
//           Forgot Password
//         </h2>

//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//               Email Address
//             </label>
//             <input
//               id="email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter your email"
//               required
//             />
//           </div>

//           <motion.button
//             type="submit"
//             className="w-full bg-blue-600 text-white p-3 rounded-md disabled:bg-blue-300"
//             disabled={loading}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             {loading ? 'Sending...' : 'Send Reset Link'}
//           </motion.button>
//         </form>

//         <div className="flex justify-center mt-4">
//           <span className="text-sm text-gray-500">
//             <Mail className="inline mr-2" size={16} />
//             We'll send a reset link to your email.
//           </span>
//         </div>

//         {message && (
//           <div className="mt-4 p-3 text-green-700 bg-green-100 rounded-md">
//             {message}
//           </div>
//         )}
//         {error && (
//           <div className="mt-4 p-3 text-red-700 bg-red-100 rounded-md">
//             {error}
//           </div>
//         )}
//       </div>
//     </motion.div>
//   );
// };

// export default ForgotPasswordPage;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../store/auth-slice/index';
import { useToast } from '@/components/ui/use-toast';
import { Mail, ArrowLeft, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { isLoading, message, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: 'Error',
        description: 'Email is required!',
        variant: 'destructive',
      });
      return;
    }

    try {
      // Dispatch the forgotPassword action
      const response = await dispatch(forgotPassword({ email })).unwrap();
      toast({
        title: 'Success',
        description: response.message,
        variant: 'success',
      });
      setIsSubmitted(true);
    } catch (err) {
      toast({
        title: 'Error',
        description: error || 'Failed to send reset password email',
        variant: 'destructive',
      });
    }
  };

  return (
    <motion.div
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-700 to-emerald-600 text-transparent bg-clip-text">
          Forgot Password
        </h2>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <p className="text-gray-300 mb-6 text-center">
              Enter your email address and we'll send you a link to reset your password.
            </p>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-emerald-600 text-white p-3 rounded-md disabled:bg-blue-300"
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLoading ? <Loader className="size-6 animate-spin mx-auto" /> : 'Send Reset Link'}
            </motion.button>
          </form>
        ) : (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Mail className="h-8 w-8 text-white" />
            </motion.div>
            <p className="text-gray-300 mb-6">
              If an account exists for {email}, you will receive a password reset link shortly.
            </p>
          </div>
        )}
      </div>

      <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
        <Link to="/auth/login" className="text-sm text-blue-400 hover:underline flex items-center">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Login
        </Link>
      </div>
    </motion.div>
  );
};

export default ForgotPasswordPage;
