import { Card, CardHeader, CardContent, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "../ui/table";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import AdminOrderDetailsView from "./order-details";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
  deleteOrder,
} from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetailsForAdmin(getId));
  }

  function handleConfirmDelete(id) {
    setSelectedOrderId(id);
    setOpenDeleteDialog(true);
  }

  function handleDeleteOrder() {
    if (!selectedOrderId) return;
    dispatch(deleteOrder(selectedOrderId))
      .unwrap()
      .then((res) => {
        toast({ title: "Success", description: res.message });
        dispatch(getAllOrdersForAdmin()); // Refresh orders list
      })
      .catch(() => {
        toast({ title: "Error", description: "Failed to delete order!" });
      });
    setOpenDeleteDialog(false);
    setSelectedOrderId(null);
  }

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order Id</TableHead>
                  <TableHead>Order Date</TableHead>
                  <TableHead>Order Status</TableHead>
                  <TableHead>Order Price</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderList && orderList.length > 0
                  ? orderList.map((orderItem) => (
                      <motion.tr
                        key={orderItem?._id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <TableCell>{orderItem?._id}</TableCell>
                        <TableCell>
                          {orderItem?.orderDate.split("T")[0]}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`py-1 px-3 ${
                              orderItem?.orderStatus === "confirmed"
                                ? "bg-green-500"
                                : orderItem?.orderStatus === "rejected"
                                ? "bg-red-600"
                                : "bg-black"
                            }`}
                          >
                            {orderItem?.orderStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>₦{orderItem?.totalAmount}</TableCell>
                        <TableCell>
                          <Dialog
                            open={openDetailsDialog}
                            onOpenChange={() => {
                              setOpenDetailsDialog(false);
                              dispatch(resetOrderDetails());
                            }}
                          >
                            <Button
                              onClick={() =>
                                handleFetchOrderDetails(orderItem?._id)
                              }
                              className="px-2 py-1 text-sm font-medium"
                            >
                              View Details
                            </Button>
                            <AdminOrderDetailsView orderDetails={orderDetails} />
                          </Dialog>
                          <Button
                            onClick={() => handleConfirmDelete(orderItem?._id)}
                            className="px-2 py-1 text-sm font-medium bg-red-600 hover:bg-red-700 ml-2"
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </motion.tr>
                    ))
                  : null}
              </TableBody>
            </Table>
          </CardContent>
        </CardHeader>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this order? This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpenDeleteDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700" onClick={handleDeleteOrder}>
              Confirm Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

export default AdminOrdersView;
