const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  create,
  getAll,
  update,
  remove, // ✅ changed here
} = require("../controllers/productController");

router.get("/", getAll);
// router.post("/", auth, admin, create);
// router.put("/:id", auth, admin, update);
// router.delete("/:id", auth, admin, remove); // ✅ changed here
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);
module.exports = router;
