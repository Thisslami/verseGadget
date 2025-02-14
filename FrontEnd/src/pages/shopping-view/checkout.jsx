// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { useDispatch, useSelector } from "react-redux";
// import { useToast } from "@/components/ui/use-toast";
// import { createNewOrder } from "@/store/shop/order-slice";
// import Address from "@/components/shopping-view/address";
// import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
// import gadimg from "../../assets/gadimg.jpg";

// function ShoppingCheckout() {
//   const { cartItems } = useSelector((state) => state.shopCart);
//   const { user } = useSelector((state) => state.auth);
//   const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
//   const [isPaymentStart, setIsPaymentStart] = useState(false);
//   const { approvalURL } = useSelector((state) => state.shopOrder);
//   const { toast } = useToast();
//   const dispatch = useDispatch();

//   const totalCartAmount =
//     cartItems && cartItems.items && cartItems.items.length > 0
//       ? cartItems.items.reduce(
//           (sum, currentItem) =>
//             sum +
//             (currentItem?.salePrice > 0
//               ? currentItem?.salePrice
//               : currentItem?.price) *
//               currentItem?.quantity,
//           0
//         )
//       : 0;

//   function handleInitiatepaystackPayment() {
//     if (cartItems.items.length === 0) {
//       toast({
//         title: "Your cart is empty, Please add items to proceed.",
//         variant: "destructive",
//       });
//       return;
//     }
//     if (currentSelectedAddress === null) {
//       toast({
//         title: "Please select one address to proceed.",
//         variant: "destructive",
//       });
//       return;
//     }

//     const orderData = {
//       userId: user?.id,
//       cartId: cartItems?._id, // Ensure cartId is passed correctly
//       cartItems: cartItems.items.map((singleCartItem) => ({
//         productId: singleCartItem?.productId,
//         title: singleCartItem?.title,
//         image: singleCartItem?.image,
//         price:
//           singleCartItem?.salePrice > 0
//             ? singleCartItem?.salePrice
//             : singleCartItem?.price,
//         quantity: singleCartItem?.quantity,
//       })),
//       addressInfo: {
//         addressId: currentSelectedAddress?._id,
//         address: currentSelectedAddress?.address,
//         city: currentSelectedAddress?.city,
//         pincode: currentSelectedAddress?.pincode,
//         phone: currentSelectedAddress?.phone,
//         notes: currentSelectedAddress?.notes,
//       },
//       orderStatus: "pending",
//       paymentMethod: "paystack",
//       paymentStatus: "pending",
//       totalAmount: totalCartAmount,
//       orderDate: new Date(),
//       orderUpdateDate: new Date(),
//       paymentId: "",
//       payerId: user?.email,
//     };

//     // Log order data to verify before dispatch
//     console.log("Order Data:", orderData); // Log the order data to check if cartId and other info are correct

//     dispatch(createNewOrder(orderData)).then((data) => {
//       console.log("Response from createNewOrder:", data); // Log the response data
//       if (data?.payload?.success) {
//         setIsPaymentStart(true);
//       } else {
//         setIsPaymentStart(false);
//         toast({
//           title: "Payment failed!",
//           description: "Please try again later.",
//           type: "error",
//         });
//       }
//     });
//   }

//   if (approvalURL && !isPaymentStart) {
//     window.location.href = approvalURL; // Redirect after confirming the payment should start.
//   }

//   return (
//     <div className="flex flex-col">
//       <div className="relative h-[400px] overflow-hidden">
//         <img
//           src={gadimg}
//           className="h-full w-full object-cover object-center"
//         />
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
//         <Address 
//          selectedId={currentSelectedAddress}
//          setCurrentSelectedAddress={setCurrentSelectedAddress}
//          />
//         <div className="flex flex-col gap-4">
//           {cartItems && cartItems.items && cartItems.items.length > 0
//             ? cartItems.items.map((item) => (
//                 <UserCartItemsContent cartItem={item} key={item.productId} />
//               ))
//             : null}
//           <div className="mt-8 space-y-4">
//             <div className="flex justify-between">
//               <span className="font-bold">Total</span>
//               <span className="font-bold">₦{totalCartAmount.toLocaleString()}</span>
//             </div>
//           </div>
//           <div className="mt-4 w-full">
//             <Button onClick={handleInitiatepaystackPayment} className="w-full">
//               {isPaymentStart
//                 ? "Processing paystack Payment..."
//                 : "Checkout with paystack"}
//             </Button>
//             {/* Other static info */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ShoppingCheckout;


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/components/ui/use-toast";
import { createNewOrder } from "@/store/shop/order-slice";
import Address from "@/components/shopping-view/address";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const { approvalURL } = useSelector((state) => state.shopOrder);
  const [currentStep, setCurrentStep] = useState(1); // Step 1 initially
  const { toast } = useToast();
  const dispatch = useDispatch();

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  function handleInitiatepaystackPayment() {
    if (cartItems.items.length === 0) {
      toast({
        title: "Your cart is empty, Please add items to proceed.",
        variant: "destructive",
      });
      return;
    }
    if (currentSelectedAddress === null) {
      toast({
        title: "Please select one address to proceed.",
        variant: "destructive",
      });
      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paystack",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: user?.email,
    };

    dispatch(createNewOrder(orderData)).then((data) => {
      if (data?.payload?.success) {
        setIsPaymentStart(true);
        setCurrentStep(3); // Move to payment step
      } else {
        setIsPaymentStart(false);
        toast({
          title: "Payment failed!",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
    });
  }

  if (approvalURL && !isPaymentStart) {
    window.location.href = approvalURL;
  }

  return (
    <div className="flex flex-col p-5">
      {/* Dynamic Progress Indicator */}
      <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg mb-5">
        <span
          className={`font-semibold ${
            currentStep >= 1 ? "text-blue-600" : "text-gray-500"
          }`}
        >
          1. Cart
        </span>
        <span
          className={`font-semibold ${
            currentStep >= 2 ? "text-blue-600" : "text-gray-500"
          }`}
        >
          2. Address
        </span>
        <span
          className={`font-semibold ${
            currentStep >= 3 ? "text-blue-600" : "text-gray-500"
          }`}
        >
          3. Payment
        </span>
        <span
          className={`font-semibold ${
            currentStep >= 4 ? "text-blue-600" : "text-gray-500"
          }`}
        >
          4. Confirmation
        </span>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Address Selection */}
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        {/* Cart Items & Summary */}
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <UserCartItemsContent cartItem={item} key={item.productId} />
              ))
            : null}

          {/* Order Summary */}
          <div className="p-5 bg-gray-100 rounded-lg shadow">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between">
              <span>Total Items:</span>
              <span>{cartItems.items.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Amount:</span>
              <span>₦{totalCartAmount.toLocaleString()}</span>
            </div>
          </div>

          {/* Checkout Button */}
          <div className="mt-4 w-full">
            <Button
              onClick={handleInitiatepaystackPayment}
              className="w-full bg-black hover:bg-indigo-700 text-white"
            >
              {isPaymentStart
                ? "Processing Paystack Payment..."
                : "Checkout with Paystack"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
