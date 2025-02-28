

// import { Input } from "../ui/input";
// import { Label } from "../ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select";
// import { Textarea } from "../ui/textarea";
// import { Button } from "../ui/button";
// import { Lock, Mail, User, Eye, EyeOff } from "lucide-react"; // Import the icons
// import { useState } from "react";
// function CommonForm({
//   formControls,
//   formData,
//   setFormData,
//   onSubmit,
//   buttonText,
//   isBtnDisabled,
// }) {
//   const [showPassword, setShowPassword] = useState(false); // State for password visibility

//   function togglePasswordVisibility() {
//     setShowPassword((prev) => !prev);
//   }

//   function renderInputsByComponentType(getControlItem) {
//     let element = null;
//     const value = formData[getControlItem.name] || "";

//     let Icon = null;
//     if (getControlItem.name === "userName") Icon = User;
//     else if (getControlItem.name === "email") Icon = Mail;
//     else if (getControlItem.name === "password") Icon = Lock;

//     switch (getControlItem.componentType) {
//       case "input":
//         element = (
//           <div className="flex items-center gap-2 relative">
//             {Icon && <Icon className="text-black" />}
//             <Input
//               name={getControlItem.name}
//               placeholder={getControlItem.placeholder}
//               id={getControlItem.name}
//               type={
//                 getControlItem.name === "password" && showPassword
//                   ? "text"
//                   : getControlItem.type
//               }
//               value={value}
//               onChange={(event) =>
//                 setFormData({
//                   ...formData,
//                   [getControlItem.name]: event.target.value,
//                 })
//               }
              
          
//             />
//             {/* Password toggle button */}
//             {getControlItem.name === "password" && (
//               <button
//                 type="button"
//                 onClick={togglePasswordVisibility}
//                 className="absolute right-3 text-black"
//               >
//                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//               </button>
//             )}
//           </div>
//         );
//         break;

//       case "select":
//         element = (
//           <Select
//             onValueChange={(value) =>
//               setFormData({
//                 ...formData,
//                 [getControlItem.name]: value,
//               })
//             }
//             value={value}
//           >
//             <SelectTrigger className="w-full">
//               <SelectValue placeholder={getControlItem.label} />
//             </SelectTrigger>
//             <SelectContent>
//               {getControlItem.options && getControlItem.options.length > 0
//                 ? getControlItem.options.map((optionItem) => (
//                     <SelectItem key={optionItem.id} value={optionItem.id}>
//                       {optionItem.label}
//                     </SelectItem>
//                   ))
//                 : null}
//             </SelectContent>
//           </Select>
//         );
//         break;

//       case "textarea":
//         element = (
//           <Textarea
//             name={getControlItem.name}
//             placeholder={getControlItem.placeholder}
//             id={getControlItem.id}
//             value={value}
//             onChange={(event) =>
//               setFormData({
//                 ...formData,
//                 [getControlItem.name]: event.target.value,
//               })
//             }
//           />
//         );
//         break;

//       default:
//         element = (
//           <Input
//             name={getControlItem.name}
//             placeholder={getControlItem.placeholder}
//             id={getControlItem.name}
//             type={getControlItem.type}
//             value={value}
//             onChange={(event) =>
//               setFormData({
//                 ...formData,
//                 [getControlItem.name]: event.target.value,
//               })
//             }
//           />
//         );
//         break;
//     }

//     return element;
//   }

//   return (
//     <form onSubmit={onSubmit}>
//       <div className="flex flex-col gap-3">
//         {formControls.map((controlItem) => (
//           <div className="grid w-full gap-1.5" key={controlItem.name}>
//             <Label className="mb-1">{controlItem.label}</Label>
//             {renderInputsByComponentType(controlItem)}
//           </div>
//         ))}
//       </div>
//       <Button disabled={isBtnDisabled} type="submit" className="mt-2 w-full">
//         {buttonText || "Submit"}
//       </Button>
//     </form>
//   );
// }


// export default CommonForm;


import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Lock, Mail, User, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

function CommonForm({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function renderInputsByComponentType(getControlItem) {
    let element = null;
    const value = formData[getControlItem.name] || "";
    
    let Icon = null;
    if (getControlItem.name === "userName") Icon = User;
    else if (getControlItem.name === "email") Icon = Mail;
    else if (getControlItem.name === "password" || getControlItem.name === "confirmPassword") Icon = Lock;

    const isPasswordField = getControlItem.name === "password";
    const isConfirmPasswordField = getControlItem.name === "confirmPassword";
    const showField = isPasswordField ? showPassword : showConfirmPassword;

    switch (getControlItem.componentType) {
      case "input":
        element = (
          <div className="flex items-center gap-2 relative">
            {Icon && <Icon className="text-black" />}
            <Input
              name={getControlItem.name}
              placeholder={getControlItem.placeholder}
              id={getControlItem.name}
              type={showField ? "text" : getControlItem.type}
              value={value}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  [getControlItem.name]: event.target.value,
                })
              }
            />
            {/* Password toggle button */}
            {(isPasswordField || isConfirmPasswordField) && (
              <button
                type="button"
                onClick={() => {
                  if (isPasswordField) setShowPassword((prev) => !prev);
                  if (isConfirmPasswordField) setShowConfirmPassword((prev) => !prev);
                }}
                className="absolute right-3 text-black"
              >
                {showField ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            )}
          </div>
        );
        break;

      case "select":
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getControlItem.name]: value,
              })
            }
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.label} />
            </SelectTrigger>
            <SelectContent>
              {getControlItem.options && getControlItem.options.length > 0
                ? getControlItem.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;

      case "textarea":
        element = (
          <Textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.id}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;

      default:
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
    }

    return element;
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-1.5" key={controlItem.name}>
            <Label className="mb-1">{controlItem.label}</Label>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </div>
      <Button disabled={isBtnDisabled} type="submit" className="mt-2 w-full">
        {buttonText || "Submit"}
      </Button>
      {/* <Button
  disabled={isBtnDisabled}
  type="submit"
  className={`mt-2 w-full py-2 px-4 rounded-lg text-white font-semibold
    ${isBtnDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 active:scale-95'}
    transition-all duration-200 ease-in-out shadow-lg hover:shadow-xl
  `}
>
  {buttonText || "Submit"}
</Button> */}

    </form>
  );
}

export default CommonForm;
