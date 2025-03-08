// import { brandOptionsMap, categoryOptionsMap } from "@/config";
// import { Badge } from "../ui/badge";
// import { Button } from "../ui/button";
// import { Card, CardContent, CardFooter } from "../ui/card";
// import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

// function ShoppingProductTile({
//   product,
//   handleGetProductDetails,
//   handleAddToCart,
// }) {
//   return (
//     <Card className="w-full max-w-sm mx-auto hover:bg-gray-300 hover:shadow-lg transition duration-300 ease-in-out">
//       <div
//         onClick={() => handleGetProductDetails(product?._id)}
//         className="relative cursor-pointer"
//       >
//         <div className="relative">
//           <img
//             src={product?.image}
//             alt={product?.title}
//             className="w-full h-[300px] object-cover rounded-t-lg"
//           />

//           {product?.totalStock === 0 ? (
//             <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
//               Out Of Stock
//             </Badge>
//           ) : product?.totalStock < 10 ? (
//             <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
//               {`Only ${product?.totalStock} items left`}
//             </Badge>
//           ) : product?.salePrice > 0 ? (
//             <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
//               Sale
//             </Badge>
//           ) : null}

//           {/* Tooltip on hover */}
//           <Tooltip>
//             <TooltipTrigger asChild>
//               <div className="absolute bottom-2 right-2 p-1 text-sm bg-gray-900 text-white rounded-lg">
//                 Hover for details
//               </div>
//             </TooltipTrigger>
//             <TooltipContent>
//               {product?.description || "No description available"}
//             </TooltipContent>
//           </Tooltip>
//         </div>

//         <CardContent className="p-4">
//           <h2 className="text-sm font-bold mb-2">{product?.title}</h2>
//           <div className="flex justify-between items-center mb-2">
//             <span className="text-sm text-muted-foreground">
//               {categoryOptionsMap[product?.category]}
//             </span>
//             <span className="text-sm text-muted-foreground">
//               {brandOptionsMap[product?.brand]}
//             </span>
//           </div>
//           <div className="flex justify-between items-center mb-2">
//             <span
//               className={`${
//                 product?.salePrice > 0 ? "line-through " : ""
//               }text-lg font-semibold text-primary`}
//             >
//               ₦{product?.price}
//             </span>
//             {product?.salePrice > 0 ? (
//               <span className="text-lg font-semibold text-primary">
//                 ₦{product?.salePrice}
//               </span>
//             ) : null}
//           </div>
//         </CardContent>
//       </div>

//       <CardFooter>
//         {product?.totalStock === 0 ? (
//           <Button className="w-full opacity-60 cursor-not-allowed">
//             Out Of Stock
//           </Button>
//         ) : (
//           <Button
//             onClick={() => handleAddToCart(product?._id, product?.totalStock)}
//             className="w-full"
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
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

function ShoppingProductTile({ product, handleGetProductDetails, handleAddToCart }) {
  return (
    <Card className="w-full max-w-sm mx-auto hover:bg-gray-300 hover:shadow-lg transition duration-300 ease-in-out">
      <div
        onClick={() => handleGetProductDetails(product?._id)}
        className="relative cursor-pointer overflow-hidden"
      >
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />

          {/* Out of Stock & Sale Badges */}
          {product?.totalStock === 0 ? (
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute top-2 left-2"
            >
              <Badge className="bg-red-500 hover:bg-red-600">Out Of Stock</Badge>
            </motion.div>
          ) : product?.totalStock < 10 ? (
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute top-2 left-2"
            >
              <Badge className="bg-red-500 hover:bg-red-600">
                {`Only ${product?.totalStock} left`}
              </Badge>
            </motion.div>
          ) : product?.salePrice > 0 ? (
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute top-2 left-2"
            >
              <Badge className="bg-red-500 hover:bg-red-600">Sale</Badge>
            </motion.div>
          ) : null}

          {/* Product Condition Badge */}
          {product?.condition && (
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute top-2 right-2"
            >
              <Badge
                className={`${
                  product?.condition === "Brand New"
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-yellow-500 hover:bg-yellow-600"
                }`}
              >
                {product?.condition}
              </Badge>
            </motion.div>
          )}

          {/* Tooltip on hover */}
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 3 }}
                className="absolute bottom-2 right-2 p-1 text-sm bg-gray-900 text-white rounded-lg"
              >
                Hover for details
              </motion.div>
            </TooltipTrigger>
            <TooltipContent>
              {product?.description || "No description available"}
            </TooltipContent>
          </Tooltip>
        </div>

        <CardContent className="p-4">
          <h2 className="text-sm font-bold mb-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-sm text-muted-foreground">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ₦{product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-semibold text-primary">
                ₦{product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>

      <CardFooter>
        {product?.totalStock === 0 ? (
          <Button className="w-full opacity-60 cursor-not-allowed">
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddToCart(product?._id, product?.totalStock)}
            className="w-full"
          >
            Add to cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;


