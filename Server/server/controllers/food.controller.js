const express = require("express");
const foodData = require("../models/food.model");
const router = express.Router();

//--------------------Get request-------------------------
router.get("/", async (req, res) => {
  const query = { createdAt: -1 };
  try {
    const foodItems = await foodData.find().sort(query).lean().exec();
    res.status(200).json({
      data: foodItems,
      message: "Food data is displayed successfully",
    });
  } catch (error) {
    return res.status(400).json({ message: `Bad Request-${error.message}` });
  }
});

//--------Get request with single ID-----------------------
router.get("/:id", async (req, res) => {
  try {
    const foodItems = await foodData.findById(req.params.id).lean().exec();
    res.status(200).json({
      data: foodItems,
      message: "Particular foodItems data is displayed successfully",
    });
  } catch (error) {
    return res.status(400).json({ message: `Bad Request-${error.message}` });
  }
});

//--------------Post request-------------------------------
router.post("/", async (req, res) => {
  // const foodItems = new foodData({
  //   name: req.body.name,
  //   age: req.body.age,
  //   email: req.body.email,
  // });
  try {
    const user = await foodData.create(req.body);
    // const response = await foodItems.save();
    res
      .status(200)
      .json({ data: user, message: "foodItem is added successfully" });
  } catch (error) {
    return res.status(400).json({ message: `Bad Request-${error.message}` });
  }
});

//-----------------Patch request---------------------------
router.patch("/rating/:id", async (req, res) => {
  try {
    const foodItems = await foodData
      .findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
      .lean()
      .exec();
    res
      .status(200)
      .json({ data: foodItems, message: "Rating is updated successfully" });
  } catch (error) {
    return res.status(400).json({ message: `Bad Request-${error.message}` });
  }
});

// reviews ------------------------------
router.patch("/reviews/:id", async (req, res) => {
  try {
    const foodItems = await foodData
      .findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
      .lean()
      .exec();
    res
      .status(200)
      .json({ data: foodItems, message: "Reviews is updated successfully" });
  } catch (error) {
    return res.status(400).json({ message: `Bad Request-${error.message}` });
  }
});

//---------------Delete request----------------------------
router.delete("/:id", async (req, res) => {
  try {
    const foodItems = await foodData.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "foodItems is deleted Successfully" });
  } catch (error) {
    return res.status(400).json({ message: `Bad Request-${error.message}` });
  }
});

//-----------Sorting based on Rating --------------------
router.get("/rating/sorting", async (req, res) => {
  const query = { rating: -1 };
  try {
    const sortedItems = await foodData.find().sort(query).lean().exec();
    res.status(200).json({
      data: sortedItems,
      message: "Highest Rating food items are displayed successfully",
    });
  } catch (error) {
    return res.status(400).json({ message: `Bad Request-${error.message}` });
  }
});
//-----------Sorting based on Reviews --------------------
router.get("/reviews/sorting", async (req, res) => {
  const query = { reviews: -1 };
  try {
    const sortedItems = await foodData.find().sort(query).lean().exec();
    res.status(200).json({
      data: sortedItems,
      message: "Highest Reviews food items are displayed successfully",
    });
  } catch (error) {
    return res.status(400).json({ message: `Bad Request-${error.message}` });
  }
});
module.exports = router;
