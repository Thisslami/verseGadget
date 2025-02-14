import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/shop/order-slice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

function PaystackReturnPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const reference = params.get("reference");

  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(true); // Track processing state
  const [isSuccessful, setIsSuccessful] = useState(null); // Track payment status

  useEffect(() => {
    if (reference) {
      const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
      console.log("Reference ID from Paystack:", reference);
      console.log("Order ID from sessionStorage:", orderId);

      if (!orderId) {
        console.error("Order ID is missing in session storage.");
        setIsProcessing(false); // Stop spinner
        return;
      }

      // Start processing payment
      dispatch(capturePayment({ reference, orderId })).then((data) => {
        console.log("Capture Payment Response:", data);
        setIsProcessing(false); // Stop spinner

        if (data?.payload?.success) {
          setIsSuccessful(true);
          sessionStorage.removeItem("currentOrderId");
          toast({
            title: "Payment Successful!",
            description: "Your payment has been successfully processed.",
          });
          setTimeout(() => navigate("/shop/payment-success"), 3000); // Redirect after 3s
        } else {
          setIsSuccessful(false);
          toast({
            title: "Payment Failed",
            description: "There was an error processing your payment.",
            variant: "destructive",
          });
        }
      });
    }
  }, [reference, dispatch, navigate, toast]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <Card className="p-10 shadow-lg rounded-lg">
        <CardHeader className="flex items-center justify-center">
          {isProcessing && (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Loader2 size={48} className="animate-spin text-blue-600" />
              <CardTitle className="mt-5 text-2xl text-gray-700">
                Processing Payment...Please wait!
              </CardTitle>
            </motion.div>
          )}

          {!isProcessing && isSuccessful && (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <CheckCircle size={60} className="text-green-600" />
              <CardTitle className="mt-5 text-2xl font-bold text-green-600">
                Payment Successful!
              </CardTitle>
            </motion.div>
          )}

          {!isProcessing && isSuccessful === false && (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <AlertCircle size={60} className="text-red-600" />
              <CardTitle className="mt-5 text-2xl font-bold text-red-600">
                Payment Failed
              </CardTitle>
              <Button
                className="mt-5 w-full bg-red-600 hover:bg-red-700 text-white"
                onClick={() => window.location.reload()}
              >
                Retry Payment
              </Button>
            </motion.div>
          )}
        </CardHeader>
      </Card>
    </motion.div>
  );
}

export default PaystackReturnPage;

