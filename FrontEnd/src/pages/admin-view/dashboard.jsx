

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTotalNumberOfOrders } from "@/store/admin/order-slice";
import { fetchVerifiedUserCount } from "@/store/admin/verified-users-slice";
import {
  getFeatureImages,
  addFeatureImage,
  deleteFeatureImage,
} from "@/store/common-slice";
import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";


function AdminDashboard() {
  const dispatch = useDispatch();
  const { verifiedUserCount, isLoading } = useSelector(
    (state) => state.verifiedUsers
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const { totalOrders, isLoading: isOrdersLoading } = useSelector(
    (state) => state.adminOrder
  );
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);

  // State for confirming delete
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchVerifiedUserCount()); // Fetch verified users count on load
    dispatch(getFeatureImages()); // Fetch feature images
    dispatch(getTotalNumberOfOrders());
  }, [dispatch]);

  function handleUploadFeatureImage() {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
      }
    });
  }

  // Function to handle image deletion
  function handleDeleteFeatureImage(id) {
    dispatch(deleteFeatureImage(id)); // Dispatch the delete action
    setShowConfirmDelete(false); // Close the confirmation modal
    setImageToDelete(null); // Clear the image to delete
  }

  // Function to show the confirmation modal
  function confirmDelete(id) {
    setImageToDelete(id);
    setShowConfirmDelete(true);
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row gap-6 justify-center">
        {/* Verified Users Card */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-1/2"
        >
          <Card className="shadow-xl border border-gray-200 bg-white p-4 rounded-lg">
            <CardHeader className="flex items-center gap-3">
              <Users className="text-blue-500 w-8 h-8" />
              <CardTitle>Verified Users</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <p className="text-gray-500">Loading...</p>
              ) : (
                <p className="text-2xl font-bold text-gray-800">
                  {verifiedUserCount}
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Total Orders Card */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-1/2"
        >
          <Card className="shadow-xl border border-gray-200 bg-white p-4 rounded-lg">
            <CardHeader className="flex items-center gap-3">
              <ShoppingCart className="text-green-500 w-8 h-8" />
              <CardTitle>Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
              {isOrdersLoading ? (
                <p className="text-gray-500">Loading...</p>
              ) : (
                <p className="text-2xl font-bold text-gray-800">
                  {totalOrders}
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Image Upload Section */}
      <div>
        <ProductImageUpload
          imageFile={imageFile}
          setImageFile={setImageFile}
          uploadedImageUrl={uploadedImageUrl}
          setUploadedImageUrl={setUploadedImageUrl}
          setImageLoadingState={setImageLoadingState}
          imageLoadingState={imageLoadingState}
          isCustomStyling={true}
        />
        <Button onClick={handleUploadFeatureImage} className="mt-5 w-full">
          Upload
        </Button>
      </div>

      {/* Feature Images Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featureImageList &&
          featureImageList.length > 0 &&
          featureImageList.map((featureImgItem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <img
                src={featureImgItem.image}
                className="w-full h-[250px] object-cover rounded-lg shadow-lg"
                alt="Feature"
              />
              {/* Delete button */}
              <Button
                onClick={() => confirmDelete(featureImgItem._id)}
                className="absolute top-2 right-2 bg-red-500 text-white"
              >
                Delete
              </Button>
            </motion.div>
          ))}
      </div>

      

      {/* Confirmation Modal */}
      {showConfirmDelete && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold text-center mb-4">
              Confirm Deletion
            </h2>
            <p className="text-center mb-6">
              Are you sure you want to delete this feature image?
            </p>
            <div className="flex justify-around">
              <Button
                onClick={() => handleDeleteFeatureImage(imageToDelete)}
                className="bg-red-500 text-white"
              >
                Yes, Delete
              </Button>
              <Button
                onClick={() => setShowConfirmDelete(false)}
                className="bg-gray-300 text-black"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      
    </div>
  );
}

export default AdminDashboard;

// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { addNewProduct } from "@/store/admin/products-slice";
// import { Button } from "@/components/ui/button";
// import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
// import { motion } from "framer-motion";
// import ProductImageUpload from "@/components/admin-view/image-upload";
// import CommonForm from "@/components/common/form";
// import { addProductFormElements } from "@/config/index";

// function AdminDashboard() {
//   const dispatch = useDispatch();

//   // Modal and form state
//   const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
//   const [formData, setFormData] = useState({ name: "", price: "", description: "" });
//   const [imageFile, setImageFile] = useState(null);
//   const [uploadedImageUrl, setUploadedImageUrl] = useState("");
//   const [imageLoadingState, setImageLoadingState] = useState(false);

//   const onSubmit = async (event) => {
//     event.preventDefault();
//     await dispatch(addNewProduct({ ...formData, imageUrl: uploadedImageUrl }));
//     setOpenCreateProductsDialog(false);
//     setFormData({ name: "", price: "", description: "" });
//     setUploadedImageUrl("");
//   };

//   return (
//     <div className="p-6 space-y-6">
//       {/* Add Product Button */}
//       <motion.div
//         className="mb-5 flex justify-end w-full"
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//       >
//         <Button onClick={() => setOpenCreateProductsDialog(true)}>Add New Product</Button>
//       </motion.div>

//       {/* Sheet Modal for Adding Product */}
//       <Sheet
//         open={openCreateProductsDialog}
//         onOpenChange={() => {
//           setOpenCreateProductsDialog(false);
//           setFormData({ name: "", price: "", description: "" });
//           setUploadedImageUrl("");
//         }}
//       >
//         <SheetContent
//           side="right"
//           className="overflow-auto"
//           as={motion.div}
//           initial={{ x: "100%" }}
//           animate={{ x: 0 }}
//           exit={{ x: "100%" }}
//           transition={{ type: "spring", stiffness: 200, damping: 30 }}
//         >
//           <SheetHeader>
//             <SheetTitle>
//               <h2>Add New Product</h2>
//             </SheetTitle>
//           </SheetHeader>

//           {/* Product Image Upload */}
//           <ProductImageUpload
//             imageFile={imageFile}
//             setImageFile={setImageFile}
//             uploadedImageUrl={uploadedImageUrl}
//             setUploadedImageUrl={setUploadedImageUrl}
//             setImageLoadingState={setImageLoadingState}
//             imageLoadingState={imageLoadingState}
//           />

//           {/* Product Form */}
//           <div className="py-6">
//             <CommonForm
//               onSubmit={onSubmit}
//               formData={formData}
//               setFormData={setFormData}
//               buttonText="Add Product"
//               formControls={addProductFormElements}
//             />
//           </div>
//         </SheetContent>
//       </Sheet>
//     </div>
//   );
// }

// export default AdminDashboard;
