const Comment = require("../models/Comment");
const User = require("../models/User");
const Booking = require("../models/Booking");
const Joi = require("joi");

class ServiceController {
  async getComments(req, res) {
    try{
      const comments = await Comment.find({});

      res.status(200).json({
        message: "Got all comments",
        payload: comments
      })
    }
    catch(error){
      console.log(error)
      res.status(500).json({
        message: error,
      });
    }
  }

  async createComment(req, res) {
    try {
      const { id } = req.user;
      const { id: barberId } = req.params;
      const { message, rating } = req.body;

      const schema = Joi.object({
        message: Joi.string().required(),
        rating: Joi.number().required(),
        client: Joi.string().required(),
        barber: Joi.string().required(),
      });

      const validation = schema.validate({
        message,
        rating,
        client: id,
        barber: barberId,
      });

      if (validation.error)
        return res.status(400).json({
          message:
              validation.error.details[0].message
                  .replace(/['"_]+/g, "")
                  .capitalize() + "!",
        });

      const booking = await Booking.findOne({
        barber: barberId,
        client: id,
        status: "completed",
      });

      if (!booking) {
        return res.status(404).json({
          message: "Booking not found for this user",
        });
      }

      let comment = await Comment.findOne({
        client: id,
        barber: barberId,
        date: booking.date,
      });

      if (comment) {
        return res.status(400).json({
          message: "You already posted a comment",
        });
      }

      const newComment = await Comment.create({
        message,
        rating,
        client: id,
        barber: barberId,
        date: booking.date,
      });

      if (!newComment) {
        return res.status(500).json({
          message: "Couldn't post a comment and rating",
        });
      }

      await User.findById(barberId).updateOne({
        $push: { comments: newComment._id },
        $inc: { rating: rating },
      });

      return res.status(201).json({
        message: "Posted comment successfully",
        payload: newComment,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error,
      });
    }
  }
}

module.exports = new ServiceController();
