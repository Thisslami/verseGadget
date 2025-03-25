
// import { motion } from "framer-motion";
// import { brandOptionsMap, categoryOptionsMap } from "@/config";
// import { Badge } from "../ui/badge";
// import { Button } from "../ui/button";
// import { Card, CardContent, CardFooter } from "../ui/card";


// function ShoppingProductTile({ product, handleGetProductDetails, handleAddToCart }) {
//   const discountPercentage =
//     product?.salePrice > 0
//       ? Math.round(((product?.price - product?.salePrice) / product?.price) * 100)
//       : 0;

//   return (
//     <Card className="w-full hover:bg-gray-300 hover:shadow-lg transition duration-300 ease-in-out">
//       <div
//         onClick={() => handleGetProductDetails(product?._id)}
//         className="relative cursor-pointer overflow-hidden"
//       >
//         <div className="relative">
//           <img
//             src={product?.image}
//             alt={product?.title}
//             className="w-full h-32 sm:h-48 md:h-56 object-contain rounded-t-lg"
//           />

//           {/* Badges Container */}
//           <div className="absolute top-2 left-2 flex flex-col space-y-1">
//             {/* Out of Stock & Sale Badges */}
//             {product?.totalStock === 0 ? (
//               <motion.div
//                 initial={{ x: -50, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 <Badge className="text-[10px] px-1.5 py-0.5 bg-red-500 hover:bg-red-600">Out Of Stock</Badge>
//               </motion.div>
//             ) : product?.totalStock < 10 ? (
//               <motion.div
//                 initial={{ x: -50, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 <Badge className="text-[10px] px-1.5 py-0.5 bg-red-500 hover:bg-red-600">
//                   {`Only ${product?.totalStock} left`}
//                 </Badge>
//               </motion.div>
//             ) : product?.salePrice > 0 ? (
//               <motion.div
//                 initial={{ x: -50, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 <Badge className="text-[10px] px-1.5 py-0.5 bg-red-500 hover:bg-red-600">Sale</Badge>
//               </motion.div>
//             ) : null}
//           </div>

//           {/* Product Condition and Discount Badges */}
//           {product?.condition && (
//             <motion.div
//               initial={{ y: -50, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               whileHover={{ scale: 1.1 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//               className="absolute top-2 right-2 flex flex-col space-y-1"
//             >
//               <Badge
//                 className={`text-[10px] px-1.5 py-0.5 ${
//                   product?.condition === "Brand New"
//                     ? "bg-green-500 hover:bg-green-600"
//                     : "bg-yellow-500 hover:bg-yellow-600"
//                 }`}
//               >
//                 {product?.condition}
//               </Badge>

//               {/* Discount Badge */}
//               {product?.salePrice > 0 && (
//                 <Badge className="text-[10px] px-1.5 py-0.5 bg-blue-500 hover:bg-blue-600">
//                   {discountPercentage}% Off
//                 </Badge>
//               )}
//             </motion.div>
//           )}
//         </div>

//         <CardContent className="p-2 sm:p-4">
//           <h2 className="text-xs sm:text-sm font-bold mb-1 sm:mb-2">{product?.title}</h2>
//           <div className="flex justify-between items-center mb-1 sm:mb-2">
//             <span className="text-xs text-muted-foreground">
//               {categoryOptionsMap[product?.category]}
//             </span>
//             <span className="text-xs text-muted-foreground">
//               {brandOptionsMap[product?.brand]}
//             </span>
//           </div>
//           <div className="flex justify-between items-center mb-1 sm:mb-2">
//             <span
//               className={`${
//                 product?.salePrice > 0 ? "line-through" : ""
//               } text-xs sm:text-sm font-semibold text-primary`}
//             >
//               ₦{product?.price}
//             </span>
//             {product?.salePrice > 0 ? (
//               <span className="text-xs sm:text-sm font-semibold text-primary">
//                 ₦{product?.salePrice}
//               </span>
//             ) : null}
//           </div>
//         </CardContent>
//       </div>

//       <CardFooter className="p-2 sm:p-4">
//         {product?.totalStock === 0 ? (
//           <Button className="w-full text-xs opacity-60 cursor-not-allowed">
//             Out Of Stock
//           </Button>
//         ) : (
//           <Button
//             onClick={() => handleAddToCart(product?._id, product?.totalStock)}
//             className="w-full text-xs sm:text-sm"
//           >
//             Add to cart
//           </Button>
//         )}
//       </CardFooter>
//     </Card>
//   );
// }

// export default ShoppingProductTile;

// import { motion } from "framer-motion";
// import { brandOptionsMap, categoryOptionsMap } from "@/config";
// import { Badge } from "../ui/badge";
// import { Button } from "../ui/button";
// import { Card, CardContent, CardFooter } from "../ui/card";

// function ShoppingProductTile({ product, handleGetProductDetails, handleAddToCart }) {
//   const discountPercentage =
//     product?.salePrice > 0
//       ? Math.round(((product?.price - product?.salePrice) / product?.price) * 100)
//       : 0;

//   return (
//     <Card className="w-full hover:bg-gray-50 hover:shadow-lg transition duration-300 ease-in-out">
//       <div
//         onClick={() => handleGetProductDetails(product?._id)}
//         className="relative cursor-pointer overflow-hidden"
//       >
//         <div className="relative">
//           <img
//             src={product?.image}
//             alt={product?.title}
//             className="w-full h-32 sm:h-48 md:h-56 object-contain rounded-t-lg"
//           />

//           {/* Badges Container */}
//           <div className="absolute top-2 left-2 flex flex-col space-y-1">
//             {/* Out of Stock & Sale Badges */}
//             {product?.totalStock === 0 ? (
//               <motion.div
//                 initial={{ x: -50, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 <Badge className="text-[10px] px-1.5 py-0.5 bg-red-500 hover:bg-red-600">Out Of Stock</Badge>
//               </motion.div>
//             ) : product?.totalStock < 10 ? (
//               <motion.div
//                 initial={{ x: -50, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 <Badge className="text-[10px] px-1.5 py-0.5 bg-red-500 hover:bg-red-600">
//                   {`Only ${product?.totalStock} left`}
//                 </Badge>
//               </motion.div>
//             ) : product?.salePrice > 0 ? (
//               <motion.div
//                 initial={{ x: -50, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 <Badge className="text-[10px] px-1.5 py-0.5 bg-red-500 hover:bg-red-600">Sale</Badge>
//               </motion.div>
//             ) : null}
//           </div>

//           {/* Product Condition and Discount Badges */}
//           {product?.condition && (
//             <motion.div
//               initial={{ y: -50, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               whileHover={{ scale: 1.1 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//               className="absolute top-2 right-2 flex flex-col space-y-1"
//             >
//               <Badge
//                 className={`text-[10px] px-1.5 py-0.5 ${
//                   product?.condition === "Brand New"
//                     ? "bg-green-500 hover:bg-green-600"
//                     : "bg-yellow-500 hover:bg-yellow-600"
//                 }`}
//               >
//                 {product?.condition}
//               </Badge>

//               {/* Discount Badge */}
//               {product?.salePrice > 0 && (
//                 <Badge className="text-[10px] px-1.5 py-0.5 bg-blue-500 hover:bg-blue-600">
//                   {discountPercentage}% Off
//                 </Badge>
//               )}
//             </motion.div>
//           )}
//         </div>

//         <CardContent className="p-2 sm:p-4">
//           <h2 className="text-xs sm:text-sm font-bold mb-1 sm:mb-2">{product?.title}</h2>
//           <div className="flex justify-between items-center mb-1 sm:mb-2">
//             <span className="text-xs text-muted-foreground">
//               {categoryOptionsMap[product?.category]}
//             </span>
//             <span className="text-xs text-muted-foreground">
//               {brandOptionsMap[product?.brand]}
//             </span>
//           </div>
//           <div className="flex justify-between items-center mb-1 sm:mb-2">
//             <span
//               className={`${
//                 product?.salePrice > 0 ? "line-through" : ""
//               } text-xs sm:text-sm font-semibold text-peach-600`}
//             >
//               ₦{product?.price}
//             </span>
//             {product?.salePrice > 0 ? (
//               <span className="text-xs sm:text-sm font-semibold text-peach-600">
//                 ₦{product?.salePrice}
//               </span>
//             ) : null}
//           </div>
//         </CardContent>
//       </div>

//       <CardFooter className="p-2 sm:p-4">
//         {product?.totalStock === 0 ? (
//           <Button className="w-full text-xs opacity-60 cursor-not-allowed">
//             Out Of Stock
//           </Button>
//         ) : (
//           <Button
//             onClick={() => handleAddToCart(product?._id, product?.totalStock)}
//             className="w-full text-xs sm:text-sm hover:bg-peach-600"
//           >
//             Add to cart
//           </Button>
//         )}
//       </CardFooter>
//     </Card>
//   );
// }

// export default ShoppingProductTile;

import { motion } from "framer-motion";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function ShoppingProductTile({ product, handleGetProductDetails, handleAddToCart }) {
  const discountPercentage =
    product?.salePrice > 0
      ? Math.round(((product?.price - product?.salePrice) / product?.price) * 100)
      : 0;

  return (
    <Card className="w-full hover:bg-gray-50 hover:shadow-lg transition duration-300 ease-in-out">
      <div
        onClick={() => handleGetProductDetails(product?._id)}
        className="relative cursor-pointer overflow-hidden"
      >
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-32 sm:h-48 md:h-56 object-contain rounded-t-lg"
          />

          {/* Badges Container */}
          <div className="absolute top-2 left-2 flex flex-col space-y-1">
            {/* Out of Stock & Sale Badges */}
            {product?.totalStock === 0 ? (
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Badge className="text-[9px] px-1.5 py-0.5 h-5 bg-red-500 hover:bg-red-600">Out Of Stock</Badge>
              </motion.div>
            ) : product?.totalStock < 10 ? (
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Badge className="text-[9px] px-1.5 py-0.5 h-5 bg-red-500 hover:bg-red-600">
                  {`Only ${product?.totalStock} left`}
                </Badge>
              </motion.div>
            ) : product?.salePrice > 0 ? (
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Badge className="text-[9px] px-1.5 py-0.5 h-5 bg-red-500 hover:bg-red-600">Sale</Badge>
              </motion.div>
            ) : null}
          </div>

          {/* Product Condition and Discount Badges */}
          {product?.condition && (
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute top-2 right-2 flex flex-col space-y-1"
            >
              <Badge
                className={`text-[9px] px-1.5 py-0.5 h-5 ${
                  product?.condition === "Brand New"
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-yellow-500 hover:bg-yellow-600"
                }`}
              >
                {product?.condition}
              </Badge>

              {/* Discount Badge - Made more compact */}
              {product?.salePrice > 0 && (
                <Badge className="text-[9px] px-[6px] py-0 h-5 bg-blue-500 hover:bg-blue-600 flex items-center justify-center">
                  {discountPercentage}%
                </Badge>
              )}
            </motion.div>
          )}
        </div>

        <CardContent className="p-2 sm:p-4">
          <h2 className="text-xs sm:text-sm font-bold mb-1 sm:mb-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-1 sm:mb-2">
            <span className="text-xs text-muted-foreground">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-xs text-muted-foreground">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>
          <div className="flex justify-between items-center mb-1 sm:mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-xs sm:text-sm font-semibold text-peach-600`}
            >
              ₦{product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-xs sm:text-sm font-semibold text-peach-600">
                ₦{product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>

      <CardFooter className="p-2 sm:p-4">
        {product?.totalStock === 0 ? (
          <Button className="w-full text-xs opacity-60 cursor-not-allowed">
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddToCart(product?._id, product?.totalStock)}
            className="w-full text-xs sm:text-sm hover:bg-peach-600"
          >
            Add to cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;