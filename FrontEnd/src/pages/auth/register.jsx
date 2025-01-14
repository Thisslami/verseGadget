import CommonForm from "@/components/common/form"; // The form where the user types
import { useToast } from "@/components/ui/use-toast"; // For showing messages
import { registerFormControls } from "@/config"; // Fields to show in the form
import { registerUser } from "@/store/auth-slice"; // Action to save the user info
import { useState } from "react"; // To keep track of form data
import { useDispatch } from "react-redux"; // To call actions
import { Link, useNavigate } from "react-router-dom"; // For navigation

// This is the initial empty info for the user
const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  // State to hold form data
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch(); // Dispatch to save user data
  const navigate = useNavigate(); // For redirecting after success
  const { toast } = useToast(); // Toast for messages

  // When the user submits the form
  function onSubmit(event) {
    event.preventDefault(); // Stop the page from reloading
    dispatch(registerUser(formData)).then((data) => {
      // If registration is successful
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message, // Show success message
        });
        navigate("/auth/login");
        setFormData(initialState);
         // Go to login page
      } else {
        toast({
          
          title: data?.payload?.message, // Show error message
          variant: "destructive", // Make it look like an error (red)
        });
      }
    });
  }

  console.log(formData);

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-2">
          Already have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls} // The input fields
        buttonText={"Sign Up"} // Button text
        formData={formData} // The current data
        setFormData={setFormData} // Update the data as the user types
        onSubmit={onSubmit}
        
      />
    </div>
  );
}

export default AuthRegister;
