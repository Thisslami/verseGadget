import { Outlet } from "react-router-dom"
import ShoppingHeader from "./header";
// import Footer from "./footer";




const ShoppingLayout = () => {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
      {/* common header */}
      <ShoppingHeader />
      
      <main className="flex flex-col w-full">
        <Outlet />
      </main>

      {/* Footer that will show on every page */}
      {/* <Footer/> */}
    </div>
  );
};


export default ShoppingLayout;