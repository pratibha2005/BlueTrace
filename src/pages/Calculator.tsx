// // src/pages/calculator.tsx
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Calculator as CalcIcon, Car, Bike, Bus, Truck, Zap } from 'lucide-react';
// import { calculatorAPI, badgeAPI, authAPI } from '../services/api';
// import { ReactComponent as EcoLeaf } from '../assets/svgs/eco-leaf.svg';
// import { ReactComponent as EcoCar } from '../assets/svgs/eco-car.svg';



// export const Calculator = () => {
//   const [vehicleType, setVehicleType] = useState('car');
//   const [fuelType, setFuelType] = useState('petrol');
//   const [fuelConsumption, setFuelConsumption] = useState('');
//   const [distance, setDistance] = useState('');
//   const [result, setResult] = useState<number | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const vehicleTypes = [
//     { value: 'car', label: 'Car', icon: Car },
//     { value: 'motorcycle', label: 'Motorcycle', icon: Bike },
//     { value: 'scooter', label: 'Scooter', icon: Bike },
//     { value: 'bus', label: 'Bus', icon: Bus },
//     { value: 'truck', label: 'Truck', icon: Truck },
//     { value: 'electric_car', label: 'EV', icon: Zap }
//   ];

//   const fuelTypes = [
//     { value: 'petrol', label: 'Petrol' },
//     { value: 'diesel', label: 'Diesel' },
//     { value: 'cng', label: 'CNG' },
//     { value: 'lpg', label: 'LPG' },
//     { value: 'electric', label: 'Electric' }
//   ];

//   const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   setError('');
//   setLoading(true);
  
//   try {
//     // Check authentication first
//     if (!authAPI.isAuthenticated()) {
//       setError('Please log in to calculate emissions');
//       navigate('/login');
//       return;
//     }

//     const data = await calculatorAPI.calculate({
//       vehicleType,
//       fuelType,
//       fuelConsumption: parseFloat(fuelConsumption),
//       distance: parseFloat(distance)
//     });

//     setResult(data.co2Emissions);
    
//     // Check for new badges
//     try {
//       await badgeAPI.checkBadges();
//     } catch (badgeError) {
//       console.log('Badge check failed:', badgeError);
//     }

//     // Store recent calculation
//     try {
//       sessionStorage.setItem('recentCalc', JSON.stringify({
//         co2Emissions: data.co2Emissions,
//         vehicleType,
//         date: new Date().toISOString()
//       }));
//     } catch {}

//     // Navigate to dashboard
//     navigate('/dashboard');
    
//   } catch (err: any) {
//     console.error('Calculation error:', err);
//     setError(err.message || 'Failed to calculate emissions');
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-12 px-4">
//       <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
//         {/* Left - Form card */}
//         <div className="bg-white rounded-3xl shadow-xl p-8">
//           <div className="flex items-center gap-4 mb-6">
//             <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white">
//               <CalcIcon className="w-7 h-7" />
//             </div>
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">Carbon Calculator</h1>
//               <p className="text-sm text-gray-500">Estimate CO₂ emissions for your trip</p>
//             </div>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-3">Vehicle Type</label>
//               <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
//                 {vehicleTypes.map(v => {
//                   const Icon = v.icon;
//                   const active = vehicleType === v.value;
//                   return (
//                     <button
//                       key={v.value}
//                       type="button"
//                       onClick={() => setVehicleType(v.value)}
//                       className={`p-3 rounded-xl border transition flex flex-col items-center gap-2 ${
//                         active ? 'bg-emerald-50 border-emerald-300 shadow-sm scale-105' : 'bg-white border-gray-200 hover:shadow-sm'
//                       }`}
//                     >
//                       <div className={`w-8 h-8 rounded-md flex items-center justify-center ${active ? 'bg-emerald-100' : 'bg-gray-100'}`}>
//                         <Icon className="w-5 h-5 text-gray-700"/>
//                       </div>
//                       <span className="text-xs font-medium text-gray-700">{v.label}</span>
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Type</label>
//               <select value={fuelType} onChange={(e) => setFuelType(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-200">
//                 {fuelTypes.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
//               </select>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm text-gray-700 mb-2">Fuel Consumption ({fuelType === 'electric' ? 'kWh/100km' : 'L/100km'})</label>
//                 <input type="number" step="0.01" value={fuelConsumption} onChange={(e) => setFuelConsumption(e.target.value)} placeholder="e.g., 6.5" required className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-200" />
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-700 mb-2">Distance (km)</label>
//                 <input type="number" step="0.1" value={distance} onChange={(e) => setDistance(e.target.value)} placeholder="e.g., 45" required className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-200" />
//               </div>
//             </div>

//             {error && <div className="text-sm text-red-700 bg-red-50 px-4 py-2 rounded">{error}</div>}

//             <div className="flex gap-4">
//               <button type="submit" disabled={loading} className="flex-1 bg-emerald-500 text-white py-3 rounded-2xl font-semibold hover:bg-emerald-600 transition disabled:opacity-50">
//                 {loading ? 'Calculating...' : 'Calculate & View Dashboard'}
//               </button>
//               <button type="button" onClick={() => { setFuelConsumption(''); setDistance(''); setError(''); }} className="px-6 py-3 rounded-2xl border border-gray-200 bg-white">Reset</button>
//             </div>
//           </form>
//         </div>

//         {/* Right - Illustration + result card */}
//         <div className="bg-gradient-to-br from-emerald-50 to-white rounded-3xl p-8 flex flex-col items-center justify-center shadow-md">
//           <div className="w-full max-w-md">
//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 <h3 className="text-lg font-bold text-gray-900">Quick Preview</h3>
//                 <p className="text-sm text-gray-500">Illustration & instant feedback</p>
//               </div>
//               <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
//                 <EcoLeaf className="w-8 h-8"/>
//               </div>
//             </div>

//             <div className="rounded-xl border border-emerald-100 bg-white p-6">
//               <div className="flex items-center justify-center mb-4">
//                 <EcoCar className="w-full h-40" />
//               </div>

//               {result === null ? (
//                 <div className="text-center text-gray-500">
//                   <p className="font-medium">No calculation yet</p>
//                   <p className="text-xs mt-1">Enter your vehicle data to see estimated CO₂</p>
//                 </div>
//               ) : (
//                 <div className="text-center">
//                   <div className="text-4xl font-bold text-emerald-600">{result} <span className="text-sm font-medium text-gray-600">kg CO₂</span></div>
//                   <p className="mt-2 text-sm text-gray-600">Estimated emissions for this trip</p>
//                 </div>
//               )}
//             </div>

//             <div className="mt-6 text-xs text-gray-500">
//               Tip: Small changes like reducing speed or carpooling can reduce emissions.
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
















// // src/pages/calculator.tsx
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Calculator as CalcIcon, Car, Bike, Bus, Truck, Zap } from 'lucide-react';
// import { calculatorAPI, badgeAPI, authAPI } from '../services/api';
// import { ReactComponent as EcoLeaf } from '../assets/svgs/eco-leaf.svg';
// // removed EcoCar svg import since we're using a video
// import CarbonMP4 from '../assets/animations/Carbon.MP4'; // <-- वीडियो का import (path adjust कर लेना अगर ज़रुरत हो)

// export const Calculator = () => {
//   const [vehicleType, setVehicleType] = useState('car');
//   const [fuelType, setFuelType] = useState('petrol');
//   const [fuelConsumption, setFuelConsumption] = useState('');
//   const [distance, setDistance] = useState('');
//   const [result, setResult] = useState<number | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const vehicleTypes = [
//     { value: 'car', label: 'Car', icon: Car },
//     { value: 'motorcycle', label: 'Motorcycle', icon: Bike },
//     { value: 'scooter', label: 'Scooter', icon: Bike },
//     { value: 'bus', label: 'Bus', icon: Bus },
//     { value: 'truck', label: 'Truck', icon: Truck },
//     { value: 'electric_car', label: 'EV', icon: Zap }
//   ];

//   const fuelTypes = [
//     { value: 'petrol', label: 'Petrol' },
//     { value: 'diesel', label: 'Diesel' },
//     { value: 'cng', label: 'CNG' },
//     { value: 'lpg', label: 'LPG' },
//     { value: 'electric', label: 'Electric' }
//   ];

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       // Check authentication first
//       if (!authAPI.isAuthenticated()) {
//         setError('Please log in to calculate emissions');
//         navigate('/login');
//         return;
//       }

//       const data = await calculatorAPI.calculate({
//         vehicleType,
//         fuelType,
//         fuelConsumption: parseFloat(fuelConsumption),
//         distance: parseFloat(distance)
//       });

//       setResult(data.co2Emissions);

//       // Check for new badges
//       try {
//         await badgeAPI.checkBadges();
//       } catch (badgeError) {
//         console.log('Badge check failed:', badgeError);
//       }

//       // Store recent calculation
//       try {
//         sessionStorage.setItem('recentCalc', JSON.stringify({
//           co2Emissions: data.co2Emissions,
//           vehicleType,
//           date: new Date().toISOString()
//         }));
//       } catch {}

//       // Navigate to dashboard
//       navigate('/dashboard');

//     } catch (err: any) {
//       console.error('Calculation error:', err);
//       setError(err.message || 'Failed to calculate emissions');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-12 px-4">
//       <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
//         {/* Left - Form card */}
//         <div className="bg-white rounded-3xl shadow-xl p-8">
//           <div className="flex items-center gap-4 mb-6">
//             <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white">
//               <CalcIcon className="w-7 h-7" />
//             </div>
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">Carbon Calculator</h1>
//               <p className="text-sm text-gray-500">Estimate CO₂ emissions for your trip</p>
//             </div>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-3">Vehicle Type</label>
//               <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
//                 {vehicleTypes.map(v => {
//                   const Icon = v.icon;
//                   const active = vehicleType === v.value;
//                   return (
//                     <button
//                       key={v.value}
//                       type="button"
//                       onClick={() => setVehicleType(v.value)}
//                       className={`p-3 rounded-xl border transition flex flex-col items-center gap-2 ${
//                         active ? 'bg-emerald-50 border-emerald-300 shadow-sm scale-105' : 'bg-white border-gray-200 hover:shadow-sm'
//                       }`}
//                     >
//                       <div className={`w-8 h-8 rounded-md flex items-center justify-center ${active ? 'bg-emerald-100' : 'bg-gray-100'}`}>
//                         <Icon className="w-5 h-5 text-gray-700"/>
//                       </div>
//                       <span className="text-xs font-medium text-gray-700">{v.label}</span>
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Type</label>
//               <select value={fuelType} onChange={(e) => setFuelType(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-200">
//                 {fuelTypes.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
//               </select>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm text-gray-700 mb-2">Fuel Consumption ({fuelType === 'electric' ? 'kWh/100km' : 'L/100km'})</label>
//                 <input type="number" step="0.01" value={fuelConsumption} onChange={(e) => setFuelConsumption(e.target.value)} placeholder="e.g., 6.5" required className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-200" />
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-700 mb-2">Distance (km)</label>
//                 <input type="number" step="0.1" value={distance} onChange={(e) => setDistance(e.target.value)} placeholder="e.g., 45" required className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-200" />
//               </div>
//             </div>

//             {error && <div className="text-sm text-red-700 bg-red-50 px-4 py-2 rounded">{error}</div>}

//             <div className="flex gap-4">
//               <button type="submit" disabled={loading} className="flex-1 bg-emerald-500 text-white py-3 rounded-2xl font-semibold hover:bg-emerald-600 transition disabled:opacity-50">
//                 {loading ? 'Calculating...' : 'Calculate & View Dashboard'}
//               </button>
//               <button type="button" onClick={() => { setFuelConsumption(''); setDistance(''); setError(''); }} className="px-6 py-3 rounded-2xl border border-gray-200 bg-white">Reset</button>
//             </div>
//           </form>
//         </div>

//         {/* Right - Video + result card */}
//         <div className="bg-gradient-to-br from-emerald-50 to-white rounded-3xl p-8 flex flex-col items-center justify-center shadow-md">
//           <div className="w-full max-w-md">
//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 <h3 className="text-lg font-bold text-gray-900">Quick Preview</h3>
//                 <p className="text-sm text-gray-500">Illustration & instant feedback</p>
//               </div>
//               <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
//                 <EcoLeaf className="w-8 h-8"/>
//               </div>
//             </div>

//             <div className="rounded-xl border border-emerald-100 bg-white p-6">
//               <div className="flex items-center justify-center mb-4">
//                 {/* Video replaces the SVG illustration */}
//                 <video
//                   src={CarbonMP4}
//                   autoPlay
//                   muted
//                   loop
//                   playsInline
//                   controls={false}
//                   className="w-full h-40 object-cover rounded-md"
//                   aria-label="Carbon animation"
//                 />
//               </div>

//               {result === null ? (
//                 <div className="text-center text-gray-500">
//                   <p className="font-medium">No calculation yet</p>
//                   <p className="text-xs mt-1">Enter your vehicle data to see estimated CO₂</p>
//                 </div>
//               ) : (
//                 <div className="text-center">
//                   <div className="text-4xl font-bold text-emerald-600">{result} <span className="text-sm font-medium text-gray-600">kg CO₂</span></div>
//                   <p className="mt-2 text-sm text-gray-600">Estimated emissions for this trip</p>
//                 </div>
//               )}
//             </div>

//             <div className="mt-6 text-xs text-gray-500">
//               Tip: Small changes like reducing speed or carpooling can reduce emissions.
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };














// src/pages/calculator.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator as CalcIcon, Car, Bike, Bus, Truck, Zap } from 'lucide-react';
import { calculatorAPI, badgeAPI, authAPI } from '../services/api';
import { ReactComponent as EcoLeaf } from '../assets/svgs/eco-leaf.svg';
import CarbonMP4 from '../assets/animations/Carbon.MP4'; // <-- वीडियो का import (path adjust कर लेना अगर ज़रुरत हो)

export const Calculator = () => {
  const [vehicleType, setVehicleType] = useState('car');
  const [fuelType, setFuelType] = useState('petrol');
  const [fuelConsumption, setFuelConsumption] = useState('');
  const [distance, setDistance] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const vehicleTypes = [
    { value: 'car', label: 'Car', icon: Car },
    { value: 'bike', label: 'bike', icon: Bike },
    { value: 'scooter', label: 'Scooter', icon: Bike },
    { value: 'bus', label: 'Bus', icon: Bus },
    { value: 'truck', label: 'Truck', icon: Truck },
    { value: 'electric_car', label: 'EV', icon: Zap }
  ];

  const fuelTypes = [
    { value: 'petrol', label: 'Petrol' },
    { value: 'diesel', label: 'Diesel' },
    { value: 'cng', label: 'CNG' },
    { value: 'lpg', label: 'LPG' },
    { value: 'electric', label: 'Electric' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Check authentication first
      if (!authAPI.isAuthenticated()) {
        setError('Please log in to calculate emissions');
        navigate('/login');
        return;
      }

      const data = await calculatorAPI.calculate({
        vehicleType,
        fuelType,
        fuelConsumption: parseFloat(fuelConsumption),
        distance: parseFloat(distance)
      });

      setResult(data.co2Emissions);

      // Check for new badges
      try {
        await badgeAPI.checkBadges();
      } catch (badgeError) {
        console.log('Badge check failed:', badgeError);
      }

      // Store recent calculation
      try {
        sessionStorage.setItem('recentCalc', JSON.stringify({
          co2Emissions: data.co2Emissions,
          vehicleType,
          date: new Date().toISOString()
        }));
      } catch {}

      // Navigate to dashboard
      navigate('/dashboard');

    } catch (err: any) {
      console.error('Calculation error:', err);
      setError(err.message || 'Failed to calculate emissions');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left - Form card */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white">
              <CalcIcon className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Carbon Calculator</h1>
              <p className="text-sm text-gray-500">Estimate CO₂ emissions for your trip</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Vehicle Type</label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {vehicleTypes.map(v => {
                  const Icon = v.icon;
                  const active = vehicleType === v.value;
                  return (
                    <button
                      key={v.value}
                      type="button"
                      onClick={() => setVehicleType(v.value)}
                      className={`p-3 rounded-xl border transition flex flex-col items-center gap-2 ${
                        active ? 'bg-emerald-50 border-emerald-300 shadow-sm scale-105' : 'bg-white border-gray-200 hover:shadow-sm'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-md flex items-center justify-center ${active ? 'bg-emerald-100' : 'bg-gray-100'}`}>
                        <Icon className="w-5 h-5 text-gray-700"/>
                      </div>
                      <span className="text-xs font-medium text-gray-700">{v.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Type</label>
              <select value={fuelType} onChange={(e) => setFuelType(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-200">
                {fuelTypes.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Fuel Consumption ({fuelType === 'electric' ? 'kWh/100km' : 'L/100km'})</label>
                <input type="number" step="0.01" value={fuelConsumption} onChange={(e) => setFuelConsumption(e.target.value)} placeholder="e.g., 6.5" required className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-200" />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Distance (km)</label>
                <input type="number" step="0.1" value={distance} onChange={(e) => setDistance(e.target.value)} placeholder="e.g., 45" required className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-200" />
              </div>
            </div>

            {error && <div className="text-sm text-red-700 bg-red-50 px-4 py-2 rounded">{error}</div>}

            <div className="flex gap-4">
              <button type="submit" disabled={loading} className="flex-1 bg-emerald-500 text-white py-3 rounded-2xl font-semibold hover:bg-emerald-600 transition disabled:opacity-50">
                {loading ? 'Calculating...' : 'Calculate & View Dashboard'}
              </button>
              <button type="button" onClick={() => { setFuelConsumption(''); setDistance(''); setError(''); }} className="px-6 py-3 rounded-2xl border border-gray-200 bg-white">Reset</button>
            </div>
          </form>
        </div>

        {/* Right - Video + result card (upgraded visuals) */}
        <div className="bg-gradient-to-tr from-emerald-100 to-emerald-50 rounded-3xl p-8 flex flex-col items-center justify-center shadow-2xl border border-emerald-200">
          <div className="w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-extrabold text-emerald-800">Quick Preview</h3>
                <p className="text-sm text-emerald-700">Instant illustration & feedback</p>
              </div>
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-emerald-200">
                <EcoLeaf className="w-9 h-9 text-emerald-500"/>
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-200 bg-white p-6 shadow-inner">
              <div className="flex items-center justify-center mb-5">
                <video
                  src={CarbonMP4}
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls={false}
                  className="w-full h-48 object-cover rounded-2xl shadow-lg border border-emerald-100"
                  aria-label="Carbon animation"
                />
              </div>

              {result === null ? (
                <div className="text-center text-emerald-700">
                  <p className="font-semibold text-lg">No calculation yet</p>
                  <p className="text-xs mt-1">Enter your vehicle details to see estimated CO₂ emissions</p>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-5xl font-extrabold text-emerald-700">{result} <span className="text-sm font-medium text-emerald-500">kg CO₂</span></div>
                  <p className="mt-2 text-sm text-emerald-600">Estimated emissions for this trip</p>
                </div>
              )}
            </div>

            <div className="mt-6 text-xs text-emerald-700">
              💡 Tip: Small changes like reducing speed, carpooling, or choosing electric vehicles can reduce emissions.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
