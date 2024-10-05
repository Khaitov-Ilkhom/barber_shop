const express = require("express");
const BookingController = require("../controllers/booking.controller");
const verifyToken = require("../middleware/verify-token");
const router = express.Router();

router
    .post("/", verifyToken(["user"]), (req, res) => BookingController.createOrder(req, res))
    .get("/", verifyToken(["barber", "manager", "owner"]), (req, res) => BookingController.getBookings(req, res))
    .get("/available", (req, res) => BookingController.getAvailableBookings(req, res))
    .get("/user-booking", verifyToken(["user"]), (req, res) => BookingController.getUserBookings(req, res))
    .patch("/:id", verifyToken(["user"]), (req, res) => BookingController.updateBooking(req, res))
    .patch("/delete/:id", verifyToken(["user", "manager", "owner"]), (req, res) => BookingController.deleteBooking(req, res))
    .patch("/complete/:id", verifyToken(["barber", "manager"]), (req, res) => BookingController.completeBooking(req, res))
    .post("/calculate", verifyToken(["user"]), (req, res) => BookingController.calculatePrice(req, res))

module.exports = router;