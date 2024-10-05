const Joi = require("joi");
const Booking = require("../models/Booking");
const Service = require("../models/Service");


class BookingController{
  async createOrder(req, res){

    const schema = Joi.object({
      date: Joi.string().required(),
      start: Joi.string().required(),
      end: Joi.string().required(),
      service: Joi.array().required(),
      barber: Joi.string().required(),
      message: Joi.string(),
      price: Joi.number().required()
    })

    try{
      const {date, start, end, service, barber, message, price } = req.body;
      const {id} = req.user;

      const validation = schema.validate({ date, start, end, service,barber,message, price });

      if (validation.error)
        return res.status(400).json({
          message:
              validation.error.details[0].message
                  .replace(/['"_]+/g, "")
                  .capitalize() + "!",
        });


      let booking = await Booking.findOne({ date, client: id });

      if(booking){
        return res.status(409).json({
          message: `You cannot book twice for ${date}`
        })
      }

      booking = await Booking.findOne({ date, start, end, barber });

      if(booking) return res.status(400).json({
        message: "Booking already exists"
      })

      booking = await Booking.create({ date, start, end, service, client: id, barber, message, price });

      return res.status(201).json({
        message: "Booking created successfully",
        payload: booking
      })
    }
    catch(error){
      console.log(error)
      res.status(500).json({
        message: error
      })
    }
  }

  async getBookings(req, res){
    try{
      const bookings = await Booking.find().populate("service").populate("barber").populate("client");
      return res.json({
        message: "Got all bookings",
        payload: bookings
      })
    }
    catch(error){
      res.status(500).json({
        message: error
      })
    }
  }

  async getAvailableBookings(req, res){
    try{
      const {date} = req.query;
      const bookings = await Booking.find({date, status: "pending"}).populate("barber").select(['-client', '-service', '-message', '-price', '-paid'])
      return res.json({
        message: "Got all available bookings",
        payload: bookings
      })
    }
    catch(error){
      res.status(500).json({
        message: error
      })
    }
  }

  async getUserBookings(req, res) {
    try {
      const {id} = req.user
      const bookings = await Booking.find({client: id}).populate("barber").populate("service").populate("client")
      return res.json({
        message: "Got all available bookings",
        payload: bookings
      })
    }
    catch(error){
      console.log(error)
      res.status(500).json({
        message: error
      })
    }
  }

  async updateBooking(req, res){
    try{
      const schema = Joi.object({
        date: Joi.string(),
        start: Joi.string(),
        end: Joi.string(),
        service: Joi.array(),
        barber: Joi.string(),
        price: Joi.number()
      })

      const {id:bookingId} = req.params;

      const {id} = req.user;

      const { date, start, end, service, barber, price } = req.body;

      const validation = schema.validate({ date, start, end, service,barber, price });

      if (validation.error)
        return res.status(400).json({
          message:
              validation.error.details[0].message
                  .replace(/['"_]+/g, "")
                  .capitalize() + "!",
        });

      const booking = await Booking.findOne({client: id}).populate("client");

      if(!booking){
        return res.status(404).json({
          message: "Booking not found for this user"
        })
      }

      if(id != booking.client._id){
        return res.status(403).json({
          message: `You cannot update ${booking._id}`
        })
      }

      const updatedBooking = await Booking.findByIdAndUpdate(bookingId, {date, start, end, service, barber, price}, {new: true})

      return res.status(200).json({
        message: "Booking updated successfully",
        payload: updatedBooking
      })
    }
    catch(error){
      console.log(error)
      res.status(500).json({
        message: error
      })
    }
  }

  async deleteBooking(req, res) {
    try{
      const {id:bookingId} = req.params;

      const {id} = req.user;

      const booking = await Booking.findOne({client: id})

      if(!booking || booking.status === "completed"){
        return res.status(404).json({
          message: "Booking not found for this user"
        })
      }

      const cancelledBooking = await Booking.findByIdAndUpdate(bookingId, {status: "canceled"}, {new: true});

      return res.status(200).json({
        message: "Booking cancelled successfully",
        payload: cancelledBooking
      })
    }
    catch(error){
      console.log(error)
      res.status(500).json({
        message: error
      })
    }
  }

  async calculatePrice(req, res){
    try{

      const {service} = req.body;

      if(service.length <= 0) return res.status(400).json({
        message: "Please select at least one service"
      })

      const services = await Service.find({'_id': { $in: service}}).select(["-image", "-name"]);

      const total = services.reduce((acc, next) => acc + next.price, 0);

      res.status(200).json({
        message: "Calculated the price",
        payload:{
          services,
          total
        }
      })

    }
    catch(error){
      console.log(error)
      res.status(500).json({
        message: error
      })
    }
  }

  async completeBooking(req, res){
    try{
      const {id} = req.params;


      const booking = await Booking.findById(id);

      if(!booking){
        return res.status(404).json({
          message: "Booking not found for this user"
        })
      }

      const completedBooking = await Booking.findByIdAndUpdate(id, {status: "completed", paid: true}, {new: true});

      return res.status(200).json({
        message: "Booking completed successfully",
        payload: completedBooking
      })
    }
    catch(error){
      console.log(error)
      res.status(500).json({
        message: error
      })
    }
  }
}

module.exports = new BookingController();