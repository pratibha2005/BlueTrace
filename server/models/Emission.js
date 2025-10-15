const mongoose = require('mongoose');

const emissionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  vehicleType: {
    type: String,
    required: true,
    enum: ['car', 'bus', 'truck', 'bike', 'scooter', 'electric_car', 'electric_bike']
  },
  fuelType: {
    type: String,
    required: true,
    enum: ['petrol', 'diesel', 'cng', 'electric', 'lpg']
  },
  fuelConsumption: {
    type: Number,
    required: true
  },
  distance: {
    type: Number,
    required: true
  },
  co2Emissions: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Emission', emissionSchema);
