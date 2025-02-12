import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";
import Footer from "./footer"; // Import Footer Component

const ShoppingLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white overflow-hidden">
      {/* Common header */}
      <ShoppingHeader />

      {/* Main Content */}
      <main className="flex-grow w-full">
        
        <Outlet />
      </main>

      {/* Common Footer */}
      <Footer />
    </div>
  );
};

export default ShoppingLayout;
