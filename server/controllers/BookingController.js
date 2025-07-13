import Booking from "../Models/Booking.js"
import Car from "../Models/Car.js";


export const checkAvailability = async(car, pickupDate, returnDate) => {
    const bookings = await Booking.find({
        car,
        pickupDate: {$lte: returnDate},
        returnDate: {$gte: pickupDate},
    })
    return bookings.length === 0;
}

export const checkAvailabilityofCar = async(req,res) => {
    try {
        const {location, pickupDate, returnDate} = req.body;
        const cars = Car.find({location, isAvalible: true})
        const CarsPromices = (await cars).map(async(car) => {
            const available = await checkAvailability(car._id, pickupDate, returnDate)
            return {...car._doc, isAvalible: isAvalible}
        })

        let availableCars = await Promise.all(CarsPromices);
        availableCars = availableCars.filter(car => car.isAvalible === true)
        res.json({success: true, availableCars})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

export const createBooking = async(req,res) => {
    try {
        const {_id} = req.user;
        const {car, pickupDate, returnDate} = req.body;
        const isAvalible = await checkAvailability(car, pickupDate, returnDate)
        if(!isAvalible) {
            res.json({success: false, message: "Car is not Available"})
            return null;
        } 
        const carData = await Car.findById(car)
        const picked = new Date(pickupDate)
        const returned = new Date(returnDate)
        const noOfDays = Math.ceil((returned - picked) / (1000*60*60*24))
        const price = carData.pricePerDay * noOfDays

        await Booking.create({car, owner: carData.owner, user: _id, pickupDate, returnDate, price})

        res.json({success: true, message: "Booking successfull"})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

export const getUserBookings = async(req,res) => {
    try {
        const {_id} = req.user;
        const bookings = await Booking.find({user: _id}).populate("car").sort({createdAt: -1})
        res.json({success: true, bookings})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

export const getOwnerBookings = async(req,res) => {
    try {
        if(req.user.role !== 'owner') res.json({success: false, message: "Unorthorized"})
        const bookings = await Booking.find({owner: req.user._id}).populate('car user').select("-user.password").sort({createdAt: -1})
        res.json({success: true, bookings})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

export const changeBookingStatus = async(req,res) => {
    try {
        const {_id} = req.user;
        const {bookingId , status} = req.body;
        const booking = await Booking.findById(bookingId)
        if(booking.owner.toString() !== _id.toString()) res.json({success: false, message: "Unorthorized"})
        booking.status = status;
        await booking.save();
        res.json({success: true, message: "Status Updated"})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}
