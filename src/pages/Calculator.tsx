import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator as CalcIcon, Car, Zap } from 'lucide-react';
import { calculatorAPI, badgeAPI } from '../services/api';

export const Calculator = () => {
  const [vehicleType, setVehicleType] = useState('car');
  const [fuelType, setFuelType] = useState('petrol');
  const [fuelConsumption, setFuelConsumption] = useState('');
  const [distance, setDistance] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await calculatorAPI.calculate({
        vehicleType,
        fuelType,
        fuelConsumption: parseFloat(fuelConsumption),
        distance: parseFloat(distance)
      });

      if (data.error) {
        setError(data.error);
      } else {
        setResult(data.co2Emissions);
        await badgeAPI.checkBadges();
      }
    } catch (err) {
      setError('Failed to calculate emissions');
    } finally {
      setLoading(false);
    }
  };

  const vehicleTypes = [
    { value: 'car', label: 'Car', icon: Car },
    { value: 'bike', label: 'Motorcycle', icon: Car },
    { value: 'scooter', label: 'Scooter', icon: Car },
    { value: 'bus', label: 'Bus', icon: Car },
    { value: 'truck', label: 'Truck', icon: Car },
    { value: 'electric_car', label: 'Electric Car', icon: Zap },
    { value: 'electric_bike', label: 'Electric Bike', icon: Zap }
  ];

  const fuelTypes = [
    { value: 'petrol', label: 'Petrol' },
    { value: 'diesel', label: 'Diesel' },
    { value: 'cng', label: 'CNG' },
    { value: 'lpg', label: 'LPG' },
    { value: 'electric', label: 'Electric' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <CalcIcon className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Carbon Calculator</h1>
          <p className="text-gray-600">Calculate your vehicle's CO₂ emissions</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Vehicle Type
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {vehicleTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setVehicleType(type.value)}
                    className={`p-4 border-2 rounded-lg transition ${
                      vehicleType === type.value
                        ? 'border-green-600 bg-green-50'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <type.icon className="w-6 h-6 mx-auto mb-2" />
                    <div className="text-sm font-medium">{type.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fuel Type
              </label>
              <select
                value={fuelType}
                onChange={(e) => setFuelType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {fuelTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fuel Consumption ({fuelType === 'electric' ? 'kWh' : 'Liters'})
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={fuelConsumption}
                  onChange={(e) => setFuelConsumption(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., 10.5"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Distance (km)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., 50"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
            >
              {loading ? 'Calculating...' : 'Calculate Emissions'}
            </button>
          </form>

          {result !== null && (
            <div className="mt-8 p-6 bg-green-50 border-2 border-green-200 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Result</h3>
              <div className="text-4xl font-bold text-green-600 mb-4">
                {result} kg CO₂
              </div>
              <p className="text-gray-600 mb-4">
                This is the estimated carbon dioxide emissions from your journey.
              </p>
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
              >
                View Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
