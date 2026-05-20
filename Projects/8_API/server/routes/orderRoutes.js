const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  createOrder,
  getMyOrders,
  getAllOrders,
} = require("../controllers/orderController");

router.post("/", auth, createOrder);
router.get("/my", auth, getMyOrders);
router.get("/", auth, admin, getAllOrders);

module.exports = router;
