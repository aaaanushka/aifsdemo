const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");

const app = express();

// 🔹 Middleware
app.use(express.json());
app.use(cors());

// 🔹 Routes
app.use("/api", authRoutes);

// 🔹 Database Connection + Server Start (FIXED)
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log("Mongo Error:", err);
  });