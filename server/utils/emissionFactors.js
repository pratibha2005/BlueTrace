const emissionFactors = {
  petrol: {
    car: 2.31,
    bike: 0.089,
    scooter: 0.071,
    bus: 2.68,
    truck: 2.68
  },
  diesel: {
    car: 2.68,
    bike: 0.095,
    scooter: 0.078,
    bus: 2.68,
    truck: 2.68
  },
  cng: {
    car: 1.89,
    bus: 2.2,
    truck: 2.2
  },
  lpg: {
    car: 1.51,
    bus: 1.8,
    truck: 1.8
  },
  electric: {
    car: 0.45,
    bike: 0.015,
    scooter: 0.012,
    electric_car: 0.45,
    electric_bike: 0.015
  }
};

const calculateEmissions = (vehicleType, fuelType, fuelConsumption, distance) => {
  const factor = emissionFactors[fuelType]?.[vehicleType] || 2.31;

  if (fuelType === 'electric') {
    return (fuelConsumption * factor).toFixed(2);
  }

  return (fuelConsumption * factor).toFixed(2);
};

module.exports = { emissionFactors, calculateEmissions };
