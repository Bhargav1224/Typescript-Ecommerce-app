const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/signup", userController.signup);

router.post("/login", userController.login);

module.exports = router;


// const express = require("express");
// const router = express.Router();
// const dashBoardController = require("../controllers/dashBoardController");

// router.get("/test", dashBoardController.testFunction);
// router.get("/config", dashBoardController.getAllApis);
// router.get("/brand", dashBoardController.getBrandApi);
// router.get("/config/healthcheck", (req, res) => {
//   return res.status(200).json({ message: "Valid request" });
// });

// module.exports = router;
