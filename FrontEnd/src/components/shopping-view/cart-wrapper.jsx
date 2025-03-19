
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";
import { ScrollArea } from "../ui/scroll-area"; // Add a scrollable area for cart items
import { Separator } from "../ui/separator"; // Add dividers between items

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <ScrollArea className="h-[calc(100vh-200px)] pr-4">
        <div className="mt-4 space-y-4">
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div key={item.productId}>
                <UserCartItemsContent cartItem={item} />
                {index < cartItems.length - 1 && <Separator className="my-4" />}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          )}
        </div>
      </ScrollArea>
      <div className="mt-6 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">₦{totalCartAmount.toFixed(2)}</span>
        </div>
        <Button
          onClick={() => {
            navigate("/shop/checkout");
            setOpenCartSheet(false);
          }}
          className="w-full mt-4"
          disabled={cartItems.length === 0}
        >
          Checkout
        </Button>
      </div>
    </SheetContent>
  );
}

export default UserCartWrapper;