// import { DialogContent } from "../ui/dialog";
// import { Label } from "../ui/label";
// import { Separator } from "../ui/separator";
// import { Badge } from "../ui/badge";
// import { useSelector } from "react-redux";

// function ShoppingOrderDetailsView ({orderDetails}) {

//   const { user } = useSelector((state)=> state.auth)

//     return ( 
//         <DialogContent className="sm:max-w-[600px]">
//         <div className="grid gap-6">
//           <div className="grid gap-1">
//             <div className="flex mt-6 items-center justify-between">
//               <p className="font-medium">Order ID</p>
//               <Label>{orderDetails?._id}</Label>
//             </div>
//             <div className="flex mt-2 items-center justify-between">
//               <p className="font-medium">Order Date</p>
//               <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
//             </div>
//             <div className="flex mt-2 items-center justify-between">
//               <p className="font-medium">Order Price</p>
//               <Label>₦{orderDetails?.totalAmount}</Label>
//             </div>
//             <div className="flex mt-2 items-center justify-between">
//             <p className="font-medium">Payment method</p>
//             <Label>{orderDetails?.paymentMethod}</Label>
//           </div>
//           <div className="flex mt-2 items-center justify-between">
//             <p className="font-medium">Payment Status</p>
//             <Label>{orderDetails?.paymentStatus}</Label>
//           </div>
//             <div className="flex mt-2 items-center justify-between">
//               <p className="font-medium">Order Status</p>
//               <Label>
//               <Badge
//                         className={`py-1 px-3 ${
//                           orderDetails?.orderStatus === "confirmed"
//                             ? "bg-green-500"
//                             : orderDetails?.orderStatus === "rejected"
//                             ? "bg-red-600"
//                             : "bg-black"
//                         }`}
//                       >
//                         {orderDetails?.orderStatus}
//                       </Badge>
            
//                 </Label>
//             </div>
//           </div>
//           <Separator />
//           <div className="grid gap-4">
//             <div className="grid gap-2">
//               <div className="font-meduim">Order Details</div>
//               <ul className="grid gap-3">
//               {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
//                 ? orderDetails?.cartItems.map((item) => (
//                     <li className="flex items-center justify-between">
//                       <span>Title:{item.title}</span>
//                       <span>Quantity:{item.quantity}</span>
//                       <span>Price:₦{item.price}</span>
//                     </li>
//                   ))
//                 : null}
//               </ul>
//             </div>
//           </div>
//           <div className="grid gap-4">
//             <div className="grid gap-2">
//               <div className="font-medium"> Shipping Info</div>
//               <div className="grid gap-0.5 text-muted-foreground">
//               <span>{user.userName}</span>
//               <span>{orderDetails?.addressInfo?.address}</span>
//               <span>{orderDetails?.addressInfo?.city}</span>
//               <span>{orderDetails?.addressInfo?.pincode}</span>
//               <span>{orderDetails?.addressInfo?.phone}</span>
//               <span>{orderDetails?.addressInfo?.notes}</span>
//             </div>
//             </div>
//           </div>
//         </div>
//       </DialogContent>
//      );
// }

// export default ShoppingOrderDetailsView; ;

import { motion } from "framer-motion";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";

function ShoppingOrderDetailsView({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <DialogContent className="sm:max-w-[600px]">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="grid gap-6"
      >
        {/* Order Details Section */}
        <div className="grid gap-1">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>₦{orderDetails?.totalAmount - orderDetails?.deliveryPrice}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Delivery Price</p>
            <Label>₦{orderDetails?.deliveryPrice}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Total Amount with Delivery</p>
            <Label>₦{orderDetails?.totalAmount}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment method</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <Label>{orderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>
              <Badge
                className={`py-1 px-3 ${
                  orderDetails?.orderStatus === "confirmed"
                    ? "bg-green-500"
                    : orderDetails?.orderStatus === "rejected"
                    ? "bg-red-600"
                    : "bg-black"
                }`}
                as={motion.div}
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
        </div>
        <Separator />

        {/* Order Items */}
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
              {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                ? orderDetails?.cartItems.map((item) => (
                    <motion.li
                      key={item._id}
                      className="flex items-center justify-between"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span>Title: {item.title}</span>
                      <span>Quantity: {item.quantity}</span>
                      <span>Price: ₦{item.price}</span>
                    </motion.li>
                  ))
                : null}
            </ul>
          </div>
        </div>

        {/* Shipping Info */}
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              {/* <span>{user.userName}</span> */}
              <span>{orderDetails?.addressInfo?.fullName}</span>
              <span>{orderDetails?.addressInfo?.address}</span>
              <span>{orderDetails?.addressInfo?.lga}</span>
              <span>{orderDetails?.addressInfo?.state}</span>
              {/* <span>{orderDetails?.addressInfo?.pincode}</span> */}
              <span>{orderDetails?.addressInfo?.phone}</span>
              <span>{orderDetails?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;