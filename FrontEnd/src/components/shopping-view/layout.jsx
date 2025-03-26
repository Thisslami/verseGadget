// import { Outlet } from "react-router-dom";
// import ShoppingHeader from "./header";
// import Footer from "./footer"; // Import Footer Component

// const ShoppingLayout = () => {
//   return (
//     <div className="flex flex-col min-h-screen bg-white overflow-hidden">
//       {/* Common header */}
//       <ShoppingHeader />

//       {/* Main Content */}
//       <main className="flex-grow w-full">
        
//         <Outlet />
//       </main>

//       {/* Common Footer */}
//       <Footer />
//     </div>
//   );
// };

// export default ShoppingLayout;


import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";
import Footer from "./footer";
import { FaWhatsapp } from "react-icons/fa";

const ShoppingLayout = () => {
  const whatsappMessage = "Hi, I would love to place an order";
  const whatsappNumber = "2349025765871"; // Your WhatsApp number with country code

  return (
    <div className="flex flex-col min-h-screen bg-white overflow-hidden relative">
      {/* Common header */}
      <ShoppingHeader />

      {/* Main Content */}
      <main className="flex-grow w-full">
        <Outlet />
      </main>

      {/* Common Footer */}
      <Footer />

      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-peach-500 hover:bg-peach-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:shadow-xl"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="w-8 h-8" />
      </a>
    </div>
  );
};

export default ShoppingLayout;