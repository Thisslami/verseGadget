// const express = require("express");

// const {
//   createOrder,
//   getAllOrdersByUser,
//   getOrderDetails,

//   capturePayment,
// } = require("../../controllers/shop/order-controller");

// const router = express.Router();

// router.post("/create", createOrder);
// router.post("/capture", capturePayment);
// router.get("/list/:userId", getAllOrdersByUser);
// router.get("/details/:id", getOrderDetails);

// module.exports = router;

const express = require("express");
const {
  createOrder,
  getAllOrdersByUser,
  getOrderDetails,
  capturePayment,
  handlePaystackReturn, // Import the new method
} = require("../../controllers/shop/order-controller");

const router = express.Router();

router.post("/create", createOrder);
router.post("/capture", capturePayment);
router.get("/list/:userId", getAllOrdersByUser);
router.get("/details/:id", getOrderDetails);
router.get("/paystack-return", handlePaystackReturn); // New route for Paystack callback

module.exports = router;

