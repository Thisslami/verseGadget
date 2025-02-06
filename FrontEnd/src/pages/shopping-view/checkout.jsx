// import Address from "@/components/shopping-view/address";
// import gadimg from "../../assets/gadimg.jpg";
// import { useDispatch, useSelector } from "react-redux";
// import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
// import { Button } from "@/components/ui/button";
// import { useState } from "react";
// import { createNewOrder } from "@/store/shop/order-slice";
// import { useToast } from "@/components/ui/use-toast";

// function ShoppingCheckout() {
//   const { cartItems } = useSelector((state) => state.shopCart);
//   const { user } = useSelector((state) => state.auth);
//   const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
//   const dispatch = useDispatch();
//   const [isPaymentStart, setIsPaymentStart] = useState(false);
//   const { approvalURL } = useSelector((state) => state.shopOrder);
//   const { toast } = useToast();

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

//   if (approvalURL) {
//     window.location.href = approvalURL;
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
//           <Button onClick={handleInitiatepaystackPayment} className="w-full">
//               {isPaymentStart
//                 ? "Processing paystack Payment..."
//                 : "Checkout with paystack"}
//             </Button>

//             <div className="mt-4 text-sm text-center text-muted-foreground">
//               *Please note that this is a mock checkout page and the actual
//               checkout process will be handled by paystack.
//             </div>

//             <div className="mt-4 text-sm text-center text-muted-foreground">
//               Your order will be processed within 24 hours.
//             </div>

//             <div className="mt-4 text-sm text-center text-muted-foreground">
//               Secure payment processing by paystack.
//             </div>

//             <div className="mt-4 text-sm text-center text-muted-foreground">
//               Please make sure to save your payment details for future use.
//             </div>

//             <div className="mt-4 text-sm text-center text-muted-foreground">
//               If you have any questions, please contact our support team.
//             </div>
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
import gadimg from "../../assets/gadimg.jpg";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const { approvalURL } = useSelector((state) => state.shopOrder);
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
      cartId: cartItems?._id, // Ensure cartId is passed correctly
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

    // Log order data to verify before dispatch
    console.log("Order Data:", orderData); // Log the order data to check if cartId and other info are correct

    dispatch(createNewOrder(orderData)).then((data) => {
      console.log("Response from createNewOrder:", data); // Log the response data
      if (data?.payload?.success) {
        setIsPaymentStart(true);
      } else {
        setIsPaymentStart(false);
        toast({
          title: "Payment failed!",
          description: "Please try again later.",
          type: "error",
        });
      }
    });
  }

  if (approvalURL && !isPaymentStart) {
    window.location.href = approvalURL; // Redirect after confirming the payment should start.
  }

  return (
    <div className="flex flex-col">
      <div className="relative h-[400px] overflow-hidden">
        <img
          src={gadimg}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address 
         selectedId={currentSelectedAddress}
         setCurrentSelectedAddress={setCurrentSelectedAddress}
         />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <UserCartItemsContent cartItem={item} key={item.productId} />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">₦{totalCartAmount.toLocaleString()}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button onClick={handleInitiatepaystackPayment} className="w-full">
              {isPaymentStart
                ? "Processing paystack Payment..."
                : "Checkout with paystack"}
            </Button>
            {/* Other static info */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
