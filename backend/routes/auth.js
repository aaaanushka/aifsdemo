const express = require("express");
const router = express.Router();

const Student = require("../models/Student");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// 🔹 REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password, course } = req.body;

  try {
    const existingUser = await Student.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Student.create({
      name,
      email,
      password: hashedPassword,
      course
    });

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error in registration");
  }
});

// 🔹 LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Student.findOne({ email });

    if (!user) {
      return res.status(404).send("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send("Wrong password");
    }

    const token = jwt.sign(
  { id: user._id },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);

    res.json({ token });

  } catch (err) {
    console.log(err);
    res.status(500).send("Login error");
  }
});

const authMiddleware = require("../middleware/authMiddleware");

// 🔹 UPDATE COURSE
router.put("/update-course", authMiddleware, async (req, res) => {
  const { course } = req.body;

  try {
    const user = await Student.findByIdAndUpdate(
      req.user.id,
      { course },
      { new: true }
    );

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error updating course");
  }
});
module.exports = router;