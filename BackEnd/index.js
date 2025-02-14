const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrdersRouter = require("./routes/admin/order-routes");
const adminVerifiedUsersRouter = require("./routes/admin/verified-user-routes");
const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressesRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes")
const shopSearchRouter = require("./routes/shop/search-routes")
const shopReviewRouter = require("./routes/shop/review-routes")
const commonFeaturesRouter = require("./routes/common/features-routes")

const dbURL = process.env.MONGODB_URL;

 // Fetch the database URL from the environment variables

// Connect to MongoDB
mongoose
  .connect(dbURL) // Ensure options are passed
  .then(() => {
    console.log("Connected to MongoDB");

    const app = express(); // Initialize the Express app
    const PORT = process.env.PORT || 8050;

    // Middleware setup
    app.use(
      cors({
        origin: ["http://localhost:5173", "https://versegadget-server.onrender.com"],

        // Update this to match your front-end URL
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: [
          "Content-Type",
          "Authorization",
          "Cache-Control",
          "Expires",
          "Pragma",
        ],
        credentials: true,
      })
    );
    app.use(express.json());
    app.use(cookieParser());
    app.use("/api/auth", authRouter);
    app.use("/api/admin/products", adminProductsRouter);
    app.use("/api/admin/orders", adminOrdersRouter);
    app.use("/api/admin/verified-users",adminVerifiedUsersRouter);
    app.use("/api/shop/products", shopProductsRouter);
    app.use("/api/shop/cart", shopCartRouter);
    app.use("/api/shop/address", shopAddressesRouter);
    app.use("/api/shop/order", shopOrderRouter); 
    app.use("/api/shop/search", shopSearchRouter);
    app.use("/api/shop/review", shopReviewRouter);
    app.use("/api/common/features", commonFeaturesRouter);
    // Start the server
    app.listen(PORT, () =>
      console.log(`😍😍 Server is now running on port ${PORT} 🎉🥳`)
    );
  })
  .catch((error) => console.error("Failed to connect to MongoDB", error));
