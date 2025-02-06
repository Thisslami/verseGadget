// import { House, LogOut, Menu, ShoppingCart, User, Search } from "lucide-react";
// import { Link, useNavigate, useSearchParams, useLocation } from "react-router-dom";
// import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
// import { Button } from "../ui/button";
// import { useDispatch, useSelector } from "react-redux";
// import { shoppingViewHeaderMenuItems } from "@/config";
// import { Avatar, AvatarFallback } from "../ui/avatar";
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuContent,
// } from "../ui/dropdown-menu";
// import { logoutUser } from "@/store/auth-slice";
// import UserCartWrapper from "./cart-wrapper";
// import { useEffect, useState } from "react";
// import { fetchCartItems } from "@/store/shop/cart-slice";
// import { Label } from "../ui/label";
// import {
//   AlertDialog,
//   AlertDialogTrigger,
//   AlertDialogContent,
//   AlertDialogHeader,
//   AlertDialogFooter,
//   AlertDialogTitle,
//   AlertDialogDescription,
//   AlertDialogCancel,
//   AlertDialogAction,
// } from "@/components/ui/alert-dialog";

// function MenuItems() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [searchParams, setSearchParams] = useSearchParams();

//   function handleNavigate(getCurrentMenuItem) {
//     sessionStorage.removeItem("filters");
//     const currentFilter =
//       getCurrentMenuItem.id !== "home" && getCurrentMenuItem.id !== "products"
//         ? { category: [getCurrentMenuItem.id] }
//         : null;

//     sessionStorage.setItem("filters", JSON.stringify(currentFilter));

//     if (location.pathname.includes("listing") && currentFilter !== null) {
//       setSearchParams(new URLSearchParams(`?category=${getCurrentMenuItem.id}`));
//     } else {
//       navigate(getCurrentMenuItem.path);
//     }
//   }

//   return (
//     <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
//       {shoppingViewHeaderMenuItems.map((menuItem) => (
//         <Label
//           key={menuItem.id}
//           onClick={() => handleNavigate(menuItem)}
//           className="text-sm font-medium cursor-pointer flex items-center gap-2"
//         >
//           {menuItem.label}
//         </Label>
//       ))}
//     </nav>
//   );
// }

// function HeaderRightContent() {
//   const { user } = useSelector((state) => state.auth);
//   const { cartItems } = useSelector((state) => state.shopCart);
//   const [openCartSheet, setOpenCartSheet] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   function handleLogout() {
//     dispatch(logoutUser());
//   }

//   useEffect(() => {
//     if (user?.id) {
//       dispatch(fetchCartItems(user.id));
//     }
//   }, [dispatch, user?.id]);

//   return (
//     <div className="flex lg:items-center lg:flex-row flex-col gap-4">
//       <Button onClick={() => navigate("/shop/search")} variant="outline" size="icon" className="relative">
//         <Search className="w-6 h-6" />
//         <span className="sr-only">Search</span>
//       </Button>

//       <Sheet open={openCartSheet} onOpenChange={setOpenCartSheet}>
//         <Button onClick={() => setOpenCartSheet(true)} variant="outline" size="icon" className="relative">
//           <ShoppingCart className="w-6 h-6" />
//           {cartItems?.items?.length > 0 && (
//             <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white text-xs font-bold">
//               {cartItems.items.length}
//             </span>
//           )}
//           <span className="sr-only">User cart</span>
//         </Button>
//         <UserCartWrapper setOpenCartSheet={setOpenCartSheet} cartItems={cartItems?.items ?? []} />
//       </Sheet>

//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Avatar className="bg-black">
//             <AvatarFallback className="bg-black text-white font-extrabold">
//               {user?.userName?.charAt(0).toUpperCase() ?? "U"}
//             </AvatarFallback>
//           </Avatar>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent side="right" className="w-56">
//           <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem onClick={() => navigate("/shop/account")}>
//             <User className="mr-2 h-4 w-4" />
//             Account
//           </DropdownMenuItem>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem onClick={handleLogout}>
//             <LogOut className="mr-2 h-4 w-4" />
//             Logout
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </div>
//   );
// }

// function ShoppingHeader() {
//   return (
//     <header className="sticky top-0 z-40 w-full border-b bg-background">
//       <div className="flex h-16 items-center justify-between px-4 md:px-6">
//         <Link to="/shop/home" className="flex items-center gap-2">
//           <House className="h-6 w-6" />
//           <span className="font-extrabold">Gadgetverse</span>
//         </Link>

//         <Sheet>
//           <SheetTrigger asChild>
//             <Button variant="outline" size="icon" className="lg:hidden">
//               <Menu className="h-6 w-6" />
//               <span className="sr-only">Toggle header menu</span>
//             </Button>
//           </SheetTrigger>
//           <SheetContent side="left" className="w-full max-w-xs">
//             <MenuItems />
//             <HeaderRightContent />
//           </SheetContent>
//         </Sheet>

//         <div className="hidden lg:block">
//           <MenuItems />
//         </div>

//         <div className="hidden lg:block">
//           <HeaderRightContent />
//         </div>
//       </div>
//     </header>
//   );
// }

// export default ShoppingHeader;

import { House, LogOut, Menu, ShoppingCart, User, Search } from "lucide-react";
import { Link, useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuContent,
} from "../ui/dropdown-menu";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";

function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" && getCurrentMenuItem.id !== "products"
        ? { category: [getCurrentMenuItem.id] }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(new URLSearchParams(`?category=${getCurrentMenuItem.id}`))
      : navigate(getCurrentMenuItem.path);
  }

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          onClick={() => handleNavigate(menuItem)}
          className="text-sm font-medium cursor-pointer flex items-center gap-2"
          key={menuItem.id}
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
    setIsLogoutDialogOpen(false);
  }

  useEffect(() => {
    if (user?.Id && cartItems.length > 0) {
      dispatch(fetchCartItems(user?.Id));
    }
    
  }, [dispatch]);

  // useEffect(() => {
  //   console.log("User state in header:", user);
  // }, [user]);
  

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      {/* Search Button */}
      <Button
        onClick={() => navigate("/shop/search")}
        variant="outline"
        size="icon"
        className="relative"
      >
        <Search 
        className="w-6 h-6"
         />
        <span className="sr-only">Search</span>
      </Button>

      {/* Cart Button */}
      <Sheet
        open={openCartSheet}
        onOpenChange={() => setOpenCartSheet(false)}
      >
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
          className="relative"
        >
          <ShoppingCart className="w-6 h-6" />
          {/* Red Badge for Cart Items */}
          {cartItems?.items?.length > 0 && (
            <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white text-xs font-bold">
              {cartItems.items.length}
            </span>
          )}
          <span className="sr-only">User cart</span>
        </Button>

        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={cartItems?.items?.length > 0 ? cartItems.items : []}
        />
      </Sheet>

      {/* User Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black">
            <AvatarFallback className="bg-black text-white font-extrabold">
              {user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/shop/account")}>
            <User className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsLogoutDialogOpen(true)}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Logout Confirmation Dialog */}
      <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to log out?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsLogoutDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ShoppingHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link to="/shop/home" className="flex items-center gap-2">
          <House className="h-6 w-6" />
          <span className="font-extrabold">Geelaw Technologies</span>
        </Link>

        {/* Mobile Menu Button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>

        {/* Desktop Navigation */}
        <div className="hidden lg:block">
          <MenuItems />
        </div>

        {/* Desktop Header Right Content */}
        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;

