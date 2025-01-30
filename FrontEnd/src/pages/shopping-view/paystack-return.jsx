import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/shop/order-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

function PaystackReturnPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const reference = params.get("reference");

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
          window.location.href = "/shop/payment-success";
        } else {
          console.error("Error in processing payment:", data?.payload?.message);
        }
      });
    }
  }, [reference, dispatch]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Payment...Please wait!</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default PaystackReturnPage;
