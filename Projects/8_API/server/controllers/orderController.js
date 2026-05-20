const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  const order = await Order.create({
    user: req.user.id,
    items: req.body.items,
    total: req.body.total,
  });

  res.json(order);
};

exports.getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).populate(
    "items.product",
  );
  res.json(orders);
};

exports.getAllOrders = async (req, res) => {
  const orders = await Order.find().populate("user");
  res.json(orders);
};
