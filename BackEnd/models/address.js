// const mongoose = require("mongoose");

// const AddressSchema = new mongoose.Schema(
//   {
//     userId: String,
//     address: String,
//     city: String,
//     pincode: String,
//     phone: String,
//     notes: String,
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Address", AddressSchema);

const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
  {
    userId: String,
    fullName: String, // New field
    address: String,
    lga: String, // New field
    state: String, // New field
    phone: String,
    pincode: String,
    country: { type: String, default: "Nigeria" }, // Default to Nigeria
    notes: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", AddressSchema);
