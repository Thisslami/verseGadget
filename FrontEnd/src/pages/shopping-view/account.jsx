// import { motion } from "framer-motion";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import Address from "@/components/shopping-view/address";
// import ShoppingOrders from "@/components/shopping-view/orders";

// function ShoppingAccount() {
//   return (
//     <motion.div
//       className="flex flex-col"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <div className="relative w-full h-[370px] bg-gradient-to-r from-blue-500 to-green-400 flex justify-center items-center text-white">
//   <h2 className="text-3xl font-bold">My Shopping Account</h2>
// </div>

//       <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
//         <motion.div
//           className="flex flex-col rounded-lg border bg-background p-6 shadow-sm"
//           initial={{ scale: 0.95 }}
//           animate={{ scale: 1 }}
//           transition={{ duration: 0.3 }}
//         >
//           <Tabs defaultValue="orders">
//             <TabsList>
//               <TabsTrigger value="orders">Orders</TabsTrigger>
//               <TabsTrigger value="address">Address</TabsTrigger>
//             </TabsList>
//             <TabsContent value="orders">
//               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
//                 <ShoppingOrders />
//               </motion.div>
//             </TabsContent>
//             <TabsContent value="address">
//               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
//                 <Address />
//               </motion.div>
//             </TabsContent>
//           </Tabs>
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// }

// export default ShoppingAccount;

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Address from "@/components/shopping-view/address";
import ShoppingOrders from "@/components/shopping-view/orders";
import { Button } from "@/components/ui/button";

function ShoppingAccount() {
  return (
    <motion.div
      className="flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header with Peach Theme */}
      <div className="relative w-full h-[370px] bg-gradient-to-r from-[#FF9F80] to-[#FFCBA4] flex justify-center items-center text-white">
        <h2 className="text-3xl font-bold">My Shopping Account</h2>
      </div>

      <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
        <motion.div
          className="flex flex-col rounded-lg border bg-background p-6 shadow-sm"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>

            {/* Orders Tab */}
            <TabsContent value="orders">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <ShoppingOrders />
                {/* Return to Shop Button */}
                <div className="mt-6 flex justify-center">
                  <Button asChild className="bg-peach-500 hover:bg-peach-300 text-white font-semibold">
                    <Link to="/shop/home">← Return to Shop</Link>
                  </Button>
                </div>
              </motion.div>
            </TabsContent>

            {/* Address Tab */}
            <TabsContent value="address">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <Address />
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default ShoppingAccount;

