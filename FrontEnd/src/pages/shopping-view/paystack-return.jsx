import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/shop/order-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function PaystackReturnPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const reference = params.get("reference");
  const navigate = useNavigate();

  useEffect(() => {
    if (reference) {
      const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
      console.log("Reference ID from Paystack:", reference);
      console.log("Order ID from sessionStorage:", orderId);

      if (!orderId) {
        console.error("Order ID is missing in session storage.");
        return;
      }

      dispatch(capturePayment({ reference, orderId })).then((data) => {
        console.log("Capture Payment Response:", data);

        if (data?.payload?.success) {
          sessionStorage.removeItem("currentOrderId");
          console.log("Order successfully processed. Redirecting to success page...");
          navigate("/shop/payment-success");        } else {
          console.error("Error in processing payment:", data?.payload?.message);
        }
      });
    }
  }, [reference, dispatch, navigate]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Payment...Please wait!</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default PaystackReturnPage;

// import { Card, CardHeader, CardTitle } from "@/components/ui/card";
// import { capturePayment } from "@/store/shop/order-slice";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { useLocation, useNavigate } from "react-router-dom";

// function PaystackReturnPage() {
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const params = new URLSearchParams(location.search);
//   const reference = params.get("reference");

//   useEffect(() => {
//     const token = localStorage.getItem("authToken"); // Get auth token from localStorage
//     if (!token) {
//       navigate("/auth/login"); // Redirect to login if no token exists
//       return;
//     }

//     if (reference) {
//       const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
//       console.log("Reference ID from Paystack:", reference);
//       console.log("Order ID from sessionStorage:", orderId);

//       if (!orderId) {
//         console.error("Order ID is missing in session storage.");
//         return;
//       }

//       // Dispatch payment capture action
//       dispatch(capturePayment({ reference, orderId, token })).then((data) => {
//         console.log("Capture Payment Response:", data);

//         if (data?.payload?.success) {
//           sessionStorage.removeItem("currentOrderId");
//           console.log("Order successfully processed. Redirecting to success page...");
//           navigate("/shop/payment-success");
//         } else {
//           console.error("Error in processing payment:", data?.payload?.message);
//         }
//       });
//     }
//   }, [reference, dispatch, navigate]);

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Processing Payment...Please wait!</CardTitle>
//       </CardHeader>
//     </Card>
//   );
// }

// export default PaystackReturnPage;



