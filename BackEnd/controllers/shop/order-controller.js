const { initializeTransaction, verifyTransaction } = require("../../helpers/paystack");
const Order = require("../../models/order");
const Cart = require("../../models/cart");
const Product = require("../../models/products");

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      payerId,
      cartId
    } = req.body;

    // Prepare data for Paystack payment initialization
    const paystackData = {
      email: payerId, // User email
      amount: totalAmount * 100, // Convert to kobo or cents
      currency: "NGN", // Update if using NGN or other currencies
      callback_url: "http://localhost:5173/shop/paystack-return", // Redirect URL
      metadata: {
        userId,
        cartItems, // Optional: send cart details for reference
      },
    };

    // Initialize transaction with Paystack
    const paymentResponse = await initializeTransaction(paystackData);

    if (paymentResponse && paymentResponse.status) {
      // Save the order in your database
      const newOrder = new Order({
        userId,
        cartId,
        cartItems,
        addressInfo,
        orderStatus,
        paymentMethod,
        paymentStatus,
        totalAmount,
        orderDate,
        orderUpdateDate,
        paymentId: paymentResponse.data.reference, // Paystack payment reference
        payerId,
      });

      await newOrder.save();

      // Respond with the approval URL and order details
      res.status(201).json({
        success: true,
        approvalURL: paymentResponse.data.authorization_url, // URL for payment
        orderId: newOrder._id,
      });
    } else {
      res.status(500).json({
        success: false,
        message: paymentResponse.message || "Failed to initialize Paystack transaction",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while processing the order",
    });
  }
};

const capturePayment = async (req, res) => {
  const { reference, orderId } = req.body;

  try {
    if (!reference || !orderId) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: reference or orderId",
      });
    }

    // Verify the Paystack transaction
    const paymentVerification = await verifyTransaction(reference);

    if (!paymentVerification.status || paymentVerification.data.status !== "success") {
      return res.status(400).json({
        success: false,
        message: paymentVerification.data.message || "Payment verification failed",
      });
    }

    // Find the order
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Update order payment status
    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    await order.save();

    // Update the product quantities in the cart
    for (let item of order.cartItems) {
      let product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Not enough stock for this product ${product.title}`,
        });
      }
      

      product.totalStock -= item.quantity;

      await product.save();
    }

    // Clear the cart
    const cartId = order.cartId;
    const cart = await Cart.findById(cartId);

    if (cart) {
      await Cart.findByIdAndDelete(cartId);
    }

    res.status(200).json({
      success: true,
      message: "Payment confirmed, cart cleared",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while capturing payment",
    });
  }
};

const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

module.exports = { createOrder, capturePayment, getAllOrdersByUser, getOrderDetails };
