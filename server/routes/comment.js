const express = require("express");
const CommentController = require("../controllers/comment.controller");
const verifyToken = require("../middleware/verify-token");
const router = express.Router();


router
    .get("/", (req, res) => CommentController.getComments(req, res))
    .post("/:id", verifyToken(["user"]), (req, res) => CommentController.createComment(req, res))

module.exports = router;