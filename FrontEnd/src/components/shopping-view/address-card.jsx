import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        onClick={
          setCurrentSelectedAddress
            ? () => setCurrentSelectedAddress(addressInfo)
            : null
        }
        className={`cursor-pointer ${
          selectedId?._id === addressInfo?._id
            ? "border-red-900 border-[4px]"
            : "border-black"
        }`}
      >
        <CardContent className="grid p-4 gap-4">
          <Label>Full Name: {addressInfo?.fullName}</Label>
          <Label>Address: {addressInfo?.address}</Label>
          <Label>LGA: {addressInfo?.lga}</Label>
          <Label>City/State: {addressInfo?.state}</Label>
          <Label>Phone: {addressInfo?.phone}</Label>
          <Label>Postal Code: {addressInfo?.pincode}</Label>
          <Label>Country: {addressInfo?.country}</Label>
          {addressInfo?.notes && <Label>Notes: {addressInfo?.notes}</Label>}
        </CardContent>
        <CardFooter className="p-3 flex justify-between">
          <Button onClick={() => handleEditAddress(addressInfo)}>Edit</Button>
          <Button onClick={() => handleDeleteAddress(addressInfo)}>
            Delete
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default AddressCard;
