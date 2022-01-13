const { Router } = require("express");
// import all routers;
const productRouter = require("./product.js");
const categoryRouter = require("./category.js");
const userRouter = require("./users.js");
const orderRouter = require("./order.js");
const authRouter = require("./auth.js");
const mailGunRouter = require("./mailgun");

const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);

router.use("/products", productRouter);
router.use("/category", categoryRouter);
router.use("/orders", orderRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/mailgun", mailGunRouter);

module.exports = router;
