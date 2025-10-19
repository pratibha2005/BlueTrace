// import { Link } from 'react-router-dom';
// import { Car, TrendingDown, Award, Globe } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';

// export const Home = () => {
//   const { user } = useAuth();

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
//       <div className="container mx-auto px-4 py-16">
//         <div className="text-center mb-16">
//           <h1 className="text-5xl font-bold text-gray-800 mb-4">
//             BlueTrace - Land Edition
//           </h1>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Track, analyze, and reduce your land vehicle carbon emissions. Join the movement
//             towards sustainable transportation and earn Green Badges for your eco-friendly efforts.
//           </p>
//           <div className="mt-8 flex justify-center space-x-4">
//             {user ? (
//               <>
//                 <Link
//                   to="/calculator"
//                   className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
//                 >
//                   Calculate Emissions
//                 </Link>
//                 <Link
//                   to="/dashboard"
//                   className="bg-white text-green-600 border-2 border-green-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-50 transition"
//                 >
//                   View Dashboard
//                 </Link>
//               </>
//             ) : (
//               <>
//                 <Link
//                   to="/signup"
//                   className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
//                 >
//                   Get Started
//                 </Link>
//                 <Link
//                   to="/login"
//                   className="bg-white text-green-600 border-2 border-green-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-50 transition"
//                 >
//                   Login
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
//           <FeatureCard
//             icon={<Car className="w-12 h-12 text-green-600" />}
//             title="Carbon Calculator"
//             description="Calculate CO₂ emissions based on vehicle type, fuel consumption, and distance traveled."
//           />
//           <FeatureCard
//             icon={<TrendingDown className="w-12 h-12 text-green-600" />}
//             title="AI Suggestions"
//             description="Get personalized tips to reduce emissions and improve fuel efficiency based on your data."
//           />
//           <FeatureCard
//             icon={<Award className="w-12 h-12 text-green-600" />}
//             title="Green Badges"
//             description="Earn digital certificates for achieving emission reduction milestones and eco-friendly habits."
//           />
//           <FeatureCard
//             icon={<Globe className="w-12 h-12 text-green-600" />}
//             title="Multilingual Content"
//             description="Access educational content about sustainable transport in multiple languages."
//           />
//         </div>

//         <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
//           <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
//             Why BlueTrace Matters
//           </h2>
//           <div className="grid md:grid-cols-3 gap-6">
//             <StatCard
//               number="45%"
//               label="CO₂ reduction with public transport"
//             />
//             <StatCard
//               number="70%"
//               label="Lower emissions with electric vehicles"
//             />
//             <StatCard
//               number="30%"
//               label="Fuel efficiency improvement with eco-driving"
//             />
//           </div>
//         </div>

//         <div className="text-center bg-green-600 text-white rounded-2xl p-12">
//           <h2 className="text-3xl font-bold mb-4">
//             Ready to Make a Difference?
//           </h2>
//           <p className="text-lg mb-6 max-w-2xl mx-auto">
//             Join thousands of users tracking their carbon footprint and working towards
//             a cleaner, greener future for transportation.
//           </p>
//           {!user && (
//             <Link
//               to="/signup"
//               className="inline-block bg-white text-green-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-50 transition"
//             >
//               Start Your Journey
//             </Link>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// const FeatureCard = ({ icon, title, description }: {
//   icon: React.ReactNode;
//   title: string;
//   description: string;
// }) => (
//   <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
//     <div className="mb-4">{icon}</div>
//     <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
//     <p className="text-gray-600">{description}</p>
//   </div>
// );

// const StatCard = ({ number, label }: { number: string; label: string }) => (
//   <div className="text-center">
//     <div className="text-4xl font-bold text-green-600 mb-2">{number}</div>
//     <div className="text-gray-600">{label}</div>
//   </div>
// );










import { Link } from 'react-router-dom';
import { Car, TrendingDown, Award, Globe } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

import Lottie from "lottie-react";
import Homesvg from "../assets/animations/Homesvg.json";


// Ye ek simple SVG component hai for illustration purposes. 
// Replace the content of 'SustainableTransportSVG' with your actual SVG code.
const SustainableTransportSVG = () => (
  <svg
    className="w-full h-auto max-w-lg mx-auto"
    viewBox="0 0 500 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Sample SVG content (Please replace this with your desired SVG) */}
    <rect x="0" y="0" width="500" height="300" fill="#f0fff4" rx="20" />
    <circle cx="150" cy="150" r="100" fill="#68d391" />
    <rect x="280" y="100" width="150" height="100" fill="#48bb78" rx="10" />
    <path
      d="M150 150 L200 50 L300 50 L250 150 Z"
      fill="#2f855a"
      transform="translate(130, 0)"
    />
    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="30" fill="#2d3748" fontWeight="bold">
        Your SVG Here
    </text>
    <path
      d="M50 250 H450"
      stroke="#48bb78"
      strokeWidth="10"
      strokeLinecap="round"
    />
    <circle cx="100" cy="250" r="20" fill="#a0aec0" />
    <circle cx="400" cy="250" r="20" fill="#a0aec0" />
    {/* End of Sample SVG content */}
  </svg>
);


export const Home = () => {
  const { user } = useAuth();

  return (

    
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-16">
        
        {/* --- Hero Section with SVG --- */}
        <div className="grid md:grid-cols-2 gap-12 items-center text-center md:text-left mb-20"> 
          
          {/* Text and Buttons Container */}
          <div>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-800 mb-6 leading-tight">
              BlueTrace - <span className="text-green-600">Land Edition</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-xl mb-8">
              Track, analyze, and reduce your land vehicle carbon emissions. Join the movement
              towards sustainable transportation and earn Green Badges for your eco-friendly efforts.
            </p>
            
            {/* Buttons Container */}
            <div className="mt-8 flex justify-center md:justify-start space-x-4">
              {user ? (
                <>
                  <Link
                    to="/calculator"
                    className="bg-green-600 text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-lg hover:bg-green-700 transition transform hover:scale-105"
                  >
                    Calculate Emissions 
                  </Link>
                  <Link
                    to="/dashboard"
                    className="bg-white text-green-600 border-2 border-green-600 px-8 py-3 rounded-xl text-lg font-semibold shadow-lg hover:bg-green-50 transition transform hover:scale-105"
                  >
                    View Dashboard 
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="bg-green-600 text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-lg hover:bg-green-700 transition transform hover:scale-105"
                  >
                    Get Started Free! 
                  </Link>
                  <Link
                    to="/login"
                    className="bg-white text-green-600 border-2 border-green-600 px-8 py-3 rounded-xl text-lg font-semibold shadow-lg hover:bg-green-50 transition transform hover:scale-105"
                  >
                    Login 
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* SVG Illustration Container */}
          <div className="hidden md:block"> {/* Hide on small screens for better mobile view */}
            <Lottie animationData={Homesvg} loop={true} className="w-full h-auto max-w-lg mx-auto transform scale-125 translate-x-6 md:translate-x-24" />

          </div>

        </div>

        {/* --- Features Section --- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <FeatureCard
            icon={<Car className="w-12 h-12 text-green-600" />}
            title="Carbon Calculator"
            description="Calculate CO₂ emissions based on vehicle type, fuel consumption, and distance traveled."
          />
          <FeatureCard
            icon={<TrendingDown className="w-12 h-12 text-green-600" />}
            title="AI Suggestions"
            description="Get personalized tips to reduce emissions and improve fuel efficiency based on your data."
          />
          <FeatureCard
            icon={<Award className="w-12 h-12 text-green-600" />}
            title="Green Badges"
            description="Earn digital certificates for achieving emission reduction milestones and eco-friendly habits."
          />
          <FeatureCard
            icon={<Globe className="w-12 h-12 text-green-600" />}
            title="Multilingual Content"
            description="Access educational content about sustainable transport in multiple languages."
          />
        </div>

        --- Stats Section ---
        <div className="bg-white rounded-3xl shadow-2xl p-10 mb-20 border-t-4 border-green-500">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Why BlueTrace Matters
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <StatCard
              number="45%"
              label="CO₂ reduction with public transport"
            />
            <StatCard
              number="70%"
              label="Lower emissions with electric vehicles"
            />
            <StatCard
              number="30%"
              label="Fuel efficiency improvement with eco-driving"
            />
          </div>
        </div>

        {/* --- Call to Action Section --- */}
        <div className="text-center bg-green-700 text-white rounded-3xl p-16 shadow-2xl">
          <h2 className="text-4xl font-extrabold mb-4">
            Ready to Make a Difference? 🌍
          </h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto opacity-90">
            Join thousands of users tracking their carbon footprint and working towards
            a cleaner, greener future for transportation. Every kilometer counts.
          </p>
          {!user && (
            <Link
              to="/signup"
              className="inline-block bg-white text-green-700 px-10 py-4 rounded-full text-xl font-bold hover:bg-green-100 transition transform hover:scale-105 shadow-xl"
            >
              Start Your Journey Today!
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-green-400 hover:shadow-2xl transition transform hover:-translate-y-1 h-full"> {/* Increased shadow and hover effect */}
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const StatCard = ({ number, label }: { number: string; label: string }) => (
  <div className="text-center p-4">
    <div className="text-5xl font-extrabold text-green-600 mb-2">{number}</div>
    <div className="text-gray-600 text-lg font-medium">{label}</div>
  </div>
);